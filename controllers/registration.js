const Student = require("../models/Student");
const Publisher = require('../models/Publisher');
const bcrypt = require("bcrypt");
const saltRounds = 10; 

/*  @desc -> Create a student
    @route -> GET /api/v1/course
    @access -> New User 
*/

exports.registerStudent = async (req,res,next)=>{
    
    const isAlreadyExisting = await Student.findOne({ email: req.body.email });
        if (isAlreadyExisting) {
            res.send("Student Already Exists");
            res.status(200);
            return;
        }

        else{
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const result = await Student.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: encryptedPassword,
                role: req.body.role,
                balance: 1000,
                courses_enrolled: []
            });
 
            res.status(201).send(`Student Created Successfully with id ${result._id}`);

        }
}

exports.registerPublisher = async (req,res,next)=>{
    
    const isAlreadyExisting = await Publisher.findOne({ email: req.body.email });
    console.log(isAlreadyExisting);
        if (isAlreadyExisting) {
            res.send("Publisher Already Exists");
            res.status(200);
            return;
        }

        else{
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const result = await Publisher.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: encryptedPassword,
                role: req.body.role,
                balance: 0,
                amount_earned: 0,
                created_courses: [],
                amounts_earned_from_courses: 0
            });
 
            res.status(201).send(`Publisher Created Successfully with id ${result._id}`);

        }
}


