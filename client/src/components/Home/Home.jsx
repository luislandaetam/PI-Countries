import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../../redux/actions/actions.js";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Sorting from "../Sorting/Sorting.jsx";
import Paging from "../Paging/Paging.jsx";
import Loader from "../Loader/Loader.jsx";
import Error404 from "../Error404/Error404.jsx";
import CountryCards from "../CountryCards/CountryCards.jsx";
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.shownCards);
  const currentPage = useSelector((state) => state.page);

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  return (
    <div>
      <SearchBar />
      <Sorting />
      <Paging currentPage={currentPage} />
      <section className={styles.cards}>
        {countries.length === 0 ? (
          <Loader />
        ) : countries[0] === "-1" ? (
          <Error404 />
        ) : (
          countries.map((country) => {
            return (
              <CountryCards
                key={country.id}
                id={country.id}
                flag={country.flag}
                name={country.name}
                continent={country.continent}
              />
            );
          })
        )}
      </section>
    </div>
  );
};

export default Home;
