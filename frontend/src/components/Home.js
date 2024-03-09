import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Star from "./Star";
import useGet from "../hooks/useGet";
import Loading from "./Loading";

const Home = () => {
  const { data, loading, error } = useGet(
    process.env.REACT_APP_SERVER_URL + "/videos"
  );
  const videos = data?.videos;

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

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
      {videos &&
        videos.map((video, index) => (
          <div
            key={index}
            className="flex mx-4 border-b"
            onClick={() => handleNavigation("/courses")}
          >
            <Card className="w-full h-32 flex-row mt-3 mb-3 rounded-none shadow-none">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 shrink-0 rounded-none w-32 h-32"
              >
                <img
                  src={video.thumbnail}
                  alt="Random placeholder"
                  className="h-full w-full object-cover rounded-none"
                  width={150}
                  height={150}
                />
              </CardHeader>
              <CardBody className="w-full px-2 py-0 flex flex-col h-full justify-between">
                <Typography className="w-full h-1/4 overflow-hidden whitespace-nowrap overflow-ellipsis text-lg font-bold text-black">
                  {video.name}
                </Typography>
                <Typography
                  color="gray"
                  className="w-full h-1/4 overflow-hidden whitespace-nowrap overflow-ellipsis"
                >
                  {video.description}
                </Typography>
                <Typography color="gray" className="w-full h-1/4">
                  By: {video.author}
                </Typography>
                <Typography className="w-full h-1/4">
                  <span className="flex items-center">
                    <span className="mr-2">{video.rating || "0.0"}</span>
                    <Star fill={video.rating >= 1} />
                    <Star fill={video.rating >= 2} />
                    <Star fill={video.rating >= 3} />
                    <Star fill={video.rating >= 4} />
                    <Star fill={video.rating >= 5} />
                  </span>
                </Typography>
              </CardBody>
            </Card>
          </div>
        ))}
    </div>
  );
};

export default Home;
