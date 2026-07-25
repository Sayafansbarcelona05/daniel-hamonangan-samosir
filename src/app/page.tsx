import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen px-5 text-white sm:px-6 lg:px-10">
      <Navbar />

      <section
        id="home"
        className="mx-auto flex min-h-screen max-w-6xl scroll-mt-28 items-center py-28 sm:py-32"
      >
        <div className="w-full">
          <div className="page-enter page-enter-delay-1 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#a50044]" />

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5fa9e8]">
              Portofolio Pribadi
            </p>
          </div>

          <div className="mt-8 border-y border-white/10 py-10 sm:py-14">
            <h1 className="page-enter page-enter-delay-2 max-w-5xl text-5xl font-black leading-[0.86] tracking-[-0.075em] text-white sm:text-6xl md:text-7xl">
              Daniel Hamonangan
              <span className="block bg-gradient-to-r from-[#a50044] to-[#004d98] bg-clip-text text-transparent">
                Samosir.
              </span>
            </h1>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <p className="page-enter page-enter-delay-3 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
                  Lulusan Sistem Informasi dengan ketertarikan pada
                  pengembangan web, UI/UX, dan desain grafis. Saya senang
                  membangun pengalaman digital yang rapi, fungsional, dan mudah
                  digunakan.
                </p>

                <div className="page-enter page-enter-delay-4 mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <a
                    href="#project"
                    className="group inline-flex items-center gap-3 text-sm font-semibold text-white transition hover:text-[#5fa9e8]"
                  >
                    Lihat Project

                    <span className="text-lg text-[#004d98] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#a50044]">
                      ↗
                    </span>
                  </a>

                  <span className="h-4 w-px bg-white/15" />

                  <a
                    href="https://www.linkedin.com/in/danielhamonangansamosir"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-sm font-semibold text-white/65 transition hover:text-white"
                  >
                    <span className="font-bold text-[#5fa9e8]">in</span>
                    LinkedIn

                    <span className="text-lg text-[#004d98] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#a50044]">
                      ↗
                    </span>
                  </a>
                </div>
              </div>

              <div className="page-enter page-enter-delay-4 border-l border-white/10 pl-5 sm:pl-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a50044]">
                  Fokus Utama
                </p>

                <div className="mt-5 space-y-3 text-sm text-white/55">
                  <p>Web Development</p>
                  <p>UI / UX Design</p>
                  <p>Desain Grafis</p>
                </div>

                <div className="mt-9 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/30">
                  <span className="h-px w-8 bg-[#004d98]" />
                  Indonesia
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}