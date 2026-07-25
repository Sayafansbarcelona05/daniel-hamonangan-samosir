import { supabase } from "@/lib/supabase";
import ProjectList from "./ProjectList";

type Project = {
  id: string;
  title: string;
  slug: string;
  project_type: "web" | "design";
  short_description: string;
  technologies: string[];
  cover_url: string | null;
};

export default async function Projects() {
  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, title, slug, project_type, short_description, technologies, cover_url"
    )
    .eq("published", true)
    .order("sort_order", { ascending: true });


  if (error) {
    return (
      <section className="mx-auto max-w-6xl py-20">
        <p className="text-red-300">
          Data proyek gagal dimuat: {error.message}
        </p>
      </section>
    );
  }


  return (
    <section
      id="project"
      className="mx-auto max-w-7xl scroll-mt-28 border-t border-white/10 py-20 sm:py-24"
    >
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5fa9e8]">
          Projects
        </p>

        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Beberapa karya yang telah saya bangun.
        </h2>
      </div>


      <ProjectList projects={(data ?? []) as Project[]} />

    </section>
  );
}