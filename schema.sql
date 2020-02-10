DROP DATABASE IF EXISTS `schema`;

create database `schema`;

use `schema`;

create table department(
id int not null auto_increment,
name varchar(200),
primary key(id)
);

create table role (
id int not null auto_increment,
title varchar(255),
salary dec(10,2),
department_id int,
foreign key(department_id) references department(id),
primary key(id)
);

create table employee(
id int not null auto_increment,
first_name varchar(255),
last_name varchar(255),
role_id int,
foreign key(role_id) references role(id),
manager_id int,
foreign key(manager_id) references employee(id),
primary key(id)
);

select * from department;
select * from role;
select * from employee;

INSERT into department (name)
VALUES ("R&D");
INSERT into department (name)
VALUES ("Production");
INSERT into department (name)
VALUES ("Marketing");
INSERT into department (name)
VALUES ("HR");
INSERT into department (name)
VALUES ("Accounting");

INSERT into role (title, salary, department_id)
VALUES ("Marketing Lead", 45000, 1);
INSERT into role (title, salary, department_id)
VALUES ("R&D Engineer", 43000, 2);
INSERT into role (title, salary, department_id)
VALUES ("Accountant", 50000, 3);
INSERT into role (title, salary, department_id)
VALUES ("Manager", 65000, 4);

INSERT into employee (first_name, last_name, role_id )
values ("Chandu", "Koritala", 1);
INSERT into employee (first_name, last_name, role_id )
values ("Srikar", "Pappala", 2);
INSERT into employee (first_name, last_name, role_id )
values ("Nick", "Dohnt", 3);
