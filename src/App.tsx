import React, { useState, useEffect } from 'react';
import AddJokeForm from './components/AddJokeForm';
import JokeList from './components/JokeList';
import { Joke } from './types/Joke';
import { fetchRandomJokes } from './api/api';

const App: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);

  useEffect(() => {
    fetchRandomJokes(5).then((fetchedJokes) => setJokes(fetchedJokes));
  }, []);

  const handleAddJoke = (joke: Joke) => {
    setJokes((prevJokes) => [...prevJokes, joke]);
  };

  return (
    <div>
      <JokeList jokes={jokes} />
      <AddJokeForm onAddJoke={handleAddJoke} />
    </div>
  );
};

export default App;
