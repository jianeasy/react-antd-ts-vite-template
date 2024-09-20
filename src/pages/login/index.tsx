import { useState } from "react";
import styles from "./index.module.scss";
import loginHeadImage from "@/assets/login_head.png";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { LocalStorageManager } from "@/utils";

export default () => {
  const navigate = useNavigate();
  const [storage] = useState(new LocalStorageManager("userInfo"));
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          style={{ height: "100%", marginLeft: "100px" }}
          src={loginHeadImage}
        />
      </div>
      <div className={styles.loginform}>
        <LoginForm
          onSubmit={(values) => {
            if (values.username == "admin" && values.password == "codejoy1") {
              storage.add({ username: "admin" });
              navigate("/dashboard");
            }
          }}
        />
      </div>
      <div className={styles.content}></div>
    </div>
  );
};
