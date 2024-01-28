// Define jsonData globally to hold the fetched data
let jsonData = [];

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json');
        jsonData = await response.json();
        console.log('Data fetched:', jsonData);
        //return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to populate the exchange rates table with data from jsonData for a specific base currency
function populateTable(baseCurrency) {
    var tableBody = document.querySelector('#exchangeRatesTable tbody');
    tableBody.innerHTML = ''; // Clear previous table rows

    jsonData.forEach(function(entry) {
        if (entry.baseCurrency === baseCurrency) {
            Object.keys(entry.rates).forEach(function(currency) {
                var row = createRow(entry.baseCurrency, currency, entry.rates[currency], entry.trending);
                tableBody.appendChild(row);
            });
        }
    });
}


// Function to create a table row
function createRow(baseCurrency, exchangeCurrency, rate, trend) {
    var row = document.createElement('tr');
    var baseCurrencyCell = document.createElement('td');
    var exchangeCurrencyCell = document.createElement('td');
    var rateCell = document.createElement('td');
    var trendCell = document.createElement('td');

    baseCurrencyCell.textContent = baseCurrency;
    exchangeCurrencyCell.textContent = exchangeCurrency;
    rateCell.textContent = rate;
    trendCell.textContent = trend;

    row.appendChild(baseCurrencyCell);
    row.appendChild(exchangeCurrencyCell);
    row.appendChild(rateCell);
    row.appendChild(trendCell);

    return row;
}

