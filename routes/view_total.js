module.exports = {
	getTotPage: (req, res) => {
			let query = "SELECT count(*) as num FROM `reviews`"; // query database to get all the professors

			// execute query
			db.query(query, (err, result) => {
					if (err) {
							res.redirect('/TotClas');
					}
					res.render('view_total.ejs', {
							title: 'Welcome to our DB | View Total number of classes',
							tot: result
					});
			});
	},
};