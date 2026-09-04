import { Link } from "react-router-dom";

import { STAGES } from "../../data/services";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <h3>Enquo</h3>
          <p>
            A purpose-driven technology company passionate about using data and
            technology as a catalyst for positive change.
          </p>
          <div className="footer__addr">
            1270 Ave of the Americas
            <br />
            New York, NY 10020
            <br />
            <br />
            100 Challenger Road, Suite 101
            <br />
            Ridgefield Park, NJ 07660
          </div>
        </div>
        <div className="footer__col footer__col--services">
          <h4>Services</h4>
          {STAGES.map((stage) => (
            <div className="footer__stage" key={stage.tag}>
              <Link className="footer__stage-name" to={`/services#${stage.tag.toLowerCase()}`}>
                {stage.tag}
              </Link>
              <ul>
                {stage.cards.map((c) => (
                  <li key={c.title}>
                    <Link to="/services">{c.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__col">
          <h4>Products</h4>
          <ul>
            <li>Harmony</li>
            <li>Elevate</li>
            <li>VisionX</li>
            <li>Sentinel ADV</li>
            <li>EACS</li>
            <li>DataFuse</li>
            <li>GovernX</li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Contact</h4>
          <ul>
            <li>contact@enquo.com</li>
            <li>(551) 258-4342</li>
            <li>Fax (551) 258-2451</li>
          </ul>
          <h4 style={{ marginTop: 28 }}>Follow</h4>
          <ul>
            <li>LinkedIn</li>
            <li>Facebook</li>
            <li>Newsletter</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="meta">© 2026 Enquo · Human driven data solutions</span>
        <div className="links">
          <a>Cookies</a>
          <a>Privacy</a>
          <a>Terms</a>
          <a>Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
