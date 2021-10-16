function init() {

    d3.json("/country").then((item) => {

        // console.log(item)

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
        
        buildGraph();
        updatestats();
        buildGraph2()

    });
   
};


// This function builds the bar and line graphs.
function buildGraph() {
    
    // Reading the incidents route data.
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

        // Everytime the suburb in the dropdown box is matched to the json data, push the required part into the matching list.
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
                        // Convert the number to a string and splite the string every 3 charaters from the end
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

    // Reading the incidents route data.
    d3.json("/profit").then((data) => {

        // Clearing the existing chart space to avoid overlap issues.
        document.querySelector("#chart2").innerHTML = '<canvas id="myChart1"></canvas>';

        // Getting the suburb value in the dropdown box.
        var idSelect = d3.select("#selDataset").property("value");
        var idSelect2 = d3.select("#selDataset2").property("value");

        console.log(idSelect);
        console.log(idSelect2);

        // Creating blank lists to hold results.
        movie_list = []
        profit_list = []

        // Everytime the suburb in the dropdown box is matched to the json data, push the required part into the matching list.
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
                        // Convert the number to a string and splite the string every 3 charaters from the end
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

// This function is used to update the stats_data.
function updatestats() {
    

    d3.json("/rating").then((data) => {

        // Getting the suburb value in the dropdown box.
        var idSelect = d3.select("#selDataset").property("value");
        var idSelect2 = d3.select("#selDataset2").property("value");

        // Creating blank lists to hold results.
        movie_list = []
        rating_list = []

        // Everytime the suburb in the dropdown box is matched to the json data, push the required part into the matching list.
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

        var top5_movies = movie_list.slice(0,5);
        var top5_ratings = rating_list.slice(0,5);

        var combined = top5_movies.map(function(e, i) {
            return [e, top5_ratings[i]];
          });

        console.log(combined)
        
        d3.select("#cardyear").text(idSelect2)

        var infoBox = d3.select("#card1");

        infoBox.html("");

        number = 1

        combined.forEach(([key, value]) => {
            infoBox
                .append("h6")
                .text(number + ". " + key + ":   " + value)
                .append("br");

                number+=1
    
            });


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
    
    // Reading the incidents route data.
    d3.json("/genre").then((data) => {

        // Clearing the existing chart space to avoid overlap issues.
        document.querySelector("#chart3").innerHTML = '<canvas id="myChart3"></canvas>';

        // Getting the suburb value in the dropdown box.
        var idSelect3 = d3.select("#selDataset3").property("value");

        console.log(idSelect3);

        // Creating blank lists to hold results.

        genre_list = []
        income_list = []

        // Everytime the suburb in the dropdown box is matched to the json data, push the required part into the matching list.
        for (var i in data) {


            if(data[i].year === parseInt(idSelect3)){
                genre_list.push(data[i].genre)
                income_list.push(data[i].worlwide_gross_income)
                
            }

            else if (idSelect3 === "ALL"){
                genre_list.push(data[i].genre)
                income_list.push(data[i].worlwide_gross_income)
            }

        }

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
            label: "Profit",            
          }]
        },


        options: {

            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,

            title: {
                    display: true,
                    text: "Most Profitable Movies",
                    fontSize: 16
                },
            
            scales: {
                    yAxes: [{
                    ticks: {
                    beginAtZero: true,
                    grouped: true,
                    userCallback: function (value, index, values) {
                        // Convert the number to a string and splite the string every 3 charaters from the end
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);


                        // Convert the array to a string and format the output
                        value = value.join(',');
                        return '$' + value;}
                }
                }]
            },

        }
    })
})

        d3.json("/piegenre").then((data) => {

            // Clearing the existing chart space to avoid overlap issues.
            document.querySelector("#chart4").innerHTML = '<canvas id="myChart4"></canvas>';

            // Getting the suburb value in the dropdown box.
            var idSelect3 = d3.select("#selDataset3").property("value");

            console.log(idSelect3);

            // Creating blank lists to hold results.

            genre_list = []
            count_list = []

            // Everytime the suburb in the dropdown box is matched to the json data, push the required part into the matching list.
            for (var i in data) {


                if(data[i].year === parseInt(idSelect3)){
                    genre_list.push(data[i].genre)
                    count_list.push(data[i].original_title)
                    
                }

            }

            var top5_genre = genre_list.slice(0,5);
            var top5_count = count_list.slice(0,5);



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

