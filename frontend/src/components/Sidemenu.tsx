import { mobile_footer_menu, side_menu_iteam } from "@/constant"
import { IoMdSettings } from "react-icons/io";
import { BsQuestionCircle } from "react-icons/bs";
const Sidemenu = () => {
  return (
    <>
    <div className=" flex flex-col  px-[10px] py-[20px] w-[18%] max-[900px]:w-[22%]       border-r  max-md:w-[25%] max-[500px]:hidden    justify-between content-area  " >
      <div>
        {
            side_menu_iteam.map((item,index)=>{
               return (
                <div key={index} className="flex items-center  border mb-[5px] py-[3px] px-[10px] "  >
                <item.icon />
                <span className="ml-[10px]" >{item.name}</span>
             </div>)
            })
}
      </div>
       <div>

          <div className="flex items-center  border mb-[5px]  py-[3px] px-[10px] "  >
                < BsQuestionCircle/>
                <span className="ml-[10px]">support</span>
          </div>
              <div className="flex items-center  border   py-[3px] px-[10px]  "  >
                < IoMdSettings/>
                <span className="ml-[10px]" >setting</span>
              </div>
      </div>
    </div>


      <div className="for_mobile  hidden max-[500px]:flex justify-between w-full fixed bottom-0 border-t  p-[5px] px-[10px] text-[14px] " >

        {
          mobile_footer_menu.map((item,index)=>{
            return (
              <div key={index} className="center-item-grid  py-[3px] px-[5px]  "  >
              <item.icon className="text-[22px]"  />
              <span className="" >{item.name}</span>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Sidemenu
