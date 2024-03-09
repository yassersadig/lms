import { useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const VideoDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useGet(
    process.env.REACT_APP_SERVER_URL + "/videos/" + id
  );
  
  console.log(data);

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
      <video class="w-full h-96 rounded-2xl mb-2 object-fill" controls>
        <source
          src="https://docs.material-tailwind.com/demo.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <h1 className=" font-bold text-3xl h-9">{data && data.video.name}</h1>
      <div className="flex">
        <div className="mr-4">{data && data.video.author}</div>
        <div>test</div>
      </div>
      <p>{data && data.video.description}</p>
    </div>
  );
};

export default VideoDetails;
