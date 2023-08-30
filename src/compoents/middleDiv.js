import React from "react";
import '../index.css';
import LocalInfo from "./localInfo";
import GlobalInfo from "./globalInfo";
function MiddleDiv(){
    return(
        <div className="mid-div">
            <div className="local-div">
                <LocalInfo />
            </div>
            <div className="global-div">
                <GlobalInfo />
            </div>
        </div>
    )
}
export default MiddleDiv;