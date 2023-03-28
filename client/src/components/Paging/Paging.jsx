import { useDispatch } from "react-redux";
import { nextGroup, prevGroup } from "../../redux/actions/actions.js";
import styles from "./Paging.module.css";

const Paging = ({ currentPage }) => {
  const dispatch = useDispatch();

  const prevPage = () => {
    return dispatch(prevGroup(currentPage));
  };

  const nextPage = () => {
    return dispatch(nextGroup(currentPage));
  };

  return (
    <section className={styles.pageSwitch}>
      <div className={styles.paginationWrapper}>
        <ul className={styles.pagination}>
          <li>
            <button
              className={styles.prev}
              title="previous page"
              onClick={prevPage}
            >
              &#10094;
            </button>
          </li>
          <li>
            <button
              className={styles.active}
              title={`current page - page ${currentPage}`}
            >
              {currentPage}
            </button>
          </li>
          <li>
            <button
              className={styles.next}
              title="next page"
              onClick={nextPage}
            >
              &#10095;
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Paging;
