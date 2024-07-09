import { Superscript } from "@mui/icons-material";
import React from "react";
import "./CSS/Hudcss.css"
export function Hud() {
  return (
    <div className="hud">
    <div className="yaw-controller">
      <div className="yaw-container">
        <div className="yaw-scale yaw-scale-1"><p>-60<Superscript>-60</Superscript></p></div>
        <div className="yaw-scale yaw-scale-2">-50`</div>
        <div className="yaw-scale yaw-scale-3">-40`</div>
        <div className="yaw-scale yaw-scale-4">-30`</div>
        <div className="yaw-scale yaw-scale-5">-20`</div>
        <div className="yaw-scale yaw-scale-6">-10`</div>
        <div className="yaw-scale yaw-scale-7">0`</div>
        <div className="yaw-scale yaw-scale-8">10`</div>
        <div className="yaw-scale yaw-scale-9">20`</div>
        <div className="yaw-scale yaw-scale-10">30`</div>
        <div className="yaw-scale yaw-scale-11">40`</div>
        <div className="yaw-scale yaw-scale-12">50`</div>
        <div className="yaw-scale yaw-scale-13">60`</div>
      </div>
    </div>
    {/* the roll controller and height controller is made in context to html and css with its working */}
      <div className="roll-controller">
        <div className="roll-container">
          <div className="imiginary-center"></div>
          <div className="bottom-hide "></div>
          <div className="angle-left-hide"></div>
          <div className="angle-right-hide"></div>
          <div className="roll-scale roll-scale-1"></div>
          <div className="roll-scale roll-scale-2"></div>
          <div className="roll-scale roll-scale-3"></div>
          <div className="roll-scale roll-scale-4"></div>
          <div className="roll-scale roll-scale-5"></div>
          <div className="roll-scale roll-scale-6"></div>
          <div className="roll-scale roll-scale-7"></div>
          <div className="roll-scale roll-scale-8"></div>
          <div className="roll-scale roll-scale-9"></div>
          <div className="roll-scale roll-scale-10"></div>
          <div className="roll-scale roll-scale-11"></div>
          <div className="roll-scale roll-scale-12"></div>
          <div className="roll-scale roll-scale-13"></div>
        </div>
      </div>
      <div className="heightindibox">
        <div className="heightindicator">
          <hr className="lines1" />
          <p className="numberindicator">5</p>
        </div>
        <div className="heightindicator">
          <hr className="lines" />
          <p className="numberindicator">10</p>
        </div>
        <div className="heightindicator">
          <hr className="lines1" />
          <p className="numberindicator">5</p>
        </div>
        <div className="heightindicator">
          <hr className="lines" />
          <p className="numberindicator">0</p>
        </div>
      </div>
    </div>
  );
}
