import { Link } from "react-router-dom";
import styles from "./CountryCards.module.css";

const CountryCards = ({ flag, name, continent, id }) => {
  return (
    <div className={styles.card}>
      <img src={flag} alt={`Flag: ${name}`} className={styles.img} />
      <Link to={`/countries/${id}`}>
        <h2>{name}</h2>
      </Link>
      <h3>{continent}</h3>
    </div>
  );
};

export default CountryCards;
