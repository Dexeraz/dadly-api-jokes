import axios from "axios";
import { Joke } from '../types/Joke';

const API_URL = "https://dad-jokes.p.rapidapi.com/random/joke";

export const fetchRandomJokes = async (count: number): Promise<Joke[]> => {
  const response = await axios.get(API_URL, {
    headers: {
      'X-RapidAPI-Key': 'env',
      'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
    },
    params: {
      count: count,
    },
  });

  const results = response.data.body;

  const jokes: Joke[] = results.map((result: any) => ({
    id: result._id,
    joke: `${result.setup} ${result.punchline}`,
  }));

  return jokes;
};
