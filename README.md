# ELEMES SKILL TASK
## Online Learning Platform

## Fitur 
- List Course, Get Detail Course, Update Course, Add Course, Enroll Course
- List User, Delete User

Studi Kasus Online Learning Platform dimana user bisa melihat list course yang ada lalu user bisa Meng-Enroll Course yang ada. untuk melihat list course dan detail course user tidak perlu login terlebih dahulu, namun untuk Enroll Course User diharuskan login terlebih dahulu

## Tech Stack
Teknologi Yang Digunakan:
- [Express JS] - Node.js web application framework
- [DBMS MySQL]
- [GIT]
- [Cloudinary] 

## Installation

Install Node [Node.js](https://nodejs.org/) v14+.

Clone This Repository
```sh
git clone https://github.com/arifhnd/elemes-task.git
```

Install the dependencies.

```sh
cd elemes-task
npm i
npm i sequelize-cli -g
```
## setting database
Edit config untuk database pada file config/config.json, isi untuk database development saja
```sh
{
  "development": {
    "username": "root",
    "password": "null",
    "database": "database_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
## Jalankan migration dan seeder
```sh
sequelize db:migrate
sequelize db:seed:all
```

## User
Untuk list user yang bisa dipakai bisa dilihat di dokumentasi API pada link berikut https://handys05.gitlab.io/elemes-test-apidoc/#api-Home-User

## URL Aplikasi : http://localhost:4000