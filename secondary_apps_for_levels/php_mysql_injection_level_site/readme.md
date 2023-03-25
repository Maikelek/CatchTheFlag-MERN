#  PHP APP for level 11

## Users are supposed to get **ID** of user **"Michal Priemerný"**, who has the ID **1041998**
#

### This is web application written in PHP. Involved in the game have to find **ID**, which is **FLAG** for this level.

* Every user is able to add new user into database.
* Every user is able to use search function to find user by id

#
#

### **POSSIBLE METHODS TO GET THE FLAG**
* SQL INJECTION - example 1 or 1 ( Creates query "SELECT * FROM `users` WHERE `id`= 1 or 1", basically means select every not empty row)
* Bruteforce ( Try every number from 1 to x to reach the goal )

#
# 


