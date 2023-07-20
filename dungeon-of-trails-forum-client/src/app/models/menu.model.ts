export interface IMenu {
  path?: string;
  title: string;
  icon: any;
  type: string;
  badge?: string;
  badge1?: boolean;
  badge2?: boolean;
  badgetxt?: string;
  active?: boolean;
  children?: any[];
  bookmark?: boolean;
  menutitle?: string;
  menucontent?: string;
}
export interface IMenuList {
  menutitle: string;
  menucontent: string;
  Items: IMenu[];
}
