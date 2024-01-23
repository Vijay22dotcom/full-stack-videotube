/// <reference types="vite/client" />

interface userDataForRegister{
     username:string,
     fullName:string,
     password:string,
     email:string
}



interface Video {
     createdAt: string;
     description: string;
     duration: number;
     isPublished: boolean;
     owner: {
      _id:string,
      avatar:string,
      username:string
     };
     thumbnail: {
       public_id: string;
       url: string;
     };
     title: string;
     updatedAt: string;
     videoFile: {
       public_id: string;
       url: string;
     };
     views: number;
     
     _id: string;
   }


   interface User {
    avatar: string;
    coverImage: string;
    createdAt: string;
    email: string;
    fullName: string;
    updatedAt: string;
    username: string;
    watchHistory: []; 
    _id: string;
  }
