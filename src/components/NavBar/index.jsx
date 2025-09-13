import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import UserMenu from "./UserMenu";
import { PATHS } from "../../constants";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const onHomeOrSearchPage =
    location.pathname === PATHS.HOME || location.pathname.startsWith(PATHS.SEARCH);

  const handleLogoClick = () => {
    navigate(PATHS.HOME);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-950 text-white py-5 sm:py-5 md:py-6 px-4 shadow-md z-50">
      <div className="max-w-screen-xl mx-auto h-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <Logo onClick={handleLogoClick} />
        <SearchInput />
        <UserMenu />
      </div>
    </nav>
  );
}

export default NavBar;
