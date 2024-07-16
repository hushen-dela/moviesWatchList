import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  isWatched: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  movies: Movie[];
  desc: string;
}

interface User {
  email: string;
  playlists: Playlist[];
}

interface MovieState {
  users: User[];
}

const initialState: MovieState = {
  users: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      if (!state.users.find((user) => user.email === action.payload)) {
        state.users.push({ email: action.payload, playlists: [] });
      }
    },
    addPlaylist: (
      state,
      action: PayloadAction<{
        email: string;
        playlist: string;
        movie: Movie;
        desc: string;
      }>
    ) => {
      const user = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (user) {
        if (
          !user.playlists.find(
            (playlist) => playlist.name === action.payload.playlist
          )
        ) {
          // create new playlist
          // get max id form existing playlists
          let maxId = 0;
          user.playlists.forEach((playlist) => {
            if (parseInt(playlist.id) > maxId) {
              maxId = parseInt(playlist.id);
            }
          });
          maxId++;
          // add new playlist
          user.playlists.push({
            id: maxId.toString(),
            name: action.payload.playlist,
            desc: action.payload.desc,
            movies: [action.payload.movie],
          });
        }
      }
    },
    updatePlaylist: (
      state,
      action: PayloadAction<{
        email: string;
        playlistId: string;
        playlist: string;
        desc: string;
      }>
    ) => {
      const user = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (user) {
        const playlist = user.playlists.find(
          (playlist) => playlist.id === action.payload.playlistId
        );
        if (playlist) {
          playlist.name = action.payload.playlist;
          playlist.desc = action.payload.desc;
        }
      }
    },

    addToPlaylist: (
      state,
      action: PayloadAction<{ email: string; playlistId: string; movie: Movie }>
    ) => {
      const user = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (user) {
        const playlist = user.playlists.find(
          (playlist) => playlist.id === action.payload.playlistId
        );
        if (playlist) {
          playlist.movies.push(action.payload.movie);
        }
      }
    },
    removeFromPlaylist: (
      state,
      action: PayloadAction<{
        email: string;
        playlistId: string;
        imdbID: string;
      }>
    ) => {
      const user = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (user) {
        const playlist = user.playlists.find(
          (playlist) => playlist.id === action.payload.playlistId
        );
        if (playlist) {
          playlist.movies = playlist.movies.filter(
            (movie) => movie.imdbID !== action.payload.imdbID
          );
        }
      }
    },
    toggleMovieWatched: (
      state,
      action: PayloadAction<{ email: string; imdbID: string }>
    ) => {
      const user = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (user) {
        user.playlists.forEach((playlist) => {
          playlist.movies.forEach((movie) => {
            if (movie.imdbID === action.payload.imdbID) {
              movie.isWatched = !movie.isWatched;
            }
          });
        });
      }
    },
  },
});

export const {
  addUser,
  addPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  toggleMovieWatched,
  updatePlaylist,
} = movieSlice.actions;
export default movieSlice.reducer;
