//Define global array to store data
let jsonData = [];


//Fetch data and store it global array
async function fetchData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json');
        jsonData = await response.json();
        //Log data to console
        console.log('Data fetched:', jsonData);
        checkMarketAvailability()
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const creditCardInput = document.getElementById('creditCardNumber');
const cardMessage = document.getElementById('cardMessage');

document.getElementById('cardAdd').addEventListener('click', function(){
    const cardNumber = creditCardInput.value.trim();
    const firstDigit = parseInt(cardNumber.charAt(0));
    const cardDigits = cardNumber.split('').map(Number);
    const isValid = validateCred(cardDigits);
    if (cardNumber.length < 16){
        cardMessage.textContent = 'Please enter a valid card number';
    }else if (isValid){
        cardMessage.textContent = 'The card succesfully added.';
        const companies = idInvalidCardCompanies([cardDigits]);
        renderCardSpecificMessage(firstDigit, companies);
    }else {
        cardMessage.textContent = 'Please enter valid card.'
    }
}
);

function renderCardSpecificMessage(firstDigit, companies){
    const cardSpecificMessage = document.getElementById('cardSpecificTable');
    switch (firstDigit) {
        case 3:
            cardSpecificMessage.textContent = `Exchange rates based on ${companies.includes('Amex') ? 'Amex' : 'Unknown'}:`;
            break;
        case 4:
            cardSpecificMessage.textContent = `Exchange rates based on ${companies.includes('Visa') ? 'Visa' : 'Unknown'}:`;
            break;
        case 5:
            cardSpecificMessage.textContent = `Exchange rates based on ${companies.includes('Mastercard') ? 'Mastercard' : 'Unknown'}:`;
            break;
        case 6:
            cardSpecificMessage.textContent = `Exchange rates based on ${companies.includes('Discover') ? 'Discover' : 'Unknown'}:`;
            break;
        default:
            cardSpecificMessage.textContent = `Cannot match.`;
            break;
    }
}


//Check market availability to render different conversion fee.
function checkMarketAvailability() {
    const today = new Date();

    const currentHour = today.getHours();
    console.log(currentHour);
    

    const openingHour = 9;
    const closingHour = 17;
    const weekdays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
    const marketAvailability = document.getElementById('marketAvailability');
  
    if (currentHour >= openingHour && currentHour <= closingHour && weekdays.includes(weekdays[today.getDay()])) {
      marketAvailability.textContent = 'Market is open. The conversion fee is 6%.';

    } else {
      marketAvailability.textContent = 'Market is not open. The conversion fee is 16%.';
    }
  }



//Populate dropdown with currency options
function currencyDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        jsonData.forEach(element => {
            const option = document.createElement('option');
            option.value = element.baseCurrency;
            option.text = element.baseCurrency;
            dropdown.appendChild(option);
        });
    }
}

//Switch currencies
function switchCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    document.getElementById('fromCurrency').value = toCurrency;
    document.getElementById('toCurrency').value = fromCurrency;
}
document.getElementById('switchCurrency').addEventListener('click', switchCurrency);


//Convert currency
function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    const exchangeRate = jsonData.find(element => element.baseCurrency === fromCurrency).rates[toCurrency];
    
    if (exchangeRate) {
        const convertedAmount = amount * exchangeRate;
        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } else {
        document.getElementById('result').textContent = 'Exchange rate not found for selected currencies.';
    }
}

// Populate currency dropdowns when the DOM content is loaded
document.addEventListener('DOMContentLoaded', async function() {
    await fetchData();
    currencyDropdown('fromCurrency');
    currencyDropdown('toCurrency');
    currencyDropdown('baseCurrency');
});


//Function to create a table row
function createRow(firstTd, secondTd, thirdTd, forthTd){
    let row = document.createElement('tr');

    let baseCurrencyCell = document.createElement('td');
    let exchangeCurrencyCell = document.createElement('td');
    let rateCell = document.createElement('td');
    let trendCell = document.createElement('td');

    baseCurrencyCell.textContent = firstTd;
    exchangeCurrencyCell.textContent = secondTd;
    rateCell.textContent = thirdTd;
    trendCell.textContent = forthTd;

    row.appendChild(baseCurrencyCell);
    row.appendChild(exchangeCurrencyCell);
    row.appendChild(rateCell);
    row.appendChild(trendCell);

    //console.log(row);
    return row;
}

//Filter as default with DKK when page is loaded
document.addEventListener('DOMContentLoaded', async function() {
    await fetchData();
    populateTable();
    filterTableByBaseCurrency('DKK');
});

//Function to populate table and create rows with properties of global array
function populateTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    generateTableRows(jsonData, tableBody);
}

//Add event listener to the baseCurrency dropdown
document.getElementById('baseCurrency').addEventListener('change', function() {
    const selectedCurrency = this.value;
    filterTableByBaseCurrency(selectedCurrency);
});

let isRateAscending = true;
document.getElementById('rateHeader').addEventListener('click', function() {
    sortTableByRate();
});

//Function to filter table by base currency
function filterTableByBaseCurrency(selectedCurrency) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    //Filter jsonData to get elements with the selected base currency
    const filteredData = jsonData.filter(element => element.baseCurrency === selectedCurrency);
    
    //Populate table with filtered data
    generateTableRows(filteredData, tableBody);
}

//Function to generate table rows based on data
function generateTableRows(data, tableBody) {
    data.forEach(element => {
        Object.keys(element.rates).forEach(currency => {
            const row = createRow(element.baseCurrency, currency, element.rates[currency], element.trending);
            tableBody.appendChild(row);
        });
    });
}

//Function to sort table by Rate column
function sortTableByRate() {
    const tableBody = document.getElementById('tableBody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        let rateA = parseFloat(a.children[2].textContent);
        let rateB = parseFloat(b.children[2].textContent);

        if (!isRateAscending) {
            [rateA, rateB] = [rateB, rateA];
        }
        return rateA - rateB;
    });
    isRateAscending = !isRateAscending;
    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));
}