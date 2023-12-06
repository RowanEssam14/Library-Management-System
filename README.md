# Project Setup Guide

This guide will walk you through the steps to set up and run the application for this project.

## Prerequisites

- XAMPP installed on your machine.
- Visual Studio Code or any other code editor installed.

## Steps

1. **Start Apache and MySQL on XAMPP**: Open XAMPP and start the Apache and MySQL services.
2. **Import the Database**: Click on the 'Admin' button next to MySQL on XAMPP, which will open phpMyAdmin in your browser. Import the database file located at the specified path.
3. **Open the Project**: Open Visual Studio Code and navigate to the 'WebProject' directory of the project.
4. **Install Dependencies**: Open a terminal in Visual Studio Code and run the following command to install the project dependencies:
    ```
    npm install
    ```
5. **Start the Application**: Run the following command in the terminal to start the application:
    ```
    node app.js
    ```

## Test Data

You can use the following test data to log in to the User, Admin, and Librarian interfaces:

| Role       | LibraryID   | Password      |
|------------|-------------|---------------|
| admin      | 8204469813  | jP#L]87A%DEp  |
| admin      | 2180976745  | ~[w2Nx3I6p-@  |
| librarian  | 6744389998  | m;kx>Wb5@%v6  |
| librarian  | 8323314174  | ud`2.7QO-MH}  |
| librarian  | 8542318283  | %+/>^4)vdjp{  |
| user       | 1679118677  | DB*|ezz/|S6J  |
| user       | 2678587029  | NWIv(zD>;pi%  |
| user       | 6466420472  | ;0|}{aNk2zt-  |
| user       | 2625846989  | UVkQ~#Syxp#   |
| user       | 2988743582  | B@qs|p!MK^b`  |
| user       | 4749401442  | i;F_Q4u3hJP}  |
