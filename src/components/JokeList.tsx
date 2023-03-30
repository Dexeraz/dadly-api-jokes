import React from "react";
import { Joke } from "../types/Joke";

interface JokeListProps {
  jokes: Joke[];
}

const JokeList: React.FC<JokeListProps> = ({ jokes }) => {
  return (
    <div className="space-y-4">
      {jokes.map((joke) => (
        <div
          key={joke.id} // Make sure to use the unique key 
          className="p-4 bg-white dark:bg-gray-800 rounded shadow"
        >
          <p className="text-xl">{joke.joke}</p>
        </div>
      ))}
    </div>
  );
};

export default JokeList;
