import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import UserMenu from "./UserMenu";

function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 500);
  const navigate = useNavigate();
  const location = useLocation();

  const onHomeOrSearchPage =
    location.pathname === "/" || location.pathname.startsWith("/search");

  const handleInputChange = (e) => setSearchInput(e.target.value);

  const handleSearchEnter = (e) => {
    if (e.key === "Enter" && searchInput) {
      navigate(`/search?query=${searchInput}`);
    }
  };

  const handleLogoClick = () => {
    setSearchInput("");
    navigate("/");
  };

  useEffect(() => {
    if (!debouncedSearchInput || !onHomeOrSearchPage) return;
    if (location.pathname === "/" && searchInput === "") return;

    navigate(`/search?query=${debouncedSearchInput}`);
  }, [debouncedSearchInput, onHomeOrSearchPage, location.pathname, navigate]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-950 text-white py-5 sm:py-5 md:py-6 px-4 shadow-md z-50">
      <div className="max-w-screen-xl mx-auto h-full flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        <Logo onClick={handleLogoClick} />
        <SearchInput
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleSearchEnter}
        />
        <UserMenu />
      </div>
    </nav>
  );
}

export default NavBar;
