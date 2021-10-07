# Set up and dependencies.
import datetime as dt 
import numpy as np 
import pandas as pd 
import json
import os


# Create Flask
app = Flask(__name__)




# Homepage Route. Grabs one entry from Mongo database for the news headlines.
@app.route("/")
def welcome():

    
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)


