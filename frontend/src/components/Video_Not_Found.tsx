import { FaRegPlayCircle } from "react-icons/fa";
const Video_Not_Found = () => {
  return (
    <div className=" w-[300px]" >
        <div className="   mb-[20px]  center-item" >
       
      <FaRegPlayCircle  className="text-[60px] center-item z-50" />
      
      </div>

      <div className="text-center" >
        <h3 className="font-semibold  text-[20px]"  >No videos avaliable </h3>
        <p>There are no video avaliable.Please try to search some thing else. </p>
      </div>
    </div>
  )
}

export default Video_Not_Found
