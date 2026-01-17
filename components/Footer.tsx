import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="footer-section"
      className="w-full  text-gray-300 pt-32 pb-6 mt-16 py-4  px-4 sm:px-6 md:px-10  lg:px-20"
    >
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6 md:gap-20 lg:gap-32">
        {/* Brand and Description */}
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-white mb-2">
            ElevateCV
          </h2>
          <p className="text-sm leading-relaxed  text-neutral-400">
            Empower your job search with smart, AI-driven resume analysis. Get
            actionable feedback, keyword matching, and job-specific optimization
            in seconds.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full">
          <h3 className="text-lg md:text-2xl font-semibold text-white mb-2">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="w-full">
          <h3 className="text-lg md:text-2xl font-semibold text-white mb-2">
            Connect With Us
          </h3>
          <p className="text-sm mb-4 text-neutral-400">
            Have questions? Email us at{" "}
            <a href="mailto:abdisileshi123@gmail.com" className="underline">
              abdisileshi123@gmail.com
            </a>
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/Ketoransile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-xl hover:text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/abdi-sileshi-56710a2a6/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-xl hover:text-white" />
            </a>
            <a
              href="https://x.com/abdi_sileshi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-xl hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} ElevateCV. All rights reserved.
      </div>
    </footer>
  );
}
