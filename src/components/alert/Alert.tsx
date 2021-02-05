export interface AlertProps {
  error: { msg: { msg: string }[] };
}

const Alert: React.FC<AlertProps> = ({ error }) => {
  console.log(error);
  return (
    <>
      {error.msg[0].msg === ""
        ? ""
        : error.msg.map((error): any => {
            return (
              <div className="alertContainer">
                <span className="alertContainer_red-alert">{error.msg}</span>
              </div>
            );
          })}
    </>
  );
};

export default Alert;
