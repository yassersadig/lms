import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const sidebarRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowMenu(false);
      setTimeout(() => {
        setShowMenu(null);
      }, 300);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      handleOutsideClick(event);
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleNaviation = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  const toggleMenu = () => {
    if (showMenu) {
      setShowMenu(false);
      setTimeout(() => {
        setShowMenu(null);
      }, 300);
    } else {
      setShowMenu(true);
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
    setShowMenu(false);
  };
  return (
    <nav className="flex justify-between items-center w-full my-0 mx-auto border-b bg-[#001a23] text-white">
      <div className="text-lg font-bold m-4">
        <Link to="/">
          <h1>Learning Management System</h1>
        </Link>
      </div>
      <ul className="ml-auto hidden md:flex m-4">
        {!isAuthenticated() && (
          <li>
            <Link
              onClick={() => handleNaviation("/signup")}
              to="/signup"
              className="ml-2 bg-[#a0bccc] hover:bg-blue-700 text-[#001a23] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <li>
            <Link
              onClick={() => handleNaviation("/login")}
              to="/login"
              className="ml-2 bg-[#a0bccc] hover:bg-blue-700 text-[#001a23] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </Link>
          </li>
        )}
        {isAuthenticated() && (
          <li>
            <button
              onClick={() => handleSignOut()}
              className="ml-2 bg-[#a0bccc] hover:bg-blue-700 text-[#001a23] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
      <div className="block md:hidden m-4" onClick={toggleMenu}>
        {showMenu ? (
          <AiOutlineClose className="h-6 w-6" onClick={() => toggleMenu()} />
        ) : (
          <AiOutlineMenu className="h-6 w-6" />
        )}
      </div>
      <div
        ref={sidebarRef}
        className={`fixed top-0 h-full border-r bg-[#001a23] z-10 ease-in-out duration-300 ${
          showMenu ? "left-0 w-[60%]" : "left-[-100%] w-0"
        }`}
      >
        <div className="w-full text-lg font-bold m-4">
          <Link to="/" onClick={() => handleNaviation("/")}>
            <h1 className="text-white">Learning Management System</h1>
          </Link>
        </div>
        <ul className="text-white">
          {!isAuthenticated() && (
            <li className="p-4 border-b">
              <Link to="/signup" onClick={() => handleNaviation("/signup")}>
                Sign Up
              </Link>
            </li>
          )}
          {!isAuthenticated() && (
            <li className="p-4 border-b">
              <Link to="/login" onClick={() => handleNaviation("/login")}>
                Login
              </Link>
            </li>
          )}
          {isAuthenticated() && (
            <li className="p-4 border-b">
              <button onClick={() => handleSignOut()}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
