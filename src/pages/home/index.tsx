import React from "react";
import styles from "./index.module.scss";
import headerImage from "@/assets/头像.png";
import { useNavigate, Outlet } from "react-router-dom";
import Menu from "@/components/Menu";
const menuItems = [
  { id: "dashboard", title: "主页", icon: "fas fa-home" },
  { id: "setting", title: "设置", icon: "fas fa-user" },
  { id: "user", title: "用户管理", icon: "fas fa-cog" },
  { id: "class", title: "班级管理", icon: "fas fa-cog" },
  { id: "course", title: "课程管理", icon: "fas fa-cog" },
  { id: "project", title: "作品管理", icon: "fas fa-cog" },
];
const App: React.FC = () => {
  const navigate = useNavigate();
  const handleItemClick = (item: {
    id: string;
    title: string;
    icon: string;
  }) => {
    const { id } = item;
    console.log("Clicked item:", item);
    navigate(id);
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftBar}>
        <Menu
          defaultActiveItem={menuItems[0]}
          items={menuItems}
          onItemClick={handleItemClick}
          headerImage={headerImage}
        ></Menu>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
