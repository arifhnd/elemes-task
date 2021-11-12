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

## File Environtment, create file .env pada root folder aplikasi dan isi dengan text yang dibawah ini
```sh
NODE_ENV=development
VERSION_CODE=v1.0
PORT=4000

# KEY SALT
SALT=MTglxbNoJCwZarZFFRfQGrlBViZNgkMQ
KEY_SECRET=AXoEfmAeNOpCKicI
PASSPHRASE=yCXlPu6MqfsJIEZtcF3oaSpD2Wjedhn7Hiwg5TkOUKR1BAV4Y0N8QzmrLxGvb9

# prefix logger
LOGGER_REQUEST=REQUEST_
LOGGER_RESULT=RESULT_
LOGGER_INFO=INFO_
LOGGER_WARNING=WARNING_
LOGGER_ERROR=ERROR_

#MAIL
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASSWORD=
MAIL_FROM=

#CHAR
CHAR=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
CHAR_NUMBER=0123456789

```

## Jalankan migration dan seeder
```sh
sequelize db:migrate
sequelize db:seed:all
```

## User
Untuk list user yang bisa dipakai bisa dilihat di dokumentasi API pada link berikut https://handys05.gitlab.io/elemes-test-apidoc/#api-Home-User

## URL Aplikasi : http://localhost:4000

## Testing Aplikasi
Untuk Testing Aplikasi, silahkan import file ELEMES TASK.postman_collection.json pada Postman. Lokasi file nya berada pada folder elemes-task/ELEMES TASK.postman_collection.json