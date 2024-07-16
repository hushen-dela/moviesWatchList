import { Button } from "@/components/ui/button";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/context/AuthContext";
import { RootState } from "@/store";
import { toggleMovieWatched } from "@/store/movieSlice";

export default function MovieDetails() {
  let { id } = useParams();
  const authDetails = useAuth();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) =>
    state.movie.users.find((user) => user.email === authDetails.user)
  );
  const localMoviePlayList = user?.playlists.find((playlist) =>
    playlist.movies.find((movie) => movie.imdbID === id)
  );
  const localMovie = localMoviePlayList?.movies.find(
    (movie) => movie.imdbID === id
  );
  const { data, error, isLoading } = useMovieDetails(id || "");
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Skeleton className="h-[450px] w-full rounded-xl" />
          </div>
          <div className="md:col-span-2 space-y-4">
            <div>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-[200px] my-2" />
            </div>
            <div className="prose max-w-none">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[200px] my-2" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-[200px] my-2" />
              <Skeleton className="h-12 w-[200px] my-2" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-2 gap-2 text-muted-foreground">
              <Skeleton className="h-4 w-[200px] my-2" />
              <Skeleton className="h-4 w-[200px] my-2" />
              <Skeleton className="h-4 w-[200px] my-2" />
              <Skeleton className="h-4 w-[200px] my-2" />
              <Skeleton className="h-4 w-[200px] my-2" />
              <Skeleton className="h-4 w-[200px] my-2" />
              <Skeleton className="h-4 w-[200px] my-2" />
              <Skeleton className="h-4 w-[200px] my-2" />
              <Skeleton className="h-4 w-[200px] my-2" />
              <Skeleton className="h-4 w-[200px] my-2" />
              <Skeleton className="h-4 w-[200px] my-2" />
              <Skeleton className="h-4 w-[200px] my-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  return (
    <div className="flex flex-col gap-4 py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={data.Poster}
            width={300}
            height={450}
            alt="Movie Poster"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:col-span-2 space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{data.Title}</h1>
            <p className="text-gray-500 text-lg">{data.Year}</p>
          </div>
          <div className="prose max-w-none">
            <p>{data.Plot}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                dispatch(
                  toggleMovieWatched({ email: authDetails.user!, imdbID: id! })
                );
              }}
            >
              {!localMovie?.isWatched ? "Mark as Watched" : "Mark as Unwatched"}
            </Button>
            {/* <Button variant="secondary">Remove from Watchlist</Button> */}
          </div>
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold">Ratings</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.Ratings.map((rating: { Source: string; Value: string }) => (
                <div key={rating.Source}>
                  <div className="font-medium">{rating.Source}</div>
                  <div className="text-muted-foreground">{rating.Value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold">Details</h2>
          <div className="grid grid-cols-2 gap-2 text-muted-foreground">
            <div>Director:</div>
            <div>{data.Director}</div>
            <div>Actors:</div>
            <div>{data.Actors}</div>
            <div>Runtime:</div>
            <div>{data.Runtime}</div>
            <div>Genre:</div>
            <div>{data.Genre}</div>
            <div>IMDB Rating:</div>
            <div>{data.imdbRating}</div>
            <div>Language:</div>
            <div>{data.Language}</div>
            <div>Country:</div>
            <div>{data.Country}</div>
            <div>Awards:</div>
            <div>{data.Awards}</div>
            <div>BoxOffice:</div>
            <div>{data.BoxOffice}</div>
            <div>Production:</div>
            <div>{data.Production}</div>
            <div>Website:</div>
            <div>{data.Website}</div>
            <div>Released:</div>
            <div>{data.Released}</div>
            <div>Rated:</div>
            <div>{data.Rated}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
