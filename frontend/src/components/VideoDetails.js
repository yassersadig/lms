import { useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import { Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import VideoCard from "./VideoCard";
import { useEffect, useRef } from "react";

const VideoDetails = () => {
  const containerRef = useRef(null);
  const { id } = useParams();
  const { data, loading, error } = useGet(
    process.env.REACT_APP_SERVER_URL + "/videos/" + id
  );
  const { data: allVideos, loading: allVideosLoading } = useGet(
    process.env.REACT_APP_SERVER_URL + "/videos"
  );
  const videos = allVideos?.videos;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [id]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row h-full p-4 overflow-scroll"
    >
      {loading && (
        <div className="w-full md:w-2/3 mb-2 md:mr-4">
          <div className="w-full h-0 pb-[56.25%] relative mb-2 bg-gray-300 rounded-2xl animate-pulse"></div>
          <div className="bg-gray-100 rounded-2xl p-3 mb-2">
            <div className="h-9 w-1/2 bg-gray-300 rounded-full animate-pulse mb-2"></div>
            <div className="h-4 w-1/3 bg-gray-300 rounded-full animate-pulse mb-2"></div>
            <div className="h-4 w-1/4 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-3">
            <div className="h-4 w-full bg-gray-300 rounded-full animate-pulse mb-2"></div>
            <div className="h-4 w-full bg-gray-300 rounded-full animate-pulse mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
      {allVideosLoading && (
        <div className="md:w-1/3 bg-gray-100 rounded-2xl p-3 mb-2">
          <div className="h-6 w-1/2 bg-gray-300 rounded-full animate-pulse mb-4"></div>
          <div className="h-32 w-full bg-gray-300 rounded-2xl animate-pulse mb-2"></div>
          <div className="h-32 w-full bg-gray-300 rounded-2xl animate-pulse mb-2"></div>
          <div className="h-32 w-full bg-gray-300 rounded-2xl animate-pulse"></div>
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
      {!loading && !error && (
        <div className="md:w-2/3 mb-2 md:mr-4">
          <div className="w-full h-0 pb-[56.25%] relative mb-2">
            <video
              className="absolute top-0 left-0 w-full h-full rounded-2xl object-cover"
              controls
            >
              <source
                src={
                  data &&
                  (data.video.videoUrl ||
                    "https://docs.material-tailwind.com/demo.mp4")
                }
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="bg-gray-100 rounded-2xl p-3 mb-2">
            <h1
              name="title"
              className="font-bold text-2xl h-9 overflow-ellipsis overflow-hidden whitespace-nowrap"
            >
              {data && data.video.name}
            </h1>
            <div name="author-date" className="flex justify-between">
              <div className="mr-4">By: {data && data.video.author}</div>
              <div>Date: {data && data.video.releaseDate.slice(0, 10)}</div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-3">
            <ShowMoreText>
              <p>{data && data.video.description}</p>
            </ShowMoreText>
          </div>
        </div>
      )}
      {!allVideosLoading && videos && (
        <div className="md:w-1/3 bg-gray-100 rounded-2xl p-3 mb-2">
          <div className="text-center text-lg font-bold border-b">
            More Videos
          </div>
          {videos
            .filter((video) => video._id !== id)
            .map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
