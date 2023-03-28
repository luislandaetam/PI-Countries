import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByActivity,
  filterByContinent,
  getAllCountries,
  sortAZ,
  sortHighest,
  sortLowest,
  sortZA,
  getActivities,
} from "../../redux/actions/actions.js";
import resetIcon from "../../assets/resetIcon.png";
import styles from "./Sorting.module.css";

const Sorting = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  let [continentFilter, setContinentFilter] = useState("all");
  let [activityFilter, setActivityFilter] = useState("all");

  const handleContinentFilter = (event) => {
    if (event !== continentFilter) {
      setContinentFilter(event.target.value);
      if (event.target.value !== "all") {
        return dispatch(filterByContinent(event.target.value));
      }
      return dispatch(getAllCountries());
    }
    if (continentFilter !== "all") {
      return dispatch(filterByContinent(continentFilter));
    }
    return dispatch(getAllCountries());
  };

  const handleActivityFilter = (event) => {
    if (event !== activityFilter) {
      setActivityFilter(event.target.value);
      if (event.target.value !== "all") {
        return dispatch(filterByActivity(event.target.value));
      }
      return dispatch(getAllCountries());
    }
    if (activityFilter !== "all") {
      return dispatch(filterByActivity(activityFilter));
    }
    return dispatch(getAllCountries());
  };

  const handleSort = (event) => {
    switch (event.target.value) {
      case "a-z":
        return dispatch(sortAZ());
      case "z-a":
        return dispatch(sortZA());
      case "highest":
        return dispatch(sortHighest());
      case "lowest":
        return dispatch(sortLowest());
      default:
        return handleContinentFilter(continentFilter);
    }
  };

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  return (
    <form
      className={styles.filterForm}
      onReset={() => {
        return dispatch(getAllCountries());
      }}
    >
      {/* FILTER BY CONTINENT NAME */}
      <section>
        <label htmlFor="continent-filter">Filter:</label>
        <select
          onChange={handleContinentFilter}
          name="continent-filter"
          id="continent-filter"
          defaultValue="all"
        >
          <option value="all">All</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>
      </section>
      {/* SORT BY COUNTRY NAME */}
      <section>
        <label htmlFor="name-order">Sort:</label>
        <select
          onChange={handleSort}
          name="name-order"
          id="name-order"
          defaultValue="no-order"
        >
          <option value="no-order">Order</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </section>
      {/* SORT BY POPULATION */}
      <section>
        <label htmlFor="population-order">Population:</label>
        <select
          onChange={handleSort}
          name="population-order"
          id="population-order"
          defaultValue="no-order"
        >
          <option value="no-order">Population</option>
          <option value="highest">Highest⬆️</option>
          <option value="lowest">Lowest⬇️</option>
        </select>
      </section>
      {/* FILTER BY ACTIVITY */}
      <section>
        <label htmlFor="activity-filter">Activity:</label>
        <select
          onChange={handleActivityFilter}
          name="activity-filter"
          id="activity-filter"
          defaultValue="all"
        >
          <option value="all">All</option>
          {activities.length > 0 &&
            activities.map((activity, index) => {
              return (
                <option value={activity.name} key={index}>
                  {activity.name}
                </option>
              );
            })}
        </select>
      </section>
      {/* RESET BUTTON */}
      <section>
        <button type="reset" className={styles.btn}>
          <img src={resetIcon} alt="Reset icon" className={styles.icon} />
        </button>
      </section>
    </form>
  );
};

export default Sorting;
