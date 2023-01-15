import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  LaptopOutlined,
  PieChartFilled,
  UserOutlined,
  FileFilled,
} from "@ant-design/icons";
import React from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import routes from "constants/routes";
import "./index.css";

const { Header, Content, Sider } = Layout;

const items2: MenuProps["items"] = routes.map((item, index) => {
  return {
    key: item.path,
    icon: React.createElement(item.icon, {
      className: "sidebarIcon",
    }),
    label: (<Link to={item.path}>{item.label}</Link>) as any,
    children: null,
  };
});

const Sidebar = () => {
  const location = useLocation();

  return (
    <Sider width={300} style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={items2}
        selectedKeys={[location.pathname]}
      />
    </Sider>
  );
};
export default Sidebar;
