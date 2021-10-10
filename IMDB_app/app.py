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


@app.route("/rating")
def rating():

    rating_csv = "graph1-highest_rated.csv"
    rating_df = pd.read_csv(rating_csv)
    rating_df = rating_df.sort_values("avg_vote", ascending=False)
    
    rating_data = rating_df.to_dict('records')


    return jsonify(rating_data)


@app.route("/profit")
def profit():

    profit_csv = "graph2-profit.csv"
    profit_df = pd.read_csv(profit_csv)
    
    profit_data = profit_df.to_dict('records')


    return jsonify(profit_data)


@app.route("/production")
def production():

    production_csv = "production.csv"
    production_df = pd.read_csv(production_csv)
    production_df = production_df.rename(columns={"0":"count"})
    
    production_data = production_df.to_dict('records')


    return jsonify(production_data)






if __name__ == "__main__":
    app.run(debug=True)


