import { Link } from "react-router-dom";
import useGet from "../hooks/useGet";
import Loading from "./Loading";
import VideoCard from "./VideoCard";

const Home = () => {
  const { data, loading, error } = useGet(
    process.env.REACT_APP_SERVER_URL + "/videos"
  );
  const videos = data?.videos;

  return (
    <div className="flex flex-col h-full">
      {loading && <Loading loading={loading} />}
      {error && (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
          <div>{error}</div>
          <div className="text-center mt-4">
            <Link
              to="/"
              className="ml-2 bg-[#001a23] hover:bg-[#a0bccc] hover:text-[#001a23] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              try again
            </Link>
          </div>
        </div>
      )}
      {videos && videos.map((video) => <VideoCard key={video._id} video={video} />)}
    </div>
  );
};

export default Home;
