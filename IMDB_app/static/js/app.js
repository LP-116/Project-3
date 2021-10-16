
// Function used to generate the Country and year dropdown lists.
function init() {

    d3.json("/country").then((item) => {

        country_list = []

        for (var i in item) {
                country_list.push(item[i].country)
                }

        var dropdownMenu = d3.select("#selDataset");

        var dropdownNames = country_list.sort();
        
        dropdownNames.forEach((item) => {
        dropdownMenu
            .append("option")
            .text(item)
            .property("value", item);
        });

    });

    d3.json("/year").then((item) => {

        year_list = []

        for (var i in item) {
                year_list.push(item[i].year)
                }

        var dropdownMenu = d3.select("#selDataset2");

        var dropdownNames = year_list;
        
        dropdownNames.forEach((item) => {
        dropdownMenu
            .append("option")
            .text(item)
            .property("value", item);
        });
        
        // Once the dropdown lists are generated, run the functions to build the graphs and update the stats.
        buildGraph();
        updatestats();
        buildGraph2()

    });
   
};


// This function builds the bar graphs in the introductory analysis section.
function buildGraph() {
    
    // Reading the votes route data.
    d3.json("/votes").then((data) => {

        // Clearing the existing chart space to avoid overlap issues.
        document.querySelector("#chart1").innerHTML = '<canvas id="myChart"></canvas>';

        // Getting the suburb value in the dropdown box.
        var idSelect = d3.select("#selDataset").property("value");
        var idSelect2 = d3.select("#selDataset2").property("value");

        console.log(idSelect);
        console.log(idSelect2);

        // Creating blank lists to hold results.
        movie_list = []
        votes_list = []
        year_list =[]

        // Everytime the country and year in the dropdown box is matched to the json data, push the required part into the matching list.
        for (var i in data) {


            if(data[i].country === idSelect && data[i].year === parseInt(idSelect2)){
                votes_list.push(data[i].votes)
                movie_list.push(data[i].original_title)
                year_list.push(data[i].year)
                
            }

            else if (data[i].country === idSelect && idSelect2 === "ALL"){
                votes_list.push(data[i].votes)
                movie_list.push(data[i].original_title)
            }

        }

        // Filter the list's to return top 5 results.
        var top5_movies= movie_list.slice(0,5);
        var top5_votes = votes_list.slice(0,5);

        console.log(top5_movies);
        console.log(top5_votes);

        // Create the graph using Chart.js
        var myChart = new Chart("myChart", {
        type: "horizontalBar",

        data: {
          labels: top5_movies,
          datasets: [{
            backgroundColor: 'rgba(230, 92, 0, 0.8)',
            borderColor: 'rgb(0, 0, 128)',
            borderWidth: 1,
            data: top5_votes,
            grouped: true, 
            maxBarThickness: 50, 
            label: "No. of votes",            
          }]
        },


        options: {

            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,

            title: {
                    display: true,
                    text: "Movies with most no. of votes",
                    fontSize: 16
                },
            
            scales: {
                    xAxes: [{
                    ticks: {
                    beginAtZero: false,
                    grouped: true,
                    userCallback: function (value, index, values) {
                        // Convert the number to a string and split the string every 3 charaters from the end
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);


                        // Convert the array to a string and format the output
                        value = value.join(',');
                        return value;}
                    
                },
                }]

            },
            
    }
})})

    // Reading the profit route data.
    d3.json("/profit").then((data) => {

        // Clearing the existing chart space to avoid overlap issues.
        document.querySelector("#chart2").innerHTML = '<canvas id="myChart1"></canvas>';

        // Getting the country and year value in the dropdown box.
        var idSelect = d3.select("#selDataset").property("value");
        var idSelect2 = d3.select("#selDataset2").property("value");

        console.log(idSelect);
        console.log(idSelect2);

        // Creating blank lists to hold results.
        movie_list = []
        profit_list = []

        // Everytime the country and year in the dropdown box is matched to the json data, push the required part into the matching list.
        for (var i in data) {


            if(data[i].country === idSelect && data[i].year === parseInt(idSelect2)){
                profit_list.push((data[i].worlwide_gross_income)/1000000)
                movie_list.push(data[i].original_title)
                
            }

            else if (data[i].country === idSelect && idSelect2 === "ALL"){
                profit_list.push((data[i].worlwide_gross_income)/1000000)
                movie_list.push(data[i].original_title)
            }

        }

        // Filter the list's to return top 5 results.
        var top5_movies2 = movie_list.slice(0,5);
        var top5_profit = profit_list.slice(0,5);

        console.log(top5_movies2);
        console.log(top5_profit);

        
        // Create the graph using Chart.js
       var myChart1 = new Chart("myChart1", {
        type: "horizontalBar",

        data: {
          labels: top5_movies2,
          datasets: [{
            backgroundColor: 'rgba(0, 153, 0, 0.8)',
            borderColor: 'rgb(0, 0, 128)',
            borderWidth: 1,
            data: top5_profit,
            grouped: true, 
            maxBarThickness: 50, 
            label: "Income ($'Million)",            
          }]
        },


        options: {

            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,

            title: {
                    display: true,
                    text: "Movies with the Highest Income",
                    fontSize: 16
                },
            
            scales: {
                    xAxes: [{
                    ticks: {
                    beginAtZero: false,
                    grouped: true,
                    userCallback: function (value, index, values) {
                        // Convert the number to a string and split the string every 3 charaters from the end
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);


                        // Convert the array to a string and format the output
                        value = value.join(',');
                        return '$' + value + "M";}
                }
                }]

            },

            
    }})

})

}

