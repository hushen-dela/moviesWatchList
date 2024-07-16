import { Card, CardContent } from "@/components/ui/card";
import { BookmarkCheck, BookmarkPlus, BookmarkX } from "lucide-react";
import { Movie } from "@/hooks/useMovieSearch";
import { Link } from "react-router-dom";
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
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
  addPlaylist,
  addToPlaylist,
  Playlist,
  toggleMovieWatched,
} from "@/store/movieSlice";
import { Textarea } from "../ui/textarea";

type Props = {
  movie: Movie;
  inWatchList?: boolean;
};

export default function MovieCard({ movie, inWatchList }: Props) {
  const authDetails = useAuth();
  const user = useSelector((state: RootState) =>
    state.movie.users.find((user) => user.email === authDetails.user)
  );
  const [tab, setTab] = useState(
    user?.playlists && user.playlists.length > 0 ? "select" : "create"
  );
  const onTabChange = (value: string) => setTab(value);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [desc, setDesc] = useState("");
  // find current Movie is in any playlist
  const currentMovie = user?.playlists?.find((playlist: Playlist) =>
    playlist.movies.find((m) => m.imdbID === movie.imdbID)
  );
  useEffect(() => {
    if (user?.playlists && user.playlists.length > 0) {
      setTab("select");
    }
  }, [movie]);

  return (
    <Card className="w-full  rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <Link to={`/app/movie/${movie.imdbID}`}>
          <img
            src={movie.Poster}
            alt={movie.Title + " poster"}
            className="object-cover w-full h-96 "
          />
        </Link>
        {!movie.isWatched ? (
          <BookmarkX
            className="absolute top-0 left-1 h-10 w-10"
            fill={"gray"}
            stroke="white"
            strokeWidth={1}
            style={{ cursor: "pointer", padding: 0, margin: 0 }}
            onClick={() => {
              dispatch(
                toggleMovieWatched({
                  email: authDetails.user!,
                  imdbID: movie.imdbID,
                })
              );
            }}
          />
        ) : (
          <BookmarkCheck
            className="absolute top-0 left-1 h-10 w-10"
            fill={"green"}
            stroke="white"
            strokeWidth={1}
            style={{ cursor: "pointer", padding: 0, margin: 0 }}
            onClick={() => {
              dispatch(
                toggleMovieWatched({
                  email: authDetails.user!,
                  imdbID: movie.imdbID,
                })
              );
            }}
          />
        )}
        {!inWatchList && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <BookmarkPlus
                className="absolute top-0 left-1 h-10 w-10"
                fill={currentMovie ? "red" : "gray"}
                stroke="white"
                strokeWidth={1}
                style={{ cursor: "pointer", padding: 0, margin: 0 }}
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <Tabs
                defaultValue={tab}
                className="w-full"
                onValueChange={onTabChange}
              >
                <DialogHeader>
                  <DialogTitle>WatchLists</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="select">Select WatchList</TabsTrigger>
                    <TabsTrigger value="create">Create New</TabsTrigger>
                  </TabsList>
                  <TabsContent value="select">
                    {user?.playlists && user?.playlists?.length > 0 && (
                      <Select
                        value={selectedOption}
                        onValueChange={(value) => {
                          setSelectedOption(value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a WatchList" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {user?.playlists.map((playlist) => (
                              <SelectItem key={playlist.id} value={playlist.id}>
                                {playlist.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </TabsContent>
                  <TabsContent value="create" className="space-y-4">
                    <Input
                      id="name"
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      className="w-full"
                      placeholder="Playlist Name"
                    />
                    <Textarea
                      placeholder="Playlist Description"
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </TabsContent>
                </div>
              </Tabs>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={() => {
                    if (tab === "create") {
                      dispatch(
                        addPlaylist({
                          email: authDetails.user!,
                          playlist: newPlaylistName,
                          desc: desc,
                          movie: { ...movie, isWatched: false },
                        })
                      );
                    }
                    if (tab === "select") {
                      dispatch(
                        addToPlaylist({
                          email: authDetails.user!,
                          playlistId: selectedOption,
                          movie: { ...movie, isWatched: false },
                        })
                      );
                    }

                    setOpen(false);
                  }}
                >
                  {tab === "create" ? "Create & Add" : "Add to WatchList"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">{movie.Title}</h3>
            <p className="text-sm text-muted-foreground">{movie.Year}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
