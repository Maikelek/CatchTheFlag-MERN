#  PHP APP for level 11

## Users are supposed to get **ID** of user **"Michal Priemerný"**, who has the ID **6352362**
#

### This is web application written in PHP. Involved in the game have to find **ID**, which is **FLAG** for this level.

* Every user is able to register and login in.
* Edit theirs profile. 
* Use search function to find user by id

#
#

### **POSSIBLE METHODS TO GET THE FLAG**
* SQL INJECTION - example 1 or 1 ( Creates query "SELECT * FROM `users` WHERE `id`= 1 or 1", basically means select every not empty row)
* Bruteforce ( Try every number from 1 to x to reach the goal )

#
# 


