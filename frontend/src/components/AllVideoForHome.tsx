import OneVideo from "./OneVideo";
import Video_Not_Found from "./Video_Not_Found";

const AllVideoForHome = () => {
  return (
    <div className="flex  flex-wrap  max-[500px]:pb-[60px]  ">
      <OneVideo />
      <OneVideo />
      <OneVideo />
      <OneVideo />
      <OneVideo />
    </div>
    // <div  className="center-item  h-[80vh] " >

    // <Video_Not_Found    />
    // </div>
 
  );
};

export default AllVideoForHome;
