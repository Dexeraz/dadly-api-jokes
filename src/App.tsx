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
      //console.log("Fetching new jokes...");
      const newJokes = await fetchRandomJokes(5);
      //console.log("New jokes:", newJokes);
      setJokes(newJokes);
    } catch (error) {
      //console.error("Error fetching jokes:", error);
    }
    setLoading(false);
  };
  const handleNewJokesClick = async () => {
    setLoading(true);
    await fetchNewJokes();
    };
    
    return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold mb-8">Dadly Jokes App</h1>
    <div className="w-full max-w-xl">
    {loading && <LoadingIndicator />}
    <JokeList jokes={jokes} addToFavorites={(joke) => setFavorites(addToFavorites(joke, favorites))} />
    <AddJokeForm onAddJoke={handleAddJoke} />
    <div className="flex justify-end">
    <button onClick={handleNewJokesClick} className="mt-4 py-2 px-4">
    New Jokes
    </button>
    </div>
    <h2 className="text-2xl font-bold mb-4">Favorite Jokes</h2>
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
