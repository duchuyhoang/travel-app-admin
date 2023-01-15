import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

interface IPageHeader {
  children: React.ReactNode;
}

const PageHeader = ({ children }: IPageHeader) => {
  return (
    <Title style={{ marginBlockStart: "0px", fontWeight: 400 }}>
      {children}
    </Title>
  );
};

export default PageHeader;
