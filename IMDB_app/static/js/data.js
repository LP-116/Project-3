// Function to populate the dropdown box with movie titles.
function init() {

    d3.json("/title").then((item) => {

        title_list = []

        for (var i in item) {
                title_list.push(item[i].original_title)
                }

        var dropdownMenu = d3.select("#myList");

        var dropdownNames = title_list;
        
        dropdownNames.forEach((item) => {
        dropdownMenu
            .append("option")
            .text(item)
            .property("value", item);

        });

    });
};


// Functions used to make the filter table button appear as loading.
function startSpinner() {
    // Code to make the spinner start
    $("#filter-btn").prop("disabled", true);
    $("#filter-btn").html(
        `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp Loading results...`
    );
}

function stopSpinner() {
    // Code to make the spinner stop
    // (i.e., return the button to its original state)
    $("#filter-btn").prop("disabled", false);
    $("#filter-btn").html('&nbsp &nbsp &nbsp View Results &nbsp &nbsp &nbsp');
}


// Selecting the filter button.
var filterButton = d3.select("#filter-btn");

// On click of the filter button run the runfilter function.
filterButton.on("click", runFilter);


// Funtion to return table results based on the 
function runFilter() {

    // Once the button is clicked run the start spinner function.
    startSpinner()

    // Prevent automatic reload.
    d3.event.preventDefault();

    // Select the suburb in the dropdown box.
    var movieElement = d3.select("#movieSelect");
    
    var movieValue = movieElement.property("value");
    
    console.log(movieValue);   

    
    var tbody = d3.select("tbody");
    
    // Using the data route.
    d3.json("/data").then((data)=> {
        
        // Filter the results on suburb and year.
        var filteredData = data.filter(dataEntry => ((dataEntry.A_original_title === movieValue)))

        console.log(filteredData);

        //  If there is no results, return text stating "no results for selected inputs".
        if (!filteredData.length) {

            console.log("No result")
    
            tbody.html("");
    
            tbody.text("No results for selected inputs.");
            stopSpinner()}
    
        // Else, populate the table with the filtereddata results.
        else {
        
        tbody.html("");
    
        filteredData.forEach((dataEntry) => {
    
            var row = tbody.append("tr");
    
            Object.values(dataEntry).forEach((value) => {
                row.append("td").text(value);
            });
        });

        // Stop the spinner once retrieval is complete.
        stopSpinner()  

    }

});

}


init()