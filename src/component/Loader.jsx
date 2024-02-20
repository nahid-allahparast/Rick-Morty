import { LoaderIcon } from "react-hot-toast";

const Loader = () => {
  return (
    <div className="loader">
      <h4 style={{ color: "var(--slate-200)" }}>is loading ...</h4>
      <LoaderIcon className="icon" />
    </div>
  );
};

export default Loader;
