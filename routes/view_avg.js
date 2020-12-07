module.exports = {
	getAvgPage: (req, res) => {
			let query = "SELECT `reviews`.`professor_id`, first_name, last_name, avg(rating) as average_rating FROM `reviews` join `professor` on `reviews`.`professor_id` = `professor`.`professor_id` group by `reviews`.`professor_id`"; // query database to get all the professors

			// execute query
			db.query(query, (err, result) => {
					if (err) {
							res.redirect('/Average');
					}
					res.render('view_avg.ejs', {
							title: 'Welcome to our DB | View Average',
							avgs: result
					});
			});
	},
};