import {
  CircleUser,
  Clapperboard,
  Home,
  LineChart,
  ListVideo,
  Menu,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink, Outlet, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuth } from "@/context/AuthContext";
import { Playlist } from "@/store/movieSlice";

export function AppLayout() {
  const authDetails = useAuth();
  const user = useSelector((state: RootState) =>
    state.movie.users.find((user) => user.email === authDetails.user)
  );
  const path = window.location.pathname;
  if (!user) return <p>No WatchLists found.</p>;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <NavLink to="/" className="flex items-center gap-2 font-semibold">
              <Clapperboard className="h-6 w-6" />
              <span className="">WatchLists</span>
            </NavLink>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/app/home"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary"
                  } transition-all `
                }
              >
                <Home className="h-4 w-4" />
                Home
              </NavLink>
              <div className="inset-0 flex items-center py-2">
                <span className="w-full border-t"></span>
              </div>
              <span className="px-3 py-2">My Lists</span>
              {user?.playlists.map((playlist: Playlist) => (
                <NavLink
                  key={playlist.id}
                  to={`/app/playlist/${playlist.id}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-primary"
                    } transition-all `
                  }
                >
                  <ListVideo className="h-4 w-4" />
                  {playlist.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Clapperboard className="h-6 w-6" />
                  <span className="sr-only">Watchlists</span>
                </Link>
                <Link
                  to="#"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                    path === "/app/home"
                      ? "bg-muted"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{authDetails.user}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  authDetails.logout();
                  redirect("/auth/login");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
