import React, { useState, useEffect } from "react";
import AddJokeForm from "./components/AddJokeForm";
import JokeList from "./components/JokeList";
import { Joke } from "./types/Joke";
import { fetchRandomJokes } from "./api/api";

const App: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Add this line
  const [favorites, setFavorites] = useState<Joke[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

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

  const addToFavorites = (joke: Joke) => {
    if (favorites.find((fav) => fav.id === joke.id)) {
      alert("This joke is already in your favorites list.");
      return;
    }

    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, joke];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const editJoke = (updatedJoke: Joke) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.map((joke) =>
        joke.id === updatedJoke.id ? updatedJoke : joke
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const deleteJoke = (jokeToDelete: Joke) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter(
        (joke) => joke.id !== jokeToDelete.id
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Dadly Jokes App</h1>
      <div className="w-full max-w-xl">
        <div className="flex justify-center	">
          {" "}
          {loading && <div className="spinner mt-4"></div>}
        </div>
        <JokeList jokes={jokes} addToFavorites={addToFavorites} />
        <AddJokeForm onAddJoke={handleAddJoke} />
        <div className="flex justify-end	">
          <button onClick={fetchNewJokes} className="mt-4 py-2 px-4">
            New Jokes
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Favorite Jokes</h2>
        <JokeList
          jokes={favorites}
          onEditJoke={editJoke}
          onDeleteJoke={deleteJoke}
        />
      </div>
    </div>
  );
};

export default App;
