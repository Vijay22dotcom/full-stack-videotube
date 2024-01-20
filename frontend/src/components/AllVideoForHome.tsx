import OneVideo from "./OneVideo";
import Video_Not_Found from "./Video_Not_Found";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { fetchAllVideo } from "@/store/actions/videoAction";


const AllVideoForHome = () => {

  const dispatch=useAppDispatch()

  useEffect(() => {
    
    dispatch(fetchAllVideo())
  
  }, [])
  
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
