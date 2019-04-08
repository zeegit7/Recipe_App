from flask import Flask,jsonify,request
from flaskext.mysql import MySQL
from flask_cors import CORS
import yaml


#setting app varibale o an instance of the flask class
#__name__ depicts name of the module
app = Flask(__name__)

#enabling cross origin requests
CORS(app, supports_credentials=True)


#importing config yaml file
db = yaml.load(open('db.yaml'))

#configuring db
app.config['MYSQL_DATABASE_HOST'] = db['mysql_host']
app.config['MYSQL_DATABASE_USER'] = db['mysql_user']
app.config['MYSQL_DATABASE_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DATABASE_DB'] = db['mysql_db']

#mysql object
mysql = MySQL(app)

@app.route("/", methods = ['GET'])
def get_recipes():
    cursor = mysql.get_db().cursor()
    result = cursor.execute("SELECT * from recipes;")
    if result > 0:
        recipes = cursor.fetchall()
        all_recipes = []
        for x in range(0,len(recipes)):
            new_recipe={
                'recipe_name' : recipes[x][0],
                'ingredients' : recipes[x][1],
                'instructions': recipes[x][2],
                'serving_size': recipes[x][3],
                'category' : recipes[x][4],
                'notes' : recipes[x][5],
                'date_added' : recipes[x][6],
                'date_modified' : recipes[x][7]
            }
            all_recipes.append(new_recipe)
            cursor.close()
        return jsonify(all_recipes),201
    return ('No data!'),400


@app.route("/", methods=["DELETE"])
def delete_recipe():
    req_data = request.get_json()
    recipe_name = req_data['recipe_name']
    print(recipe_name)
    conn = mysql.get_db()
    cursor = conn.cursor()
    del_query = "DELETE FROM recipes WHERE recipe_name LIKE %s"
    cursor.execute(del_query, recipe_name)
    conn.commit()
    cursor.close()
    return jsonify('Deleted the the result'),204
    


if __name__ == '__name__':
	app.run(debug=True)