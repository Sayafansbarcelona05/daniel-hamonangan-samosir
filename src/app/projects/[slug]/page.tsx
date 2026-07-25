"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Download,
  Play,
} from "lucide-react";

type ProjectMedia = {
  id: string;
  media_url: string;
  media_type: string;
  alt_text: string | null;
  sort_order: number;
};

type Project = {
  id: string;
  title: string;
  slug: string;
  project_type: string;
  short_description: string;
  description: string;
  technologies: string[];
  created_at: string;
  download_url?: string | null;
  project_media: ProjectMedia[];
};

// Helper untuk cek apakah media ini video atau bukan.
// Menggunakan startsWith supaya tetap aman kalau value-nya
// "video", "video/mp4", "video/webm", dll.
function isVideo(mediaType: string | null | undefined) {
  return !!mediaType && mediaType.toLowerCase().startsWith("video");
}

export default function ProjectDetail({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = use(params);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    async function loadProject() {
      setLoading(true);

      const { data } = await supabase
        .from("projects")
        .select(`
          *,
          project_media (
            id,
            media_url,
            media_type,
            alt_text,
            sort_order
          )
        `)
        .eq("slug", slug)
        .single();

      if (data) {
        data.project_media?.sort(
          (a: ProjectMedia, b: ProjectMedia) =>
            a.sort_order - b.sort_order
        );

        setProject(data as Project);
      } else {
        setProject(null);
      }

      setCurrentImage(0);
      setLoading(false);
    }

    loadProject();
  }, [slug]);

  const images = useMemo(() => {
    return project?.project_media ?? [];
  }, [project]);

  function nextImage() {
    if (!images.length) return;

    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }

  function prevImage() {
    if (!images.length) return;

    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (!touchStartX.current || images.length <= 1) return;

    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchStartX.current - touchEndX;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }

    touchStartX.current = null;
  }

  if (loading) {
    return (
      <main className="flex h-screen items-center justify-center bg-[#07090f] text-white">
        Loading...
      </main>
    );
  }

  if (!project) {
    return (
      <main className="flex h-screen items-center justify-center bg-[#07090f] text-white">
        Project tidak ditemukan.
      </main>
    );
  }

  const activeMedia = images[currentImage];

  return (
    <main className="min-h-screen bg-[#07090f] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link
          href="/#project"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Kembali
        </Link>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_420px]">
          <div>
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-black"
            >
              {images.length > 0 ? (
                isVideo(activeMedia.media_type) ? (
                  <video
                    key={activeMedia.id}
                    src={activeMedia.media_url}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-[420px] w-full object-contain sm:h-[520px] lg:h-[620px]"
                  />
                ) : (
                  <img
                    src={activeMedia.media_url}
                    alt={activeMedia.alt_text ?? project.title}
                    className="h-[420px] w-full object-contain sm:h-[520px] lg:h-[620px]"
                  />
                )
              ) : (
                <div className="grid h-[420px] place-items-center text-white/40 sm:h-[520px] lg:h-[620px]">
                  No Image
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Gambar sebelumnya"
                    onClick={prevImage}
                    className="absolute left-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/60 backdrop-blur transition hover:bg-[#5fa9e8] hover:text-black md:grid"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    aria-label="Gambar berikutnya"
                    onClick={nextImage}
                    className="absolute right-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/60 backdrop-blur transition hover:bg-[#5fa9e8] hover:text-black md:grid"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}

              {images.length > 0 && (
                <div className="absolute bottom-6 left-6 rounded-full bg-black/70 px-4 py-2 text-xs backdrop-blur">
                  {currentImage + 1} / {images.length}
                </div>
              )}
            </div>

            {images.length > 0 && (
              <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    aria-label={`Pilih gambar ${index + 1}`}
                    onClick={() => setCurrentImage(index)}
                    className={`shrink-0 overflow-hidden rounded-2xl border transition ${
                      currentImage === index
                        ? "border-[#5fa9e8]"
                        : "border-white/10"
                    }`}
                  >
                    {isVideo(image.media_type) ? (
                      <video
                        src={image.media_url}
                        muted
                        playsInline
                        preload="metadata"
                        className="h-20 w-28 object-cover sm:h-24 sm:w-36"
                      />
                    ) : (
                      <img
                        src={image.media_url}
                        alt={image.alt_text ?? `Preview ${index + 1}`}
                        className="h-20 w-28 object-cover sm:h-24 sm:w-36"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="sticky top-8 h-fit rounded-3xl border border-white/10 bg-[#0d111a] p-8">
            <span className="inline-flex rounded-full border border-[#5fa9e8]/30 bg-[#5fa9e8]/10 px-4 py-2 text-xs uppercase tracking-widest text-[#5fa9e8]">
              {project.project_type}
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-6 text-base leading-8 text-white/65">
              {project.short_description}
            </p>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
              <Calendar size={18} className="text-[#5fa9e8]" />

              <div>
                <p className="text-xs text-white/40">Published</p>
                <p className="text-sm">
                  {new Date(project.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/40">
                Technologies
              </h3>

              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-[#5fa9e8] hover:text-[#5fa9e8]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              {project.download_url ? (
                <a
                  href={project.download_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#5fa9e8] px-6 py-4 font-semibold text-black transition hover:scale-[1.02]"
                >
                  <Download size={20} />
                  Download Project
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full rounded-2xl border border-white/10 px-6 py-4 text-white/40"
                >
                  Download Tidak Tersedia
                </button>
              )}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
                <p className="text-2xl font-bold">{images.length}</p>
                <p className="mt-1 text-xs text-white/50">Images</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
                <p className="text-2xl font-bold">
                  {project.technologies.length}
                </p>
                <p className="mt-1 text-xs text-white/50">Tech</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center">
                <p className="text-2xl font-bold">UI</p>
                <p className="mt-1 text-xs text-white/50">Design</p>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-20 rounded-[32px] border border-white/10 bg-[#0d111a] p-8 md:p-12">
          <span className="text-xs uppercase tracking-[0.35em] text-[#5fa9e8]">
            About Project
          </span>

          <h2 className="mt-4 text-4xl font-bold">Project Overview</h2>

          <div className="mt-8 max-w-4xl whitespace-pre-line text-[17px] leading-9 text-white/65">
            {project.description}
          </div>
        </section>

        <section className="mt-20">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-[#5fa9e8]">
              Gallery
            </span>

            <h2 className="mt-4 text-4xl font-bold">Project Preview</h2>
          </div>

          {images.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => {
                    setCurrentImage(index);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-[#111827] text-left"
                >
                  <div className="relative overflow-hidden bg-black">
                    {isVideo(image.media_type) ? (
                      <>
                        <video
                          src={image.media_url}
                          muted
                          playsInline
                          preload="metadata"
                          className="h-[320px] w-full object-cover duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 grid place-items-center bg-black/30">
                          <div className="grid h-14 w-14 place-items-center rounded-full bg-black/60 backdrop-blur transition group-hover:bg-[#5fa9e8] group-hover:text-black">
                            <Play size={22} className="ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <img
                        src={image.media_url}
                        alt={image.alt_text ?? `Preview ${index + 1}`}
                        className="h-[320px] w-full object-cover duration-700 group-hover:scale-110"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 duration-500 group-hover:opacity-100" />

                    <div className="absolute bottom-5 left-5 translate-y-6 opacity-0 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="rounded-full bg-[#5fa9e8] px-4 py-2 text-xs font-semibold text-black">
                        Preview {index + 1}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-white/10 p-12 text-center text-white/40">
              Belum ada gambar untuk project ini.
            </div>
          )}
        </section>

        <section className="mt-24 border-t border-white/10 py-10 text-center">
          <p className="text-white/40">
            © {new Date().getFullYear()} • {project.title}
          </p>
        </section>
      </div>
    </main>
  );
}