# ESP AUTH ABSENT

Untuk versi bahasa Indonesia, [Klik ini](#penjelasan)

A school attendance system that compatible with ESP32 and ESP8266 Microcontroller that supports WiFi and HTTP POST Request

Runs on **Express.js** with Node.js

Compatible with [MySql Server](https://dev.mysql.com/downloads/mysql/) and [Firebase Firestore](https://firebase.google.com/docs/firestore/)

Can be run with other app, including **PHP** as long as they are in different ports

With version 2.1.1, now runs with MQTT Server running on [Aedes])(https://github.com/moscajs/aedes) which provide faster data transfer than http (Should have realized sooner)

## Contents

- [Requirements](#requirements)
- [Dependencies](#dependencies)
- [Initial Setup](#initial-setup)
  - [Identity Format](#identity-format)
  - [Process Environment](#process-environment)
- [Recommended Schemas](#recommended-schemas)

## Requirements

Requires NPM, to get NPM please install Node.js

[Download Node.js](https://nodejs.org/en/download/)

Requires the pm2 package enabled globally

```bash
```bash
npm i pm2 -g
```

## Dependencies

The application server used several packages:

1. [_body-parser_](https://www.npmjs.com/package/body-parser)
2. [_cors_](https://www.npmjs.com/package/cors)
3. [_dotenv_](https://www.npmjs.com/package/dotenv)
4. [_express_](https://www.npmjs.com/package/express)
5. [_express-rate-limit_](https://www.npmjs.com/package/express-rate-limit)
6. [_firebase-admin_](https://www.npmjs.com/package/firebase-admin)
7. [_helmet_](https://www.npmjs.com/package/helmet)
8. [_http_](https://www.npmjs.com/package/http)
9. [_mysql_](https://www.npmjs.com/package/mysql)
10. [_pm2_](https://www.npmjs.com/package/pm2)
11. [_util_](https://www.npmjs.com/package/util)
12. [_aedes_](https://www.npmjs.com/package/aedes)

## Initial Setup

Before starting the server, configure the **.env** file located inside the **server** folder

For more information about what each lines means go to [Process Environment](#process-environment)

1. Navigate to **server** folder

2. Install all required package library with npm
3. Configure the **.env** file
4. Start the test first
5. If you used MYSQL, you can import the test table for attendance located inside the **/server/mysql** folder
6. Add all your identities with their corresponding HexID inside the **identity.json** inside the **/server/auth** folder
7. Optionally you can run the Aedes MQTT server inside the **mq** folder and type **npm run start**

To install all package

```bash
npm i
```

To start the test

```bash
npm startmysql //If you are using mysql
npm startfirebase //If you are using firebase
```

To run the app, use **pm2** library that you have installed globally

```bash
pm2 start appDefault.js --name espAuth //If you are using mysql
pm2 start appFirebase.js --name espAuth //If you are using Firebase Firestore
```

### Identity Format

The **identity.json** file follows a specific format, you can change the format however you like to suit your database info

Reminder, if you don't use the recommended format, **You have to change all functions parameters and the queries**

However, there **should always have a hexID** key in every entry

The Format:
{
  "hexID": The holder card HexID,
  "name": The holder name
  "number": The holder attendance number,
  "division": The holder class,
  "type": The holder type
}

For type, it is used to specify if the holder is a master (Who should authorized attendance) or a follower (Who can only submit attendance if their master is already attend)

By default, the type are **member** and **kaichou**

### Process Environment

For definition what process environment in Node.js means, please refer to this [explanation from knowledgehut](https://www.knowledgehut.com/blog/web-development/node-environment-variables)

The **.env** file in **server** folders contain severals variables which will be used by the application

For ease of use, just edit the **.env** file, you may edit the **mysqlQuery.js** and **firebaseQuery.js** to suits your query needs

1. **_SERVER_PORT_** = Defines the port where the application runs, on default is **5128**
2. **_ESP_ORIGIN_** = Defines the IP Address of the ESP8266 or the ESP 32 or the client
3. **_MYSQL_HOST_** = Defines the host server of the MYSQL Database
4. **_MYSQL_USER_** = Defines the user who will be connected to the mysql host server
5. **_MYSQL_PASSWORD_** = Defines the password that will be used to connect to the mysql host server
6. **_MYSQL_DATABASE_** = Defines the Database that will be used from the Mysql Server
7. **_MYSQL_ABSENT_TABLE_** = Defines the table that will be used for attendance query (primarily for inserting new attendance)
8. **_FIREBASE_API_** = Defines the API key that will be used to connect to your Firebase Project
9. **_FIREBASE_AUTH_DOMAIN_** = Defines the authorized domains to connect to your firebase project
10. **_FIREBASE_PROJECT_ID_** = Defines the Id of your project that will be used by the app
11. **_FIREBASE_STORAGE_BUCKET_** = Defines the your firebase storage bucket
12. **_FIREBASE_MESSAGE_ID_** = Defines the Message Id of your Firebase project
13. **_FIREBASE_APP_ID_** = Defines the your app ID that will be used to connect to Firebase
14. **_FIREBASE_MEASUREMENT_ID_** = Defines the measurement ID of your firebase project
15. **_FIREBASE_KEYS_** = Defines your admin secret keys to use in Firebase

To know how to get the Firebase credentials, please refer to their [Documentation](https://firebase.google.com/docs/build)

## Recommended Schemas

You can customized the query inside the firebase / mysql Query.js files respectively to suits your schemas need

But if you want ease of use, please follow this recommended schemas

For MySQL
| userId| name          | absentNum | class |   type    | date  | status    |
|----   | ----          |---        | ---   | ---   |---    | ---   |
|int    | varchar(255)  | varchar   | char(5)| varchar  | Datetime  | char(8)   |

For FireStore

TBA

## Penjelasan

Sebuah sistem absensi sekolah yang kompatibel dengan mikrokontroller ESP8266 atau ESP32 yang mendukung fitur WiFi dan permintaan POST HTTP

Menggunakan **Express.js** dengan Node.js

Kompatibel dengan [MySql Server](https://dev.mysql.com/downloads/mysql/) dan [Firebase Firestore](https://firebase.google.com/docs/firestore/)

Dengan versi 2.1.1, sekarang berjalan dengan server MQTT menggunakan package [Aedes])(https://github.com/moscajs/aedes) yang memberikan kecepatan pertukaran data yang lebih cepat daripada HTTP (Seharusnya sudah sadar dari dulu)

## Konten

- [Hal yang Dibutuhkan](#hal-yang-dibutuhkan)
- [Package yang Digunakan](#package-yang-digunakan)
- [Setup Awal](#setup-awal)
  - [Format Identitas](#format-identitas)
  - [Lingkungan Process](#lingkungan-process)
- [Skema yang Direkomendasikan](#skema-yang-direkomendasikan)

## Hal yang Dibutuhkan

Membutuhkan NPM, untuk mendapatkan NPM unduh dan install Node.js pada sistem

[Download Node.js](https://nodejs.org/en/download/)

Membutuhkan package pm2 untuk dinyalakn secara global

```bash
npm i pm2 -g
```

## Package yang Digunakan

Aplikasi server membutuhkan beberapa package:

1. [_body-parser_](https://www.npmjs.com/package/body-parser)
2. [_cors_](https://www.npmjs.com/package/cors)
3. [_dotenv_](https://www.npmjs.com/package/dotenv)
4. [_express_](https://www.npmjs.com/package/express)
5. [_express-rate-limit_](https://www.npmjs.com/package/express-rate-limit)
6. [_firebase-admin_](https://www.npmjs.com/package/firebase-admin)
7. [_helmet_](https://www.npmjs.com/package/helmet)
8. [_http_](https://www.npmjs.com/package/http)
9. [_mysql_](https://www.npmjs.com/package/mysql)
10. [_pm2_](https://www.npmjs.com/package/pm2)
11. [_util_](https://www.npmjs.com/package/util)
12. [_aedes_](https://www.npmjs.com/package/aedes)

## Setup Awal

Sebelum memulai aplikasi server, Atur file **.env** yang terletak di dalam folder **server**

Untuk mengetahui apa arti dari setiap baris di dalam file **.env**, pergi ke [Lingkungan Process](#lingkungan-process)

1. Masuk ke dalam folder **server**

2. Install semua package yang dibutuhkan menggunakan npm
3. Atur file **.env**
4. Uji coba terlebih dahulu
5. Jika Anda menggunakan MYSQL, Anda bisa mengimpor tabel dari sebuah file yang terletak di dalam folder **/server/mysql**
6. Tambahkan semua identitas bersamaan dengan hexID mereka di dalam file **identity.json** di dalam direktori **/server/auth**
7. Secara opsional, Anda juga bisa menjalankan server MQTT yang berjalan dengan package Aedes dengan mengkases folder **mq** dan mengetik **npm run start**

Untuk menginstall semua package

```bash
npm i
```

Untuk memulai test

```bash
npm startmysql //Jika menggunakan mysql
npm startfirebase //Jika menggunakan firebase
```

Untuk menjalan aplikasi, gunakan pm2

```bash
pm2 start appDefault.js //Jika menggunakan mysql
pm2 start appFirebase.js //Jika menggunakan firebase
```

### Format Identitas

File **identity.json** mengikuti sebuah format spesifik, Anda bisa mengubah formatnya menjadi apapun yang Anda inginkan untuk menyesuaikan dengan kueri Anda

Perlu diketahui, jika Anda mengganti format yang direkomendasikan, **Anda juga perlu mengganti parameter fungsi dan kueri**

Walaupun demikian, **harus selalu ada sebuah kunci hexID** di dalam setiap entry

Formatnya:
{
  "hexID": Identitas heksadesimal si pemilik kartu,
  "name": Nama si pemilik kartu,
  "number": Nomor absensi si pemilik kartu,
  "division": Kelas si pemilik kartu,
  "type": Tipe si pemilik karti
}

Untuk type, dia digunakan untuk mendefinisikan apakah seseorang itu **master** (Orang yang memperbolehkan mulainya absensi untuk kelasnya) atau seorang **follower** (Orang yang bisa absen jika master sudah memperbolehkannya)

Secara default, isi dari type adalah **member** dan **kaichou**

### Lingkungan Process

Untuk mengetahui lebih lanjut apa maksud dari Lingkungan Process / Process environment di dalam Node.js, pergi ke [link ini](https://www.knowledgehut.com/blog/web-development/node-environment-variables)

Filre **.env** di dalam folder **server** berisikan beberapa variabel yang akan digunakan di dalam proses aplikasi

Untuk kenyamanan dalam kegunaan, sunting saja file **.env**, Anda bisa menyunting file **mysqlQuery.js** dan **firebaseQuery.js** untuk menyesuaikan kebutuhan kueri anda

1. **_SERVER_PORT_** = Mendefinisikan di port mana aplikasi berjalan, secara default aplikasi berjalan di port **5128**
2. **_ESP_ORIGIN_** = Mendefinisikan alamat sumber (alamat IP) dari ESP8266 atau ESP32 atau Client
3. **_MYSQL_HOST_** = Mendefinisikan host / server di mana database MySQL berada
4. **_MYSQL_USER_** = Mendifiniskan user yang akan terhubung ke database MySQL
5. **_MYSQL_PASSWORD_** = Mendefinisikan password dari MYSQL_USER yang digunakan untuk terhubung ke host
6. **_MYSQL_DATABASE_** = Mendefinisikan database apa yang akan digunakan
7. **_MYSQL_ABSENT_TABLE_** = Mendefinisikan tabel apa yang akan digunakan untuk menginsert data
8. **_FIREBASE_API_** = Mendefinisikan kunci API yang akan digunakan untuk terhubung ke Project Firebase Anda
9. **_FIREBASE_AUTH_DOMAIN_** = Mendifinisikan domain yang terautentikasi untuk terkoneksi ke Project Firebase Anda
10. **_FIREBASE_PROJECT_ID_** = Mendefinisikan ID Project dari Project Firebase Anda
11. **_FIREBASE_STORAGE_BUCKET_** = Mendefinisikan Storage Bucket dari Project Firebase Anda
12. **_FIREBASE_MESSAGE_ID_** = Mendefinisikan ID Message dari Project Firebase Anda
13. **_FIREBASE_APP_ID_** = Mendefinisikan ID App dari Project Firebase Anda
14. **_FIREBASE_MEASUREMENT_ID_** = Mendefinisikan ID Measurement dari Projek Firebase Anda
15. **_FIREBASE_KEYS_** = Mendefinisikan Kunci Admin Privat dari Projek Firebase Anda

Untuk mengetahui bagaimana mendapatkan kredensial dari Project Firebase, tolong rujuk ke [Dokumentasi Firebase](https://firebase.google.com/docs/build)

## Skema yang Direkomendasikan

Anda bisa mengkustomisasi kueri di dalam firebase / mysql Query.js untuk menyesuaikan dengan skema anda

Tetapi jika Anda ingin kemudahan dalam kegunaan, ikuti skema yang direkomendasikan di bawah

Untuk MYSQL
| userId| name          | absentNum | class |   type    | date  | status    |
|----   | ----          |---        | ---   | ---   |---    | ---   |
|int    | varchar(255)  | varchar   | char(5)| varchar  | Datetime  | char(8)   |

Untuk Firestore

TBA
