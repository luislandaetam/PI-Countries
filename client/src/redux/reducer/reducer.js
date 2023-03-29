import {
  GET_ALL_COUNTRIES,
  GET_BY_ID,
  GET_BY_NAME,
  GET_ACTIVITIES,
  SORT_A_TO_Z,
  SORT_Z_TO_A,
  HIGHEST_POPULATION,
  LOWEST_POPULATION,
  FILTER_BY_CONTINENT,
  NEXT_GROUP,
  PREV_GROUP,
  IS_LOADING,
  DOESNT_EXIST,
  CREATE_ACTIVITY,
  FILTER_BY_ACTIVITY,
} from "../actions/action-types.js";

const initialState = {
  countries: [],
  filteredCountries: [],
  page: 1,
  shownCards: [],
  countryDetail: {},
  activities: [],
  isLoading: true,
  createdActivity: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        filteredCountries: action.payload,
        shownCards: action.payload.slice(0, 10),
        countryDetail: {},
        page: 1,
        isLoading: false,
      };
    case GET_BY_NAME:
      return {
        ...state,
        filteredCountries: action.payload,
        shownCards: action.payload.slice(0, 10),
        page: 1,
        isLoading: false,
      };
    case DOESNT_EXIST:
      if (Array.isArray(action.payload)) {
        if (action.payload[0] === "-1") {
          return {
            ...state,
            filteredCountries: action.payload,
            shownCards: action.payload.slice(0, 10),
            page: 1,
            isLoading: false,
          };
        } else {
          return {
            ...state,
            filteredCountries: action.payload,
            activities: action.payload,
            shownCards: action.payload.slice(0, 10),
            page: 1,
            isLoading: false,
          };
        }
      } else {
        return {
          ...state,
          countryDetail: action.payload,
          isLoading: false,
        };
      }
    case SORT_A_TO_Z:
      const sortedAToZ = [...state.filteredCountries].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      return {
        ...state,
        filteredCountries: sortedAToZ,
        shownCards: sortedAToZ.slice(0, 10),
        page: 1,
        isLoading: false,
      };
    case SORT_Z_TO_A:
      const sortedZToA = [...state.filteredCountries].sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      return {
        ...state,
        filteredCountries: sortedZToA,
        shownCards: sortedZToA.slice(0, 10),
        page: 1,
        isLoading: false,
      };
    case HIGHEST_POPULATION:
      const sortedHighest = [...state.filteredCountries].sort((a, b) => {
        return b.population - a.population;
      });
      return {
        ...state,
        filteredCountries: sortedHighest,
        shownCards: sortedHighest.slice(0, 10),
        page: 1,
        isLoading: false,
      };
    case LOWEST_POPULATION:
      const sortedLowest = [...state.filteredCountries].sort((a, b) => {
        return a.population - b.population;
      });
      return {
        ...state,
        filteredCountries: sortedLowest,
        shownCards: sortedLowest.slice(0, 10),
        page: 1,
        isLoading: false,
      };
    case FILTER_BY_CONTINENT:
      const filteredContinent = [...state.countries].filter((country) => {
        return country.continent === action.payload;
      });
      return {
        ...state,
        filteredCountries: filteredContinent,
        shownCards: filteredContinent.slice(0, 10),
        page: 1,
        isLoading: false,
      };
    case FILTER_BY_ACTIVITY:
      const filteredActivity = [...state.countries].filter((country) => {
        return country.activity.includes(action.payload);
      });
      return {
        ...state,
        filteredCountries: filteredActivity,
        shownCards: filteredActivity.slice(0, 10),
        page: 1,
        isLoading: false,
      };
    case NEXT_GROUP:
      const totalCards = state.filteredCountries.length;
      const firstCardIndex = action.payload * 10;
      const nextPage = action.payload + 1;
      if (firstCardIndex < totalCards) {
        const nextCountries = state.filteredCountries.slice(
          firstCardIndex,
          firstCardIndex + 10
        );
        return {
          ...state,
          shownCards: nextCountries,
          page: nextPage,
          isLoading: false,
        };
      } else {
        return {
          ...state,
          isLoading: false,
        };
      }
    case PREV_GROUP:
      const prevPage = action.payload - 1;
      const firstIndex = (prevPage - 1) * 10;
      if (prevPage > 0) {
        const prevCountries = state.filteredCountries.slice(
          firstIndex,
          firstIndex + 10
        );
        return {
          ...state,
          shownCards: prevCountries,
          page: prevPage,
          isLoading: false,
        };
      } else {
        return {
          ...state,
          isLoading: false,
        };
      }
    case GET_BY_ID:
      return { ...state, countryDetail: action.payload, isLoading: false };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case CREATE_ACTIVITY:
      return { ...state, createdActivity: true };
    case IS_LOADING:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

export default reducer;
