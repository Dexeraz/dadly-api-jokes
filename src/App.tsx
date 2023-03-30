import React, { useState, useEffect } from 'react';
import AddJokeForm from './components/AddJokeForm';
import JokeList from './components/JokeList';
import { Joke } from './types/Joke';
import { fetchRandomJokes } from './api/api';

const App: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    fetchNewJokes();
  }, []);

  const handleAddJoke = (joke: Joke) => {
    setJokes((prevJokes) => [...prevJokes, joke]);
  };

  const fetchNewJokes = async () => {
    const newJokes = await fetchRandomJokes(5);
    setJokes(newJokes);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Dadly Jokes App</h1>
      <div className="w-full max-w-xl">
        <JokeList jokes={jokes} />
        <AddJokeForm onAddJoke={handleAddJoke} />
        <button
          onClick={fetchNewJokes}
          className="mt-4 py-2 px-4"
        >
          Fetch New Jokes
        </button>
      </div>
    </div>
  );
};

export default App;
