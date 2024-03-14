import { useNavigate } from "react-router-dom";
import Star from "./Star";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleNavigation = (videoId) => {
    navigate("/video/" + videoId);
  };

  return (
    <div
      key={video._id}
      className="flex border-b sm:border-none cursor-pointer rounded-none sm:rounded-lg hover:shadow"
      onClick={() => handleNavigation(video._id)}
    >
      <Card className="w-full h-auto flex-col sm:flex-row my-2 rounded-none shadow-none bg-transparent px-2">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 shrink-0 rounded-lg w-full h-48 sm:w-32 md:w-32 sm:h-32"
        >
          <img
            src={video.thumbnail}
            alt="Video thumbnail"
            className="h-full w-full object-fill rounded-none"
            width={150}
            height={150}
          />
        </CardHeader>
        <CardBody className="w-full px-2 py-0 flex flex-col h-full justify-between overflow-hidden whitespace-nowrap overflow-ellipsis">
          <Typography className="w-full text-lg font-bold text-black overflow-hidden whitespace-nowrap overflow-ellipsis">
            {video.name}
          </Typography>
          <Typography
            color="gray"
            className="w-full overflow-hidden whitespace-nowrap overflow-ellipsis"
          >
            {video.description}
          </Typography>
          <Typography
            color="gray"
            className="w-full overflow-hidden whitespace-nowrap overflow-ellipsis"
          >
            By: {video.author}
          </Typography>
          <Typography className="w-full">
            <span className="flex items-center">
              <span className="mr-1">{video.rating || "0"}</span>
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
  );
};

export default VideoCard;
