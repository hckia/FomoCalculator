/**************************************************
                  DESCRIPTION OF PROJECT
                  
The FOMO Calculator calculates what gains would achieved by investing in Bitcoin within a certain date. It utilizes the coindesk api, which holds the historical value of bitcoin all the way from July 17th, 2010 to the "yesterday" (present day minus one day).

Global Variables
BTC_DATA_URL - url API endpoints
max_val - max value
max_val_date - max value and date
min_val -min value
min_val_date - min value and date

submissionClicked - boolean for the state of the calculator.

local variabls

decimals - from formatCurrencyBTC, formatCurrencyUSD, and formatPercentage functions - holds decimals bitcoin can hold
formatVal - from formatCurrencyBTC, formatCurrencyUSD, and formatPercentage functions - formats the value into a certain type of currency, based on the input and decimal arguments.
input - argument for formatCurrencyBTC, formatCurrencyUSD, and formatPercentage functions. Holds the value to be converted into a currency or percentage.
dates - from getData function - control to make sure the user stays within the defined dates .
arrayOfValues - from getData function - used in a for loop that takes all object values to be held in an array for further manipulation. Note it takes dollar values
current_max - from Max function - holds the current max in a loop. Once the loop ends max_val and max_val date are updated.
current_min - from Min function - holds the current min in a loop. Once the loop ends min_val and min_val_date are updated.
investmentData - required getData argument. holds the amount value you entered by user (represented in dollars)
investmentStart - required getData argument. holds the begin date entered by user (represented in dollars)
investmentEnd - required getData argument.  holds the end date entered by user (represented in dollars)
valAtBeginUSD - from getData function - holds the investmentData value locally 
amountOfBTC - from getData function - divides investmentData by the value of Bitcoin on the date the investment started. this gives us the number of bitcoins the investment receives.
priceOfBTCBegin - from getData function - holds the value of bitcoin on the date the investment started
priceOfBTCEnd - from getData function - holds the value of bitcoin on the date the investment ended
valAtEndUSD - from getData function - multiplies the value of bitcoin in dollars at the end, by the result of bitcoins gained at the start.  = (data.bpi[investmentEnd] * (investmentData / data.bpi[investmentStart]));
percentageIncrease - from getData function - takes the value at the end in dollars, subtracts it from value at beginning, divides by the value at the beginning, and then multiplies by 100 to get the percentage increase. = (valAtEndUSD - valAtBeginUSD)/valAtBeginUSD * 100;
optimalPercentageIncrease - from getData function - subtracts the maximum value, from the minimum value, divides from the minimum value and multiples by 100 to get the highest possible percentage increase within that range.
optimalValue - from getData function - optimal value on investment range
getDataSettings - from getData function - takes the arguments of getDatat and makes a get request from the coindesk API
amountInvested - from getFormValues - parses the amount inputted by the user as a float
dateInvested - from getFormValues - holds the value of date investment begain
dateEnded - from getFormValues - holds the value of the date investment ended.
startYear - from getFormValues -
endYear - from getFormValues -
startMonth - from getFormValues -
endMonth - from getFormValues -
startDay - from getFormValues -
endDay - from getFormValues -
keyValue - from keyboard - holds the string keyboard value that was pressed by the user
keyDownButton - holds the id or class JQuery will manipulate, based on which key was pressed


Functions
-startCalculator - initializes all JavaScript functions that need to be usable on display
- formatCurrencyBTC - formats numbers as strings presentable as Bitcoin
- formatCurrencyUSD - formats numbers as strings presentable as Dollar
- formatPercentage - formats values into percentages
- getData - requests data from coindesk api based on arguments holding values from form.
- results - displays the results retrieved from getData
- getFormValues - retrieves the values provided by the user.
- keyBoard - function that handles all keyboard events
- calculator - Calculator function allows buttons to be clicked, and determines their function
-fomoSubmitClicked - function called at JQuery start. listens/handles the submit event.
-displayCalculator - shows a set of instructions until button is clicked, then displays calculator
-resetForm - resets the form to default values
-hideResults - hides results previously provided to user, resets everything so user can test again
-max - max function used to find the max value in arrayOfValues
-min - min function used to find the min value in arrayOfValues
- BrowserDetection - detects user agent of browser

***************************************************/

