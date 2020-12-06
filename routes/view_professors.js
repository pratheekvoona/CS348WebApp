module.exports = {
	getProfessorsPage: (req, res) => {
			let query = "SELECT * FROM `professor`"; // query database to get all the professors

			// execute query
			db.query(query, (err, result) => {
					if (err) {
							res.redirect('/');
					}
					res.render('view_professors.ejs', {
							title: 'Welcome to our DB | View Professors',
							professors: result
					});
			});
	},
};