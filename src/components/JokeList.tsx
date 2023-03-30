import React from "react";
import { Joke } from "../types/Joke";

interface JokeListProps {
  jokes: Joke[];
  addToFavorites: (joke: Joke) => void;
}

const JokeList: React.FC<JokeListProps> = ({ jokes, addToFavorites }) => {
  return (
    <div className="space-y-4">
      {jokes.map((joke) => (
        <div
          key={joke.id}
          className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center"
        >
          <p className="text-xl">{joke.joke}</p>
          <button onClick={() => addToFavorites(joke)}>Add to favorites</button>
        </div>
      ))}
    </div>
  );
};

export default JokeList;
