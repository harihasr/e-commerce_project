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

        connection.query("INSERT INTO  `users` (`first_name`, `last_name`, `email_id`, `password`) VALUES ('" + user.first_name + "','" + user.last_name + "','" + user.email_id + "', '" + passwordHash + "');",
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
    var sqlQuery = "SELECT * FROM  users WHERE `email_id` = '" + user.email_id + "';";
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
    var sqlQuery = "SELECT * FROM  users WHERE `user_id` = '" + id + "';";
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

        connection.query("UPDATE  users SET `first_name` = '" + user.first_name + "', `last_name`='"+user.last_name+"', `password` ='"+passwordHash+"' WHERE `email_id` = '" + user.email_id + "';",
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
    var sqlQuery = "SELECT * FROM  products;";
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
    var sqlQuery = "SELECT * FROM  products WHERE product_id = '" + productId + "';";
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
    var sqlQuery = "INSERT INTO  `address` (`address_line1`, `address_line2`, `city`, `state`, `zip_code`, `phone`, `user_id`) VALUES ('" + address.address_line1 + "','" + address.address_line2 + "','" + address.city + "', '" + address.state + "','"+address.zip_code+"','"+address.phone+"','"+address.user_id+"');";
    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback();
    });
};

db.updateAddress = function (address, successCallback, failureCallback) {
    var sqlQuery = "UPDATE  `address` SET `address_line1` = '" + address.address_line1 + "', `address_line2`='"+ address.address_line2 +"', `city` ='"+address.city+"', `state` ='"+address.state+"', `zip_code` ='"+address.zip_code+"', `phone` ='"+address.phone+"', `user_id` ='"+address.user_id+"' WHERE `address_id` = '" + address.address_id + "';";

    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback();
    });
};

db.getAddress = function (user, successCallback, failureCallback) {
    var sqlQuery = "SELECT * from  address WHERE `user_id` = '"+user.user_id+"'";

    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback(rows);
    });
};

db.getCart = function (user, successCallback, failureCallback) {
    var sqlQuery = "SELECT * from  cart WHERE `user_id` = '"+user.user_id+"'";

    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback(rows);
    });
};

db.addToCart = function (cart, successCallback, failureCallback) {
  var sqlQuery = "INSERT INTO  `cart` (`product_id`, `user_id`, `quantity`) VALUES ('" + cart.product_id + "','" + cart.user_id + "','"+cart.quantity+"');";

  connection.query(sqlQuery, function (err, rows, feild, res) {
     if(err){
         failureCallback(err);
         return;
     }
     successCallback();
  });
};

db.updateCart = function (cart, successCallback, failureCallback) {
  var sqlQuery = "UPDATE  `cart` SET `quantity` = '" + cart.quantity +"' WHERE `product_id` = '" + cart.product_id +"' and `user_id` ='" + cart.user_id + "';";
    connection.query(sqlQuery, function (err, rows, feild, res) {
        if(err){
            failureCallback(err);
            return;
        }
        successCallback();
    });
};

db.deleteCart = function (cart, successCallback, failureCallback) {
    var sqlQuery = "DELETE from  `cart` WHERE `product_id` = '" + cart.product_id +"' and `user_id` ='" + cart.user_id + "';";
    connection.query(sqlQuery, function (err, rows, feild, res) {
        if(err){
            failureCallback(err);
            return;
        }
        successCallback();
    });
};

db.getOrdersByUserID = function (user, successCallback, failureCallback) {
    //var sqlQuery = "SET @order_list = ''; CALL getOrdersByUserID('"+user.user_id+"',@order_list); select @order_list;";
    var sqlQuery = "select * from orders join order_details on orders.order_id = order_details.order_id join address on orders.address_id = address.address_id where orders.user_id ='"+user.user_id+"';";
    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback(rows);
    });
};

db.createOrder = function (order, successCallback, failureCallback) {
  var sqlQuery = " CALL create_order ('" + order.date + "','" + order.user_id + "','" + order.address_id + "');";

    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        if(rows[0]) {
            successCallback();
        }
        else{
            failureCallback("Error updating the data base details for user: "+order.user_id);
        }
    });
};

db.getAllOrders = function (successCallback, failureCallback) {
    //var sqlQuery = "SELECT * from  orders;";
    var sqlQuery = "select * from orders join order_details on orders.order_id = order_details.order_id join address on orders.address_id = address.address_id";
    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback(rows);
    });
};

db.updateOrder = function (order, successCallback, failureCallback) {
    var sqlQuery = "UPDATE  `orders` SET `status` = '" + order.status +"' WHERE `order_id` = '" + order.order_id + "';";

    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        successCallback();
    });
};

module.exports = db;