//url API endpoints
const BTC_DATA_URL = "https://api.coindesk.com/v1/bpi/historical/close.json";
//max value and date
var max_val = 0;
var max_val_date = '';
//min value and date
var min_val = 0;
var min_val_date = '';

//boolean for the state of the calculator.
var submissionClicked = 0;

function BrowserDetection() {
    //Check if browser is Safari
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        // insert conditional Safari code here https://www.learningjquery.com/2017/05/how-to-use-javascript-to-detect-browser
        alert("This application has detected you are using a Safari Browser Application. On Mobile Safari this should be fine, but on your desktop Safari browser you will have to type the start and end dates in the following format - YYYY-MM-DD");
    }
}

function max(numbers) {
      let currentMax = numbers[0];
      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > currentMax) {
          currentMax = numbers[i];
        }
      }
      return currentMax;
}

function min(numbers) {
  let currentMin = numbers[0];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < currentMin) {
      currentMin = numbers[i];
    }
  }
  return currentMin;
}

//formats numbers as strings presentable for Bitcoin
function formatCurrencyBTC(input) {
//decimals bitcoin can hold
  const decimals = 8;
  function round(input, decimals)
  {
    return Number(Math.round(input+'e'+decimals)+'e-'+decimals);
  }
  const formatVal = round(input, decimals);
  return formatVal.toLocaleString(undefined,{minimumFractionDigits: 2, maximumFractionDigits: 8});
}

//format numbers as stringles presentable for USD
function formatCurrencyUSD(input) {
  const decimals = 2;
  function round(input, decimals)
  {
    return Number(Math.round(input+'e'+decimals)+'e-'+decimals);
  }
  const formatVal = round(input, decimals);
  return formatVal.toLocaleString(undefined,{minimumFractionDigits: 2, maximumFractionDigits: 2});
}

// format percentages

function formatPercentage(input) {
  const decimals = 2;
  function round(input, decimals)
  {
    return Number(Math.round(input+'e'+decimals)+'e-'+decimals);
  }
  const formatVal = round(input, decimals);
  return formatVal.toFixed(2);
}

//hides results previously provided to user, resets everything so user can test again
function hideResults() {
  submissionClicked = 0;
  $('#instructions').toggleClass('js-hidden');
  $('.investmentDisplay').slideUp("slow");
  $(".js-calculator").slideUp("slow");
  $(".js-submit-button").val("Calculate Investment");
  $(".js-start-button").replaceWith("<button aria-label=\"start button\" role=\"button\" class=\"calc-button js-start-button\" id=\"start-button\">Let's find out...</button>");
  resetForm();
  $("#amount-input").focus();
  displayCalculator();
}

//resets the form silly. Oh, and also makes sure the investmentDipsplay div and its contents are not showing
function resetForm() {
  $("input[type=number]").val("");
  $("input[type=date]").val("");
}

