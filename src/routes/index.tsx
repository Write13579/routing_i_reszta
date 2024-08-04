import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  type pokeType = {
    name: string;
    id: number;
    types: { type: { name: string } }[];
  };

  const [pokemon, setPokemon] = useState<string>("");
  const [pokeInfos, setPokeInfos] = useState<pokeType>({
    name: "",
    id: 0,
    types: [],
  });
  const [blad, setBlad] = useState(false);
  async function search() {
    if (pokemon.trim() !== "") {
      const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

      const response = await fetch(url); //przed kazdym promise ma byc await
      if (!response.ok) {
        console.log("blad");
        setBlad(true);
      }
      const data: pokeType = await response.json(); //przed kazdym promise ma byc await
      setBlad(false);
      setPokeInfos({
        name: data.name,
        id: data.id,
        types: data.types,
      });
    } else {
      setBlad(true);
    }
    console.log(blad);
  }

  return (
    <div id="alles" className="flex flex-col justify-center items-center">
      {/* <h3>Welcome Home!</h3> */}
      <h1 className="text-3xl font-bold m-3">Input your pokemon!</h1>
      <input
        className="border border-red-700 border-b-2 rounded-lg bg-gray-100 m-8 p-2"
        type="text"
        onChange={(e) => setPokemon(e.target.value)}
        value={pokemon}
      />
      <button
        className="border border-black p-2 rounded-xl mb-8 hover:bg-gray-50 active:bg-gray-100"
        onClick={search}
      >
        search
      </button>

      <br />
      <br />
      <p>Your Pokemon: {!blad ? pokeInfos.name : "does not exist"}</p>
      <p>Your Pokemon's id: {!blad ? pokeInfos.id : "error"}</p>
      <p>
        Types:{" "}
        {!blad
          ? pokeInfos.types.map((type, index) => (
              <span key={index}>{type.type.name} </span>
            ))
          : "error"}
      </p>
    </div>
  );
}
