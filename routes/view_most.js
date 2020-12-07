module.exports = {
	getAvgClassPage: (req, res) => {
			let query = "SELECT class_no, avg(rating) as average_rating FROM `reviews` group by `reviews`.`class_no`"; // query database to get all the professors

			// execute query
			db.query(query, (err, result) => {
					if (err) {
							res.redirect('/MostRat');
					}
					res.render('view_most.ejs', {
							title: 'Welcome to our DB | View Average rating for a class',
							avgsrat: result
					});
			});
	},
};