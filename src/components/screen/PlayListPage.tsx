import { useAuth } from "@/context/AuthContext";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useParams } from "react-router-dom";
import MovieCard from "../custom/MovieCard";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { updatePlaylist } from "@/store/movieSlice";

const PlayListPage = () => {
  const { id } = useParams();
  const authDetails = useAuth();
  const user = useSelector((state: RootState) =>
    state.movie.users.find((user) => user.email === authDetails.user)
  );

  const playlist = user?.playlists.find((playlist) => playlist.id === id);
  const { movies, name, desc } = playlist || {};
  const [open, setOpen] = useState(false);
  const [watchListName, setWatchListName] = useState(name);
  const [watchlistDesc, setWatchlistDesc] = useState(desc);
  const dispatch = useDispatch();

  useEffect(() => {
    const playlist = user?.playlists.find((playlist) => playlist.id === id);
    if (playlist) {
      setWatchListName(playlist.name);
      setWatchlistDesc(playlist.desc);
    }
  }, [id]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex w-full  items-center space-x-2 justify-between">
        <h1 className="text-3xl font-bold">{name}</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>WatchLists</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <Input
              id="name"
              value={watchListName}
              onChange={(e) => setWatchListName(e.target.value)}
              className="w-full"
              placeholder="Playlist Name"
            />
            <Textarea
              placeholder="Playlist Description"
              onChange={(e) => setWatchlistDesc(e.target.value)}
            >
              {watchlistDesc}
            </Textarea>

            <DialogFooter>
              <Button
                type="button"
                onClick={() => {
                  dispatch(
                    updatePlaylist({
                      playlist: watchListName!,
                      desc: watchlistDesc!,
                      email: authDetails.user!,
                      playlistId: id!,
                    })
                  );

                  setOpen(false);
                }}
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {desc && desc != "" && (
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">About this WatchList</CardTitle>
            <CardDescription className="text-balance leading-relaxed">
              {desc}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {movies?.map((movie: any) => (
          <MovieCard key={movie.imdbID} movie={movie} inWatchList={true} />
        ))}
      </div>
    </main>
  );
};
export default PlayListPage;
