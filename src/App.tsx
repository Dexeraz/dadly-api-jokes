import React, { useState, useEffect } from "react";
import AddJokeForm from "./components/AddJokeForm";
import JokeList from "./components/JokeList";
import { Joke } from "./types/Joke";
import { fetchRandomJokes } from "./api/api";

const App: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Add this line

  useEffect(() => {
    fetchNewJokes();
  }, []);

  const handleAddJoke = (joke: Joke) => {
    setJokes((prevJokes) => [...prevJokes, joke]);
  };

  const fetchNewJokes = async () => {
    setLoading(true);
    try {
      console.log("Fetching new jokes...");
      const newJokes = await fetchRandomJokes(5);
      console.log("New jokes:", newJokes);
      setJokes(newJokes);
    } catch (error) {
      console.error("Error fetching jokes:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Dadly Jokes App</h1>
      <div className="w-full max-w-xl">
        <div className="flex justify-center	">
          {" "}
          {loading && <div className="spinner mt-4"></div>}
        </div>
        <JokeList jokes={jokes} />
        <AddJokeForm onAddJoke={handleAddJoke} />
        <div className="flex justify-end	">
          <button onClick={fetchNewJokes} className="mt-4 py-2 px-4">
            New Jokes
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
