import { Link } from "react-router-dom";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate('/');
    }
    return (
        <nav className="flex items-center w-full my-0 mx-auto border-b p-4">
            <Link to="/" >
                <h1 className="text-center">Learning Management System</h1>
            </Link>
            <div className="ml-auto">
                {!isAuthenticated() &&
                    <Link
                        to="/signup"
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Signup
                    </Link>
                }
                {!isAuthenticated() && <Link to="/login" className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</Link>}
                {isAuthenticated() && <a href="#" onClick={() => handleSignOut()} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</a>}
            </div>
        </nav>
    );
}

export default Navbar
    ;