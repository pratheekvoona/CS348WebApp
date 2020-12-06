const fs = require('fs');

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
		}
	};