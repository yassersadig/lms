import BounceLoader from "react-spinners/BounceLoader";

const Loading = ({ loading }) => {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
      <BounceLoader color={"#001a23"} loading={loading} size={100} />
    </div>
  );
};

export default Loading;
