import { Link } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";

const links = [
  { label: "About", to: "/shared" },
  { label: "Contact", to: "/shared" },
  { label: "Prayer Requests", to: "/candle" },
  { label: "Donate", to: "/shared" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]/40 bg-[var(--bg-secondary)] px-4 py-8">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="mb-2 flex flex-wrap gap-4 text-sm">
            {links.map((link) => (
              <Link key={link.label} to={link.to} className="text-[var(--text-primary)]/85 hover:text-[var(--text-secondary)]">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-[var(--text-primary)]/70">Built for the Glory of God</p>
          <p className="text-xs text-[var(--text-primary)]/60">© {new Date().getFullYear()} The Ancient Path</p>
        </div>
        <ThemeSelector />
      </div>
    </footer>
  );
}