const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


const userDataFilePath = path.join(__dirname, 'usersData.json');
let users = readUserDataFromFile();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', users });
});

//Endpoint for User
router.get('/user', function(req, res, next) {
 
  res.send('Hello, this is a GET endpoint for user!');
});

//Endpoint for Users
router.get('/users', function(req, res, next) {
  res.send('Hello, this is a GET endpoint for users!');
});

// Handle POST request to /submit
router.post('/addUser', function(req, res, next) {
  const submittedData = req.body.data;
  console.log(submittedData)
  res.render('submit', { title: 'Submission Successful', data: submittedData });
});


// Handle GET request to /submit
router.get('/submit', function(req, res, next) {
  res.render('submit', { title: 'Submission Page' });
});



router.post('/submit', function(req, res, next) {
  const { userId, userName, firstName, lastName, email, age } = req.body;
  const user = { userId, userName, firstName, lastName, email, age };
  users.push(user);
  writeUserDataToFile(users);
  // res.send("Data Stored Successfully");
  res.redirect('/');
});

// write data to the file
function writeUserDataToFile(userData) {
  fs.writeFile(userDataFilePath, JSON.stringify(userData, null, 2), (err) => {
    if (err) {
      console.error('Error writing user data to file:', err);
    } else {
      console.log('User data written to file successfully.');
    }
  });
}

//Read data to the file
function readUserDataFromFile() {
  try {
    const userData = fs.readFileSync(userDataFilePath, 'utf-8');
    return JSON.parse(userData) || [];
  } catch (err) {
    console.error('Error reading user data from file:', err);
    return [];
  }
}

module.exports = router;
