import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col h-full items-center justify-center">
            <div className="text-4xl text-center">Learning Management System</div>
            <Link to="/courses" className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Courses</Link>
        </div>
    );
}

export default Home;