interface SubMenusProps {
  icon: string;
  title: string;
  to: string;
  [key: string]: any;
}

export type MenuProps = {
  title: string;
  featureName: string;
  icon: string;
  subCreateMenus?: SubMenuLevel3[];
  subMenus: SubMenuLevel2[];
  to: string;
};

export type MockDataSidebarProps = {
  menus: MenuProps[];
};
