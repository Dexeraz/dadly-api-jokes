import React, { useState, useEffect } from "react";
import AddJokeForm from "./components/AddJokeForm";
import JokeList from "./components/JokeList";
import { Joke } from "./types/Joke";
import { fetchRandomJokes } from "./api/api";
import { addToFavorites, editJoke, deleteJoke } from "./helpers/helpers";
import LoadingIndicator from "./components/LoadingIndicator";

const App: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Joke[]>(() => {
    const savedFavorites = sessionStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleAddJoke = (joke: Joke) => {
    setJokes((prevJokes) => [...prevJokes, joke]);
  };

  const fetchNewJokes = async () => {
    setLoading(true);
    try {
      const newJokes = await fetchRandomJokes(3);
      setJokes(newJokes);
    } catch (error) {}
    setLoading(false);
  };
  const handleNewJokesClick = async () => {
    setLoading(true);
    await fetchNewJokes();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Dadly Jokes App</h1>
      <h3 className="text-1xl text-slate-600 mb-8">The best dad jokes</h3>
      <div className="w-full max-w-xl">
        {loading && <LoadingIndicator />}
        <JokeList
          jokes={jokes}
          addToFavorites={(joke) =>
            setFavorites(addToFavorites(joke, favorites))
          }
        />
        <div className="flex justify-center">
          <button onClick={handleNewJokesClick} className="mt-4 py-2 px-4">
            🎲 Jokes
          </button>
        </div>
        <div className="mt-4 mb-8">
          <AddJokeForm onAddJoke={handleAddJoke} />
        </div>
        {favorites.length > 0 && (
          <div className="mt-4 mb-8">
            <h2 className="flex text-2xl font-bold justify-center">
              Favorite Jokes
            </h2>
          </div>
        )}

        <JokeList
          jokes={favorites}
          onEditJoke={(joke) => setFavorites(editJoke(joke, favorites))}
          onDeleteJoke={(joke) => setFavorites(deleteJoke(joke, favorites))}
        />
      </div>
    </div>
  );
};

export default App;
