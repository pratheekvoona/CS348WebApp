module.exports = {
	getStudiesPage: (req, res) => {
			let query = "SELECT * FROM `study`"; // query database to get all the resources
			// execute query
			db.query(query, (err, result) => {
					if (err) {
							res.redirect('/');
					}
					res.render('view_study.ejs', {
							title: 'Welcome to our DB | View Reources',
							studies: result
					});
			});
	},
};