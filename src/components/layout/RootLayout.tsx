import { Outlet } from "react-router-dom";

type Props = {};

function RootLayout({}: Props) {
  return <Outlet />;
}

export default RootLayout;
