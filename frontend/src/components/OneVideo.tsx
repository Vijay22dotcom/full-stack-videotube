import { RxDotFilled } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTimeAgo } from "@/utils/TimeAgo.ts";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Link } from "react-router-dom";



const OneVideo = ({video}:{video:Video}) => {
  // console.log(video)

  const dispatch=useAppDispatch()
  const timeAgoUpload = useTimeAgo(video.createdAt);
 


  useEffect(()=>{

  },
  [])
  
  
  return (
    <>
      <div
        className="w-1/3 pr-[20px] mb-[20px]   max-[800px]:w-1/2  max-[500px]:w-[100%] 
      max-[500px]:mr-0 max-[500px]:mb-0 "
      >
        <img src={video.thumbnail.url} alt="image" className="cursor-pointer  w-full rounded  h-[175px] " />

        <div className="video_info flex my-[10px]  max-[800px]:text-[16px] ">
          <Link to={`/${video.owner.username}`} className="mr-[20px] z-1 cursor-pointer ">
            <Avatar>
              <AvatarImage src={video?.owner?.avatar}/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <h4 className="h-[48px] overflow-hidden  ">
              {video.title}
            </h4>
            <h5>{video.owner.username}</h5>
            <span className="flex items-center max-[750px]:text-[12px] max-[500px]:text-[16px]  ">
              <p>{video.views}  <span className="ml-[3px]" > views</span> </p>
              <span className="center-item">
                <RxDotFilled />{" "}
              </span>
              <p className="">{timeAgoUpload  }   </p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneVideo;
