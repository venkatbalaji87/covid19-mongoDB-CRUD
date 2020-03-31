const express = require("express");
const appRouter = express.Router();
const mongoose = require("mongoose");
const Patient = mongoose.model("coronauser");

appRouter.get("/", (req, res) => {
    res.render("patient/addoredit", {
        ViewTitle : "Insert Patient Details"
    });
});

appRouter.post("/", (req, res) => {
    if (req.body._id == '')
    insertPatientRecord(req, res);
        else
        updateRecord(req, res);
});


function insertPatientRecord(req, res) {
    const patient = new Patient();
    patient.name = req.body.name;
    patient.email = req.body.email;
    patient.age = req.body.age;
    patient.city = req.body.city;
    patient.symptoms = req.body.symptoms;
    patient.occupation = req.body.occupation;
    patient.gender = req.body.gender;
    patient.maritalStatus = req.body.maritalStatus;
    patient.save((err,doc) => {
        if(!err) {
            res.redirect('patient/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("patient/addOrEdit", {
                    viewTitle: 'Insert Patient',
                    patient: req.body
                });
            }
            else {
            console.log("Error during record insertion" + err);
        }
        }
    });    
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}


function updateRecord(req, res) {
    Patient.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('patient/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("patient/addOrEdit", {
                    viewTitle: 'Update Patient',
                    patient: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


appRouter.get('/:id', (req, res) => {
    Patient.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("patient/addOrEdit", {
                viewTitle: "Update Patient",
                employee: doc
            });
        }
    });
});

appRouter.get('/delete/:id', (req, res) => {
    Patient.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/patient/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});



appRouter.get("/list", (req, res) => {
    Patient.find((err, docs) => {
        if (!err) {
            res.render("patient/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


module.exports = appRouter;

//this is updated.