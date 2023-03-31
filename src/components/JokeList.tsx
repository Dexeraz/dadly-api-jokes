import React from "react";
import { Joke } from "../types/Joke";
import { useState } from "react";

interface JokeListProps {
  jokes: Joke[];
  addToFavorites?: (joke: Joke) => void;
  onEditJoke?: (joke: Joke) => void;
  onDeleteJoke?: (joke: Joke) => void;
}

const JokeList: React.FC<JokeListProps> = ({
  jokes,
  addToFavorites,
  onEditJoke,
  onDeleteJoke,
}) => {
  const [editing, setEditing] = useState<Record<string, boolean>>({});

  const handleEditClick = (joke: Joke) => {
    setEditing((prevEditing) => ({ ...prevEditing, [joke.id]: true }));
  };

  const handleSaveClick = (joke: Joke, newText: string) => {
    onEditJoke && onEditJoke({ ...joke, joke: newText });
    setEditing((prevEditing) => ({ ...prevEditing, [joke.id]: false }));

  };

  return (
    <div className="space-y-4">
      {jokes.map((joke) => (
        <div
          key={joke.id}
          className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center"
        >
          {editing[joke.id] ? (
            <input
              type="text"
              defaultValue={joke.joke}
            />
          ) : (
            <p className="text-xl">{joke.joke}</p>
          )}
          <div>
            {onEditJoke && (
              <button
                onClick={() =>
                  editing[joke.id]
                    ? handleSaveClick(joke, joke.joke)
                    : handleEditClick(joke)
                }
              >
                {editing[joke.id] ? "Save" : "✏️"}
              </button>
            )}
            {onDeleteJoke && (
              <button onClick={() => onDeleteJoke(joke)}>❌</button>
            )}
            {addToFavorites && (
              <button onClick={() => addToFavorites(joke)}>⭐</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JokeList;
