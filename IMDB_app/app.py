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



@app.route("/analysis.html")
def analysis():

    
    return render_template("analysis.html")


@app.route("/machine learning.html")
def machine_learining():

    
    return render_template("machine learning.html")

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


@app.route("/votes")
def votes():

    votes_csv = "graph1-highest_rated.csv"
    votes_df = pd.read_csv(votes_csv)
    votes_df = votes_df.sort_values("votes", ascending=False)
    
    votes_data = votes_df.to_dict('records')


    return jsonify(votes_data)


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


@app.route("/budget")
def budget():

    budget_csv = "graph4-budget vs profit.csv"
    budget_df = pd.read_csv(budget_csv)
    
    budget_data = budget_df.to_dict('records')

    return jsonify(budget_data)


@app.route("/unfiltered_votes")
def unfiltered():

    unfiltered_votes_csv = "votes_unfiltered(profit vs rating).csv"
    unfiltered_votes_df = pd.read_csv(unfiltered_votes_csv)
    
    unfiltered_data = unfiltered_votes_df.to_dict('records')

    return jsonify(unfiltered_data)


@app.route("/filtered_votes")
def filtered():

    filtered_votes_csv = "votes_filtered(votes vs rating).csv"
    filtered_votes_df = pd.read_csv(filtered_votes_csv)
    
    filtered_data = filtered_votes_df.to_dict('records')

    return jsonify(filtered_data)


@app.route("/map")
def map():

    country_csv = "movies per country.csv"
    country_df = pd.read_csv(country_csv)
    country_df = country_df.rename(columns={"0":"count"})
    
    country_data = country_df.to_dict('records')

    return jsonify(country_data)


@app.route("/year")
def year():

    year_csv = "year list.csv"
    year_df = pd.read_csv(year_csv)
    
    year_data = year_df.to_dict('records')

    return jsonify(year_data)



if __name__ == "__main__":
    app.run(debug=True)


