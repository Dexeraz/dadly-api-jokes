import React from "react";
import { Joke } from "../types/Joke";

interface JokeListProps {
  jokes: Joke[];
}

const JokeList: React.FC<JokeListProps> = ({ jokes }) => {
  return (
    <div>
      {jokes.map((joke) => (
        <div key={joke.id}>
          <p>{joke.joke}</p>
          {joke.url && <img src={joke.url} alt="Joke" />}
        </div>
      ))}
    </div>
  );
};

export default JokeList;
