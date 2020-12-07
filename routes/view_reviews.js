module.exports = {
	getReviewsPage: (req, res) => {
			let query = "SELECT * FROM `reviews`"; // query database to get all the professors

			// execute query
			db.query(query, (err, result) => {
					if (err) {
							res.redirect('/');
					}
					res.render('view_reviews.ejs', {
							title: 'Welcome to our DB | View Reviews',
							reviews: result
					});
			});
	},
};