create database procredit;
use procredit;

create table leads (
	id int auto_increment primary key,
    fio nvarchar(255) not null,
    phone nvarchar(255) not null,
    age int not null
);