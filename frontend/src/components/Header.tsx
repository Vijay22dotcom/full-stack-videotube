import { fetchCurrentUser } from "@/store/actions/userAction";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getCurrentUser } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Cookies from 'js-cookie';
import { useLoginStatus } from "@/context/LoginStatus";
const Header = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(getCurrentUser);
  const user: User = data?.data;
  const storedValue: string | null = localStorage.getItem("isLogged");
  const { isLoggedIn,  handleLogout } = useLoginStatus();
  console.log(isLoggedIn)
  const [loginStatus,setLoginStatus]=useState(false)
  useEffect(() => {
    dispatch(fetchCurrentUser());
    // const isCookieAvailable = Cookies.get('accessToken') !== undefined
    const isCookieAvailable = document.cookie.includes('userLoggedIn') || false
    console.log(isCookieAvailable)
    setLoginStatus(isCookieAvailable)
  }, []);
  return (
    <>
      <div className="flex fixed w-full backdrop-blur-[10px]  h-[60px] justify-between px-[40px] py-[10px] border-b-[1px] border-b-gray-400 max-[500px]:hidden max-[700px]:px-[20px] z-50 ">
        <div className="logo  center-item ">LOGO</div>
        <div className="search relative  center-item ">
          <span className="absolute top-[12px] left-2 ">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="search"
            className="border bg-black px-[30px] py-[2px] "
          />
        </div>
        {isLoggedIn ? (
          <Link to={"/profile"} className="mr-[20px] z-1 cursor-pointer ">
            <Avatar>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <div className="user_info   center-item">
            <span className="mx-[10px] cursor-pointer max-[700px]:mx-[5px] ">
              <BsThreeDotsVertical />
            </span>
            <Link
              to={"/login"}
              className="mx-[10px]   max-[700px]:mx-[5px] font-semibold  hover:text-gray-400 "
            >
              {/* <Link to={"/login"} > log in</Link>  */}
              log in
            </Link>
            <Link
              to={"/register"}
              className="mx-[10px] max-[700px]:mx-[5px] button_bg_first text-black  font-semibold hover:text-white "
            >
              {/* <Link to={"/signin"} > sign up</Link> */}
              sign up
            </Link>
          </div>
        )}
      </div>

      <div className="for_mobile  fixed w-full backdrop-blur-[10px] hidden max-[500px]:flex h-[45px] justify-between px-[20px] py-[10px] border-b-[1px] border-b-gray-400   ">
        <div className="logo  center-item ">LOGO</div>
        <div className="center-item">
          <span className="mx-[10px]">
            <FaSearch />
          </span>
          <RiMenu2Fill />
        </div>
      </div>
    </>
  );
};

export default Header;
