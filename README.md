# Project-3
## IMDB Analysis

#### To view a live version of the app please click [here](https://lpimdbapp.herokuapp.com/). 
*Note: The app is large and can be slow to load. It takes approximately 30-40 seconds to initialise the app.




---
## Aim

To create a web app based on an IMDB dataset and deploy the app to Heroku. 

The app will have 3 main sections as per below:
* An analysis section that shows the data in a graph format.
* A database section that allows users to search for a movie and returns the details for that movie.  
* A machine learning section that allows the user to predict a movie rating.

---
## Method

This project had 2 main parts: __Part 1: ETL process__ and __Part 2: App Creation__


### Part 1: ETL process

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


### Part 2: Creation

Once the smaller csv files were ready for app use I moved into the creation phase.

Firstly, a skeleton HTML file was created to outline where our visualisations would go and to give me a html file to work with.

Next we moved on to creating the app routes.
15 app routes were created that returned data in json format:

*	5 routes related to rendering the html pages
*	1 routes related to web scraping
*	3 route that was used to populate the drop down menu???s
*	5 routes were used to generate the graphs/stats sections
*	And lastly 1 route was used to generate the data required for a database tab.

The app routes read in the smaller csv files and then use the pandas to_dict method to convert the data into a dictionary.
The dictionary is then returned in a jsonified format.

The machine learning html page also contained code to use a saved model and the pass user input data through the model to generate a prediction.
More info on the machine learning process is found in the behind the scenes section.

__App creation tools:__

The below tools were used in creating the app:

* Python/Pandas - To complete the ETL process.
*	Scikit-Learn - To complete the machine learning section.
*	Tableau - To generate the comparative graph.
*	MongoDB - To store the web scraping data.
*	D3.js ??? To write the code that generated the visualisations.
*	Chart.js ??? The library used to generate the graphs.
*	Bootstrap ??? To design the html pages.
* Bootswatch ??? I used the Flatly theme.
*	HTML / CSS / JS ??? To format and generate the webpage.


### Functions of the app:

The __Welcome Page__ contains a stats section to give the user a sneak peek into some of the data insights. 
There is also a section on the welcome page that shows the current TOP movies at the Box Office. This is generated by scrapping the data from the IMDB website.
If the data is not up to date, the user can click the update details button to refresh the data.

In the middle section of the welcome page there are 3 buttons the user can choose from - they can click "View Analysis", "Explore the Database" or "Machine Learning - Movie Rating Predictor".

<img src="https://user-images.githubusercontent.com/82348616/137653112-af6f19fa-cc14-40af-8eff-52486690737f.PNG" width="700">


The __Analysis page__ contains 3 sections of graphs analysing the dataset.

Section 1 - Introductory Analysis

Here the user can select from country and year to update the graphs/stats section.

<img src="https://user-images.githubusercontent.com/82348616/137654949-c862840e-a81a-412c-bc80-5e9b3a93536d.PNG" width="700">


Section 2 - Comparative Analysis

For this section Tableau was used. There is a budget vs income graph and budger vs profit graph.
The user can select from year and filter by genre. The user can also read some data insights via the drop down boxes on the right hand side.

<img src="https://user-images.githubusercontent.com/82348616/137656388-69d86c68-02e5-487a-883a-4972be2b80cf.PNG" width="700">


Section 3 - Categorical Analysis

Here the user can select a year and update the graphs. The user can also read some data insights via the drop down boxes below the graphs.

<img src="https://user-images.githubusercontent.com/82348616/137656623-3902f67e-b8db-4746-b40c-4e054ab17d37.PNG" width="700">


The Machine Learning page allows users to make a movie rating prediction by inputting the parameters into the predictor. 
There are also examples provided for the user that they can try and see the result.

<img src="https://user-images.githubusercontent.com/82348616/137656742-ea8bd2da-cdc0-483f-95b8-249f0f5de2aa.PNG" width="700">
<img src="https://user-images.githubusercontent.com/82348616/137656763-4a0ae6f9-5c13-4b4a-a7a0-5309270efcc7.PNG" width="700" height="150">

And finally there is a __Database__ page that allows users to input/select a movie title and click a button to display details relating to the movie.

<img src="https://user-images.githubusercontent.com/82348616/137656901-a2dd5f25-4281-40e0-a9cc-720a0540e047.PNG" width="700">


### Behind the scenes:

To generate the graphs and stats the code uses the routes returned in a json data format. The route is passed in the d3.json command and then the code matches the value/values in the drop down box to the json data. Any time a match appears the required data is added into a list. In the case of the introductory bar graphs and the pie graph, the list is sliced to return the top 5 results. The list is then used as the variable for the graph axis???s.

The box office movie data scraping is completed by using BeautifulSoup and Splinter. The code grabs the data from the IMDB website and adds the title and profit into a separate list. The lists are then converted into a dictionary format and inserted into the MongoDb via a route.

The database tab is generated by creating the table based on filtered data based on the user input parameters. Each row of filtered data is added as a row in the table.

For the machine learning aspect of this project, I  decided to try and predict the movie rating based on certain parameters in the dataset.
The dataset is divided into training and testing data. Based on the training data a model is created that will be used to predict the movie rating. This is known as training the model. Once the model is trained, we can use the model to make predictions. The testing data is then used to make a movie rating prediction. We then compare the predicted movie rating with the actual movie rating to determine the accuracy of the model. To complete the machine learning task Scikit-Learn was used with the Random Forest Regressor algorithm.

Parameters used to make the prediction are: movie duration, number of votes the movie received, the movie metascore (which is the rating provided by critics) and the movie budget.

The code used to create the model can be found in the Development Code folder located in the main repository. 
Inside this folder is another folder called _Machine learning code used for app_.
This folder contains the file used to generate the model. Multiple linear regression algorithms were trialled including Ridge and Lasso but the Random Forest Regressor produced the best results. A variety of different parameters were also trialled before determining which ones yielded the best result.


---
## Result:

The app was successfully deployed to Heroku and can be accessed via the link below:
https://lpimdbapp.herokuapp.com/

As mentioned above, please be aware that the app is large and can be quite slow to load.

To view a live version of the app on your local machine, please clone this repository to your computer and follow the instructions on how to run the app.py file below.

Thank you.

---
## Running the app locally:


To run the app.py file please follow the below directions:
* Clone this repository to your computer.
* Create a virtual environment that has all the packages required (as listed in the requirements.txt file).
* In terminal navigate to the cloned repository location and activate the virtual environment that has all the packages required installed.
* In the terminal type ???python app.py??? to run the app on a live server.
* Navigate to the server location in the web browser

Example:

<img src="https://user-images.githubusercontent.com/82348616/137656536-b6947456-94d8-4177-9968-c97f33e33da0.PNG" width="400" height="150">

---
## Datasource:

https://www.kaggle.com/stefanoleone992/imdb-extensive-dataset

