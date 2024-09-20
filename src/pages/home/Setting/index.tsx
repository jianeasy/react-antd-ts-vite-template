import image from "@/assets/设置.jpg";
import styles from "./index.module.scss";
export default () => {
  return (
    <div className={styles.container}>
      <img style={{ height: "100%", width: "100%" }} src={image} />
    </div>
  );
};
