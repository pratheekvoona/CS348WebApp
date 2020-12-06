module.exports = {
	getClassesPage: (req, res) => {
			let query = "SELECT * FROM `class`"; // query database to get all the classes

			// execute query
			db.query(query, (err, result) => {
					if (err) {
							res.redirect('/');
					}
					res.render('view_classes.ejs', {
							title: 'Welcome to our DB | View Classes',
							classes: result
					});
			});
	},
};