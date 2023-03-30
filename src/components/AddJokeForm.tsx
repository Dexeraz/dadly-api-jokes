import React, { useState } from "react";
import { Joke } from "../types/Joke";

interface AddJokeFormProps {
  onAddJoke: (joke: Joke) => void;
}

const AddJokeForm: React.FC<AddJokeFormProps> = ({ onAddJoke }) => {
  const [joke, setJoke] = useState<Joke>({
    id: 0,
    joke: "",
    url: "",
  });

  const handleJokeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJoke((prevJoke) => ({
      ...prevJoke,
      joke: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddJoke(joke);
    setJoke({
      id: 0,
      joke: "",
      url: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={joke.joke} onChange={handleJokeChange} />
      <button type="submit">Add Joke</button>
    </form>
  );
};

export default AddJokeForm;
