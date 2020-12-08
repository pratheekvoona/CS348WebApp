const fs = require('fs');
var { study } = require('../app.js');

module.exports = {
    addStudyPage: (req, res) => {
        res.render('insert_study.ejs', {
            title: "Welcome to our DB | Add a new Link to a resource"
            ,message: ''
        });
    },
    addStudy: (req, res) => {

        let message = '';
        let puid = req.body.class_no;
        let student_name = req.body.study_link;
        

        let puidQuery = "SELECT * FROM `study` WHERE class_no ='" + puid + "' ";
        db.beginTransaction(function(err) {
            if (err) { //Transaction Error (Rollback and release db)
                db.rollback(function() {
                    
                    reject( err);
                });
            }
            db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED', function(err) {
            db.query(puidQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (result.length > 0) {
                    message = 'class_no already exists';
                    res.render('insert_study.ejs', {
                        message,
                        title: "Welcome to our DB | Add a new Link to a resource"
                    });
                } else {
    
                    // let query = "INSERT INTO `study` (class_no, study_link) VALUES ('" +
                    // puid + "', '" + student_name + "')";
                    let query = "INSERT INTO `study` (class_no, study_link) VALUES (?,?)";
                    db.query(query, [puid, student_name], (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/Study');
                    });
                 }
                db.commit(function(commitErr) {
                    if (commitErr) {
                        db.rollback(function() {
                            
                            reject(commitErr);
                        });
                    }
                    
                });
            });});
        });
        
        
    },
    editStudyPage: (req, res) => {
        let link = req.params.id;
        // let query = "SELECT * FROM `study` WHERE study_link = '" + link + "' ";
        // db.query(query, (err, result) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     res.render('edit_study.ejs', {
        //         title: "Edit Study"
        //         ,student: result[0]
        //         ,message: ''
        //     });
        // });
        
        study.findAll({where: {study_link   : link}}).then(mat => {
            res.render('edit_study.ejs', {
                title: "Edit Study",
                student: mat[0],
                message: ''
            });
        });
    },
    editStudy: (req, res) => {
        let link = req.params.id;
        let study_link = req.body.study_link;
        let updated_student_puid = req.body.class_no;
        

        // let query = "UPDATE `study` SET `class_no` = '" + updated_student_puid + "', `study_link` = '" + study_link + "' WHERE `study`.`study_link` = '" + link + "'";
        // db.query(query, (err, result) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     res.redirect('/Study');
        // });
        db.beginTransaction(function(err) {
            if (err) { //Transaction Error (Rollback and release db)
                db.rollback(function() {
                    
                    reject( err);
                });
            }
            db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED', function(err) {
            study.findOne({where: {study_link: link}})
            .then(function(prof) {
                prof.update({
                    class_no: updated_student_puid,
                    study_link: study_link
                });
            db.commit(function(commitErr) {
                if (commitErr) {
                    db.rollback(function() {
                        
                        reject(commitErr);
                    });
                }
                
            });
        }).then(res.redirect('/Study'));
        });  });
        
           
    },

    deleteStudy: (req, res) => {
        let link = req.params.id;
        console.log("PuID is", link);
        // let deleteUserQuery = 'DELETE FROM study WHERE study_link = "' + link +'"';


            
        // db.query(deleteUserQuery, (err, result) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     res.redirect('/Study');
        // });  
        db.beginTransaction(function(err) {
            if (err) { //Transaction Error (Rollback and release db)
                db.rollback(function() {
                    
                    reject( err);
                });
            }
            db.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED', function(err) {
            study.findOne({where: {study_link: link}})
            .then(function(mat) {
                mat.destroy({});
            db.commit(function(commitErr) {
                if (commitErr) {
                    db.rollback(function() {
                        
                        reject(commitErr);
                    });
                }
                
            });
        }).then(res.redirect('/'));
        }); });
        
            
    }
 };