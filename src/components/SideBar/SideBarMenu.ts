import { MockDataSidebarProps } from "./SideBar";
import { RouteList } from "../../routeList";

export const mockDataSidebar: MockDataSidebarProps = {
  menus: [
    {
      title: "Danh sách khám",
      featureName: "",
      icon: "fa-youtube-play",
      subCreateMenus: [],
      subMenus: [],
      to: RouteList.examinationSchedule,
    },
    {
      title: "Danh sách tư Vấn",
      featureName: "",
      icon: "fa-youtube-play",
      subCreateMenus: [],
      subMenus: [],
      to: RouteList.consultationSchedule,
    },
    {
      title: "Thông tin cá nhân",
      featureName: "",
      icon: "fa-youtube-play",
      subCreateMenus: [],
      subMenus: [],
      to: RouteList.profile,
    },
    {
      title: "Lịch tư vấn",
      featureName: "",
      icon: "fa-youtube-play",
      subCreateMenus: [],
      subMenus: [],
      to: RouteList.consultationWorkingTime,
    },
    {
      title: "Lịch làm việc",
      featureName: "",
      icon: "fa-youtube-play",
      subCreateMenus: [],
      subMenus: [],
      to: RouteList.schedules,
    },
  ],
};
