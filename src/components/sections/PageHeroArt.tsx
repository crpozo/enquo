/**
 * Full-bleed backdrop for inner page heroes — brand render graded dark with
 * a left/bottom darken so the headline zone stays near-black, mirroring the
 * home hero's treatment.
 */
export function PageHeroArt({ src }: { src: string }) {
  return (
    <div className="page-hero__art" aria-hidden="true">
      <img src={import.meta.env.BASE_URL + src} alt="" />
      <div className="page-hero__art-tint" />
    </div>
  );
}
