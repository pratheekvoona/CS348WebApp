const fs = require('fs');
var { class_var } = require('../app.js');
// TODO: Edit Class /editClass and Delete Class /deleteClass

module.exports = {
    addClassPage: (req, res) => {
        res.render('insert_class.ejs', {
            title: "Welcome to our DB | Add a new Class"
            ,message: ''
        });
    },
    addClass: (req, res) => {

        let message = '';
        let class_no = req.body.class_no;
        let class_title = req.body.class_title;
        

        let puidQuery = "SELECT * FROM `class` WHERE class_no ='" + class_no + "' ";

        db.query(puidQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Class already exists';
                res.render('insert_class.ejs', {
                    message,
                    title: "Welcome to our DB | Add a new Class"
                });
            } else {

                let query = "INSERT INTO `class` (class_no, class_title) VALUES (?,?)";
                db.query(query, [class_no, class_title], (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/Classes');
                });
             }
        });
        },
        editClassPage: (req, res) => {
            let class_no = req.params.id;
            // let query = "SELECT * FROM `class` WHERE class_no = '" + class_no + "' ";
            // db.query(query, (err, result) => {
            //     if (err) {
            //         return res.status(500).send(err);
            //     }
            //     res.render('edit_class.ejs', {
            //         title: "Edit Class"
            //         ,student: result[0]
            //         ,message: ''
            //     });
            // });

            class_var.findAll({where: {class_no: class_no}, attributes: {exclude: ['id']}}).then(clas => {
                res.render('edit_class.ejs', {
                    title: "Edit Class",
                    student: clas[0],
                    message: ''
                });
            });
        },
        editClass: (req, res) => {
            let class_no = req.params.id;
            let class_title = req.body.class_title;
            let updated_class_no = req.body.class_no;
            
    
            // let query = "UPDATE `class` SET `class_no` = '" + updated_class_no + "', `class_title` = '" + class_title + "' WHERE `class`.`class_no` = '" + class_no + "'";
            // db.query(query, (err, result) => {
            //     if (err) {
            //         return res.status(500).send(err);
            //     }
            //     res.redirect('/Classes');
            // });

            class_var.findOne({where: {class_no: class_no}})
            .then(function(clas) {
                clas.update({
                    class_no: updated_class_no,
                    class_title: class_title
                });
            }).then(res.redirect('/Classes'))
        },
        deleteClass: (req, res) => {
            let id = req.params.id;
            console.log("Class_no is", id);
            // let deleteUserQuery = 'DELETE FROM class WHERE class_no = "' + id +'"';
            
                
            // db.query(deleteUserQuery, (err, result) => {
            //     if (err) {
            //         return res.status(500).send(err);
            //     }
            //     res.redirect('/Classes');
            // });    
            
            class_var.findOne({where: {class_no: id}, attributes: {exclude: ['id']}})
            .then(function(clas) {
                clas.destroy({});
            }).then(res.redirect('/Classes'));
            
        }

	};