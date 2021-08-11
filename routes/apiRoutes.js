const router = require("express").Router();
const Workout = require("../models/workout.js");


router.get("api/workouts", (req , res) =>  {
    Workout.find().then(workouts => res.json(workouts))
    .catch(err => res.json(err));

});

router.


module.exports = router;
