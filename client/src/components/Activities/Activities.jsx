import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../redux/actions/actions.js";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Paging from "../Paging/Paging.jsx";
import Loader from "../Loader/Loader.jsx";
import Error404 from "../Error404/Error404.jsx";
import styles from "./Activities.module.css";

const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const currentPage = useSelector((state) => state.page);

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  return (
    <div>
      <SearchBar />
      <Paging currentPage={currentPage} />
      <section className={styles.cards}>
        {activities.length === 0 ? (
          <Loader />
        ) : activities[0] === "-2" ? (
          <Error404 />
        ) : (
          activities.map((activity, index) => {
            return (
              <div className={styles.card} key={index}>
                {/* <img src={} alt={`Flag: ${name}`} className={styles.img} /> */}
                <h2>{activity.name}</h2>
                <h3>{activity.season}</h3>
                <p>Duration: {activity.duration}</p>
                <p>Difficulty: {activity.difficulty}</p>
                <p>Countries: {activity.countries}</p>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default Activities;
