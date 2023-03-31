import { Joke } from "./../types/Joke";

export const addToFavorites = (joke: Joke, favorites: Joke[]) => {
  if (favorites.find((fav) => fav.id === joke.id)) {
    alert("This joke is already in your favorites list.");
    return favorites;
  }

  const newFavorites = [...favorites, joke];
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  return newFavorites;
};

export const editJoke = (updatedJoke: Joke, favorites: Joke[]) => {
  const newFavorites = favorites.map((joke) =>
    joke.id === updatedJoke.id ? updatedJoke : joke
  );
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  return newFavorites;
};

export const deleteJoke = (jokeToDelete: Joke, favorites: Joke[]) => {
  const newFavorites = favorites.filter((joke) => joke.id !== jokeToDelete.id);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  return newFavorites;
};
