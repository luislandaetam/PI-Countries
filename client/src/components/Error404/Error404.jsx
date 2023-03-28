import error404UFO from "../../assets/error404UFO.png";
import error404Planet from "../../assets/error404Planet.png";
import styles from "./Error404.module.css";

const Error404 = () => {
  return (
    <>
      {window.location.pathname === "/countries" ||
      window.location.pathname === "/countries:id" ? (
        <div className={styles.error}>
          <img src={error404UFO} alt="404 error message" />
          <h2>
            The country you're trying to find doesn't exist... but it might have
            existed before... 👀🛸
          </h2>
        </div>
      ) : (
        <div className={styles.error}>
          <img src={error404Planet} alt="404 error message" />
          <h2>
            There's nothing to do in the whole planet... Maybe we should find
            another one 😒
          </h2>
        </div>
      )}
    </>
  );
};

export default Error404;
