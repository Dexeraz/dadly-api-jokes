import React, { useEffect, useState } from 'react';
import { Joke } from '../types/Joke';
import { fetchRandomJokes } from '../api/api';

const JokeList: React.FC = () => {
    const [jokes, setJokes] = useState<Joke[]>([]);
  
    useEffect(() => {
      fetchRandomJokes(5).then(setJokes);
    }, []);
  
    return (
      <div>
        {jokes.map((joke) => (
          <div key={joke.id}>
            <p>{joke.joke}</p>
            {joke.url && <img src={joke.url} alt="Joke" />}
          </div>
        ))}
      </div>
    );
  };
  
  export default JokeList;