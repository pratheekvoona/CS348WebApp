const fs = require('fs');

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
        

        let puidQuery = "SELECT * FROM `professor` WHERE prof_id ='" + prof_id + "' ";

        db.query(puidQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Professor already exists';
                res.render('insert_professor.ejs', {
                    message,
                    title: "Welcome to our DB | Add a new Professor"
                });
            } else {

                let query = "INSERT INTO `professor` (prof_id, class_no, first_name, last_name, rating) VALUES ('" +
                prof_id + "', '" + class_no + "', '" + first_name + "', '" + last_name + "', '" + rating + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/Professors');
                });
             }
        });
		}
	};