//requests data from coindesk api based on arguments holding values from form.
function getData(investmentData, investmentStart, investmentEnd) {
//displays our results
  function results(data) {
    console.log(data);
    console.log(data.bpi[investmentEnd]);
    
//control to make sure the user stays within the defined dates.
    const dates = Object.keys(data.bpi);
    investmentStart = dates[ 0 ];
    investmentEnd = dates[ dates.length-1 ];
//adding values to array to find max and min range.
    var arrayOfValues = [];
    for (i = 0; i < dates.length; i++) {
      arrayOfValues.push(data.bpi[dates[i]]);
    }
    max_val = max(arrayOfValues);
    console.log("MAXIMUM VALUE: " + max_val);
    min_val = min(arrayOfValues);
    console.log("MINIMUM VALUE: " + min_val);
    for (i=0;i < dates.length; i++) {
      if(max_val === data.bpi[dates[i]]) {
        max_val_date = dates[i];
        console.log('Max Val Date: ' + max_val_date);
      }
      if(min_val === data.bpi[dates[i]]) {
        min_val_date = dates[i];
        console.log('Min Val Date: '+min_val_date);
      }
    }
    // console.log(arrayOfValues);

//separate calculations from string transformations.
    const valAtBeginUSD = investmentData;
    const amountOfBTC = (investmentData / data.bpi[investmentStart]);
    const priceOfBTCBegin = data.bpi[investmentStart];
    const priceOfBTCEnd = data.bpi[investmentEnd];
    const valAtEndUSD = (data.bpi[investmentEnd] * (investmentData / data.bpi[investmentStart]));
    const percentageIncrease = (valAtEndUSD - valAtBeginUSD)/valAtBeginUSD * 100;
    const optimalPercentageIncrease = (max_val - min_val)/min_val * 100;
    const optimalValue = amountOfBTC * max_val;
    console.log('---See if Investment Data shows below---');
    console.log(JSON.stringify({valAtBeginUSD,investmentData,amountOfBTC, valAtEndUSD}));
//hide form
//populate hidden div and then display div
    $('.js-start-date').html("Price of BTC on: " + investmentStart);
    $('.js-price-at-begin').html("$"+formatCurrencyUSD(priceOfBTCBegin));
    $('.js-amount-dollars').html("$" + formatCurrencyUSD(valAtBeginUSD));
    $('.js-amount-btc').html(formatCurrencyBTC(amountOfBTC));
    $('.js-end-date').html("Price of BTC on: " + investmentEnd);
    $('.js-price-at-end').html("$" + formatCurrencyUSD(priceOfBTCEnd));
    $('.js-amount-earned').html("$" + formatCurrencyUSD(valAtEndUSD));
    $('.js-best-day-in').html("Best day to Invest: "+ min_val_date);
    $('.js-best-day-in-value').html("$" + formatCurrencyUSD(min_val));
    $('.js-best-day-out').html("Best Withdraw Date: "+max_val_date);
    $('.js-best-day-out-value').html("$" + formatCurrencyUSD(max_val));
    $('.js-percentage').html(formatPercentage(percentageIncrease) + "%");
    $('.js-best-percentage').html(formatPercentage(optimalPercentageIncrease)+"%");
    $('.js-best-amount-earned').html("$" + formatCurrencyUSD(optimalValue));
    $(".js-submit-button").val("Reset Invesment Calculator");
    $('.investmentDisplay').slideDown("slow");
    $('#instructions').toggleClass('js-hidden');
    submissionClicked = 1;
  }
  console.log('getData fired');
  const getDataSettings = {
    url: BTC_DATA_URL,
    data: {
      start: investmentStart,
      end: investmentEnd
    },
    dataType: 'json',
    type: 'GET',
    success: results
  };
  $.ajax(getDataSettings).fail(function (jqXHR, text) {
      console.log(JSON.stringify(jqXHR));
      console.log(text);
  });
  // const result = $.ajax(getDataSettings);
  // console.log(result)
  // console.log(callback);
}

