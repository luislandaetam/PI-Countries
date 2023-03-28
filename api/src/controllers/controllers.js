const axios = require("axios");
const { Country, Activity } = require("../db.js");
const { Op } = require("sequelize");

///////////////////////////////////// API REQUEST //////////////////////////////////////////
const requestFromApi = async () => {
  let api = await axios.get("https://restcountries.com/v3/all");
  api = api.data?.map((country) => {
    return {
      id: country.cca3,
      name: country.name.common,
      flag: country.flags[0],
      continent: country.continents[0],
      capital: country.capital,
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    };
  });
  return api;
};

////////////////////////////// JOIN COUNTRY AND ACTIVITY ////////////////////////////////////////////////////

const joinCountryActivity = async () => {
  try {
    let country = await Country.findAll({
      include: {
        model: Activity,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    country = country.map((country) => {
      return {
        id: country.id,
        name: country.name,
        flag: country.flag,
        continent: country.continent,
        capital: country.capital,
        subregion: country.subregion,
        area: country.area,
        population: country.population,
        activity: country.activities?.map((element) => element.name),
      };
    });
    return country;
  } catch (error) {
    console.error(error.message);
  }
};
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////// ALL COUNTRIES //////////////////////////////////////////////

const getAllCountries = async () => {
  try {
    const bdd = await Country.findAll();
    if (bdd.length === 0) {
      const api = await requestFromApi();
      await Country.bulkCreate(api);
    }
    const allCountries = await joinCountryActivity();
    return allCountries;
  } catch (error) {
    console.error(error.message);
  }
};

////////////////////////// BY ID //////////////////////////

const getById = (id) => {
  try {
    return Country.findByPk(id, {
      include: {
        model: Activity,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

///////////////////////// BY NAME ////////////////////////////

const getByName = async (name) => {
  try {
    let countryByName = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    if (countryByName.length === 0) {
      throw new Error("Country does not exist");
    }
    return countryByName;
  } catch (error) {
    console.error(error.message);
  }
};

/////////////////////// GET ACTIVITIES //////////////////////

const getActivities = async () => {
  try {
    const activities = await Activity.findAll({
      include: {
        model: Country,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return activities;
  } catch (error) {
    console.error(error.message);
  }
};

////////////////////// POST ACTIVITIES ///////////////////////
const createActivity = async (
  name,
  difficulty,
  duration,
  season,
  countries
) => {
  try {
    let activity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    await activity.addCountry(countries);
    return activity;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getAllCountries,
  getById,
  getByName,
  getActivities,
  createActivity,
};
