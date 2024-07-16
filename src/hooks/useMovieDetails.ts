import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // Replace with your OMDB API key

export type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
};

const fetchMovieDetails = async (id: string) => {
  const { data } = await axios.get(
    `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
  );
  return data;
};

export const useMovieDetails = (id: string) => {
  return useQuery({
    queryKey: ["moviesDetails", id],
    queryFn: () => fetchMovieDetails(id),
  });
};
