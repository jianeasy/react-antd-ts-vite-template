import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { LocalStorageManager } from "@/utils";
import { useState } from "react";
export default ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const [storage] = useState(new LocalStorageManager("userInfo"));

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2>Codejoy</h2>
        <div>{title}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.create}>创建新项目</div>
        <div
          className={styles.logout}
          onClick={() => {
            storage.clear();
            navigate("/login");
          }}
        >
          退出登录
        </div>
      </div>
    </div>
  );
};
