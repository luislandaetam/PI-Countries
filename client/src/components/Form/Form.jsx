import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createActivity } from "../../redux/actions/actions.js";
import cameraIcon from "../../assets/cameraIcon.png";
import worldIcon from "../../assets/worldIcon.png";
import moonIcon from "../../assets/moonIcon.png";
import styles from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();

  let countries = useSelector((state) => state.filteredCountries);
  countries = countries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const [formState, setFormState] = useState({
    name: "",
    duration: "",
    difficulty: "",
    countries: [],
    season: "",
  });

  const handleChange = (event) => {
    if (event.target.name === "country" && event.target.value === "") {
      return;
    }
    if (event.target.name === "country") {
      for (let i = 0; i < formState.countries.length; i++) {
        if (formState.countries[i] === event.target.value) {
          return;
        }
      }
      setFormState({
        ...formState,
        countries: [...formState.countries, event.target.value],
      });
    } else {
      setFormState({ ...formState, [event.target.name]: event.target.value });
    }
  };

  const eliminateCountry = (event) => {
    setFormState({
      ...formState,
      countries: [...formState.countries].filter(
        (country) => country !== event.target.value
      ),
    });
  };

  const validation = ({ name, duration, difficulty, season, countries }) => {
    if (
      !name ||
      !duration ||
      !difficulty ||
      !season ||
      countries.length === 0
    ) {
      return false;
    }
    return true;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let validated = validation(formState);
    if (validated) {
      return dispatch(createActivity(formState));
    }
    return;
  };

  return (
    <div className={styles.addActivityContainer}>
      {/* ///////////////////////////////// ROTATING WORLD ///////////////////////////////// */}
      <img src={worldIcon} alt="World icon" className={styles.worldIcon} />

      {/* ///////////////////////////////// lEFT CONTAINER ///////////////////////////////// */}
      <div className={styles.leftContainer}>
        <h2>
          <img src={moonIcon} alt="Moon icon" className={styles.moonIcon} />
          Pangea
        </h2>
      </div>

      {/* ///////////////////////////////// RIGHT CONTAINER ///////////////////////////////// */}
      <form
        className={styles.rightContainer}
        method="post"
        onSubmit={handleFormSubmit}
      >
        <header>
          <h1>
            Tell the world the way to have the best experience in any country!
          </h1>

          {/* ///////////////////////////////// ACTIVITY'S NAME ///////////////////////////////// */}
          <div className={styles.set}>
            <div className={styles.activitysName}>
              <label htmlFor="activity's-name">Name</label>
              <input
                id="activity's-name"
                name="name"
                placeholder="Activity's name"
                type="text"
                value={formState.name}
                onChange={handleChange}
              />
            </div>

            {/* ///////////////////////////////// ACTIVITY'S PHOTO ///////////////////////////////// */}
            <div className={styles.activitysPhoto}>
              <button
                id="buttton-activity-upload"
                onClick={() => {
                  document.querySelector("#activity-upload").click();
                }}
              >
                <img src={cameraIcon} alt="camera icon" />
                <input
                  type="file"
                  name="photo"
                  id="activity-upload"
                  className={styles.uploadPicture}
                />
              </button>
              <label htmlFor="activity-upload">Upload a photo</label>
            </div>
          </div>

          {/* ///////////////////////////////// ACTIVITY'S DURATION ///////////////////////////////// */}
          <div className={styles.set}>
            <div className={styles.activitysDuration}>
              <label htmlFor="activity's-duration">Duration</label>
              <input
                id="activity's-duration"
                name="duration"
                placeholder="Activity's Duration"
                type="text"
                value={formState.duration}
                onChange={handleChange}
              />
            </div>

            {/* ///////////////////////////////// ACTIVITY'S DIFFICULTY ///////////////////////////////// */}
            <div className={styles.activitysDifficulty}>
              <label htmlFor="activity's-difficulty">Difficulty</label>
              <input
                id="activity's-difficulty"
                name="difficulty"
                placeholder="Number from 1 to 5"
                type="text"
                value={formState.difficulty}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ///////////////////////////////// ACTIVITY'S COUNTRY ///////////////////////////////// */}
          <div className={styles.set}>
            <div className={styles.activitysCountry}>
              <label htmlFor="activity's-country">Countries </label>
              <select
                name="country"
                id="activity's-country"
                onChange={handleChange}
              >
                <option value="">Choose at least one country</option>
                {countries.map((country, index) => {
                  return (
                    <option value={country.id} key={index}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* ///////////////////////////////// SELECTED COUNTRIES ///////////////////////////////// */}
          <div className={styles.set}>
            <div className={styles.selectedCountries}>
              {formState.countries.length > 0 &&
                formState.countries.map((country, index) => {
                  return (
                    <div className={styles.countryCard} key={index}>
                      <button
                        type="button"
                        onClick={eliminateCountry}
                        value={country}
                      >
                        X
                      </button>
                      <span>{country}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* ///////////////////////////////// ACTIVITY'S SEASON ///////////////////////////////// */}
          <div className={styles.activitysSeason}>
            <label htmlFor="activity's-season-spring">Season</label>
            <div className={styles.radioContainer}>
              <input
                id="activity's-season-spring"
                name="season"
                type="radio"
                value="Spring"
                onChange={handleChange}
              />
              <label htmlFor="activity's-season-spring">Spring</label>
              <input
                id="activity's-season-summer"
                name="season"
                type="radio"
                value="Summer"
                onChange={handleChange}
              />
              <label htmlFor="activity's-season-summer">Summer</label>
              <input
                id="activity's-season-fall"
                name="season"
                type="radio"
                value="Fall"
                onChange={handleChange}
              />
              <label htmlFor="activity's-season-fall">Fall</label>
              <input
                id="activity's-season-winter"
                name="season"
                type="radio"
                value="Winter"
                onChange={handleChange}
              />
              <label htmlFor="activity's-season-winter">Winter</label>
            </div>
          </div>
        </header>

        {/* ///////////////////////// BACK AND NEXT BUTTONS ///////////////////////////////// */}
        <footer>
          <div className={styles.set}>
            <Link to="/countries" className={styles.back}>
              Back
            </Link>
            <button type="submit" className={styles.next}>
              Next
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default Form;
