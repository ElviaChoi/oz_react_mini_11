import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/index";

function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Layout;
