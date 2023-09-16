export interface MenuItem {
    code: string;
    icon: string;
    name: string;
    permissionList?: string[];
    route?: string;
    subMenus?: MenuItem[];
  }