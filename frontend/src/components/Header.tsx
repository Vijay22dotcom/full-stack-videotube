import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
const Header = () => {
  console.log(typeof FaSearch)
  return (
    <>
    <div className="flex  h-[60px] justify-between px-[40px] py-[10px] border-b-[1px] border-b-gray-400 max-[500px]:hidden max-[700px]:px-[20px] " >
      <div className="logo  center-item " >LOGO</div>
      <div className="search relative  center-item " >
<span className="absolute top-[12px] left-2 " ><FaSearch /></span>
        <input type="text" placeholder="search" className="border bg-black px-[30px] py-[2px] "  />
      </div>
      <div className="user_info   center-item" >

        <span className="mx-[10px] cursor-pointer max-[700px]:mx-[5px] " ><BsThreeDotsVertical /></span>
        <button  className="mx-[10px]   max-[700px]:mx-[5px] font-semibold  hover:text-gray-400 " > 
          {/* <Link to={"/login"} > log in</Link>  */}
          log in
          </button>
        <button className="mx-[10px] max-[700px]:mx-[5px] button_bg_first text-black  font-semibold hover:text-white "> 
           {/* <Link to={"/signin"} > sign up</Link> */}
           sign up
           </button>
      </div>
    </div>

    <div className="for_mobile  hidden max-[500px]:flex h-[45px] justify-between px-[20px] py-[10px] border-b-[1px] border-b-gray-400   " >
    <div className="logo  center-item " >LOGO</div>
    <div className="center-item" >
    <span className="mx-[10px]" ><FaSearch /></span>
      <RiMenu2Fill />
      </div>
    </div>
    </>
  )
}

export default Header
