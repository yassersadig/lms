import { Link } from "react-router-dom";
import useGet from "../hooks/useGet";
import VideoCard from "./VideoCard";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";

const Home = () => {
  const { data, loading, error } = useGet(
    process.env.REACT_APP_SERVER_URL + "/videos"
  );
  const videos = data?.videos;

  return (
    <div className="flex flex-col h-full mx-4 overflow-scroll">
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex border-b">
              <Card className="w-full h-32 flex-row mt-3 mb-3 rounded-none shadow-none bg-transparent">
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="m-0 shrink-0 rounded-none w-32 h-32 bg-gray-300 animate-pulse"
                ></CardHeader>
                <CardBody className="w-full px-2 py-0 flex flex-col h-full justify-between overflow-hidden whitespace-nowrap overflow-ellipsis">
                  <div className="w-full h-1/4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
                  <div className="w-full h-1/4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
                  <div className="w-2/3 h-1/4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
                  <div className="w-1/2 h-1/4 bg-gray-300 rounded-full animate-pulse"></div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}
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
      {!loading && videos && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
