create database pern_todo_db;

create table todo(
    todo_id serial primary key,
    description varchar(250)
)