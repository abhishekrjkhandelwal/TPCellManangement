let express  = require('express');
    router = express.Router(),
    userService = require('./userservice');
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");
    const dbConfig = require('./mysqlConfig')

    // sign up api
    router.post("/signup", (req, res, next) => {
      console.log(req.body.password);
      bcrypt.hash(req.body.password, 10).then(hash => {
        const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
              mobileno: req.body.mobileno
        };
        console.log(user.name);
        dbConfig.getDB().query('INSERT INTO users SET ?',user, function(error, results){
          if(error){
            res.send({
              "code": "400",
              "success": "Auth Falied"
            });
           }
           else if(results){
            res.send({
              "code": "200",
              "success": "Registeration Succussfully"
            });
           }
           else{
            res.send({
              "code": "400",
              "success": "Auth Failed"
            });
           }
        });
      });
  });

  // login api
  router.post("/login", (req, res) => {
    var fetchName;
    var fetchEmail;
     var email = req.body.email
     dbConfig.getDB().query('SELECT * FROM users WHERE email = ?',[email], function (error, results) {
      if(error){
        res.status(401).json({
        message: "Auth failed"
        });
        }
          fetchEmail = results[0].email;
          fetchName = results[0].name;
          console.log(fetchEmail);
          console.log(fetchName);
           if(results.length > 0) {
             bcrypt.compare(req.body.password, results[0].password , function(error,results) {
              if(error){
                res.status(401).json({
                message: "Auth failed"
                });
                }
               if(results){
              const token = jwt.sign(
                { email: fetchEmail },
                "secret_this_should_be_longer",
                { expiresIn: "1h" }
              );
              res.status(200).json({
                token: token,
                expiresIn: 3600,
                code : 200,
                name: fetchName,
              });
              }
            });
          }
        });
  });


    // adminlogin api
    router.post("/adminlogin", (req, res) => {
      var fetchName;
      var fetchEmail;
       var email = req.body.email
       console.log('email'+ email);
       dbConfig.getDB().query('SELECT * FROM admin WHERE email = ?',[email], function (error, results) {
        if(error){
          res.status(401).json({
          message: "Auth failed"
          });
          }
            fetchEmail = results[0].email;
            fetchName = results[0].name;
            console.log('fetchEmail' + fetchEmail);
            console.log('fetchName' + fetchName);
            console.log(fetchEmail);
            console.log(fetchName);
            console.log('password' + results[0].password);
             if(results.length > 0) {
               if(req.body.password == results[0].password) {
                 console.log('sdnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
                if(error){
                  res.status(401).json({
                  message: "Auth failed"
                  });
                  }
                 if(results){
                const token = jwt.sign(
                  { email: fetchEmail },
                  "secret_this_should_be_longer",
                  { expiresIn: "1h" }
                );
                console.log('token' + token);
                res.status(200).json({
                  token: token,
                  expiresIn: 3600,
                  code : 200,
                  name: fetchName,
                });
                }
              }
            }
          });
    });

// get user api
 router.get('/get-user', (req, res) => {
   userService.getUsers(req.query, (data) => {
     res.send(data);
   })
 })


/* api to get user by id */
router.get('/get-user-by-id', (req, res) => {
  userService.getUserByID(req.query, (data) => {
    res.send(data);
  })
})


/**Api to create user */
router.post('/create-user', (req, res) => {
  console.log("data is "+req.body);
  userService.createUser(req.body, (data) => {
      res.send(data);

  });
});

/**Api to delete the user */
router.delete('/delete-user', (req, res) => {
  userService.deleteUser(req.query, (data) => {
      res.send(data);
  });
});

// update user api
router.put('/update-user', (req, res) => {
  userService.updateUser(req.body, (data) =>{
    console.log(req.body);
    res.send(data);
  })
})

module.exports = router;
