const mongoose= require("mongoose");

mongoose.connect('mongodb://localhost:27017/CoronaVirus', { useNewUrlParser:true},
(err) => {
    if(!err) {
        console.log("MongoDb Connected Successfully");
    } else {
        console.log("Error in Connection" + err);
    }
});

require("../models/coronaPatientDetails")