//Update Data structure Week2
const currencyData = [
    {
      timestamp: new Date().getTime(),
      date: new Date(),
      baseCurrency: "Danish Krone",
      rates: {}
    },
    {
      timestamp: new Date().getTime(),
      date: new Date(),
      baseCurrency: "Euro",
      rates: {}
    },
    {
      timestamp: new Date().getTime(),
      date: new Date(),
      baseCurrency: "Dollar",
      rates: {}
    },
    {
        timestamp: new Date().getTime(),
        date: new Date(),
        baseCurrency: "Swedish Krone",
        rates: {}
    },
    {
        timestamp: new Date().getTime(),
        date: new Date(),
        baseCurrency: "Norwegian Krone",
        rates: {}
      },
      {
        timestamp: new Date().getTime(),
        date: new Date(),
        baseCurrency: "Swiss Frank",
        rates: {}
      },
      {
        timestamp: new Date().getTime(),
        date: new Date(),
        baseCurrency: "Pound Sterling",
        rates: {}
      },
      {
        timestamp: new Date().getTime(),
        date: new Date(),
        baseCurrency: "Turkish Lira",
        rates: {}
      },      

  ];
  
//Function to add currency rates to base currencies  
function addCurrency() {
    //Retrieve values from inputs
    const baseCurrency = document.getElementById('baseCurrency').value.trim();
    const conjugateCurrency = document.getElementById('conjugateCurrency').value;
    const rate = parseFloat(document.getElementById('rate').value);
  
    //Find the index of the selected base currency
    const baseCurrencyIndex = currencyData.findIndex(currency => currency.baseCurrency === baseCurrency);
  
    if (baseCurrencyIndex !== -1) {
      if (!currencyData[baseCurrencyIndex].rates) {
        currencyData[baseCurrencyIndex].rates = {};
      }
  
      currencyData[baseCurrencyIndex].rates[conjugateCurrency] = rate;
      //console.log(currencyData);
      
      //Clear form inputs
      document.getElementById('conjugateCurrency').value = "";
      document.getElementById('rate').value = "";
    } else {
      //Create a new entry for the base currency
      const newCurrency = {
        timestamp: new Date().getTime(),
        date: new Date(),
        baseCurrency: baseCurrency,
        rates: {
          [conjugateCurrency]: rate,
        },
      };

      //Push the new currency to the array
      currencyData.push(newCurrency);
  
      //console.log(currencyData);
  
      document.getElementById('conjugateCurrency').value = "";
      document.getElementById('rate').value = "";
  
      //Return the newly added currency
      return newCurrency.rates;
    }
  
    return currencyData[baseCurrencyIndex] ? currencyData[baseCurrencyIndex].rates : {};
}

//Function to generate a table
function generateCurrencyTable() {
    const tableContainer = document.getElementById('currencyRateGrid');
    //Create table and tbody elements
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
  
    //Create header row
    const headerRow = document.createElement('tr');
    const nameHeader = document.createElement('th');
    const baseHeader = document.createElement('th');
    baseHeader.textContent = 'Base Name';
    nameHeader.textContent = 'Rates Name';
    headerRow.appendChild(baseHeader);
    headerRow.appendChild(nameHeader);
    const rateHeader = document.createElement('th');
    rateHeader.textContent = 'Rates';
    headerRow.appendChild(rateHeader);
    tbody.appendChild(headerRow);
  
    //Create rows for each currency and its rates
    currencyData.forEach(currency => {
      for (const currencyCode in currency.rates) {
        if (currency.rates.hasOwnProperty(currencyCode)) {
          const row = document.createElement('tr');
          const baseCell = document.createElement('td');
          baseCell.textContent = currency.baseCurrency;
          row.appendChild(baseCell);
          const nameCell = document.createElement('td');
          nameCell.textContent = currencyCode;
          row.appendChild(nameCell);
          const rateCell = document.createElement('td');
          rateCell.textContent = currency.rates[currencyCode];
          row.appendChild(rateCell);
          tbody.appendChild(row);
        }
      }
    });
  
    //Append the table to the container
    table.appendChild(tbody);
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
  }
  

//Function to convert currency
function convertCurrency() {
  let mainCurrency = document.getElementById('mainCurrency').value;
  let targetCurrency = document.getElementById('targetCurrency').value;
  let amount = parseFloat(document.getElementById('amount').value);

  //Validate the amount
  if (isNaN(amount)){
    document.getElementById('result').innerText = 'Please enter a valid amount';
    return;
  }

  //Find the index of the main currency in the currencyData array
  const mainCurrencyIndex = currencyData.findIndex(currency => currency.baseCurrency === mainCurrency);

  if (mainCurrencyIndex !== -1) {
    //Check if the target currency is in the rates for the main currency
    if (currencyData[mainCurrencyIndex].rates.hasOwnProperty(targetCurrency)) {
      const conversionRate = currencyData[mainCurrencyIndex].rates[targetCurrency];
      const result = amount * conversionRate;

      document.getElementById('result').innerText = `${amount} ${mainCurrency} equals ${result.toFixed(2)} ${targetCurrency}`;

      return result;
    } else {
      document.getElementById('result').innerText = 'Conversion rate not available for the target currency';
    }
  } else {
    document.getElementById('result').innerText = 'Main currency not found';
  }
}

//Search Function Week2
function searchCurrency() {
    const searchFrom = document.getElementById('searchFrom').value;
    const searchResultContainer = document.getElementById('searchResult');

    //console.log('Search from:', searchFrom);

    //Find the base currency in the currencyData array
    const baseCurrency = currencyData.find(currency => currency.baseCurrency === searchFrom);

    if (baseCurrency) {
        const rates = baseCurrency.rates;

        //console.log('Base currency found:', baseCurrency);

        //Clear previous search results
        if (rates && Object.keys(rates).length > 0) {
            //Clear previous search results
            searchResultContainer.innerHTML = '';

            //Loop through rates and display results
            for (const currencyCode in rates) {
                if (rates.hasOwnProperty(currencyCode)) {
                    const rate = rates[currencyCode];

                    //Create HTML elements
                    const resultItem = document.createElement('p');
                    resultItem.textContent = `Rate from ${searchFrom} to ${currencyCode}: ${rate}`;

                    //Append to the container
                    searchResultContainer.appendChild(resultItem);
                }
            }
        } else {
            console.log('Currency rates not found or empty.');
            searchResultContainer.innerText = 'Currency rates not found.';
        }
    } else {
        console.log('Base currency not found.');
        searchResultContainer.innerText = 'Base currency not found.';
    }
}
