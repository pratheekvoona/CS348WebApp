const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addStudentPage, addStudent, deleteStudent, editStudent, editStudentPage} = require('./routes/student');
const {addClassPage, addClass, editClassPage, editClass} = require('./routes/class');
const {getClassesPage} = require('./routes/view_classes')
const {addStudyPage, addStudy} = require('./routes/study');
const {addProfessorPage, addProfessor, editProfessor, editProfessorPage, editReviewPage, editReview, deleteProfessor} = require('./routes/professor');
const {deleteReview} = require('./routes/professor');
const {deleteClass} = require('./routes/class');
const {getProfessorsPage} = require('./routes/view_professors')
const {getReviewsPage} = require('./routes/view_reviews')
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cs348 group'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/add', addStudentPage);
app.get('/addClass', addClassPage);
app.get('/addProfessor', addProfessorPage);
app.get('/addStudy', addStudyPage);
app.get('/editReview/:id', editReviewPage);
app.get('/Classes', getClassesPage);
app.get('/Reviews', getReviewsPage);
app.get('/Professors', getProfessorsPage);
app.get('/edit/:id', editStudentPage);
app.get('/editProfessor/:id', editProfessorPage);
app.get('/delete/:id', deleteStudent);
app.get('/deleteProfessor/:id', deleteProfessor);
app.get('/deleteReview/:id', deleteReview);
app.get('/deleteClass/:id', deleteClass);
app.post('/add', addStudent);
app.post('/addClass', addClass);
app.post('/addStudy', addStudy);
app.post('/addProfessor', addProfessor);
app.post('/edit/:id', editStudent);
app.post('/editProfessor/:id', editProfessor);
app.post('/editReview/:id', editReview);
app.get('/editClass/:id', editClassPage)
app.post('/editClass/:id', editClass);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});