import { Link } from "react-router-dom";
import styles from "./CountryCards.module.css";

const CountryCards = ({ flag, name, continent, id }) => {
  return (
    <Link to={`/countries/${id}`}>
      <div className={styles.card}>
        <img src={flag} alt={`Flag: ${name}`} className={styles.img} />
        <h2>{name}</h2>
        <h3>{continent}</h3>
      </div>
    </Link>
  );
};

export default CountryCards;
