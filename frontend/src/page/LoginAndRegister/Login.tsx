import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { useState, ChangeEvent, FormEvent } from "react";
import Sidemenu from "@/components/Sidemenu";
import { useAlert } from "@/context/Alert";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { userLogin } from "@/store/actions/authAction";
import { json } from "stream/consumers";
import Cookies from 'js-cookie';
import { useLoginStatus } from "@/context/LoginStatus";


const Login = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const dispatch = useAppDispatch();
  const { handleLogin, handleLogout } = useLoginStatus();
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handlechange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };



  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.email === "" || user.password === "") {
      showAlert("plase enyter useremai & password", "error");
    } else {
      const data: any = await dispatch(userLogin(user)).then(
        (res) => res.payload
      );

      if (data?.data?.success) {
        showAlert(data?.data?.message, "success");
        handleLogin()
        navigate("/");
        // localStorage.setItem("isLogged", JSON.stringify(true))  
        
      } else {
        showAlert(data?.data?.message, "error");
      }
      console.log(data);
    }
    setUser({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <div className="flex w-full  pt-[60px]   max-[500px]:pt-[45px ] ">
        <Sidemenu />

        <div className="w-[80%]  max-[800px]:w-[75%] max-[800px]:ml-[25%] max-[500px]:w-full ml-[20%]  max-[500px]:ml-0   ">
          <div className="register  h-[80vh] flex flex-col items-center mb-[50px] ">
            <div className="  flex flex-col  m-auto  border-2 rounded-3xl p-[5vw]  ">
              <h2 className="text-center  text-3xl  mb-3 text-blue-500">
                login
              </h2>

              <form onSubmit={handlesubmit}>
                <div className="inputuser  relative ">
                  <i className=" absolute  text-black top-[10px] left-2 cursor-pointer">
                    <AiOutlineMail />
                  </i>

                  <input
                    type="email"
                    name="email"
                    className="border-2 text-black rounded-3xl focus:outline-none focus:ring   w-[300px]   p-1 pl-6 mb-2"
                    onChange={handlechange}
                    placeholder="enter email or username "
                    value={user.email}
                  />
                </div>

                <div className="inputuser  relative ">
                  <i
                    onClick={() => setShowPass(!showPass)}
                    className=" absolute top-[10px] text-black right-2 cursor-pointer"
                  >
                    {showPass ? <IoEye /> : <IoEyeOff />}
                  </i>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    className="border-2 text-black  rounded-3xl  w-[300px] focus:outline-none focus:ring  p-1 pl-6 mb-2"
                    onChange={handlechange}
                    placeholder="enter password"
                    value={user.password}
                  />
                </div>

                <div className="w-full flex items-center">
                  <button
                    type="submit"
                    className="w-[50%]  m-auto button_bg_first text-white rounded-3xl py-2 transition-transform transform hover:scale-105 focus:outline-none"
                  >
                    Login
                  </button>
                </div>
              </form>

              <div className="text-center mt-2 ">
                <p className=" text-blue-400 text-end mb-1 text-[15px] ">
                  <Link to="/password/forgot">Forgot Password</Link>
                </p>
                <p>
                  {" "}
                  i have no account{" "}
                  <span
                    className="cursor-pointer text-blue-400"
                    onClick={() => navigate("/register")}
                  >
                    REGISTER
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
