import { useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import VideoCard from "./VideoCard";

const VideoDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useGet(
    process.env.REACT_APP_SERVER_URL + "/videos/" + id
  );

  const { data: allVideos } = useGet(
    process.env.REACT_APP_SERVER_URL + "/videos"
  );

  const videos = allVideos?.videos;

  return (
    <div className="flex flex-col h-full p-4">
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
      {!loading && !error && (
        <div className="mb-2">
          <video class="w-full h-64 rounded-2xl mb-2 object-cover" controls>
            <source src="https://docs.material-tailwind.com/demo.mp4" />
            Your browser does not support the video tag.
          </video>
          <div className=" bg-gray-100 rounded-2xl p-3 mb-2">
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
          <div className=" bg-gray-100 rounded-2xl p-3">
            <ShowMoreText>
              <p>{data && data.video.description}</p>
            </ShowMoreText>
          </div>
        </div>
      )}
      {videos && (
        <div className="bg-gray-100 rounded-2xl p-3 mb-2">
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
