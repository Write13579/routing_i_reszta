import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/jokes")({
  component: About,
});

function About() {
  type JokeType = {
    category: string;
    setup?: string;
    delivery?: string;
    joke?: string;
  };

  const url = "https://v2.jokeapi.dev/joke/Dark,Pun,Spooky";
  const [joke, setjoke] = useState("");

  async function search() {
    const res = await fetch(url);
    if (!res.ok) {
      console.log("error");
    }
    const data: JokeType = await res.json();
    if (data.joke) {
      setjoke(data.joke);
    } else if (data.setup && data.delivery) {
      setjoke(data.setup + " " + data.delivery);
    } else {
      setjoke("error");
    }
  }

  return (
    <>
      <div
        id="alles"
        className="p-4 flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-4xl font-bold mb-8">JOKE GENERATOR</h1>
        <button
          id="search"
          className="border-2 border-red-800 rounded-lg p-4 m-2 font-semibold bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
          onClick={search}
        >
          search
        </button>
        <p className="m-6 drop-shadow-md text-2xl border-b-2 border-red-600 w-20">
          joke:
        </p>
        <p className="text-xl drop-shadow-lg">{joke}</p>
      </div>
    </>
  );
}
