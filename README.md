# Project-3
## IMDB Analysis

#### To view a live version of the app please click [here](https://lpimdbapp.herokuapp.com/).
*Note: The app can be slow to load due to it's size.  


---
### Aim

To create a web app based on an IMDB dataset and deploy the app to Heroku. 

The app will have 3 main sections as per below:
* An analysis section that shows the data in a graph format.
* A database section that allows users to search for a movie and returns the details for that movie.  
* A machine learning section that allows the user to predict a movie rating.

---
### Method

This project had 2 main parts.
__Part 1: ETL process__
__Part 2: App Creation__


#### Part 1: ETL process

__Extract:__
The main data source used in this project was an IMDB dataset found on Kaggle. The file contained over 85,000 lines and contained data up to the year 2020.

__Transform:__
Once the main csv file was extracted, it then needed to be transformed. 

To complete the project, I decided to create multiple smaller csv files that contained the information I required and therefore the transformation process was different depending on the data I required and the end result I was trying to achieve.
e.g. sometimes I would filter on country or certain genres and sometimes rows were removed due to missing data required.
In general all the csv files had the country column stripped to show the first main country where the movie was made and the genre column was also stripped to show the predominate genre.

To view the transformation files, please navigate to the Development Code folder located in the main repository. 
Inside this folder is another folder called _Pandas notebooks used for app_.
This folder contains the transformation of the csv file.

__Load:__

Due to the size of the dataset and the database limitations on Heroku, no database was used to store the data.
Instead, as mentioned above, multiple smaller csv files were generated.
These csv files were then loaded into the app route with python code. More detail on this process is found in the creation phase.


#### Part 2: Creation

Once the smaller csv files were ready for app use I moved into the creation phase.

Firstly, a skeleton HTML file was created to outline where our visualisations would go and to give me a html file to work with.

Next we moved on to creating the app routes.
15 app routes were created that returned data in json format:

*	5 routes related to rendering the html pages
*	1 routes related to web scraping
*	3 route that was used to populate the drop down menu’s
*	5 routes were used to generate the graphs/stats sections
*	And lastly 1 route was used to generate the data required for a database tab.

The app routes read in the smaller csv files and then use the pandas to_dict method to convert the data into a dictionary.
The dictionary is then returned in a jsonified format.

The machine learning html page also contained code to use a saved model and the pass user input data through the model to generate a prediction.
More info on the machine learning process is found in the behind the scenes section.

__App creation tools:__

The below tools were used in creating the app:
•	D3.js – To write the code that generated the visualisations.
•	Chart.js – The library used to generate the graphs.
•	Bootstrap – To design our html page
•	Bootswatch – We used the Flatly theme
•	Mapbox – To generate the maps with leaflet.
•	Leaflet – To generate the maps.
•	HTML / CSS / JS – To format and generate our webpage.


#### Functions of the dashboard:

* The dashboard allows users to select a suburb and the data updates accordingly.
* A bar graph showing the top 5 offences for the year 2021 appears and a line graph showing the total number of offences for the suburb selected for the past 10 years.
* A stats section shows the difference between total number of offences between 2021 and 2020.
* Interactive maps that shows incidents via suburb for the years 2021, 2020 and 2015
* The 5 latest news headlines are scraped from the Victorian crime news section and displayed on a moving banner at the top of the screen. The news headlines update when the button is clicked.
* A news tab is available that gives users more information about the news headline and provides a link to the story.
* A data tab is available for the users to look up a suburb and return the data in a table format.

#### Behind the scenes:
The make the dashboard work the code uses the routes returned in a json data format. The route is passed in the d3.json command and then the code matches the value in the drop down box to the json data. Any time a match appears the required data is added into a list. In the case of the bar graph, the list is sliced to returned the top 5 results and it is then used as the variable for the graph axis’s.

To generate the stats boxes the same process was followed. We return matches to the value in the dropdown box that also match the year 2021 and 2020. Some simple calculations are then done to determine the difference and all the values are simply added to their spot in the card by using d3.select and inserting text.

To generate the maps the data is again generated from the app routes. The circle markers are created using the data returned from the app route and different layer groups are created for each different year (which include the pop information). The base maps are created using mapbox and colors are applied to the map by defining different functions for the legend and circle markers.

The news scraping is completed by using BeautifulSoup and splinter. The code grabs the latest 5 stories and adds the title, url and description into a separate list. The lists are then converted into a dictionary format and inserted into the MongoDb via a route.

The data tab is generated by creating the table based on filtered data that is created when the user inputs the parameters. Each row of filtered data is added as a row in the table.

---
### Result:
Unfortunately, due to the size of the database we were not able to deploy on Heroku which has a limit of 10,000 rows. 
However, we are very happy with how the dashboard looks. 

<img src="https://user-images.githubusercontent.com/82348616/133033607-f087b9d7-195d-47bd-a79b-05ad89b60166.PNG" width="700">

<img src="https://user-images.githubusercontent.com/82348616/133033982-8ac64820-ee03-4fcf-ace1-0dc37ecfcfc8.PNG" width="700">
<img src="https://user-images.githubusercontent.com/82348616/133034004-66154aad-3829-479d-979a-292208875612.PNG" width="700">
<img src="https://user-images.githubusercontent.com/82348616/133034032-566b03ae-f87f-4637-8aa2-2c18fc79b31c.PNG" width="700">


![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/82348616/133033289-d8b3f3a2-068b-4803-bb7b-cec3144cfd85.gif)

To view a live version of the dashboard, please clone this repository to your computer and follow the instructions on how to run the app.py file.

Thank you.

---
### Running the app 

To set up the database:
Import the crime_db file into PGAdmin or follow the below steps to step up the database from scratch.

* In PGAdmin create a new database titled __crime_db__ and open a query window
* Navigate to the Database_creation folder
* Open the __Table_schema.sql__ file and copy and paste the code into the query window.
* Run the code to create the table.
* In the Database_creation folder create a new file called __login_info__ that contains your username and password for the PostgreSQL database.
* Open the database_upload.ipynb folder in Jupyter Notebook 
* Run each cell to import the csv’s into the database.
* In PGAdmin run the query “SELECT * FROM crime;
* A total of 319367 lines should be returned.

To run the app.py file please follow the below directions:
* Copy and paste the login_info file created during the database creation to the main folder of the repository (or alternatively create a new file containing your username and password for the PostgreSQL database).
* Create a virtual environment that has all the packages required (as listed in the requirements.txt file).
* In terminal navigate to the cloned repository location and activate the virtual environment that has all the packages required installed.
* Install the chart.js library by running __npm install chart.js__
* In the terminal type “python app.py” to run the app on a live server.
* Navigate to the server location in the web browser

Example:

<img src="https://user-images.githubusercontent.com/82348616/133034287-9dcbdacd-b616-4c1d-a44b-29020d075787.PNG" width="700">



