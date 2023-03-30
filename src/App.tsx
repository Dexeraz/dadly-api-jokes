import React, { useState } from 'react';
import AddJokeForm from './components/AddJokeForm';
import JokeList from './components/JokeList';
import { Joke } from './types/Joke';

const App: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);

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
