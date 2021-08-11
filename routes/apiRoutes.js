const router = require("express").Router();
const Workout = require("../models/workout.js");

//get workout
router.get("/api/workouts", (req , res) =>  {
    Workout.aggregate([
        {
            $addFields:{
                totalDuration:{
                    $sum: '$exercises.duration'
                }
            }
        }
    ]).then((data)=>{
        res.json(data)
    }).catch(err => res.json(err))

});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
      {
          $addFields:{
              totalDuration: {
                  $sum: '$exercises.duration'
              }
          }
      }
  ]).sort({_id:-1})
  .limit(7)
  .then((data)=>{
      res.json(data)
  }).catch(err=> res.json(err))
});

//route to create workout
router.post("/api/workouts", ( { body } , res) => {
   Workout.create({})
   .then(workouts => {
       res.json(workouts);
   })
   .catch(err => {
       res.status(400).json(err);
   });
});


//route to update 
router.put("/api/workouts/:id" , ({ body, params} , res)=> {
    Workout.findByIdAndUpdate(params.id, 
        { $push: { exercises: body}},
        {new:true, runValidators: true}
    ).then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })
})

//route to delete
router.delete('/api/workouts', ({body}, res)=>{
    Workout.findByIdAndDelete(body.id)
    .then(()=>{
        res.json(true)
    }).catch(err=> res.json(err))
})




module.exports = router;
