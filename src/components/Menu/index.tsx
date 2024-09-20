import React, { useState } from "react";
import styles from "./index.module.scss";
import { LocalStorageManager } from "@/utils";

interface MenuItem {
  id: string;
  title: string;
  icon: string;
}

interface SideMenuProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  headerImage: string;
  defaultActiveItem: MenuItem;
}

const SideMenu: React.FC<SideMenuProps> = ({
  items,
  onItemClick,
  headerImage,
  defaultActiveItem,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(
    defaultActiveItem.id
  );
  const [storage] = useState(new LocalStorageManager("userInfo"));
  const userInfo: any = storage.getAll()[0];

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item.id);
    onItemClick(item);
  };

  return (
    <div className={styles.sideMenu}>
      <div className={styles.header}>
        <img src={headerImage} alt="Header" className={styles.headerImage} />
        <div className={styles.username}>{userInfo.username}</div>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li
              key={item.id}
              className={`${styles.item} ${
                selectedItem === item.id ? styles.itemSelected : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              <i className={`${styles.icon} ${item.icon}`}></i>
              <span className={styles.title}>{item.title}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;
