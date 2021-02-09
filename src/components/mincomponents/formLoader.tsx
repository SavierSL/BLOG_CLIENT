export interface FormLoaderProps {}

const FormLoader: React.FC<FormLoaderProps> = () => {
  return (
    <>
      <div className="formLoader">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default FormLoader;
