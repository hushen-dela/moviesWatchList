import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Movie, useMovieSearch } from "@/hooks/useMovieSearch";
import { Skeleton } from "../ui/skeleton";
import MovieCard from "../custom/MovieCard";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";
  const { data, error, isLoading } = useMovieSearch({ query, page });
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Welcome to Wishlist</CardTitle>
          <CardDescription className="text-balance leading-relaxed">
            Browse Movies and add them to your watchlist and share them with
            your friends.
            <br />
            Just click the + button to add a movie, the poster to search
            details, click ton tick mark the movie as watched.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex w-full  items-center space-x-2">
        <Input
          type="text"
          placeholder="Type here to search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          type="button"
          onClick={() => {
            navigate({
              pathname: "/app/home",
              search: createSearchParams({
                query: search.trim(),
                page: "1",
              }).toString(),
            });
          }}
        >
          Search
        </Button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col ">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex flex-col ">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex flex-col ">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex flex-col ">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex flex-col ">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      )}

      {error && <div>{error.message}</div>}
      {data?.Search && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {data.Search.map((movie: Movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Home;
