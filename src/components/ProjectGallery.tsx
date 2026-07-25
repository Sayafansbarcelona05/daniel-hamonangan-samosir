"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

type Image = {
  id: string;
  media_url: string;
  alt_text: string | null;
};

type Props = {
  title: string;
  images: Image[];
  downloadUrl?: string | null;
};

export default function ProjectGallery({
  title,
  images,
  downloadUrl,
}: Props) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-[#111827] p-10 text-center text-white/40">
        No Image
      </div>
    );
  }

  const current = images[active];

  function next() {
    setActive((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }

  function prev() {
    setActive((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }

  return (
    <div className="space-y-5">

      {/* IMAGE */}

      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#090b12]">

        <img
          src={current.media_url}
          alt={current.alt_text ?? title}
          className="h-[520px] w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>

        {/* LEFT */}

        <button
          onClick={prev}
          className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-black/40
          backdrop-blur
          transition
          hover:bg-[#5fa9e8]
          hover:text-black
          "
        >
          <ChevronLeft size={22}/>
        </button>

        {/* RIGHT */}

        <button
          onClick={next}
          className="
          absolute
          right-5
          top-1/2
          -translate-y-1/2
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-black/40
          backdrop-blur
          transition
          hover:bg-[#5fa9e8]
          hover:text-black
          "
        >
          <ChevronRight size={22}/>
        </button>

        {/* COUNTER */}

        <div
          className="
          absolute
          bottom-5
          right-5
          rounded-full
          bg-black/50
          px-4
          py-2
          text-sm
          backdrop-blur
          "
        >
          {active + 1} / {images.length}
        </div>

      </div>

      {/* THUMBNAILS */}

      <div
        className="
        flex
        gap-3
        overflow-x-auto
        pb-2
        "
      >

        {images.map((image,index)=>(

          <button
            key={image.id}
            onClick={()=>setActive(index)}
            className={`
            relative
            h-24
            w-40
            shrink-0
            overflow-hidden
            rounded-2xl
            border
            transition

            ${
              active===index
                ? "border-[#5fa9e8]"
                : "border-white/10 hover:border-white/40"
            }
            `}
          >

            <img
              src={image.media_url}
              className="h-full w-full object-cover"
            />

            {active===index && (

              <div
                className="
                absolute
                inset-0
                ring-2
                ring-[#5fa9e8]
                "
              />

            )}

          </button>

        ))}

      </div>

      {/* DOWNLOAD */}

      {downloadUrl && (

        <a
          href={downloadUrl}
          target="_blank"
          className="
          inline-flex
          items-center
          gap-3
          rounded-full
          bg-[#5fa9e8]
          px-6
          py-4
          font-semibold
          text-black
          transition
          hover:scale-105
          "
        >
          <Download size={18}/>
          Download File
        </a>

      )}

    </div>
  );
}