//get values from Form
function getFormValues(event) {
  console.log('getFormValues fired');
  //make amountInvested an Float
  const amountInvested = parseFloat($(event.currentTarget).find('.js-amount').val(), 10);
  const dateInvested = $(event.currentTarget).find('.js-date').val();
  const dateEnded = $(event.currentTarget).find('.js-date-end').val();
  // console.log('The amount invested is: ' + JSON.stringify(amountInvested));
  // console.log('The date invested is: ' + dateInvested);
  // console.log('the date investment ended is: ' + dateEnded);
//send to coindesk API IF the investment date occurs before investment end date.
  // console.log("This is with slice 0,4: " + dateInvested.slice(0,4) +' ' + dateEnded.slice(0,4));
  const startYear = parseInt(dateInvested.slice(0,4), 10);
  // console.log("Start year: " + startYear);
  const endYear = parseInt(dateEnded.slice(0,4), 10);
  // console.log("End year: " + endYear);
  const startMonth = parseInt(dateInvested.slice(5,7), 10);
  // console.log("Start month: " + startMonth);
  const endMonth = parseInt(dateEnded.slice(5,7), 10);
  // console.log("End month: " + endMonth);
  const startDay = parseInt(dateInvested.slice(8,10), 10);
  // console.log("Start day: " + startDay);
  const endDay = parseInt(dateEnded.slice(8,10), 10);
  // console.log("End day " + endDay);

//If start year is less than end year, just get the data
  if(startYear < endYear) {
    // console.log('SUCCESS: The investment date year happens before or on the same year as the end date');
    getData(amountInvested, dateInvested, dateEnded);
  }
//make sure start year is not greater than end year
  else if (startYear > endYear) {
    // console.log("FAILURE: The investment year starts after end year");
    alert("The start year MUST be less than end year");
    $('.js-date').focus();
  }
//if start year is same as end year, lets check month...
  else if(startMonth < endMonth) {
    // console.log('SUCCESS: The investment month happens before or during the month of the end date');
    getData(amountInvested, dateInvested, dateEnded);
  }
//if start month is the same or greater than end month, we must check the day...
  else if (startDay < endDay) {
    // console.log('SUCCESS: The investment day happens before the end dates day');
    getData(amountInvested, dateInvested, dateEnded);
  }
//failure.
  else {
    // console.log('FAILURE: The investment start must be before investment end.1.');
    alert("The investment start must be before investment end.");
    $('.js-date').focus();
  }
}

// keyboard function allows the keyboard to be utilized for use.
function keyboard() {
  $(document).keydown(function(e) {
//begin control statement for keyvalues. if date is active, skip over it
    if (!($(".js-date-type").is(":focus"))) {
//test
      console.log( "Handler for .keydown() called. " + e.key + " its KeyCode is " + JSON.stringify(e.keyCode));
      var keyValue = e.key;
      console.log("keyValue placed: " + keyValue);
      
//begin num key switch required for num keys
      let keyDownButton;
      switch(keyValue) {
        case "0":
          console.log("the keyValue is zero");
          $("#amount-input").val($("#amount-input").val() + keyValue);
          keyDownButton = $('#button-zero');
          e.preventDefault();
          break;
        case "1":
          console.log("the keyValue is one");
          $("#amount-input").val($("#amount-input").val() + keyValue);
          keyDownButton =$('#button-one');
          e.preventDefault();
          break;
        case "2":
          console.log("the keyValue is two");
          $("#amount-input").val($("#amount-input").val() + keyValue);
          keyDownButton = $('#button-two');
          e.preventDefault();
          break;
        case "3":
          console.log("the keyValue is three");
          $("#amount-input").val($("#amount-input").val() + keyValue);
          keyDownButton = $('#button-three');
          e.preventDefault();
          break;
        case "4":
          console.log("the keyValue is four");
          $("#amount-input").val($("#amount-input").val() + keyValue);
          keyDownButton = $('#button-four');
          e.preventDefault();
          break;
        case "5":
          console.log("the key value is five");
          $("#amount-input").val($("#amount-input").val() + keyValue);
          keyDownButton = $('#button-five');
          e.preventDefault();
          break;
        case "6":
          console.log("the key value is six");
          $("#amount-input").val($("#amount-input").val() + keyValue);
          keyDownButton = $('#button-six');
          e.preventDefault();
          break;
        case "7":
          console.log("the key value is seven");
          $("#amount-input").val($("#amount-input").val() + keyValue);
          keyDownButton = $('#button-seven');
          e.preventDefault();
          break;
        case "8":
          console.log("the key value is eight");
          $("#amount-input").val($("#amount-input").val() + keyValue);
          keyDownButton = $('#button-eight');
          e.preventDefault();
          break;
        case "9":
          console.log("the key value is nine");
          $("#amount-input").val($("#amount-input").val() + keyValue);
          keyDownButton = $("#button-nine");
          e.preventDefault();
          break;
        case "c":
        case "C":
        case "Escape":
          console.log("they key value is c, C or Escape");
          keyDownButton = $("#C");
          $("#amount-input").val("");
          resetForm();
          break;
        case "d":
        case "D":
        case "Delete":
        case "Backspace":
          console.log("they key value is d, D, or Delete");
          keyDownButton = $("#DEL");
          $("#amount-input").val($("#amount-input").val().slice(0, $("#amount-input").val().length-1));
          break;
        case " ":
          console.log("the space key was pressed!");
          $("#amount-input").val($("#amount-input").val() + $(":focus").text());
          keyDownButton = $(":focus");
      }
//end of control statement for switches

//remove button press effect from buttons
      if (keyDownButton) {
      keyDownButton.css({transform: "translateY(2px)"});
      $(keyDownButton).on("keyup", function(e){
      console.log("key lifted");
      $(".js-calc-button").css({transform: "translateY(0px"});
      })
      }
    }
//end of remove button press effect
//end control statement for keyvalues.
  });
}
//end of keyboard function

