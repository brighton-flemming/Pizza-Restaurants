from flask import Flask
from flask_migrate import Migrate
from models import db
from routes import create_app
from flask_cors import CORS

app = create_app()
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///newdb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
Migrate(app, db)

if __name__ =='__main__':
    app.run(port=4000,debug=True)