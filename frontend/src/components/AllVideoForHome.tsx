import OneVideo from "./OneVideo";
import Video_Not_Found from "./Video_Not_Found";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAllVideo } from "@/store/actions/videoAction";
import { getAllVideo, isLoading } from "@/store/slices/videoSlice";

const AllVideoForHome = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(getAllVideo);
  const videos: Video[] = data?.data;
  const loading = useAppSelector(isLoading);
  // console.log( videos?.length <= 0 || videos)

  useEffect(() => {
    dispatch(fetchAllVideo()).then((res) => res.payload);
  }, []);

  return !loading ? (
    videos?.length <= 0 || videos === undefined  ? (
      <div className="center-item  h-[80vh] ">
        <Video_Not_Found />
      </div>
    ) : (
      <div className="flex  flex-wrap  max-[500px]:pb-[60px]  ">
        {videos?.map((video) => (
          <OneVideo video={video} key={video._id} />
        ))}

        {/* <OneVideo />
        <OneVideo />
        <OneVideo />
        <OneVideo /> */}
      </div>
    )
  ) : (
    <div>Loading...</div>
  );
};

export default AllVideoForHome;
