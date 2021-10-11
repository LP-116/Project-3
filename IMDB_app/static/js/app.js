
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

            // if (data[i].country === idSelect){
            //     votes_list.push(data[i].votes)
            //     movie_list.push(data[i].original_title)
            // }

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

        // console.log(year_list)

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


//     // Reading in the line_data route.
//     d3.json("/line_data").then((data) => {


//         // Clearing the line chart area.
//         document.querySelector("#chartReport2").innerHTML = '<canvas id="myChart2"></canvas>';

//         // Getting the suburb value from the dropdown box.
//         var idSelect = d3.select("#selDataset").property("value")

//         console.log(idSelect);

//         // Creating blank lists.
//         incident_list = []
//         year_list = []

//         // Everytime there is a suburb match, push the data into the corresponding list.
//         for (var i in data) {

//             if(data[i].suburb === idSelect){
//                 year_list.push(data[i].year)
//                 incident_list.push(data[i].incidents)
//             }
//         }


//         console.log(incident_list);
//         console.log(year_list)

//         // Creating the line chart using chart.js
//         const barColors = ["#87CEEB"]
//         new Chart("myChart2", {
//         type: "line",

//         data: {
//           labels: year_list.reverse(),
//           datasets: [{
//             data: incident_list.reverse(),
//             grouped: true, 
//             maxBarThickness: 50, 
//             label: "Total Number of Offences",   
//             fill: false,
//             borderDash: [5, 5],    
//             borderColor: "#1f50cc",
//             pointBordercolor: "navy",
//             pointBackgroundColor: 'red',
//             pointStyle: 'rectRot'
//           }]
//         },


//         options: {

//             responsive: true,
//             maintainAspectRatio: false,

//             title: {
//             display: true,
//             text: "Total No. of Offences Comitted from 2012 - 2021",
//             fontSize: 16},
            
//             scales: {
//                 yAxes: [{
//                 ticks: {
//                 beginAtZero: true,
//                 grouped: true}
//                 }]
//             },
//     }})



// });

}

// This function is used to update the stats_data.
function updatestats() {

    // Reading in the stats_data route.
    d3.json("/stats_data").then((data) => {

        // Getting the suburb from the drop down box.
        var idSelect = d3.select("#selDataset").property("value")

        console.log(idSelect);

        // Creating blank lists.
        incident_list = []
        incident_list2 = []

        // Everytime the suburb and year match 2021, push the data into the corresponding list.
        for (var i in data) {

            if(data[i].suburb === idSelect && data[i].year === parseInt("2021")){
                incident_list.push(data[i].incidents)
            }
        }

        // Everytime the suburb and year match 2020, push the data into the corresponding list.
        for (var x in data) {

            if(data[x].suburb === idSelect && data[x].year === parseInt("2020")){
                incident_list2.push(data[x].incidents)
            }
        }

        // Calculate the difference and percentage change.
        var difference = (incident_list[0] - incident_list2[0])
        var difference2 = ((incident_list2[0] - incident_list[0]) / incident_list[0] * 100).toFixed(2);

        // Input the results into the card as text.
        d3.select("#card2021").text(incident_list[0]);
        d3.select("#card2020").text(incident_list2[0]);
        d3.select("#difference").text(difference);

        // Used for formatting the % difference.
        if (difference < 0) {

            d3.select("#difference2").text((difference2) + "% decrease");
            }

            else {
                var newDifference = Math.abs(difference2)
                d3.select("#difference2").text((newDifference) + "% increase");
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




// d3.json("/rating").then((data) => {

//     // Clearing the existing chart space to avoid overlap issues.
//     document.querySelector("#chart1").innerHTML = '<canvas id="myChart"></canvas>';

//     // Getting the suburb value in the dropdown box.
//     var idSelect = d3.select("#selDataset").property("value")

//     console.log(idSelect);

//     // Creating blank lists to hold results.
//     movie_list = []
//     rating_list = []


//     // Everytime the suburb in the dropdown box is matched to the json data, push the required part into the matching list.
//     for (var i in data) {

//         if(data[i].country === idSelect){
//             rating_list.push(data[i].avg_vote)
//             movie_list.push(data[i].original_title)
//         }
//     }