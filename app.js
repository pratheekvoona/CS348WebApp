const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require("./config/config.json")[env];
const app = express();


const port = 1234;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cs348 group",
});

// Code for ORM Sequelize
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  var Student = sequelize.define(
    "student",
    {
      puid: Sequelize.INTEGER,
      student_name: Sequelize.TEXT,
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: "student",
    }
  );

  var Professor = sequelize.define(
    "professor",
    {
      professor_id: Sequelize.INTEGER,
      first_name: Sequelize.TEXT,
      last_name: Sequelize.TEXT
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: "professor",
    }
  );

  var Class = sequelize.define(
    "class",
    {
      class_no: Sequelize.INTEGER,
      class_title: Sequelize.TEXT,
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: "class",
    }
  );

  var Study = sequelize.define(
    "study",
    {
      class_no: Sequelize.INTEGER,
      study_link: Sequelize.TEXT,
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: "study",
    }
  );

  Student.removeAttribute('id');
  Professor.removeAttribute('id');
  Class.removeAttribute('id');
  Study.removeAttribute('id');


  module.exports = { student: Student, professor: Professor, class_var: Class, study: Study };

  const {getHomePage} = require('./routes/index');
const {addStudentPage, addStudent, deleteStudent, editStudent, editStudentPage} = require('./routes/student');
const {addClassPage, addClass, editClassPage, editClass} = require('./routes/class');
const {getClassesPage} = require('./routes/view_classes')
const {addStudyPage, addStudy, editStudyPage, editStudy} = require('./routes/study');
const {addProfessorPage, addProfessor, editProfessor, editProfessorPage, editReviewPage, editReview, deleteProfessor} = require('./routes/professor');
const {deleteReview} = require('./routes/professor');
const {deleteClass} = require('./routes/class');
const {deleteStudy} = require('./routes/study');
const {getProfessorsPage} = require('./routes/view_professors')
const {getReviewsPage} = require('./routes/view_reviews')
const {getStudiesPage} = require('./routes/view_study')
const {getAvgPage} = require('./routes/view_avg')
const {getAvgClassPage} = require('./routes/view_most')
const {getMostClassPage} = require('./routes/view_most_prof')
const {getTotPage} = require('./routes/view_total')
const {getHome} = require('./routes/homepage')
//   const { getHomePage } = require("./routes/index");
// const {
//   addStudentPage,
//   addStudent,
//   deleteStudent,
//   editStudent,
//   editStudentPage,
// } = require("./routes/student");
// const {
//   addClassPage,
//   addClass,
//   editClassPage,
//   editClass,
// } = require("./routes/class");
// const { getClassesPage } = require("./routes/view_classes");
// const {
//   addStudyPage,
//   addStudy,
//   editStudyPage,
//   editStudy,
// } = require("./routes/study");
// const {
//   addProfessorPage,
//   addProfessor,
//   editProfessor,
//   editProfessorPage,
//   editReviewPage,
//   editReview,
//   deleteProfessor,
// } = require("./routes/professor");
// const { deleteReview } = require("./routes/professor");
// const { deleteClass } = require("./routes/class");
// const { deleteStudy } = require("./routes/study");
// const { getProfessorsPage } = require("./routes/view_professors");
// const { getReviewsPage } = require("./routes/view_reviews");
// const { getStudiesPage } = require("./routes/view_study");
// const { getAvgPage } = require("./routes/view_avg");


//   Student.bulkCreate([{ puid: 100, student_name: "ANUJ" }])
//     .then(function () {
//       return Student.findAll();
//     })
//     .then(function (student) {
//       console.log(student);
//     });


// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.db = db;

// configure middleware
app.set("port", process.env.port || port); // set express to use this port
app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.set("view engine", "ejs"); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/home', getHome);
app.get('/add', addStudentPage);
app.get('/addClass', addClassPage);
app.get('/addProfessor', addProfessorPage);
app.get('/addStudy', addStudyPage);
app.get('/editReview/:id', editReviewPage);
app.get('/Classes', getClassesPage);
app.get('/Reviews', getReviewsPage);
app.get('/Average', getAvgPage);
app.get('/AverageRat', getAvgClassPage);
app.get('/MostRat', getMostClassPage);
app.get('/TotClas', getTotPage);
app.get('/Professors', getProfessorsPage);
app.get('/Study', getStudiesPage);
app.get('/edit/:id', editStudentPage);
app.get('/editStudy/:id', editStudyPage);
app.get('/editProfessor/:id', editProfessorPage);
app.get('/delete/:id', deleteStudent);
app.get('/deleteProfessor/:id', deleteProfessor);
app.get('/deleteReview/:id', deleteReview);
app.get('/deleteClass/:id', deleteClass);
app.get('/deleteStudy/:id', deleteStudy);
app.post('/add', addStudent);
app.post('/addClass', addClass);
app.post('/addStudy', addStudy);
app.post('/addProfessor', addProfessor);
app.post('/edit/:id', editStudent);
app.post('/editStudy/:id', editStudy);
app.post('/editProfessor/:id', editProfessor);
app.post('/editReview/:id', editReview);
app.get('/editClass/:id', editClassPage)
app.post('/editClass/:id', editClass);


// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


console.log("REached here");