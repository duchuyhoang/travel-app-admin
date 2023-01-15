import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import logo from "../../logo.svg";
const { Header } = Layout;
const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const Navbar = () => {
  return (
    <>
      <Header className="header">
        <img
          src={logo}
          // className="App-logo"
          alt="logo"
          width={80}
          height={"100%"}
          style={{
            cursor: "pointer",
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
      </Header>
    </>
  );
};
export default Navbar;
