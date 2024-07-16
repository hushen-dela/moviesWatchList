import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // Replace with your OMDB API key

export type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
  isWatched?: boolean;
};

const fetchMovies = async (params: { query: string; page: string }) => {
  const { query, page } = params;
  const { data } = await axios.get(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`
  );
  return data;
};

export const useMovieSearch = (params: { query: string; page: string }) => {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => fetchMovies(params),
  });
};
