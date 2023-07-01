from flask import Flask, render_template, request, redirect,jsonify,flash

# import db is database python file for connect to database and peroform various task such that show ,update ,insert
import db


app = Flask(__name__, static_url_path='/static')
db.connection()

# index page router
@app.route('/')
def index():
     return render_template('todo.html')

# this router is use to insert data in database by getting name and user data
@app.route('/add', methods=['POST'])
def add():
    #name is use for task name
    name=request.json['user_input']
    # user_data is use for get detail of task
    user_data=request.json['user_data']

    # check if name is not empty
    if name == "":
        return redirect('/')
    else:
        #if data is not empty then add the data in database
        db.add_data(name, user_data)
        return redirect('/')

#this router is use for delete data from database
@app.route('/delete', methods=['POST'])
def delete():
    name = request.json['user_input']
    # data will be identify using name in database
    db.delete_data(name)
    return redirect('/')




# to update data 
@app.route('/update', methods=['POST'])
def update():
#there are three paramether update_name,detail,old_name 
#update name is new name of task
#detail is new detail of task
#old_name is to identify the data in database
    update_name = request.json['user_input']
    detail = request.json['user_data']
    old_name = request.json['old_data']

    try:
        # function of db to update data
        db.update_data(update_name,detail,old_name)
        return redirect('/')
    except:
        flash("not sucessfully update")
        return redirect('/')

# to show data 
@app.route('/api/todo')
def show():
    try:
        # fucntion in db to return all data in database
        data = db.show_data()
        #return data in json format to javascript
        return jsonify(data)
       
    except:
        return redirect('/')




if __name__ == "__main__":
    app.run(debug=True)
