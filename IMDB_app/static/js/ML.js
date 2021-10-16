var filterButton =  d3.select(".btn4");

filterButton.on("click", resetFilter);

function resetFilter() {

    document.querySelector(".input1").value = '';

};

function empty() {
    var x;
    x = document.querySelector(".line1").value;
    if (x == "") {
        alert("There is an error in your prediction. Please ensure all fields have a number and try again.");
        return false;
    };

    var a;
    a = document.querySelector(".line2").value;
    if (a == "") {
        alert("There is an error in your prediction. Please ensure all fields have a number and try again.");
        return false;
    };

    var b;
    b = document.querySelector(".line3").value;
    if (b == "") {
        alert("There is an error in your prediction. Please ensure all fields have a number and try again.");
        return false;
    };

    var c;
    c = document.querySelector(".line4").value;
    if (c == "") {
        alert("There is an error in your prediction. Please ensure all fields have a number and try again.");
        return false;
    };


}

// Below code was found and adapted via stackoverflow:
// Reference: https://stackoverflow.com/questions/24163889/html5-input-for-money-currency

var currencyInput = document.querySelector('input[type="currency"]')

 // format inital value
onBlur({target:currencyInput})

// bind event listeners
currencyInput.addEventListener('focus', onFocus)
currencyInput.addEventListener('blur', onBlur)


function localStringToNumber( s ){
  return Number(String(s).replace(/[^0-9.-]+/g,""))
}

function onFocus(e){
  var value = e.target.value;
  e.target.value = value ? localStringToNumber(value) : ''
}

function onBlur(e){
  var value = e.target.value

  var options = {
      maximumFractionDigits : 2,
  }
  
  e.target.value = (value || value === 0) 
    ? localStringToNumber(value).toLocaleString(undefined, options)
    : ''
}

var currencyInput2 = document.querySelector('input[type="currency2"]')

 // format inital value
onBlur({target:currencyInput2})

// bind event listeners
currencyInput2.addEventListener('focus', onFocus)
currencyInput2.addEventListener('blur', onBlur)


function localStringToNumber( s ){
  return Number(String(s).replace(/[^0-9.-]+/g,""))
}

function onFocus(e){
  var value = e.target.value;
  e.target.value = value ? localStringToNumber(value) : ''
}

function onBlur(e){
  var value = e.target.value

  var options = {
      maximumFractionDigits : 2,
  }
  
  e.target.value = (value || value === 0) 
    ? localStringToNumber(value).toLocaleString(undefined, options)
    : ''
}