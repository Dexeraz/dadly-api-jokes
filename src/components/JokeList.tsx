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
  const [editedText, setEditedText] = useState<Record<string, string>>({});

  const handleEditClick = (joke: Joke) => {
    setEditing((prevEditing) => ({ ...prevEditing, [joke.id]: true }));
  };

  const handleSaveClick = (joke: Joke) => {
    if (editedText[joke.id]) {
      onEditJoke && onEditJoke({ ...joke, joke: editedText[joke.id] });
    }
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
            <textarea
              defaultValue={joke.joke}
              onChange={(e) =>
                setEditedText((prev) => ({
                  ...prev,
                  [joke.id]: e.target.value,
                }))
              }
              className="w-full h-24 p-2 text-lg bg-white dark:bg-gray-800 rounded shadow flex items-center justify-between"
            />
          ) : (
            <p className="text-xl">{joke.joke}</p>
          )}
          <div className="flex gap-2">
            {onEditJoke && (
              <button
                onClick={() =>
                  editing[joke.id]
                    ? handleSaveClick(joke)
                    : handleEditClick(joke)
                }
              >
                {editing[joke.id] ? "✅" : "✏️"}
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
