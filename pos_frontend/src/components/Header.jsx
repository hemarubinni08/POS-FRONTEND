import React from "react";
import { useLocation } from "react-router-dom";

const Header = ({ username }) => {
  const location = useLocation();

  // Dynamically generate a clean breadcrumb path based on the URL route
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentModule = pathSegments[0] 
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1) 
    : "Overview";

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex justify-between items-center flex-shrink-0 select-none">
      
      {/* LEFT: MINIMAL BREADCRUMB SYSTEM */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="text-slate-400">App</span>
        <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-800 font-semibold tracking-tight">{currentModule}</span>
      </div>

      {/* RIGHT: LIVE UTILITIES & USER METADATA */}
      <div className="flex items-center gap-4">
        
        {/* CALENDAR METRIC BADGE */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-md">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>
            {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
        </div>

        {/* COMPACT INTERFACE DIVIDER */}
        <span className="w-px h-4 bg-slate-200 hidden sm:block"></span>

        {/* METADATA PROFILE BLOCK */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-bold text-blue-600 uppercase">
            {username ? username.charAt(0) : "U"}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-700 leading-none">
              {username ? username.split("@")[0] : "Operator"}
            </span>
            <span className="text-[10px] font-medium text-green-600 mt-0.5 flex items-center gap-1 leading-none">
              <span className="w-1 h-1 rounded-full bg-green-500 inline-block animate-pulse"></span>
              Online Terminal
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;