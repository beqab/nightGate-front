import Link from "next/link";
import { Zap, Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Events", href: "/events" },
    { label: "Venues", href: "/venues" },
    { label: "Artists", href: "#" },
    { label: "Cities", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/5">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#ea6390]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ea6390] to-[#9e4280] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Night<span className="gradient-text">Gate</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Your premium pass to the city&apos;s best nightlife. Discover events, venues, and experiences that hit different.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-[#ea6390] hover:border-[#ea6390]/30 hover:bg-[#ea6390]/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © 2026 NightGate. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Built for the night. Designed for the experience.
          </p>
        </div>
      </div>
    </footer>
  );
}
