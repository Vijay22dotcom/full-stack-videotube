import AllVideoForHome from "@/components/AllVideoForHome";

import Sidemenu from "@/components/Sidemenu";

const Home = () => {
  return (
    <div className="flex w-full  pt-[60px]   max-[500px]:pt-[50px ] ">
      <Sidemenu />

      <div className="w-[80%] p-[20px] pb-0 pr-0 max-[800px]:w-[75%] max-[800px]:ml-[25%] max-[500px]:w-full ml-[20%]  max-[500px]:ml-0  ">
        <AllVideoForHome />
      </div>
    </div>
  );
};

export default Home;
