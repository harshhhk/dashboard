import { Link } from "react-router-dom";
// interface HeaderProps {
//   searchValue: string;
//   onSearchChange: (value: string) => void;
// }
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../typescript/searchSlice";
import { RootState } from "../typescript/store";
const Header = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    (state: RootState) => state.search.searchTerm
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">
        Company name
      </Link>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <input
        className="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={searchValue}
        onChange={handleSearchChange}

        // value={searchValue}
        // onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <Link className="nav-link px-3" to="#">
            Sign out
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
