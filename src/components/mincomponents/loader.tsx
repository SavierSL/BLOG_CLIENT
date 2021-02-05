export interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <>
      <div style={{ height: "100vh" }} className="loaderContainer">
        <h1>Loading...</h1>
      </div>
    </>
  );
};

export default Loader;
