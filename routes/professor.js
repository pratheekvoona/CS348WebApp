const fs = require('fs');
var { professor } = require('../app.js');
// TODO: Edit Class /editClass and Delete Class /deleteClass

module.exports = {
    addProfessorPage: (req, res) => {
        res.render('insert_professor.ejs', {
            title: "Welcome to our DB | Add a new Professor"
            ,message: ''
        });
    },
    addProfessor: (req, res) => {

        let message = '';
        let prof_id = req.body.prof_id;
        let class_no = req.body.class_no;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let rating = req.body.rating;
        let review = req.body.review;

        let profQuery = "SELECT * FROM `professor` WHERE professor_id ='" + prof_id + "' ";
        
        db.query(profQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length == 0) {
                let query = "INSERT INTO `professor` (professor_id, first_name, last_name) VALUES ('" +
                prof_id + "', '" + first_name + "', '" + last_name +  "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                });
            }
            let query2 = "INSERT INTO `reviews` (class_no, professor_id, rating, review) VALUES ('" + 
            class_no + "', '" + prof_id + "', '" + rating + "', '" + review +  "')";
            db.query(query2, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/Professors');
            });
        });
        },
        editProfessorPage: (req, res) => {
            let prof_id = req.params.id;
            //let query = "SELECT * FROM `professor` WHERE professor_id = '" + prof_id + "' ";
            // db.query(query, (err, result) => {
            //     if (err) {
            //         return res.status(500).send(err);
            //     }
            //     res.render('edit_professor.ejs', {
            //         title: "Edit professor"
            //         ,professor: result[0]
            //         ,message: ''
            //     });
            // });

            professor.findAll({where: {professor_id: prof_id}}).then(professor => {
                res.render('edit_student.ejs', {
                    title: "Edit Student",
                    professor: professor[0],
                    message: ''
                });
            });
        },
        editProfessor: (req, res) => {
            let professor_id = req.params.id;
            //let updated_professor_puid = req.body.prof_id;
            let updated_professor_first = req.body.first_name;
            let updated_professor_last = req.body.last_name;
            
    
            // let query = "UPDATE `professor` SET `first_name` = '" + updated_professor_first + "', `last_name` = '" + updated_professor_last + "' WHERE `professor`.`professor_id` = '" + professor_id + "'";
            // db.query(query, (err, result) => {
            //     if (err) {
            //         return res.status(500).send(err);
            //     }
            //     res.redirect('/Professors');
            // });

            professor.findOne({where: {professor_id: professor_id}})
            .then(function(prof) {
                prof.update({
                    first_name: updated_professor_first,
                    last_name: updated_professor_last
                });
            }).then(res.redirect('/'));
        },
        editReviewPage: (req, res) => {
            let prof_id = req.params.id;
            let query = "SELECT * FROM `reviews` WHERE professor_id = '" + prof_id + "' ";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('edit_review.ejs', {
                    title: "Edit review"
                    ,professor: result[0]
                    ,message: ''
                });
            });
        },
        editReview: (req, res) => {
            let professor_id = req.params.id;
            let updated_rating = req.body.rating;
            let updated_review = req.body.review;
            let updated_class_no = req.body.class_no;
            
    
            let query = "UPDATE `reviews` SET `rating` = '" + updated_rating + "', `review` = '" + updated_review + "' WHERE `reviews`.`professor_id` = '" + professor_id + "' AND `reviews`.`class_no` = '" + updated_class_no + "'";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/Reviews');
            });
        },

        deleteProfessor: (req, res) => {
            let professor_id = req.params.id;
            console.log("Prof_id is", professor_id);
            // let deleteUserQuery = 'DELETE FROM professor WHERE professor_id = "' + professor_id +'"';
            
                
            // db.query(deleteUserQuery, (err, result) => {
            //     if (err) {
            //         return res.status(500).send(err);
            //     }
            //     res.redirect('/Professors');
            // });    
            professor.findOne({where: {professor_id: professor_id}})
            .then(function(prof) {
                prof.destroy({});
            }).then(res.redirect('/')); 
            
        },
        deleteReview: (req, res) => {
            let id = req.params.id;
            console.log("Prof_id is", id);
            let deleteUserQuery = 'DELETE FROM reviews WHERE id = "' + id +'"';
            
                
            db.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/Reviews');
            });     
            
        }
	};