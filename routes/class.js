const fs = require('fs');

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
        

        let puidQuery = "SELECT * FROM `classes` WHERE class_no ='" + class_no + "' ";

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

                let query = "INSERT INTO `classes` (class_no, class_title) VALUES ('" +
                class_no + "', '" + class_title + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/Classes');
                });
             }
        });
		}
	};