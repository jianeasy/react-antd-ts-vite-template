import image from "@/assets/班级管理.jpg";
import styles from "./index.module.scss";

export default () => {
  return (
    <div className={styles.container}>
      <img style={{ height: "100%", width: "100%" }} src={image} />
    </div>
  );
};
