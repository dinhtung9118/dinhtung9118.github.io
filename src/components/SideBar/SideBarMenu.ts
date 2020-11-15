import { MockDataSidebarProps } from "./SideBar";
import { RouteList } from "../../routeList";

export const mockDataSidebar: MockDataSidebarProps = {
  menus: [
    {
      title: "Lich Kham",
      featureName: "",
      icon: "fa-youtube-play",
      subCreateMenus: [],
      subMenus: [],
      to: RouteList.examinationSchedule,
    },
    {
      title: "Lich Tu Van",
      featureName: "",
      icon: "fa-youtube-play",
      subCreateMenus: [],
      subMenus: [],
      to: RouteList.consultationSchedule,
    },
    {
      title: "Hoat Dong",
      featureName: "",
      icon: "fa-youtube-play",
      subCreateMenus: [],
      subMenus: [],
      to: RouteList.profile,
    },
    {
      title: "Ca nhan",
      featureName: "",
      icon: "fa-youtube-play",
      subCreateMenus: [],
      subMenus: [],
      to: RouteList.profile,
    },
    {
      title: "Lich tư vấn Làm Việc",
      featureName: "",
      icon: "fa-youtube-play",
      subCreateMenus: [],
      subMenus: [],
      to: RouteList.consultationWorkingTime,
    },
    {
      title: "Lich lam viec",
      featureName: "",
      icon: "fa-youtube-play",
      subCreateMenus: [],
      subMenus: [],
      to: RouteList.schedules,
    },
  ],
};
