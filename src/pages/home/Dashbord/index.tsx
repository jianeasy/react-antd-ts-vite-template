import image from "@/assets/dashbord.jpg";
import styles from "./index.module.scss";
import Header from "@/components/Header";

export default () => {
  return (
    <div className={styles.container}>
      <Header title=""></Header>
      <img style={{ height: "100%", width: "100%" }} src={image} />
    </div>
  );
};
