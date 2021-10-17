# Set up and dependencies.
import datetime as dt 
import numpy as np 
import pandas as pd 
import json
import os

from flask import Flask, jsonify, render_template, redirect, request
from flask_pymongo import PyMongo
import imdb_scrape
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
import pickle


# Create Flask
app = Flask(__name__)

app.config['MONGODB_URI'] = "mongodb+srv://imdb:TbeyYAZQ7TDzIYxY@imdb-app.bpkwb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongo = PyMongo(app, uri="mongodb+srv://imdb:TbeyYAZQ7TDzIYxY@imdb-app.bpkwb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")


with open('model.pkl', 'rb') as file:  
    model = pickle.load(file)


# Welcome page route.
@app.route("/")
def welcome():

    imdb_data = mongo.db.data.find_one()

    
    return render_template("index.html", imdb=imdb_data)


# Analysis page route.
@app.route("/analysis.html")
def analysis():

    
    return render_template("analysis.html")


# Machine learning route that reads in the user inputs and passes them through the model.
@app.route("/machine learning.html", methods=['GET', 'POST'])
def machine_learining():
    
    if request.method == 'POST':
        duration = request.form['duration']
        votes = request.form['votes']
        metascore = request.form['metascore']    
        budget = request.form['budget']

        pred = model.predict(np.array([[int(duration), int(votes.replace(',', '')), int(metascore), int(budget.replace(',', ''))]]))
        return render_template("machine learning.html", pred=("{:.1f}".format(pred[0])))


    return render_template("machine learning.html")

# Database route.
@app.route("/database.html")
def database():

    
    return render_template("database.html")

# Contact page route.
@app.route("/contact.html")
def contact():

    
    return render_template("contact.html")

# Route used for the web scraping.
@app.route("/scrape")
def scrape():

    get_data = imdb_scrape.scrape_all()

    mongo.db.data.update({}, get_data, upsert=True)

    return redirect("/")


# Route used for the movie rating graph.
@app.route("/rating")
def rating():

    rating_csv = "./csv_files/graph1-highest_rated.csv"
    rating_df = pd.read_csv(rating_csv)
    rating_df = rating_df.sort_values("avg_vote", ascending=False)
    
    rating_data = rating_df.to_dict('records')


    return jsonify(rating_data)


# Route used for the number of votes graph.
@app.route("/votes")
def votes():

    votes_csv = "./csv_files/graph1-highest_rated.csv"
    votes_df = pd.read_csv(votes_csv)
    votes_df = votes_df.sort_values("votes", ascending=False)
    
    votes_data = votes_df.to_dict('records')


    return jsonify(votes_data)


# Route used for the income graph.
@app.route("/profit")
def profit():

    profit_csv = "./csv_files/graph2-profit.csv"
    profit_df = pd.read_csv(profit_csv)
    
    profit_data = profit_df.to_dict('records')


    return jsonify(profit_data)


# Route used to populate the country drop down.
@app.route("/country")
def country():

    country_csv = "./csv_files/movies per country.csv"
    country_df = pd.read_csv(country_csv)
    country_df = country_df.rename(columns={"0":"count"})
    
    country_data = country_df.to_dict('records')

    return jsonify(country_data)


# Route used to populate the year drop downs.
@app.route("/year")
def year():

    year_csv = "./csv_files/year list.csv"
    year_df = pd.read_csv(year_csv)
    
    year_data = year_df.to_dict('records')

    return jsonify(year_data)


# Route used to complete the genre bar graph.
@app.route("/genre")
def genre():

    genre_csv = "./csv_files/genre.csv"
    genre_df = pd.read_csv(genre_csv)
    
    genre_data = genre_df.to_dict('records')

    return jsonify(genre_data)    


# Route used for the pie chart.
@app.route("/piegenre")
def piegenre():

    pie_csv = "./csv_files/pie-genre.csv"
    pie_df = pd.read_csv(pie_csv)
    
    pie_data = pie_df.to_dict('records')

    return jsonify(pie_data) 


# Route used for the database tab.
@app.route("/data")
def data():

    database_csv = "./csv_files/database.csv"
    database_df = pd.read_csv(database_csv)
    
    data = database_df.to_dict('records')

    return jsonify(data) 


# Route used to populate the movie title drop down menu.
@app.route("/title")
def title():

    title_csv = "./csv_files/titles.csv"
    title_df = pd.read_csv(title_csv)
    
    title_data = title_df.to_dict('records')

    return jsonify(title_data) 



if __name__ == "__main__":
    app.run(debug=True)


