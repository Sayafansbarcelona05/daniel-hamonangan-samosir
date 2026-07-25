const skills = [
  {
    name: "HTML",
    icon: "https://cdn.simpleicons.org/html5/E34F26",
  },
  {
    name: "CSS",
    icon: "https://cdn.simpleicons.org/css/1572B6",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
  },
  {
    name: "PHP",
    icon: "https://cdn.simpleicons.org/php/777BB4",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  {
    name: "React",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    name: "Next.js",
    icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
  },
  {
    name: "Figma",
    icon: "https://cdn.simpleicons.org/figma/F24E1E",
  },
  {
    name: "Canva",
    icon: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Canva_logo.svg",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#5fa9e8]">
              Keahlian
            </p>

            <h2 className="text-3xl font-bold tracking-[-0.05em] text-white sm:text-4xl">
              Teknologi yang
              <span className="block text-white/45">saya gunakan.</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
              Beberapa tools dan teknologi yang saya gunakan untuk membangun
              tampilan digital yang rapi, responsif, dan nyaman digunakan.
            </p>

            <div className="mt-7 flex items-center gap-3 text-xs text-white/35">
              <span className="h-2 w-2 rounded-full bg-[#a50044]" />
              Terus belajar dan berkembang
            </div>
          </div>

          <div className="border-y border-white/10">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`group flex items-center gap-4 py-5 transition duration-300 hover:pl-3 sm:gap-6 sm:py-6 ${
                  index !== skills.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <span className="w-7 text-xs font-medium text-white/25 sm:w-9">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 transition duration-300 group-hover:border-[#5fa9e8]/60 group-hover:bg-[#5fa9e8]/10">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className={
                      skill.name === "Canva"
                        ? "h-5 w-8 object-contain"
                        : "h-6 w-6 object-contain"
                    }
                  />
                </div>

                <span className="text-lg font-medium tracking-[-0.03em] text-white/70 transition duration-300 group-hover:text-white sm:text-xl">
                  {skill.name}
                </span>

                <span className="ml-auto text-sm text-white/20 transition duration-300 group-hover:text-[#5fa9e8]">
                  ↗
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}