export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-void)",
        borderTop: "1px solid var(--color-border)",
        padding: "var(--space-5) 0",
      }}
    >
      <div className="corridor">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-3)",
          }}
        >
          {/* Mark */}
          <span
            style={{
              fontFamily: "var(--font-tamil), sans-serif",
              fontSize: "1.25rem",
              fontWeight: 500,
              color: "var(--color-text-tertiary)",
            }}
          >
            கலை
          </span>

          {/* Legal links */}
          <nav
            className="type-micro voice-sub"
            style={{
              display: "flex",
              gap: "var(--space-4)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a href="/terms" style={{ color: "inherit", textDecoration: "none" }}>
              Terms
            </a>
            <a href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>
              Privacy
            </a>
            <a
              href="https://instagram.com/kalai.io"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/kalai-io"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
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
