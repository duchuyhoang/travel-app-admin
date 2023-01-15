import Sidebar from "components/SideBar/index";
import Navbar from "components/Navbar/index";
import { Layout } from "antd";
import { useLocation } from "react-router-dom";
interface ILayout {
  children: React.ReactNode;
}

const Container = ({ children }: ILayout) => {
  const location = useLocation();
  return (
    <Layout style={{ flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Layout>
        <Sidebar />
        <Layout style={{ padding: "36px" }}>{children}</Layout>
      </Layout>
    </Layout>
  );
};

export default Container;
