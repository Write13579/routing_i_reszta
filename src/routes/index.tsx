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
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <h1 className="flex items-center justify-center text-red">
        Input your pokemon!
      </h1>
      <input
        type="text"
        onChange={(e) => setPokemon(e.target.value)}
        value={pokemon}
      />
      <button onClick={search}>search</button>

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
