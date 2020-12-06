module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `student`"; // query database to get all the students

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: 'Welcome to our DB | View Students',
                students: result
            });
        });
    },
};