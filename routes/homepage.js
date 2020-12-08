module.exports = {
    getHome: (req, res) => {
        
            res.render('homepage.ejs', {
                title: 'Welcome to our DB | View Homepage',
                
            });
        
    },
};