# FomoCalculator

[Live Site can be found Here](https://hckia.github.io/FomoCalculator/)

The FOMO (Fear Of Missing Out) Calculator tells you what your return on investment (Bitcoin) would have been would have been within a specific range.

The FOMO Calculator calculates what gains would achieved by investing in Bitcoin within a certain date. It utilizes the coindesk api, which holds the historical value of bitcoin all the way from July 17th, 2010 to the "yesterday" (present day minus one day).

## Global Variables
### BTC_DATA_URL 
- url API endpoints
### max_val 
- max value
### max_val_date 
- max value and date
### min_val 
- min value
### min_val_date 
- min value and date

submissionClicked - boolean for the state of the calculator.

## local variabls

### decimals 
- from formatCurrencyBTC, formatCurrencyUSD, and formatPercentage functions - holds decimals bitcoin can hold
### formatVal 
- from formatCurrencyBTC, formatCurrencyUSD, and formatPercentage functions - formats the value into a certain type of currency, based on the input and decimal arguments.
### input 
- argument for formatCurrencyBTC, formatCurrencyUSD, and formatPercentage functions. Holds the value to be converted into a currency or percentage.
### dates 
- from getData function - control to make sure the user stays within the defined dates .
### arrayOfValues 
- from getData function - used in a for loop that takes all object values to be held in an array for further manipulation. Note it takes dollar values
### current_max 
- from Max function - holds the current max in a loop. Once the loop ends max_val and max_val date are updated.
### current_min 
- from Min function - holds the current min in a loop. Once the loop ends min_val and min_val_date are updated.
### investmentData 
- required getData argument. holds the amount value you entered by user (represented in dollars)
### investmentStart 
- required getData argument. holds the begin date entered by user (represented in dollars)
### investmentEnd 
- required getData argument.  holds the end date entered by user (represented in dollars)
### valAtBeginUSD 
- from getData function - holds the investmentData value locally 
### amountOfBTC 
- from getData function - divides investmentData by the value of Bitcoin on the date the investment started. this gives us the number of bitcoins the investment receives.
### priceOfBTCBegin 
- from getData function - holds the value of bitcoin on the date the investment started
### priceOfBTCEnd 
- from getData function - holds the value of bitcoin on the date the investment ended
### valAtEndUSD 
- from getData function - multiplies the value of bitcoin in dollars at the end, by the result of bitcoins gained at the start.  = (data.bpi[investmentEnd] * (investmentData / data.bpi[investmentStart]));
### percentageIncrease 
- from getData function - takes the value at the end in dollars, subtracts it from value at beginning, divides by the value at the beginning, and then multiplies by 100 to get the percentage increase. = (valAtEndUSD - valAtBeginUSD)/valAtBeginUSD * 100;
### optimalPercentageIncrease 
- from getData function - subtracts the maximum value, from the minimum value, divides from the minimum value and multiples by 100 to get the highest possible percentage increase within that range.
### getDataSettings 
- from getData function - takes the arguments of getDatat and makes a get request from the coindesk API
### amountInvested 
- from getFormValues - parses the amount inputted by the user as a float
### dateInvested 
- from getFormValues - holds the value of date investment begain
### dateEnded 
- from getFormValues - holds the value of the date investment ended.
### startYear 
- from getFormValues -
### endYear 
- from getFormValues -
### startMonth 
- from getFormValues -
### endMonth 
- from getFormValues -
### startDay 
- from getFormValues -
### endDay 
- from getFormValues -
### keyValue 
- from keyboard - holds the string keyboard value that was pressed by the user
### keyDownButton 
- holds the id or class JQuery will manipulate, based on which key was pressed


## Functions

### startCalculator 
- initializes all JavaScript functions that need to be usable on display
### formatCurrencyBTC 
- formats numbers as strings presentable as Bitcoin
### formatCurrencyUSD 
- formats numbers as strings presentable as Dollar
### formatPercentage 
- formats values into percentages
### getData 
- requests data from coindesk api based on arguments holding values from form.
### results 
- displays the results retrieved from getData
### getFormValues 
- retrieves the values provided by the user.
### keyBoard 
- function that handles all keyboard events
### calculator 
- Calculator function allows buttons to be clicked, and determines their function
### fomoSubmitClicked 
- function called at JQuery start. listens/handles the submit event.
### displayCalculator 
- shows a set of instructions until button is clicked, then displays calculator
### resetForm 
- resets the form to default values
### hideResults 
- hides results previously provided to user, resets everything so user can test again
### max 
- max function used to find the max value in arrayOfValues
### min 
- min function used to find the min value in arrayOfValues
