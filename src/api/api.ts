import axios from "axios";
import { Joke } from '../types/Joke';

const API_URL = "https://icanhazdadjoke.com";

export const fetchRandomJokes = async (count: number): Promise<Joke[]> => {
  const response = await axios.get(`${API_URL}/search`, {
    params: {
      limit: count,
    },
    headers: {
      Accept: 'application/json',
    },
  });

  return response.data.results.map((result: any, index: number) => ({
    id: index, 
    joke: result.joke,
  }));
};
