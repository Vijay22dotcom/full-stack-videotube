import { RxDotFilled } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const OneVideo = () => {
  return (
    <>
      <div
        className="w-1/3 pr-[20px] mb-[20px]   max-[800px]:w-1/2  max-[500px]:w-[100%] 
      max-[500px]:mr-0 max-[500px]:mb-0 "
      >
        <img src="/IMG.webp" alt="image" className="cursor-pointer  rounded  " />

        <div className="video_info flex my-[10px]  max-[800px]:text-[16px] ">
          <div className="mr-[20px] z-1 cursor-pointer ">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h4 className="h-[48px] overflow-hidden  ">
              how to learn react | a react roadmap
            </h4>
            <h5>vijay rajpara</h5>
            <span className="flex items-center max-[750px]:text-[12px] max-[500px]:text-[16px]  ">
              <p>1000 views </p>
              <span className="center-item">
                <RxDotFilled />{" "}
              </span>
              <p className=""> 18 hours ago </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneVideo;
