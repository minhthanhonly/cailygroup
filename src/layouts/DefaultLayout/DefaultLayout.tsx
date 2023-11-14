import { ReactNode } from "react";
import Header from "../components/Header";


function DefaultLayout({children}:{children:any}){
  return(
    <div className="wrapper">
      <Header/>
      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout;
