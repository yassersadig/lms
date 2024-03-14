import { Link } from "react-router-dom";
import useGet from "../hooks/useGet";
import VideoCard from "./VideoCard";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import Search from "./Search";
import { useState } from "react";
import Filter from "./Filter";

const Home = () => {
  const { data, loading, error } = useGet(
    process.env.REACT_APP_SERVER_URL + "/videos"
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (rating) => {
    setSelectedRating(rating);
  };

  const filteredVideos = data?.videos.filter((video) => {
    const matchesSearch = video.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRating =
      selectedRating === null || video.rating >= selectedRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="flex flex-col md:flex-row h-full p-4 overflow-scroll">
      <div className="md:w-1/6 md:mr-4 mb-4 md:mb-0">
        <Filter onFilter={handleFilter} />
      </div>
      <div className="md:w-5/6">
        <Search onSearch={handleSearch} />
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex border-b">
                <Card className="w-full h-auto sm:h-32 flex-col sm:flex-row mt-3 mb-3 rounded-none shadow-none bg-transparent">
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 shrink-0 rounded-none w-full sm:w-32 h-32 bg-gray-300 animate-pulse"
                  >
                    <div />
                  </CardHeader>
                  <CardBody className="w-full px-2 py-0 flex flex-col h-full justify-between overflow-hidden whitespace-nowrap overflow-ellipsis">
                    <div className="w-full h-6 bg-gray-300 rounded-full animate-pulse mb-2"></div>
                    <div className="w-full h-4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
                    <div className="w-2/3 h-4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
                    <div className="w-1/2 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        )}
        {error && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
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
        {!loading && filteredVideos && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 rounded-lg border p-2">
            {filteredVideos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
