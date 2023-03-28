import error404UFO from "../../assets/error404UFO.png";
import styles from "./Error404.module.css";

const Error404 = () => {
  return (
    <div className={styles.error}>
      <img src={error404UFO} alt="404 error message" />
      <h2>
        The country you're trying to find doesn't exist... but it might have
        existed before... 👀🛸
      </h2>
    </div>
  );
};

export default Error404;
