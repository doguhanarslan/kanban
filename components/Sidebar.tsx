import { useState } from "react";
import {
  HomeOutline,
  LogOutOutline,
  AppsOutline,
  GridOutline,
  PieChartOutline,
  ReturnDownBackOutline,
  ReturnDownForwardOutline,
  NotificationsOutline,
} from "react-ionicons";

function Sidebar() {
  const navLinks = [
    {
      title: "Home",
      icon: <HomeOutline width={"25px"} height={"25px"} color="red" />,
      active: false,
    },
    {
      title: "Boards",
      icon: <AppsOutline width={"25px"} height={"25px"} color="red" />,
      active: false,
    },
    {
      title: "Projects",
      icon: <GridOutline width={"25px"} height={"25px"} color="red" />,
      active: false,
    },
    {
      title: "Analytics",
      icon: <PieChartOutline width={"25px"} height={"25px"} color="red" />,
      active: false,
    },
    {
      title: "Notifications",
      icon: <NotificationsOutline width={"25px"} height={"25px"} color="red" />,
      active: false,
    },
  ];

  const [minimize, setMinimize] = useState(false);



  const handleMinimize = () => {
    if (minimize === true) {
      setMinimize(false);
    } else {
      setMinimize(true);
    }
  };

  return (
    <div className={`fixed left-0 top-0 md:w-[230px] ${minimize && "md:w-[65px]"} w-[60px] h-full overflow-hidden flex flex-col`}>
      <div className="flex w-full items-center md:justify-center justify-center md:pl-5 h-[70px] bg-gray">
        <div className={`flex flex-row items-center justify-start mr-5 cursor-pointer`}>
          {minimize === false ? <ReturnDownBackOutline onClick={handleMinimize} width={"25px"} height={"22px"} color="red" /> : <ReturnDownForwardOutline onClick={handleMinimize} width={"22px"} height={"25px"} color="red" />}
        </div>
      </div>
      <div className="w-full h-[calc(100vh-70px)] grid-rows-4 md:items-start items-center gap-2  py-5 px-3 relative">
        {navLinks.map((link) => {
          return (
            <div
              key={link.title}
              className={`flex flex-col items-center gap-5 text-justify w-full rounded-lg hover:bg-black hover:text-white px-2 py-3 cursor-pointer ${
                link.active ? "bg-red-600" : "bg-transparent"
              }`}
            >
              {link.icon}
              <span className="font-medium text-[16px] md:block hidden">
                {minimize === false && link.title}
              </span>
            </div>
          );
        })}
        <div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-gray-400 px-2 py-3 cursor-pointer bg-gray">
          <LogOutOutline />
          {minimize === false && <span className="font-medium text-[15px] md:block hidden">
            Log Out
          </span>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
