module.exports = {
	getMostClassPage: (req, res) => {
			let query = "SELECT class_no, count(review) as count_rating FROM `reviews` group by `reviews`.`class_no`"; // query database to get all the professors

			// execute query
			db.query(query, (err, result) => {
					if (err) {
							res.redirect('/AverageRat');
					}
					res.render('view_most_prof.ejs', {
							title: 'Welcome to our DB | View Most reviewed class',
							most: result
					});
			});
	},
};