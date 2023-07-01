import sqlite3

# connetion is use to create database and table and create colums in database
def connection():
    try:
        # if there is olready a file then it will not create a new sqlite file
        con = sqlite3.connect(database="todo.sqlite")
        cur = con.cursor()
        table1 = "create table todo(name text ,detail text)"

        cur.execute(table1)
        con.commit()
        con.close()
        return ("Tables created")
    except:
        return ("something went wrong in db,might be tabl(s) already exists")

# to add the user in database 
# by passing name and detail in this function
def add_data(name,detail):
    try:
        con = sqlite3.connect(database="todo.sqlite")
        cur = con.cursor()
        cur.execute("insert into todo(name,detail) values(?,?)",
                    (name,detail))
        con.commit()
        con.close()
        return True
    except:
        return False

# to delete the data from database by passing a argument which is name becouse name is use for indification
def delete_data(name):
    try:
        con = sqlite3.connect(database="todo.sqlite")
        cur = con.cursor()
        cur.execute("DELETE FROM todo WHERE name=?", (name,))
        con.commit()
        con.close()
        return True
    except:
        return False

# to update the data 
def update_data(update_name,detail,name):
    try:
        con = sqlite3.connect(database="todo.sqlite")
        cur = con.cursor()
        cur.execute("UPDATE todo SET name=?,detail=? where name=?", (update_name,detail,name))
        con.commit()
        con.close()
        return True
    except:
        return False

# show the data
def show_data():
    try:
        con = sqlite3.connect(database="todo.sqlite")
        cur = con.cursor()
        cur.execute("select * from todo")
        tup1 = cur.fetchall()
        con.close()
        return tup1
    except:
        return False
    
# to delete the data it is use only by administrator
def delete_data_all():
    try:
        con = sqlite3.connect(database="todo.sqlite")
        cur = con.cursor()
        cur.execute("DELETE FROM todo")
        con.commit()
        con.close()
        return True
    except:
        return False
