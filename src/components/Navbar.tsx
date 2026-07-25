"use client";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Project", href: "#project" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed left-0 top-5 z-[100] w-full px-4 sm:px-6">
      <nav className="island-reveal mx-auto hidden h-16 max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[#090b12]/90 px-6 shadow-[0_12px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl md:flex">
        <a
          href="#home"
          className="shrink-0 text-lg font-black tracking-[-0.12em] text-white"
        >
          DS<span className="text-[#a50044]">.</span>
        </a>

        <div className="flex items-center gap-5 text-xs text-white/65 lg:gap-7 lg:text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors duration-300 hover:text-[#5fa9e8]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="ml-4 shrink-0 rounded-full bg-gradient-to-r from-[#a50044] to-[#004d98] px-4 py-2 text-xs font-bold text-white transition duration-300 hover:scale-105"
        >
          Hire Me
        </a>
      </nav>

      <details className="island-reveal group mx-auto max-w-md md:hidden">
        <summary className="flex h-16 cursor-pointer list-none items-center justify-between rounded-full border border-white/10 bg-[#090b12]/90 px-5 text-white shadow-[0_12px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-500 group-open:rounded-b-none [&::-webkit-details-marker]:hidden">
          <span
            onClick={(e) => {
              e.stopPropagation();
              window.location.hash = "home";
            }}
            className="text-lg font-black tracking-[-0.12em]"
          >
            DS<span className="text-[#a50044]">.</span>
          </span>

          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-lg">
            <span className="group-open:hidden">☰</span>
            <span className="hidden group-open:block">×</span>
          </span>
        </summary>

        <div className="grid grid-rows-[0fr] overflow-hidden rounded-b-[2rem] border-x border-b border-white/10 bg-[#090b12]/95 transition-[grid-template-rows] duration-500 group-open:grid-rows-[1fr]">
          <div className="min-h-0 overflow-hidden">
            <div className="border-t border-white/10 px-5 pb-5 pt-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-2xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-[#5fa9e8]"
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href="#contact"
                  className="mt-2 rounded-2xl bg-gradient-to-r from-[#a50044] to-[#004d98] px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </details>
    </header>
  );
}