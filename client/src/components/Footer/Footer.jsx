import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";
import email from "../../assets/email.png";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h5>Made by Luis Landaeta</h5>
      <h6>Copyright © 2023 Pangea Project</h6>
      <h6>Copyright © 2023 pangea-project.vercel.app</h6>
      <section className={styles.socialMedia}>
        <a
          href="https://www.linkedin.com/in/luislandaetam/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin} alt="linkedin" />
        </a>
        <a
          href="https://github.com/luislandaetam"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="github" />
        </a>
        <a
          href="mailto:luis.landaeta24@gmail.com?Subject=Interesado%20en%20tus%20servicios"
          target="_top"
        >
          <img src={email} alt="email" />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
