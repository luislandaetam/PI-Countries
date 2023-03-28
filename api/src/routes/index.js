const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getAllCountries,
  getById,
  getByName,
  getActivities,
  createActivity,
} = require("../controllers/controllers.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const countryByName = await getByName(name);
      res.status(200).json(countryByName);
    } else {
      const allCountries = await getAllCountries();
      res.status(200).json(allCountries);
    }
  } catch (error) {
    return res.status(404).send(error);
  }
});

router.get("/countries/:id", async (req, res) => {
  let { id } = req.params;
  id = id.toUpperCase();
  const country = await getById(id);
  try {
    return res.status(200).json(country);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/activities/create", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  const createdActivity = await createActivity(
    name,
    difficulty,
    duration,
    season,
    countries
  );
  try {
    return res.status(200).send(createdActivity);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

router.get("/activities", async (req, res) => {
  const activities = await getActivities();
  try {
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

module.exports = router;