//function called at JQuery start. listens for the submit event.
function fomoSubmitClicked() {
  $('.js-invest-form').submit(event => {
    console.log('submit fired');
    $(".js-submit-button").css({transform: "translateY(2px)"}).focus()
    event.preventDefault();
//put control statement here.
  if (submissionClicked === 0) {
    console.log("Submission Clicked");
    getFormValues(event);
  }
  else {
    console.log("Submission Reset");
    hideResults();
  }
  });
}
//end of fomoSubmitClicked

//Calculator function allows buttons to be clicked, and determines their function
function calculator() {
  $(".js-calc-num").on("mousedown",(function(e){ console.log("mousedown on calc button");
    $(this).css({transform: "translateY(2px)"}).focus();
    $("#amount-input").val($("#amount-input").val() + $(this).text() 
  )}));
  
  $(".js-calc-num").on("mouseup",(function(e){ console.log("mouseup on calc button");
    $(this).css({transform: "translateY(-2px)"}).focus();
  }))
  
  $("#DEL").on("mousedown",(function(e){ console.log("mousedown on DEL");
    $(this).css({transform: "translateY(2px)"}).focus();
    $("#amount-input").val($("#amount-input").val().slice(0, $("#amount-input").val().length-1));
  }));

  $("#DEL").on("mouseup",(function(e){ console.log("mouseup on DEL");
    $(this).css({transform: "translateY(-2px)"}).focus();
  }))

  $("#C").on("mousedown",(function(e){ console.log("mousedown on C");
    $(this).css({transform: "translateY(2px)"});.focus();
    $("#amount-input").val("");
    resetForm();
  }));

  $("#C").on("mouseup",(function(e){ console.log("mouseup on C");
    $(this).css({transform: "translateY(-2px)"}).focus();
  }))
}
//end of Calculator button

//shows a set of instructions until button is clicked, then displays calculator
function displayCalculator() {
  console.log("display Calculator called");
  $(".js-start-button").on("click", function(e){
    $(".js-calculator").slideDown("slow");
    $(".js-start-button").replaceWith("<p class=\"js-start-button\" id=\"start-button\"></p>");
  })
}
//end of displayCalculator

//functions that need to function on load
function startCalculator() {
  BrowserDetection();
  displayCalculator();
  calculator();
  fomoSubmitClicked();
  keyboard();
}
//end of StartCalculator

//initialize
$(startCalculator);
