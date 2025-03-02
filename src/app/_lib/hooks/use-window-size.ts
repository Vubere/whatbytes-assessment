import { set } from "lodash";
import { useEffect, useState } from "react";



export default function useWindowSize() {
  const [dimensions, setDimensions] = useState({
    width:0,
    height:0
  });
  useEffect(()=>{
    setDimensions({
      width:window.innerWidth,
      height:window.innerHeight
    });
    window.addEventListener("resize", ()=>{
      setDimensions({
        width:window.innerWidth,
        height:window.innerHeight
      })
    })
  },[])
  return dimensions
}