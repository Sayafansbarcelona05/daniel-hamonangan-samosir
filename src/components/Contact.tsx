import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";

const contactInfo = {
  email: "Danielsamosir0501@gmail.com",
  whatsapp: "6287728637231",
  github: "https://github.com/Sayafansbarcelona05",
  linkedin: "https://www.linkedin.com/in/danielhamonangansamosir",
};

export default function Contact() {
  const whatsappMessage = encodeURIComponent(
    "Halo Daniel, saya ingin berdiskusi mengenai project."
  );

  return (
    <section id="contact" className="px-5 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-[#a50044]" />

          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#004d98]">
            Kontak
          </p>
        </div>

        <div className="border-y border-white/10 py-10 sm:py-14">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <h2 className="max-w-3xl text-4xl font-bold leading-[0.94] tracking-[-0.07em] text-white sm:text-5xl lg:text-6xl">
                Mari buat sesuatu
                <span className="block text-[#004d98]">yang berarti.</span>
              </h2>

              <p className="mt-7 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
                Jika Anda punya project, ide, atau ingin berkolaborasi, jangan
                ragu untuk menghubungi saya.
              </p>
            </div>

            <div className="flex flex-col justify-end">
              <a
                href={`mailto:${contactInfo.email}`}
                className="group border-t border-white/10 py-5 transition hover:border-[#004d98]"
              >
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <Mail
                      size={18}
                      className="shrink-0 text-[#004d98] transition group-hover:text-[#a50044]"
                    />

                    <div>
                      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/35">
                        Email
                      </p>

                      <p className="text-base font-medium text-white/80 sm:text-lg">
                        {contactInfo.email}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-white/25 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#004d98]"
                  />
                </div>
              </a>

              <a
                href={`https://wa.me/${contactInfo.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="group border-y border-white/10 py-5 transition hover:border-[#004d98]"
              >
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <MessageCircle
                      size={18}
                      className="shrink-0 text-[#004d98] transition group-hover:text-[#a50044]"
                    />

                    <div>
                      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/35">
                        WhatsApp
                      </p>

                      <p className="text-base font-medium text-white/80 sm:text-lg">
                        Mulai percakapan
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-white/25 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#004d98]"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            Temukan saya juga di
          </p>

          <div className="flex items-center gap-6">
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-sm font-medium text-white/55 transition hover:text-white"
            >
              GitHub

              <ArrowUpRight
                size={15}
                className="text-[#004d98] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <span className="h-4 w-px bg-[#a50044]/70" />

            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-sm font-medium text-white/55 transition hover:text-white"
            >
              LinkedIn

              <ArrowUpRight
                size={15}
                className="text-[#004d98] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
