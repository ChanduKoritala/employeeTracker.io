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
    "Insert Options",
    "Update Employee",
    "exit"
];

var addOptions = [
    "Department",
    "Role",
    "EmployeeName"

];

var updateOptions = [

    "Click here"

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

            case viewOptions[3]:
                insertOptions();
                break;
            case viewOptions[4]:
                updateEmployeeOptions();
                break;
        }
    })
}

function insertOptions() {
    inquirer.prompt({
        name: "name",
        type: "list",
        message: "Please choose an option to insert",
        choices: addOptions
    }).then(function (answer) {
        switch (answer.name) {
            case addOptions[0]:
                insertDepartment();
                break;
            case addOptions[1]:
                insertRole();
                break;
            case addOptions[2]:
                insertEmployee();
                break;
        }

        
    })
    
};



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

function insertDepartment() {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter department: ",
    }).then(function (response) {
        connection.query("INSERT INTO department SET ?", {
            name: response.name
        }, function (err, result) {
            if (err) throw err;
            console.table(result);
            selectOptions();
        })
    })
    
};

function insertRole() {

    inquirer.prompt({

        name: "title",
        type: "input",
        message: "Enter Role: ",

    }).then(function (data) {

        connection.query("INSERT INTO role SET ?", {
            title: data.title

        }, function (err, result) {
            if (err) throw err;

            console.table(result);
            selectOptions();
        })

    })

};

function insertEmployee() {

    inquirer.prompt([
        {

            name: "firstName",
            type: "input",
            message: "Enter Employee's First Name: "

        },
        {
            name: "lastName",
            type: "input",
            message: "Enter Employee's last Name:"

        },
        {
            name: "title_id",
            type: "input",
            message: "Enter Employee's Title ID:"
        },
        {
            name: "manager_id",
            type: "input",
            message: "Enter Manager ID:"
        }

    ]).then(function (data) {

        connection.query("INSERT INTO employee SET ?", {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.title_id,
            manager_id: data.manager_id

        }, function (err, result) {
            if (err) throw err;

            console.table(result);
            selectOptions();
        })

    })

};

function updateEmployeeOptions() {
    inquirer.prompt({
        name: "name",
        type: "list",
        message: "Please choose an option to update: ",
        choices: updateOptions
    }).then(function (data) {
        switch (data.name) {
            case updateOptions[0]:
                updateEmployee()
                break;
        }
    });


}

function updateEmployee() {

    inquirer.prompt([

        {
            type: "input",
            message: "Enter Employee id to update: ",
            name: "empID",
        },
        {

            name: "firstName",
            type: "input",
            message: "Enter Employee's First Name: "

        },
        {
            name: "lastName",
            type: "input",
            message: "Enter Employee's last Name:"

        },
        {
            name: "role_id",
            type: "input",
            message: "Enter Role ID:"
        },
        {
            name: "manager_id",
            type: "input",
            message: "Enter Manager ID:"
        }

    ]).then(function (data) {

        var queryStr = `UPDATE employee SET first_name= '${data.firstName}', last_name= '${data.lastName}',`;
        queryStr += ` role_id = ${data.role_id}, manager_id = ${data.manager_id}`;
        queryStr += ` WHERE id = ${data.empID}`;

        connection.query(queryStr,
            function (err, result) {
                if (err) throw err;
                console.table(result);
                selectOptions();
            })

    })
};
