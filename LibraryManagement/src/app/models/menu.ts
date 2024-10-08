export interface MenuItem {
    code: string;
    icon: string;
    name: string;
    moduleEnum: string;
    permissionList?: string[];
    route?: string;
    subMenus?: MenuItem[];
  }