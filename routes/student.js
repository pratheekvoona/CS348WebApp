const fs = require('fs');
var { student } = require('../app.js');
console.log("Student is: ---------",student);

module.exports = {
    addStudentPage: (req, res) => {
        res.render('insert_student.ejs', {
            title: "Welcome to our DB | Add a new Student"
            ,message: ''
        });
    },
    addStudent: (req, res) => {

        let message = '';
        let puid = req.body.puid;
        let student_name = req.body.student_name;
        

        let puidQuery = "SELECT * FROM `student` WHERE puid ='" + puid + "' ";

        db.query(puidQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'PUID already exists';
                res.render('insert_student.ejs', {
                    message,
                    title: "Welcome to our DB | Add a new Student"
                });
            } else {

                let query = "INSERT INTO `student` (puid, student_name) VALUES ('" +
                puid + "', '" + student_name + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
             }
        });
    },
    editStudentPage: (req, res) => {
        let puid = req.params.id;
        // let query = "SELECT * FROM `student` WHERE puid = '" + puid + "' ";
        // db.query(query, (err, result) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     res.render('edit_student.ejs', {
        //         title: "Edit Student"
        //         ,student: result[0]
        //         ,message: ''
        //     });
        // });
        student.findAll({where: {puid: puid}}).then(student => {
            res.render('edit_student.ejs', {
                title: "Edit Student",
                student: student[0],
                message: ''
            });
        });
    },
    editStudent: (req, res) => {
        let puid = req.params.id;
        let student_name = req.body.student_name;
        let updated_student_puid = req.body.puid;
        

        // let query = "UPDATE `student` SET `puid` = '" + updated_student_puid + "', `student_name` = '" + student_name + "' WHERE `student`.`puid` = '" + puid + "'";
        // db.query(query, (err, result) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     res.redirect('/');
        // });
        student.findOne({where: {puid: puid}})
            .then(function(stud) {
                stud.update({
                    puid: updated_student_puid,
                    student_name: student_name
                });
            }).then(res.redirect('/'));
    },

    deleteStudent: (req, res) => {
        let puid = req.params.id;
        console.log("PuID is", puid);
        // let deleteUserQuery = 'DELETE FROM student WHERE puid = "' + puid +'"';


            
        // db.query(deleteUserQuery, (err, result) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     res.redirect('/');
        // });   
        student.findOne({where: {puid: puid}})
            .then(function(stud) {
                stud.destroy({});
            }).then(res.redirect('/'));
            
        
    }
 };