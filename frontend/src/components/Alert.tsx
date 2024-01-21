import React, { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material";
import { useAlert } from "@/context/Alert";


const AlertComponent = () => {
  const { alert, hideAlert } = useAlert();
  return (
    <div className="w-[100%] m-auto  ">
      {alert ? (
        <div className={`w-[30vw]  fixed top-[10px] ml-[40%] z-50 `}>
          <Alert severity={alert.type}>{alert.message}</Alert>
        </div>
      ) : null}
    </div>
  );
};

export default AlertComponent;