import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Star from "./components/Start";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_SERVER_URL + "/videos"
        );
        setVideos(response.data.videos);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col h-full">
      {videos.map((video, index) => (
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
