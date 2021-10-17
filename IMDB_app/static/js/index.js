// Scripts to make the web scraping button appear as loading when clicked.

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

