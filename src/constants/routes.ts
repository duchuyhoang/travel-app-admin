import {
  LaptopOutlined,
  PieChartFilled,
  UserOutlined,
  FileFilled,
  LockFilled,
} from "@ant-design/icons";
import UserManagement from "pages/UserManagement";
import PostManagement from "pages/PostManagement";
import Statistical from "pages/Statistical";
import Logout from "pages/Logout";

const listRoutes = [
  {
    icon: UserOutlined,
    label: "User management",
    path: "/users",
    private: true,
    page: UserManagement,
  },
  {
    icon: FileFilled,
    label: "Post management",
    path: "/posts",
    private: true,
    page: PostManagement,
  },
  {
    icon: PieChartFilled,
    label: "Statistical",
    path: "/statistical",
    private: true,
    page: Statistical,
  },
  {
    icon: LockFilled,
    label: "Logout",
    path: "/logout",
    private: false,
    page: Logout,
  },
];

export default listRoutes;
