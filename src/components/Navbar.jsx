import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { Button, Menu, Typography, Avatar } from "antd";
import icon from "../images/logo.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const menuItems = [
    {
      key: 1,
      label: <Link to={"/"}>Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: 2,

      label: <Link to={"/cryptocurrencies"}>Cryptocurrencies</Link>,
      icon: <FundOutlined />,
    },
    {
      key: 3,
      label: <Link to={"/news"}>News</Link>,
      icon: <BulbOutlined />,
    },
  ];

  return (
    <div className="nav-container">
      <div className="logo-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar src={icon} size="large" />
          <Typography.Title level={2} className="logo">
            <Link to="/">CryptoMania</Link>
          </Typography.Title>
        </div>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu
          theme="dark"
          items={menuItems}
          onClick={() => {
            screenSize <= 800 && setActiveMenu(!activeMenu);
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
