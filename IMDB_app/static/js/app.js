
function init() {

    d3.json("/map").then((item) => {

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

        // console.log(item)

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
        var top10_movies= movie_list.slice(0,10);
        var top10_votes = votes_list.slice(0,10);

        console.log(top10_movies);
        console.log(top10_votes);

        // Create the graph using Chart.js
        const barColors = ["#87CEEB", "#1E90FF", "#00008B", "#1f50cc", "#1E90FF", "#87CEEB", "#1E90FF", "#00008B", "#1f50cc", "#1E90FF"]
        var myChart = new Chart("myChart", {
        type: "bar",

        data: {
          labels: top10_movies,
          datasets: [{
            backgroundColor: barColors,
            data: top10_votes,
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
                    text: "Movies with most no. of Ratings",
                    fontSize: 16
                },
            
            scales: {
                    yAxes: [{
                    ticks: {
                    beginAtZero: true,
                    grouped: true
                }
                }]

            },

            
    }})})

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
                profit_list.push((data[i].worlwide_gross_income)/10000)
                movie_list.push(data[i].original_title)
                
            }

            else if (data[i].country === idSelect && idSelect2 === "ALL"){
                profit_list.push((data[i].worlwide_gross_income)/10000)
                movie_list.push(data[i].original_title)
            }

        }

        // Filter the list's to return top 5 results.
        var top10_movies2 = movie_list.slice(0,10);
        var top10_profit = profit_list.slice(0,10);

        console.log(top10_movies2);
        console.log(top10_profit);

        
        // Create the graph using Chart.js
        const barColors = ["#87CEEB", "#1E90FF", "#00008B", "#1f50cc", "#1E90FF", "#87CEEB", "#1E90FF", "#00008B", "#1f50cc", "#1E90FF"]
        var myChart1 = new Chart("myChart1", {
        type: "bar",

        data: {
          labels: top10_movies2,
          datasets: [{
            backgroundColor: barColors,
            data: top10_profit,
            grouped: true, 
            maxBarThickness: 50, 
            label: "Profit ($'000)",            
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
                    grouped: true
                }
                }]

            },

            
    }})})

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

        }



})
}


// Each time the drop down selection is changed, run the functions.
function optionChanged()
{ 
    buildGraph()

 }


// Run the init function on webpage load.
init();

