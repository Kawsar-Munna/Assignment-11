
import Lottie from "lottie-react";
import animationData from "../assets/spinner.json"; // use your file path

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Lottie animationData={animationData} loop autoplay className="w-32 h-32" />
    </div>
  );
};

export default Spinner;
