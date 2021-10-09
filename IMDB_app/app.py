# Set up and dependencies.
import datetime as dt 
import numpy as np 
import pandas as pd 
import json
import os

from flask import Flask, jsonify, render_template, redirect
from flask_pymongo import PyMongo
import imdb_scrape


# Create Flask
app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/imdb_app")


@app.route("/")
def welcome():

    imdb_data = mongo.db.data.find_one()

    
    return render_template("index.html", imdb=imdb_data)



@app.route("/scrape")
def scrape():

    get_data = imdb_scrape.scrape_all()

    mongo.db.data.update({}, get_data, upsert=True)

    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)


