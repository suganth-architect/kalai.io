export default function Footer() {
  return (
    <footer className="footer">
      <div className="corridor">
        <div className="flex-col-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
          {/* Mark */}
          <span className="type-tamil-mark mb-2">
            கலை
          </span>

          {/* Legal and Social Links */}
          <nav className="type-micro flex-wrap-center gap-5">
            <a href="/terms" className="footer-link">
              Terms
            </a>
            <a href="/privacy" className="footer-link">
              Privacy
            </a>
            <a
              href="https://www.instagram.com/interiors.d2v?igsh=ejgzbTJkZ2J6cmxq"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Instagram
            </a>
            <a
              href="https://in.linkedin.com/company/d2v-interiors"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
          </nav>

          {/* Copyright */}
          <p className="type-micro mt-2">
            © 2026 kalai.io
          </p>
        </div>
      </div>
    </footer>
  );
}
