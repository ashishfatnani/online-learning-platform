const express = require('express');
const mongoose = require('mongoose');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const studentRouter = express();
const database = process.env.ATLAS_DB
const database_uri = process.env.ATLAS_CONNECTION_URI
const client = new MongoClient(database_uri, { useUnifiedTopology: true });
const db = client.db(database);
const student_collection = process.env.ATLAS_STUDENTS_COLLECTION
const { requireStudentOrAdminRole } = require('../common/role-based-access');
const { ObjectId } = require('mongodb');
const courses_collection = process.env.ATLAS_COURSES_COLLECTION
const publisher_collection = process.env.ATLAS_PUBLISHERS_COLLECTION
const admin_collection = process.env.ATLAS_ADMIN_COLLECTION;

studentRouter.post("/purchaseCourse/:courseId", requireStudentOrAdminRole, async (req, res) => {

    try {

        const courseId = req.params.courseId;

        // check student's account balance
        const checkStudent = await db.collection(student_collection).findOne({
            id: new ObjectId(req.student_id)
        })

        //check the fee of the course

        const checkCourse = await db.collection(courses_collection).findOne({
            _id: new ObjectId(courseId)
        })

        const courseName = checkCourse.course_title
        const courseFee = checkCourse.course_price
        const studentAccountBalance = checkStudent.balance
        const publisher_id = checkCourse.publisher_id



        if (studentAccountBalance > courseFee) {
            console.log('Student can purchase the purchase');

            deductMoneyFromStudentAccount(req.student_id, courseFee, studentAccountBalance, courseName);

            const publisherMoney = 0.8 * courseFee;
            const portalRevenue = 0.2 * courseFee;
            creditMoneyToPublisherAccount(publisher_id, publisherMoney); //- publisher_id
            creditMoneyToPortal(portalRevenue);


            res.json("success").status(200);

        } else
            res.send("Insufficient Balance in Student's account").status(200);

        console.log(`course fee ${checkCourse.course_price}`);
        console.log(`student balance - ${checkStudent.balance}`);


    } catch (error) {
        console.error(error);
    }
});


async function deductMoneyFromStudentAccount(student_id, courseFee, studentAccountBalance, courseName) {

    const remainingBalance = studentAccountBalance - courseFee;
    console.log(remainingBalance);

    await db.collection(student_collection).updateOne({
        id: new ObjectId(student_id)
    }, {
        $set: {
            balance: remainingBalance
        },

        $push: {
            courses_enrolled: [{ course_name: courseName, date_of_purchase: new Date() }]
        }



    });

}

async function creditMoneyToPublisherAccount(publisher_id, publisher_credit) {

    const currentBalanceOfPublisher = await db.collection(publisher_collection).findOne({ id: new ObjectId(publisher_id) });
    console.log(currentBalanceOfPublisher);
    const updatedBalance = currentBalanceOfPublisher.balance + publisher_credit;



    await db.collection(publisher_collection).updateOne({
        id: new ObjectId(publisher_id)
    }, {
        $set: {
            balance: updatedBalance,

        }
    })

}


async function creditMoneyToPortal(portal_credit) {

    const currentBalanceOfPortal = await db.collection(admin_collection).findOne({ _id: new ObjectId('6517111cb7844682c6b298c0')});
    console.log(currentBalanceOfPortal);
    const updatedBalance = currentBalanceOfPortal.total_revenue + portal_credit;



    await db.collection(admin_collection).updateOne({
        _id: new ObjectId('6517111cb7844682c6b298c0')
    }, {
        $set: {
            total_revenue: updatedBalance,

        }
    })

}

module.exports = studentRouter;