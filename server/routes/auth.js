'use strict'
// Import dependencies
var passport = require('passport');
var express = require('express');
var config = require('../config/main');
var jwt = require('jsonwebtoken');
var crypt = require('../app/crypt');
var db = require('../app/db');
var apiRoutes = express.Router();

// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});

// API Route Section

// Bring in defined Passport Strategy
require('../config/passport')(passport);

//Protected authenticated route with JWT and get user details with id
apiRoutes.get('/profile/:id', requireAuth, function (request, response) {
    response.status(200).json({success: true, user_details: request.user});
});

apiRoutes.put('/profile/:id', requireAuth, function (request, response) {
    console.log(request.body);
    if (!request.body.email_id || !request.body.password || !request.body.first_name || !request.body.last_name) {
        response.status(400).json({success: false, message: 'Please enter email and password.'});
    } else {
        var updateUser = {
            email_id: request.body.email_id,
            password: request.body.password,
            first_name: request.body.first_name,
            last_name: request.body.last_name
        };

        // Attempt to update the user
        db.updateUser(updateUser, function (res) {
            response.status(201).json({success: true, message: 'Successfully updated the user.'});
        }, function (err) {
            return response.status(400).json({success: false, message: 'User does not exists.'});
        });
    }

});

apiRoutes.post('/address', requireAuth, function (request, response) {
    console.log(request.body);
    if(!request.body.address_line1 || !request.body.address_line2 || !request.body.city || !request.body.state || !request.body.zip_code || !request.body.phone){
        response.status(400).json({success: false, message: 'Please enter the details'});
    }else {
        var address = {
            address_line1: request.body.address_line1,
            address_line2: request.body.address_line2,
            state: request.body.state,
            city: request.body.city,
            zip_code: request.body.zip_code,
            phone: request.body.phone,
            user_id: request.user.user_id
        };

        db.addAddress(newUser, function (res) {
            response.status(201).json({success: true, message: 'Successfully added the address.'});
        }, function (err) {
            return response.status(400).json({success: false, message: 'Problem adding address'});
        });
    }

});

apiRoutes.put('/address/:address_id', requireAuth, function (request, response) {
    var address_id = request.params.address_id;

    console.log(request.body);
    if(!request.body.address_line1 || !request.body.address_line2 || !request.body.city || !request.body.state || !request.body.zip_code || !request.body.phone){
        response.status(400).json({success: false, message: 'Please enter the details'});
    }else {
        var address = {
            address_id: address_id,
            address_line1: request.body.address_line1,
            address_line2: request.body.address_line2,
            state: request.body.state,
            city: request.body.city,
            zip_code: request.body.zip_code,
            phone: request.body.phone,
            user_id: request.user.user_id
        };

        db.addAddress(newUser, function (res) {
            response.status(201).json({success: true, message: 'Successfully added the address.'});
        }, function (err) {
            return response.status(400).json({success: false, message: 'Problem adding address'});
        });
    }

});

apiRoutes.get('/address',requireAuth,function (request, response) {
    var user_id = request.user.user_id;
    console.log(request.body);
    var user = {
        user_id: user_id
    };

    db.getAddress(user_id,function (res) {
        response.status(200).json({success:true, address:res});
    }, function (err) {
        response.status(400).json({success:false, message:"Error retrieving address"});
    })
});

apiRoutes.get('/logout', requireAuth, function (req, res, next) {
    req.logout();
    res.status(200).json({success: true, message: 'Logged out successfully'});
});

//This checks if the user is not loggedIn for all the requests that follow
apiRoutes.use('/', notLoggedIn, function (req, res, next) {
   next();
});

apiRoutes.get('/register', function (request, response) {

    //response.status(200).json({success: true, csrfToken: request.csrfToken()});
    response.status(200).json({success: true});
});

// Register new users
apiRoutes.post('/register', function (request, response) {
    console.log(request.body);
    if (!request.body.email_id || !request.body.password || !request.body.first_name || !request.body.last_name) {

        return response.status(400).json({success: false, message: 'Please enter email and password.'});
    } else {
        var newUser = {
            email_id: request.body.email_id,
            password: request.body.password,
            first_name: request.body.first_name,
            last_name: request.body.last_name
        };

        // Attempt to save the user
        db.createUser(newUser, function (res) {

            return response.status(201).json({success: true, message: 'Successfully created new user.'});
        }, function (err) {

            return response.status(400).json({success: false, message: 'That email address already exists.'});
        });
    }
});

apiRoutes.get('/authenticate', function (request, response) {
    response.status(200).json({success: true, csrfToken: request.csrfToken()});
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
apiRoutes.post('/authenticate', function (request, response) {
    db.findUser({
        email_id: request.body.email_id
    }, function (res) {
        var user = {
            user_id: res.user_id,
            email_id: res.email_id,
            user_type: res.user_type,
            first_name: res.first_name,
            last_name: res.last_name
        };

        // Check if password matches
        crypt.compareHash(request.body.password, res.password, function (err, isMatch) {
            if (isMatch && !err) {
                // Create token if the password matched and no error was thrown
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 10080 // in seconds
                });
                response.status(200).json({success: true, token: 'JWT ' + token});
            } else {
                response.status(401).json({
                    success: false,
                    message: 'Authentication failed. Passwords did not match.'
                });
            }
        });
    }, function (err) {
        response.status(401).json({success: false, message: 'Authentication failed. User not found.'});
    });
});

// apiRoutes.get('/', function (request, response) {
//     response.send('It worked');
// });


module.exports = apiRoutes;

function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    }
    else {
        res.status(403).json({success: false, message: "User not logged in"});
    }
}
