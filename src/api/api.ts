import axios from "axios";
import { Joke } from "../types/Joke";

const API_URL = "https://dad-jokes.p.rapidapi.com/random/joke";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchRandomJokes = async (count: number): Promise<Joke[]> => {
  const response = await axios.get(API_URL, {
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
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

