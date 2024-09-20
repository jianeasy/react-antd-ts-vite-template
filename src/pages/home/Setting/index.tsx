import image from "@/assets/设置.jpg";
import styles from "./index.module.scss";
import Header from "@/components/Header";

export default () => {
  return (
    <div className={styles.container}>
      <Header title="设置"></Header>
      <img style={{ height: "100%", width: "100%" }} src={image} />
    </div>
  );
};
