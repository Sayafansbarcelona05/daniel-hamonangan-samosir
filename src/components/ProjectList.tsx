"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, LayoutGrid, List as ListIcon, X } from "lucide-react";

type Project = {
  id: string;
  title: string;
  slug: string;
  project_type: "web" | "design";
  short_description: string;
  technologies: string[];
  cover_url: string | null;
};

type ViewMode = "grid" | "list";

// Helper: pastikan selalu berupa array, walaupun data dari Supabase
// ternyata null, undefined, atau bukan array (misal string biasa).
function toTechArray(value: unknown): string[] {
  return Array.isArray(value) ? value : [];
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");
  const [view, setView] = useState<ViewMode>("grid");

  const technologies = useMemo(() => {
    const list = projects.flatMap((project) => toTechArray(project.technologies));
    return ["All", ...Array.from(new Set(list))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return projects.filter((project) => {
      const techList = toTechArray(project.technologies);

      const text = [
        project.title,
        project.short_description,
        project.project_type,
        ...techList,
      ]
        .join(" ")
        .toLowerCase();

      const matchSearch = keyword === "" || text.includes(keyword);
      const matchTech =
        selectedTech === "All" || techList.includes(selectedTech);

      return matchSearch && matchTech;
    });
  }, [projects, search, selectedTech]);

  return (
    <div className="relative z-10">
      {/* FILTER BAR */}
      <div className="relative z-20 mb-12 rounded-[32px] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* SEARCH */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari project..."
              className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-11 pr-11 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#5fa9e8]"
            />
            {search !== "" && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* TECH FILTER */}
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white outline-none lg:w-56"
          >
            {technologies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* VIEW TOGGLE — segmented icon control */}
          <div className="flex shrink-0 gap-1 rounded-2xl border border-white/10 bg-black/20 p-1">
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-label="Tampilan grid"
              aria-pressed={view === "grid"}
              className={`flex flex-1 items-center justify-center rounded-xl px-4 py-3 transition lg:flex-none ${
                view === "grid"
                  ? "bg-[#5fa9e8] text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-label="Tampilan list"
              aria-pressed={view === "list"}
              className={`flex flex-1 items-center justify-center rounded-xl px-4 py-3 transition lg:flex-none ${
                view === "list"
                  ? "bg-[#5fa9e8] text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredProjects.length === 0 && (
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-10 text-center text-white/50">
          Tidak ada project yang ditemukan.
        </div>
      )}

      {/* PROJECT CONTENT */}
      {filteredProjects.length > 0 && (
        <div
          className={
            view === "grid"
              ? "grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
              : "flex flex-col gap-5"
          }
        >
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`group overflow-hidden rounded-[32px] border border-white/10 bg-[#090b12] transition hover:border-[#5fa9e8]/40 ${
                view === "list" ? "md:flex" : ""
              }`}
            >
              {/* IMAGE */}
              <div
                className={`relative overflow-hidden bg-black ${
                  view === "list"
                    ? "aspect-video md:w-[360px] md:shrink-0"
                    : "aspect-[16/10]"
                }`}
              >
                {project.cover_url ? (
                  <img
                    src={project.cover_url}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-white/40">
                    No Preview
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <span className="font-mono text-xs text-[#5fa9e8]/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-white/20 bg-black/50 px-4 py-1.5 text-xs uppercase text-white backdrop-blur">
                    {project.project_type}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-2xl font-bold tracking-tight">
                  {project.title}
                </h3>

                <div className="mt-3 h-px w-10 bg-[#5fa9e8]/60" />

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {project.short_description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {toTechArray(project.technologies).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/70"
                    >
                      #{item}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#5fa9e8] px-6 py-3 text-sm font-semibold text-black transition hover:translate-x-1"
                >
                  Lihat Project
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}