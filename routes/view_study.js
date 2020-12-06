module.exports = {
	getStudyPage: (req, res) => {
			let query = "SELECT * FROM `study`"; // query database to get all the professors

			// execute query
			db.query(query, (err, result) => {
					if (err) {
							res.redirect('/');
					}
					res.render('view_study.ejs', {
							title: 'Welcome to our DB | View Study',
							study: result
					});
			});
	},
};