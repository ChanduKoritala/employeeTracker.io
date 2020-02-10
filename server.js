var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "schema"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

var viewOptions = [
    "View Departments",
    "View Roles",
    "View Employees",

    "Update Employee",
    "exit"
];

var addOptions = [
    "Department",
    "Role",
    "EmployeeName"

];

var updateOptions = [

    "First Name",
    "Last Name",
    "Role",
    "exit"

];

selectOptions();


function selectOptions() {
    inquirer.prompt({
        name: "search",
        type: "list",
        message: "Please choose one option from the below list",
        choices: viewOptions
    }).then(function (answer) {
        switch (answer.search) {
            case viewOptions[0]:
                departmentView();
                break;
            case viewOptions[2]:
                employeeView();
                break;
            case viewOptions[1]:
                roleView();
            break;

        }

        insertOptions();
    })
    
}
function insertOptions(){
    inquirer.prompt({
        name: "name",
        type: "list",
        message: "Please choose an option to insert",
        choices: addOptions
    }).then(function(answer){
        switch(answer.insert){
            case addOptions[0] :
                insertDepartment();
                break;

        }
    })
    
}

function departmentView() {
    connection.query("select * from department", function (err, result) {
        if (err) throw err;

        console.table(result);

        selectOptions();

    })
}

function employeeView() {
    var sqlStr = "SELECT first_name, last_name, title, salary FROM employee ";
    sqlStr += "LEFT JOIN role ";
    sqlStr += "ON employee.role_id = role.id"
    connection.query(sqlStr, function (err, result) {
        if (err) throw err;

        console.table(result)
            selectOptions();

        })
}

function roleView() {

    connection.query("select * from role", function (err, result) {
        if (err) throw err;

        console.table(result);
        selectOptions();
    })

}

function insertDepartment(data) {

    connection.query("INSERT INTO department SET", {
        name: data.name

    }, function(err, result){
        if (err) throw err;

        console.table(result);
        insertOptions();
    })

}