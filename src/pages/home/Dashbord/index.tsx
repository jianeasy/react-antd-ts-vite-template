import image from "@/assets/dashbord.jpg";
import styles from "./index.module.scss";
import Header from "@/components/Header";

export default () => {
  return (
    <div className={styles.container}>
      <Header title="主页"></Header>
      <img style={{ height: "calc(100% -100px)", width: "100%" }} src={image} />
    </div>
  );
};
