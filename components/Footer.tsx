import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="footer-section"
      className="w-full relative z-10 pt-20 pb-8 mt-8 px-4 sm:px-6 md:px-10 lg:px-20"
    >
      {/* Top border glow */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-16" />

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-14">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <span className="text-white font-black text-sm">E</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">ElevateCV</span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed font-light max-w-[260px]">
            <em className="not-italic text-neutral-500">AI-powered resume intelligence</em> that
            tells you exactly what a recruiter sees — and how to change it.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-6">
            {[
              { href: "https://github.com/Ketoransile", Icon: FaGithub, label: "GitHub" },
              { href: "https://www.linkedin.com/in/abdi-sileshi-56710a2a6/", Icon: FaLinkedin, label: "LinkedIn" },
              { href: "https://x.com/abdi_sileshi", Icon: FaTwitter, label: "Twitter/X" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl border border-white/8 bg-white/3 flex items-center justify-center text-neutral-600 hover:text-white hover:border-white/15 hover:bg-white/6 transition-all duration-200"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-600 mb-5">
            Product
          </h3>
          <ul className="space-y-3">
            {[
              { href: "/about", label: "About" },
              { href: "/#howItWorks", label: "How it works" },
              { href: "/#upload-resume-form", label: "Analyze resume" },
            ].map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm text-neutral-600 hover:text-neutral-200 transition-colors duration-200 font-light"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-600 mb-5">
            Legal & Contact
          </h3>
          <ul className="space-y-3">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
            ].map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm text-neutral-600 hover:text-neutral-200 transition-colors duration-200 font-light"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <a
                href="mailto:abdisileshi123@gmail.com"
                className="text-sm text-violet-500/70 hover:text-violet-400 transition-colors duration-200 font-light"
              >
                abdisileshi123@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
        <span className="text-xs text-neutral-700 font-light">
          © {new Date().getFullYear()} ElevateCV. Built with care.
        </span>
        <span className="text-xs text-neutral-800 font-light italic">
          Helping candidates put their best foot forward.
        </span>
      </div>
    </footer>
  );
}
