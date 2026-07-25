"use client";

import { useEffect, useRef, useState } from "react";

const interests = [
  "Web Development",
  "UI/UX Design",
  "Desain Grafis",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const leftAnimation = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-0 opacity-100 sm:translate-y-5 sm:opacity-0";

  const cardAnimation = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-0 opacity-100 sm:translate-y-5 sm:opacity-0";

  const tagsAnimation = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-0 opacity-100 sm:translate-y-3 sm:opacity-0";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="mx-auto max-w-6xl scroll-mt-28 border-t border-white/10 py-20 sm:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div
          className={`flex flex-col justify-between transition-all duration-700 ease-out ${leftAnimation}`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5fa9e8]">
              About Me
            </p>

            <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl">
              Berpikir kreatif.
              <span className="block bg-gradient-to-r from-[#a50044] to-[#5fa9e8] bg-clip-text text-transparent">
                Berkarya digital.
              </span>
            </h2>
          </div>

          <div className="mt-10 hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#a50044]/20 to-[#004d98]/20 p-6 lg:block">
            <p className="text-5xl font-black tracking-[-0.1em] text-white/90">
              DS.
            </p>

            <p className="mt-10 text-sm leading-6 text-white/60">
              Terus belajar, menciptakan, dan berkembang bersama teknologi.
            </p>
          </div>
        </div>

        <div
          className={`rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-sm transition-all duration-700 ease-out sm:p-8 lg:p-10 ${cardAnimation} ${
            isVisible ? "sm:delay-150" : ""
          }`}
        >
          <p className="text-xl font-semibold leading-snug tracking-[-0.03em] text-white sm:text-2xl">
            Saya percaya pengalaman digital yang baik lahir dari ide yang
            jelas, desain yang tepat, dan detail yang diperhatikan.
          </p>

          <div className="mt-8 space-y-5 border-t border-white/10 pt-7">
            <p className="text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              Saya Daniel Hamonangan Samosir, lulusan Sistem Informasi dari
              Universitas Gunadarma. Saya memiliki ketertarikan besar pada
              pengembangan web, UI/UX, dan desain grafis.
            </p>

            <p className="text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              Saya terbiasa belajar dengan cepat, dapat bekerja secara mandiri
              maupun kolaboratif, dan selalu bersemangat untuk mengembangkan
              kemampuan agar dapat memberi kontribusi nyata di industri
              teknologi.
            </p>
          </div>

          <div
            className={`mt-8 flex flex-wrap gap-2 transition-all duration-700 ${tagsAnimation} ${
              isVisible ? "sm:delay-300" : ""
            }`}
          >
            {interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-white/15 bg-[#090b12]/60 px-4 py-2 text-xs text-white/75 transition duration-300 hover:border-[#5fa9e8]/60 hover:text-white"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}