const fs = require('fs');

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

                let query = "INSERT INTO `class` (class_no, class_title) VALUES ('" +
                class_no + "', '" + class_title + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/Classes');
                });
             }
        });
        },
        deleteClass: (req, res) => {
            let id = req.params.id;
            console.log("Class_no is", id);
            let deleteUserQuery = 'DELETE FROM class WHERE class_no = "' + id +'"';
            
                
            db.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/Classes');
            });     
            
        }
	};