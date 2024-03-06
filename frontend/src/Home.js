import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import Star from "./components/Start";

const courses = [
  {
    name: "introduction to react",
    description: "a course on react",
    thumbnail: "https://picsum.photos/150?random=1",
    author: "John Doe",
    rating: 4.5,
  },
  {
    name: "introduction to python",
    description: "a course on python",
    thumbnail: "https://picsum.photos/150?random=2",
    author: "Jane Doe",
    rating: 4.5,
  },
  {
    name: "introduction to javascript",
    description: "a course on javascript",
    thumbnail: "https://picsum.photos/150?random=3",
    author: "John Doe",
  },
  {
    name: "introduction to java",
    description: "a course on java",
    thumbnail: "https://picsum.photos/150?random=4",
  },
  {
    name: "introduction to c++",
    description: "a course on c++",
    thumbnail: "https://picsum.photos/150?random=5",
  },
  {
    name: "introduction to c",
    description: "a course on c",
    thumbnail: "https://picsum.photos/150?random=6",
  },
  {
    name: "introduction to c#",
    description: "a course on c#",
    thumbnail: "https://picsum.photos/150?random=7",
  },
  {
    name: "introduction to ruby",
    description: "a course on ruby",
    thumbnail: "https://picsum.photos/150?random=8",
  },
  {
    name: "introduction to go",
    description: "a course on go",
    thumbnail: "https://picsum.photos/150?random=9",
  },
  {
    name: "introduction to rust",
    description: "a course on rust",
    thumbnail: "https://picsum.photos/150?random=10",
  },
  {
    name: "introduction to typescript",
    description: "a course on typescript",
    thumbnail: "https://picsum.photos/150?random=11",
  },
  {
    name: "introduction to kotlin",
    description: "a course on kotlin",
    thumbnail: "https://picsum.photos/150?random=12",
  },
  {
    name: "introduction to swift",
    description: "a course on swift",
    thumbnail: "https://picsum.photos/150?random=13",
  },
  {
    name: "introduction to dart",
    description: "a course on dart",
    thumbnail: "https://picsum.photos/150?random=14",
  },
  {
    name: "introduction to flutter",
    description: "a course on flutter",
    thumbnail: "https://picsum.photos/150?random=15",
  },
  {
    name: "introduction to react native",
    description: "a course on react native",
    thumbnail: "https://picsum.photos/150?random=16",
  },
];

const Home = () => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
  return (
    <div className="flex flex-col h-full">
      {courses.map((course, index) => (
        <div key={index} className="flex mx-4 border-b" onClick={() => handleNavigation('/courses')}>
          <Card className="w-full h-32 flex-row mt-3 mb-3 rounded-none shadow-none">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 shrink-0 rounded-none w-32 h-32"
            >
              <img
                src={course.thumbnail}
                alt="card-image"
                className="h-full w-full object-cover rounded-none"
                width={150}
                height={150}
              />
            </CardHeader>
            <CardBody className="w-full px-2 py-0 flex flex-col h-full justify-between">
              <Typography className="w-full h-1/4 overflow-hidden whitespace-nowrap overflow-ellipsis text-lg font-bold text-black">
                {course.name}
              </Typography>
              <Typography color="gray" className="w-full h-1/4">
                {course.description}
              </Typography>
              <Typography color="gray" className="w-full h-1/4">
                By: {course.author}
              </Typography>
              <Typography className="w-full h-1/4">
                <span className="flex items-center">
                  <span className="mr-2">{course.rating || "0.0"}</span>
                  <Star fill={course.rating >= 1} />
                  <Star fill={course.rating >= 2} />
                  <Star fill={course.rating >= 3} />
                  <Star fill={course.rating >= 4} />
                  <Star fill={course.rating >= 5} />
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
