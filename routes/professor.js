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
		}
	};