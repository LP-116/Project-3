function init() {

    d3.json("/title").then((item) => {

        console.log(item)

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

init()