// This function is used to update the stats data (top 10 movies by rating).
function updatestats() {
    

    d3.json("/rating").then((data) => {

        // Getting the country and year value in the dropdown box.
        var idSelect = d3.select("#selDataset").property("value");
        var idSelect2 = d3.select("#selDataset2").property("value");

        // Creating blank lists to hold results.
        movie_list = []
        rating_list = []

        // Everytime the country and year in the dropdown box is matched to the json data, push the required part into the matching list.
        for (var i in data) {


            if(data[i].country === idSelect && data[i].year === parseInt(idSelect2)){
                rating_list.push(data[i].avg_vote)
                movie_list.push(data[i].original_title)
                
            }

            else if (data[i].country === idSelect && idSelect2 === "ALL"){
                rating_list.push(data[i].avg_vote)
                movie_list.push(data[i].original_title)
            }

        };

        // Splitting the results to show the top 5 for first half of the card.
        var top5_movies = movie_list.slice(0,5);
        var top5_ratings = rating_list.slice(0,5);

        // Creating a dictionary to store the rating and movie together
        var combined = top5_movies.map(function(e, i) {
            return [e, top5_ratings[i]];
          });

        console.log(combined)
        
        // Selecting the card.
        var infoBox = d3.select("#card1");

        // Clearing the existing data.
        infoBox.html("");

        number = 1

        combined.forEach(([key, value]) => {
            infoBox
                .append("h6")
                .text(number + ". " + key + ":   " + value)
                .append("br");

                number+=1
    
            });


        // Repeating the above steps for the second half of the card.
        var top10_movies = movie_list.slice(6,11);
        var top10_ratings = rating_list.slice(6,11);
    
        var combined2 = top10_movies.map(function(e, i) {
            return [e, top10_ratings[i]];
            });

        var infoBox2 = d3.select("#card2");

        infoBox2.html("");
        
        number = 6

        combined2.forEach(([key, value]) => {
                infoBox2
                    .append("h6")
                    .text(number + ". " + key + ": " + value)
                    .append("br")

                    number+=1
                });   


})
}

