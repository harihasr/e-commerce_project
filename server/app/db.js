'use strict';
var mysql = require('mysql');
var crypt = require('./crypt');
var config = require('../config/main');
var db = {};
// Creating a connection object for connecting to mysql database
var connection = mysql.createConnection({
    host: config.database_host,
    port: config.database_port,
    user: config.database_user,
    password: config.database_password,
    database: config.database_name
});

db.connection = connection;

//Connecting to database
db.connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

db.createUser = function (user, successCallback, failureCallback) {
    var passwordHash;
    crypt.createHash(user.password, function (res) {
        passwordHash = res;

        connection.query("INSERT INTO `dr_bombay`.`users` (`first_name`, `last_name`, `email_id`, `password`) VALUES ('" + user.first_name + "','" + user.last_name + "','" + user.email_id + "', '" + passwordHash + "');",
            function (err, rows, fields, res) {
                if (err) {
                    failureCallback(err);
                    return;
                }
                successCallback();
            });
    }, function (err) {
        failureCallback();
    });
};

db.findUser = function (user, successCallback, failureCallback) {
    var sqlQuery = "SELECT * FROM `dr_bombay`.users WHERE `email_id` = '" + user.email_id + "';";
    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        if (rows.length > 0) {
            successCallback(rows[0])
        } else {
            failureCallback('User not found.');
        }
    });
};

db.findUserById= function (id, successCallback, failureCallback) {
    var sqlQuery = "SELECT * FROM `dr_bombay`.users WHERE `user_id` = '" + id + "';";
    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        if (rows.length > 0) {
            successCallback(rows[0]);
        } else {
            failureCallback('User not found.');
        }
    });
};

db.updateUser = function (user, successCallback, failureCallback) {
    var passwordHash;
    crypt.createHash(user.password, function (res) {
        passwordHash = res;

        connection.query("UPDATE `dr_bombay`.users SET `first_name` = '" + user.first_name + "', `last_name`='"+user.last_name+"', `password` ='"+passwordHash+"' WHERE `email_id` = '" + user.email_id + "';",
            function (err, rows, fields, res) {
                if (err) {
                    failureCallback(err);
                    return;
                }
                successCallback();
            });
    }, function (err) {
        failureCallback();
    });

};

db.getProducts = function(product, successCallback, failureCallback){
    var sqlQuery = "SELECT * FROM `dr_bombay`.products;";
    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        if (rows.length > 0) {
            successCallback(rows);
        } else {
            failureCallback('Products does not exists.');
        }
    });
};

db.findProductById = function(productId, successCallback, failureCallback){
    var sqlQuery = "SELECT * FROM `dr_bombay`.products WHERE product_id = '" + productId + "';";
    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        if (rows.length > 0) {
            successCallback(rows[0]);
        } else {
            failureCallback('Product not found.');
        }
    });
};

db.addAddress = function(address, successCallback, failureCallback){
    var sqlQuery = "INSERT INTO `dr_bombay`.`address` (`address_line1`, `address_line2`, `city`, `state`, `zip_code`, `phone`, `user_id`) VALUES ('" + address.address_line1 + "','" + address.address_line2 + "','" + address.city + "', '" + address.state + "','"+address.zip_code+"','"+address.phone+"','"+address.user_id+"');";
    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback();
    });
};

db.updateAddress = function (address, successCallback, failureCallback) {
    var sqlQuery = "UPDATE `dr_bombay`.`address` SET `address_line1` = '" + address.address_line1 + "', `address_line2`='"+ address.address_line2 +"', `city` ='"+address.city+"', `state` ='"+address.state+"', `zip_code` ='"+address.zip_code+"', `phone` ='"+address.phone+"', `user_id` ='"+address.user_id+"' WHERE `address_id` = '" + address.address_id + "';";

    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback();
    });
};

db.getAddress = function (user, successCallback, failureCallback) {
    var sqlQuery = "SELECT * from `dr_bombay`.address WHERE `user_id` = '"+user.user_id+"'";

    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback(rows);
    });
};

module.exports = db;