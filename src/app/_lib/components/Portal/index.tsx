"use client";
import ReactDOM from "react-dom";

const Portal = ({ children, open }: { children: React.ReactNode, open: boolean }) => {

  return open
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export default Portal;
