/**
 * In-place optimisation of the photo/video assets added on feat/new-assets.
 * Paths, names and extensions stay the same so no source file changes.
 *
 *   node scripts/optimize-new-assets.mjs            # images + videos
 *   node scripts/optimize-new-assets.mjs images
 *   node scripts/optimize-new-assets.mjs videos
 *
 * Requires devDependencies `sharp` and `ffmpeg-static`.
 * Originals are not kept: re-run from the git history if a redo is needed.
 */
import { execFileSync } from "node:child_process";
import { renameSync, rmSync, statSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import sharp from "sharp";
import ffmpeg from "ffmpeg-static";

const MB = 1024 * 1024;
const kb = (n) => `${Math.round(n / 1024)} KB`;
const mb = (n) => `${(n / MB).toFixed(2)} MB`;

// [path, max width in px]. JPGs are re-encoded with mozjpeg; PNGs keep their
// extension and go through palette quantisation (photos never get small as
// true-colour PNG).
const IMAGES = [
  ["public/img/cases/athletes.jpg", 1600],
  ["public/img/cases/basket.jpg", 1600],
  ["public/img/cases/stadium.jpg", 1600],
  ["public/img/how/discover.jpg", 1400],
  ["public/img/how/design.jpg", 1400],
  ["public/img/how/run.jpg", 1400],
  ["public/img/who/people-1.png", 1400],
  ["public/img/who/people-2.png", 1400],
  ["public/img/who/businessman-analyzing.jpg", 1600],
  ["public/img/who/close-up-compute.jpg", 1600],
  ["public/img/who/city-skyscrapers.jpg", 1600],
];
const IMAGE_BUDGET = 400 * 1024;

const VIDEOS = [
  "public/videos/industries/energy-oil-gas.mp4",
  "public/videos/industries/financial-services.mp4",
  "public/videos/industries/healthcare-pharma.mp4",
  "public/videos/industries/manufacturing-industrial.mp4",
  "public/videos/industries/retail-consumer.mp4",
  "public/videos/industries/sports-media.mp4",
];
const VIDEO_BUDGET = 5 * MB;
const VIDEO_MAX_KBPS = 2200; // bitrate ceiling for short clips
const VIDEO_CRF = 22;

// Temp output lives next to the source so the final rename never crosses drives.
const tmpFor = (file) => join(dirname(file), `.opt-${basename(file)}`);

async function optimiseImage(file, width) {
  const before = statSync(file).size;
  const meta = await sharp(file).metadata();
  const isPng = meta.format === "png";
  const out = tmpFor(file);

  // Step quality down until the file fits the budget (quality floor keeps it honest).
  const qualities = isPng ? [90, 80, 70, 60] : [80, 74, 68, 62];
  let size = Infinity;
  for (const quality of qualities) {
    let p = sharp(file).rotate().resize({ width, withoutEnlargement: true });
    if (meta.icc) p = p.keepIccProfile();
    p = isPng
      ? p.png({ palette: true, quality, effort: 9, dither: 1 })
      : p.jpeg({ quality, mozjpeg: true, progressive: true });
    await p.toFile(out);
    size = statSync(out).size;
    if (size <= IMAGE_BUDGET) break;
  }
  rmSync(file);
  renameSync(out, file);
  const m = await sharp(file).metadata();
  console.log(`${file.padEnd(44)} ${mb(before).padStart(9)} -> ${kb(size).padStart(7)}  ${m.width}x${m.height}`);
  return { file, before, after: size };
}

function probeDuration(file) {
  // ffmpeg-static ships no ffprobe; read the duration from ffmpeg's banner.
  let txt = "";
  try {
    execFileSync(ffmpeg, ["-hide_banner", "-i", file], { stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    txt = String(e.stderr || "");
  }
  const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(txt);
  if (!m) throw new Error(`cannot read duration of ${file}`);
  return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
}

function optimiseVideo(file) {
  const before = statSync(file).size;
  const seconds = probeDuration(file);
  // Cap the bitrate so the clip lands ~10% under the budget even at the ceiling.
  const cap = Math.min(VIDEO_MAX_KBPS, Math.floor(((VIDEO_BUDGET * 0.9) * 8) / seconds / 1000));
  const out = tmpFor(file);
  const args = [
    "-y", "-hide_banner", "-loglevel", "error",
    "-i", file,
    "-map", "0:v:0", "-an", "-sn", "-dn",            // video only: drop audio, subs, tmcd data
    "-vf", "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1",
    "-c:v", "libx264", "-profile:v", "high", "-level", "4.0",
    "-preset", "slow", "-crf", String(VIDEO_CRF),
    "-maxrate", `${cap}k`, "-bufsize", `${cap * 2}k`,
    "-pix_fmt", "yuv420p",
    "-g", "60", "-keyint_min", "30",                  // 2s GOP: fast loop restart / seek
    "-movflags", "+faststart", "-write_tmcd", "0", "-map_metadata", "-1",
    out,
  ];
  execFileSync(ffmpeg, args, { stdio: "inherit" });
  const size = statSync(out).size;
  rmSync(file);
  renameSync(out, file);
  console.log(`${file.padEnd(52)} ${mb(before).padStart(9)} -> ${mb(size).padStart(8)}  (${seconds.toFixed(1)}s, cap ${cap} kb/s)`);
  return { file, before, after: size };
}

const what = process.argv[2] ?? "all";
const results = [];
if (what === "all" || what === "images") {
  for (const [file, width] of IMAGES) results.push(await optimiseImage(file, width));
}
if (what === "all" || what === "videos") {
  for (const file of VIDEOS) results.push(optimiseVideo(file));
}

const sum = (k) => results.reduce((a, r) => a + r[k], 0);
console.log(`\nTotal: ${mb(sum("before"))} -> ${mb(sum("after"))}`);