function buildGraph2() {
    
    // Reading the genre route data.
    d3.json("/genre").then((data) => {

        // Clearing the existing chart space to avoid overlap issues.
        document.querySelector("#chart3").innerHTML = '<canvas id="myChart3"></canvas>';

        // Getting the year value in the dropdown box.
        var idSelect3 = d3.select("#selDataset3").property("value");

        console.log(idSelect3);

        // Creating blank lists to hold results.

        genre_list = []
        income_list = []

        // Everytime the year in the dropdown box is matched to the json data, push the required part into the matching list.
        for (var i in data) {


            if(data[i].year === parseInt(idSelect3)){
                genre_list.push(data[i].genre)
                income_list.push(data[i].worlwide_gross_income/1000000000)
                
            }

            else if (idSelect3 === "ALL"){
                genre_list.push(data[i].genre)
                income_list.push(data[i].worlwide_gross_income)
            }

        }

        // Create the bar chart using chart.js
        var colors = ['rgb(230, 0, 0)', 'rgb(255, 128, 0)', 'rgb(0, 64, 255)', 'rgb(128, 0, 255)', 'rgb(0, 153, 0)', 'rgb(0, 204, 255)', 'rgb(255, 102, 204)']
        var myChart1 = new Chart("myChart3", {
        type: "bar",

        data: {
          labels: genre_list,
          datasets: [{
            backgroundColor: colors,
            borderColor: 'rgb(0, 0, 128)',
            borderWidth: 1,
            data: income_list,
            grouped: true, 
            maxBarThickness: 50, 
            label: "Income",            
          }]
        },


        options: {

            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,

            title: {
                    display: true,
                    text: "Movies genres with the highest income",
                    fontSize: 16
                },
            
            scales: {
                    yAxes: [{
                    ticks: {
                    beginAtZero: true,
                    grouped: true,
                    userCallback: function (value, index, values) {
                        // Convert the number to a string and split the string every 3 charaters from the end
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);


                        // Convert the array to a string and format the output
                        value = value.join(',');
                        return '$' + value +"B";}
                        
                }
                }]
            },

        }
    })
})
        // Reading the pie genre route data. 
        d3.json("/piegenre").then((data) => {

            // Clearing the existing chart space to avoid overlap issues.
            document.querySelector("#chart4").innerHTML = '<canvas id="myChart4"></canvas>';

            // Getting the year value in the dropdown box.
            var idSelect3 = d3.select("#selDataset3").property("value");

            console.log(idSelect3);

            // Creating blank lists to hold results.

            genre_list = []
            count_list = []

            // Everytime the year in the dropdown box is matched to the json data, push the required part into the matching list.
            for (var i in data) {


                if(data[i].year === parseInt(idSelect3)){
                    genre_list.push(data[i].genre)
                    count_list.push(data[i].original_title)
                    
                }

            }

            // Getting the top5 results.
            var top5_genre = genre_list.slice(0,5);
            var top5_count = count_list.slice(0,5);


            // creating the pie chart using chart.js.
            var myChart4 = new Chart("myChart4", {
                        type: 'pie',
                        data:  {
                        labels: top5_genre,
                        datasets: [{
                          label: 'Most movies made in year (TOP 5 Genres)',
                          data: top5_count,
                          backgroundColor: [
                            'rgb(230, 0, 0)',
                            'rgb(255, 128, 0)',
                            'rgb(0, 64, 255)',
                            'rgb(128, 0, 255)',
                            'rgb(0, 153, 0)'
                          ],
                            borderColor: 'rgb(0, 0, 128)',
                            borderWidth: 1,
                            hoverOffset: 4,
                         
                        }],
                    },
                        options: {
                            responsive: true,
                            legend: {
                                display: true,
                                position: 'right',
                                labels: {
                                    fontColor: "black",
                                    boxWidth: 20,
                                    padding: 20
                                }
                            },
                            title: {
                                display: true,
                                text: 'TOP 5 Genres (most movies made in selected year)',
                                fontSize: 16
                            },
                        }
                      
                   
            })
        })
    }



// Each time the drop down selection is changed, run the functions.
function optionChanged()
{ 
    buildGraph()
    updatestats()
    buildGraph2()

 }


function startSpinner1() {
    // Code to make the spinner start
    $("#filter-btn1").prop("disabled", true);
    $("#filter-btn1").html(
        `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp Loading...`
    );
}

function stopSpinner1() {
    // Code to make the spinner stop
    // (i.e., return the button to its original state)
    $("#filter-btn1").prop("disabled", false);
    $("#filter-btn1").html('&nbsp &nbsp &nbsp View Results &nbsp &nbsp &nbsp');
}


// Run the init function on webpage load.

init();

