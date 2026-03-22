export default function Footer() {
  return (
    <footer className="footer">
      <div className="corridor">
        <div className="flex-col-center gap-3">
          {/* Mark */}
          <span className="type-tamil-mark">
            கலை
          </span>

          {/* Legal links */}
          <nav className="type-micro voice-sub flex-wrap-center gap-4">
            <a href="/terms" className="footer-link">
              Terms
            </a>
            <a href="/privacy" className="footer-link">
              Privacy
            </a>
            <a
              href="https://instagram.com/kalai.io"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/kalai-io"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
          </nav>

          {/* Copyright */}
          <p className="type-micro voice-sub">
            © 2026 kalai.io
          </p>
        </div>
      </div>
    </footer>
  );
}
