export default function Hero() {
  return (
    <section
      id="beranda"
      className="mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl flex-col justify-center py-20"
    >
      <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-[#5fa9e8]">
        WEB DEVELOPER · INDONESIA
      </p>

      <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.07em] sm:text-7xl lg:text-9xl">
        Saya Daniel,
        <br />
        membangun web yang
        <span className="block bg-gradient-to-r from-[#a50044] via-[#d92856] to-[#5fa9e8] bg-clip-text text-transparent">
          berkesan.
        </span>
      </h1>

      <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-6 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-base leading-relaxed text-white/65">
          Saya membuat pengalaman digital yang cepat, modern, dan mudah
          digunakan untuk personal brand maupun bisnis.
        </p>

        <a
          href="#proyek"
          className="group inline-flex w-fit items-center gap-3 text-sm font-semibold"
        >
          Lihat proyek pilihan
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#004d98] text-lg transition group-hover:-translate-y-1 group-hover:translate-x-1">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}