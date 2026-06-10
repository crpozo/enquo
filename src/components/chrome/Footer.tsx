export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <h3>Enquo</h3>
          <p>
            A purpose driven technology company passionate about using data and
            technology as catalyst for positive change.
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
        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            <li>Enterprise Technology</li>
            <li>Data Management</li>
            <li>Data Analytics</li>
            <li>Artificial Intelligence</li>
            <li>Brain-Computer Interface</li>
            <li>Managed Services</li>
          </ul>
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
