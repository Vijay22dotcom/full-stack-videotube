import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent, FormEvent } from "react";
import Sidemenu from "@/components/Sidemenu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoEye , IoEyeOff} from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import axios from "axios";
import { userRegister } from "@/store/actions/authAction";
import { useAlert } from "@/context/Alert";
import { isLoading } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";


const Register = () => {
  const navigate = useNavigate();
  const dispatch=useAppDispatch()
  const {showAlert}=useAlert()  
  const Loading:boolean=useAppSelector(isLoading)
  const [showPass,setShowPass]=useState(false)
  const [avatarPreview ,setAvatarPreview]=useState<string | ArrayBuffer | null>("/user-avatar.webp")
  const [coverImagePreview ,setCoverImagePreview]=useState<string | ArrayBuffer | null>("/cover-image.jpg")
  const [user, setUser] = useState<userDataForRegister>({
    username: "",
    fullName:"",
    email: "",
    password: "",
  });

  console.log(Loading)
  const handleAvatar=(e:ChangeEvent<HTMLInputElement>)=>{
      // console.log(e.target.files?.[0])
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          // setAvatar(reader.result);
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
  }
  const handleCoverImage=(e:ChangeEvent<HTMLInputElement>)=>{
    // console.log(e.target.files?.[0])
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // setAvatar(reader.result);
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
}
  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
   
  if((user.email==="") || (user.fullName==="") || (user.password==="") || (user.username==="")){
    console.log("k")
    showAlert("All field are  requiard" ,"error")
  }else{

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data:any=await dispatch(userRegister(formData)).then((res)=>res?.payload)

    console.log(data)

    if(data?.data?.success){
        showAlert(data?.data?.message,"success")
        navigate("/")
        localStorage.setItem("isLogged", JSON.stringify(true))   

    }else{
      showAlert(data?.data?.message,"error")
    }
    


  }

  // setUser({
  //   username: "",
  //   fullName:"",
  //   email: "",
  //   password: "",
  // })
  


  };
  return (
    <>
      <div className="flex w-full  pt-[60px]   max-[500px]:pt-[45px ] ">
        <Sidemenu />

        <div className="w-[80%]  max-[800px]:w-[75%] max-[800px]:ml-[25%] max-[500px]:w-full ml-[20%]  max-[500px]:ml-0   ">
          <div className="register  h-[500px] flex items-center flex-col justify-center mt-[100px] max-[500px]:mt-0 ">
            <div className=" flex flex-col  m-auto border-2 rounded-3xl p-[5vw]   ">
              <h2 className="text-center  text-3xl  mb-3">
                Register
              </h2>

              <form onSubmit={handlesubmit} encType="multipart/form-data">
                <div className="inputuser relative ">
              
                  <input
                    type="text"
                    name="fullName"
                    className="border-2 rounded text-black  w-[300px] focus:outline-none focus:ring  p-1 pl-6 mb-2"
                    onChange={handlechange}
                    placeholder="enter full-name"
                    value={user.fullName}
                  />
                </div>
                <div className="inputuser relative ">
                  
                  <input
                    type="text"
                    name="username"
                    className="border-2 rounded text-black  w-[300px] focus:outline-none focus:ring  p-1 pl-6 mb-2"
                    onChange={handlechange}
                    placeholder="enter user-name"
                    value={user.username}
                  />
                </div>

                <div className="inputuser relative ">
                 
                  <input
                    type="email"
                    name="email"
                    className="border-2 rounded text-black  focus:outline-none focus:ring  w-[300px]   p-1 pl-6 mb-2"
                    onChange={handlechange}
                    value={user.email}
                    placeholder="enter email"
                  />
                </div>

                <div className="inputuser relative">
                <i onClick={()=>setShowPass(!showPass) }
                className=" absolute top-[10px] text-black right-2 cursor-pointer">
                  {
                    showPass ?  <IoEye/>  : < IoEyeOff />
                  }
                    
                  </i>
                  <input
                    type={showPass? "text":"password"}
                    name="password"
                    className="border-2 rounded text-black  focus:outline-none focus:ring  w-[300px]   p-1 pl-6 mb-2"
                    onChange={handlechange}
                    value={user.password}
                    placeholder="enter password"
                  />
                </div>

                <div className="w-[300px]" >

                <Label htmlFor="avatar">avatar</Label>
                <div className="flex" >
                  <Avatar>
                  <AvatarImage src={ avatarPreview as string }  />
                  </Avatar>
                <Input onChange={handleAvatar} id="avatar" name="avatar" type="file"  className="ml-[10px]" />
                </div>
                </div>

                <div  className="w-[300px] mt-[10px] ">
                <Label htmlFor="coverImage">cover-image</Label>
                <div className="" >
                  <img src={coverImagePreview as string} alt="coverImage"  className="rounded  h-[100px] w-[300px]"   />
                <Input  onChange={handleCoverImage} id="coverImage"  name="coverImage" type="file"  className="mt-[10px] " />
                </div>
                </div>

                <div className="w-[300px] flex justify-between mt-[10px]">
                  <input
                    type="submit"
                    value={Loading ? "loading..." : "register"}
                    className="m-auto  text-l rounded-3xl   w-[50%] button_bg_first text-white  py-2 cursor-pointer transition-transform transform hover:scale-105  focus:outline-none  p-1"
                    // onClick={handlesubmit}
                  />
                </div>
              </form>
              <div className="text-center">
                <p>
                  {" "}
                  i have aleady an account{" "}
                  <span
                    className="cursor-pointer text-blue-500 "
                    onClick={() => navigate("/login")}
                  >
                    LOGIN
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
