import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/meme")({
  component: MemGenerator,
});

type MemType = {
  title: string;
  url: string;
  author: string;
};

function MemGenerator() {
  const [mem, setMem] = useState<MemType>({ title: "", url: "", author: "" });

  async function gimme() {
    const res = await fetch("https://meme-api.com/gimme");
    if (!res.ok) {
      console.log(`error`);
    }
    const data: MemType = await res.json();
    setMem({ title: data.title, url: data.url, author: data.author });
    console.log(data.url);
  }

  return (
    <div
      id="alles"
      className="m-2 flex flex-col justify-center items-center text-center"
    >
      <h1 className="text-4xl font-bold m-2 mb-4">Meme Generator</h1>
      <button
        className="border-2 border-red-500 rounded-lg p-3 m-6 text-xl bg-slate-100 hover:drop-shadow-lg active:bg-slate-200"
        onClick={gimme}
      >
        Gimme meme
      </button>
      <img src={mem.url}></img>
      <div id="full_meme">
        <p className="font-semibold">{mem.title !== "" ? "Title:" : ""}</p>
        <p id="opis">
          {mem.title.toLowerCase() !== "me_irl" ? mem.title : "Me irl"}
        </p>
        <br />
        <p className="font-semibold">{mem.author !== "" ? "Author:" : ""}</p>
        <p>{mem.author}</p>
      </div>
    </div>
  );
}
