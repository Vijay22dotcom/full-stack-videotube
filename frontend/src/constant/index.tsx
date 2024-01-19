import { IoMdHome } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { MdHistory } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FaRegFolderClosed } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";

type side_nemu = {
  name: string;
  slug: string;
  icon: typeof IoMdHome;
};

export const side_menu_iteam: side_nemu[] = [
  { name: "home", slug: "/", icon: MdOutlineHome },
  { name: "liked video", slug: "/liked_video", icon: BiLike },
  { name: "history", slug: "/history", icon: MdHistory },
  { name: "my content", slug: "/my_content", icon: MdOutlineVideoLibrary },
  { name: "collection", slug: "/collection", icon: FaRegFolderClosed },
  { name: "subscribers", slug: "/subscribers", icon: HiUserGroup },
];

export const mobile_footer_menu: side_nemu[] = [
  { name: "home", slug: "/home", icon: MdOutlineHome },
  { name: "history", slug: "/home", icon: MdHistory },
  { name: "collection", slug: "/home", icon: FaRegFolderClosed },
  { name: "subscribers", slug: "/home", icon: HiUserGroup },
];
