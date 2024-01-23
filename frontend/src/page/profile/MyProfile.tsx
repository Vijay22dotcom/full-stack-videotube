import Sidemenu from "@/components/Sidemenu";
import { fetchCurrentUser, fetchUserChannleProfile } from "@/store/actions/userAction";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getCurrentUser, gethUserChannleProfile } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { RxDotFilled } from "react-icons/rx";

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(getCurrentUser);
  const user: User = data?.data;
  const channel=useAppSelector(gethUserChannleProfile)
  const channelData=channel?.data
    // console.log(user?.username)
  const userCoverImage = user?.coverImage || "/profile-cover-image.avif";

  useEffect(() => {
    (async ()=>{
        const userData=await dispatch(fetchCurrentUser()).then((res)=>res?.payload)
        dispatch(fetchUserChannleProfile( userData?.data?.data?.username))

    })()
  }, []);
  return (
    <>
      <div className="flex w-full  pt-[60px]   max-[500px]:pt-[45px ] ">
        <Sidemenu />

        <div className="w-[80%]  max-[800px]:w-[75%] max-[800px]:ml-[25%] max-[500px]:w-full ml-[20%]  max-[500px]:ml-0   ">
          <div className="my-profile  ">
            <img
              src={userCoverImage}
              alt="coverImage"
              className="h-[200px] w-full "
            />

            <div  className="p-[20px] flex justify-between items-center " >
                <div className="flex" >
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-[200px] h-[200px]  rounded-full border-[2px]   mt-[-50px] "
              />
              <div className="ml-[25px]" >
              <p className="text-[30px]" >{user?.username} </p>
              <p className="text-[20px]" >{user?.fullName} </p>
              <span className="flex items-center max-[750px]:text-[12px] max-[500px]:text-[16px]  ">
              <p>{channelData?.subscribersCount}<span className="ml-[3px]" >subscribers</span> </p>
              <span className="center-item">
                <RxDotFilled />{" "}
              </span>
              <p className=""> {channelData?.channelsSubscribedToCount} <span className="ml-[3px]" >subscribed</span></p>
            </span>
              </div>
            </div>
            <div>
                <button  className="bg-[#ae7aff] px-[20px] py-[5px] " >
                    Edit
                </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
