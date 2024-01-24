//<script src='dkfds-9.1.0/dist/js/dkfds.js'></script>
let ratesArr = [];
let currencyData = [];


//Week3 get Hours
setInterval(checkMarketAvailability, 5000);

// Function to check market availability
function checkMarketAvailability() {
  const d = new Date();
  const currentHour = d.getHours();
  console.log(currentHour);

  const openingHour = 9;
  const closingHour = 17;

  const marketAvailability = document.getElementById('marketAvailability');

  if (currentHour >= openingHour && currentHour <= closingHour) {
    marketAvailability.textContent = 'Market is open. The conversion fee is 6%.';
  } else {
    marketAvailability.textContent = 'Market is not open. The conversion fee is 16%.';
  }
}

//Function to populate dropdown
function updateCurrencyDropdown(id, currencies){
  const select = document.getElementById(id);
  select.innerHTML = '';
  currencies.forEach(currency => {
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = currency;
    select.appendChild(option);
  })
}

//Update Data structure JS3 Week1
//Fetch data from API to update dropdown
fetch("https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json")
  .then(response => response.json())
  .then(data => {
    currencyData = data;
    const currencies = data.map(item => item.baseCurrency);
    updateCurrencyDropdown('fromCurrency', currencies);
    updateCurrencyDropdown('toCurrency', currencies);

    updateCurrencyDropdown('baseCurrencyAlarm', currencies);
    updateCurrencyDropdown('exchangeCurrencyAlarm', currencies);
  })
  .catch(error => {
    console.log("Error fetching data:", error);
  });
  


//Convert and render currencies
function convertCurrency(){
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = document.getElementById('amount').value;
  fetch("https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json")
  .then(response => response.json())
  .then(data => {
    const fromRate = data.find(item => item.baseCurrency === fromCurrency).rates[toCurrency];
    const convertedAmount = amount * fromRate;
    document.getElementById('result').textContent = `${amount} ${fromCurrency} equals ${convertedAmount.toFixed(2)} ${toCurrency}`;
  })
  .catch(error => {
    console.log("Error fetching data:", error);
  });
}

//Function to generate a table
function generateCurrencyTable(){
  const tableContainer = document.getElementById('currencyRateGrid');

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');

  const baseHeader = document.createElement('th');
  baseHeader.textContent = 'Base Currency';
  headerRow.appendChild(baseHeader);

  const exchangeHeader = document.createElement('th');
  exchangeHeader.textContent = 'Exchange Currency';
  headerRow.appendChild(exchangeHeader);

  const rateHeader = document.createElement('th');
  rateHeader.textContent = 'Rate';
  headerRow.appendChild(rateHeader);

  const trendHeader = document.createElement('th');
  trendHeader.textContent = 'Trend';
  headerRow.appendChild(trendHeader)

  //Button for ascending order
  const ascBtn = document.createElement('button');
  ascBtn.textContent = 'Sort Ascending';
  //dscBtn.classList.add('button', 'button-primary');
  //Add eventlistener for asc
  ascBtn.addEventListener('click', () => sortTable('asc'));
  headerRow.appendChild(ascBtn);

  //Button for descending order
  const dscBtn = document.createElement('button');
  dscBtn.textContent = 'Sort Descending';
  //dscBtn.classList.add('button', 'button-primary');
  //Add eventlistener for dsc
  ascBtn.addEventListener('click', () => sortTable('desc'));
  headerRow.appendChild(dscBtn);



  fetch("https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json")
    .then(response => response.json())
    //console.log(response)
    .then(data => {
      const baseCurrency = "DKK";

      const baseRates = findBaseRates(data, baseCurrency);
      //console.log(baseCurrency)
      //Add headerRows to the table
      tbody.appendChild(headerRow);

      for (const [currency, rate] of Object.entries(baseRates)) {
        const row = document.createElement('tr');

        const baseCurrencyCell = document.createElement('td');
        baseCurrencyCell.textContent = baseCurrency;
        row.appendChild(baseCurrencyCell);

        const exchangeCurrencyCell = document.createElement('td');
        exchangeCurrencyCell.textContent = currency;
        row.appendChild(exchangeCurrencyCell);

        const ratesCell = document.createElement('td');
        ratesCell.textContent = rate.toFixed(2);
        row.appendChild(ratesCell);

        const trendCell = document.createElement('td');
        //trendCell.textContent = '';
        const currentCurrencyData = data.find(item => item.baseCurrency === baseCurrency && item.rates.hasOwnProperty(currency));

        // Check the trending value and set the color accordingly
        if (currentCurrencyData && currentCurrencyData.trending === "increasing") {
          trendCell.innerHTML = '<span style="color: green;">increasing</span>';
        } else if (currentCurrencyData && currentCurrencyData.trending === "decreasing") {
          trendCell.innerHTML = '<span style="color: red;">decreasing</span>';
        }

        row.appendChild(trendCell);

        ratesArr.push(parseFloat(rate.toFixed(2)));
        console.log(ratesArr);

        tbody.appendChild(row);
      }

      table.appendChild(tbody);
      tableContainer.innerHTML = '';
      tableContainer.appendChild(table);
    })
    .catch(error => {
      console.log("Error fetching data:", error);
    });

}




function sortTable(order) {

  ratesArr.sort((a, b) => (order === 'asc' ? a - b : b - a));

  generateCurrencyTable();
}

function findBaseRates(data, baseCurrency) {
  const baseCurrencyData = data.find(item => item.baseCurrency === baseCurrency);
  return baseCurrencyData ? baseCurrencyData.rates : {};
}

//Search currencies
function searchCurrency() {
  const searchFrom = document.getElementById('searchFrom').value;
  const searchResultText = document.getElementById('searchResult');

  fetch("https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json")
    .then(response => response.json())
    .then(data => {
      const baseCurrency = data.find(currency => currency.baseCurrency === searchFrom);

      if (baseCurrency) {
        const rates = baseCurrency.rates;

        // Display search results
        searchResultText.innerHTML = '';

        const header = document.createElement('h3');
        header.textContent = `Exchange Rates for ${searchFrom}`;
        searchResultText.appendChild(header);

        const list = document.createElement('ul');
        for (const [currency, rate] of Object.entries(rates)) {
          const listItem = document.createElement('li');
          listItem.textContent = `${currency}: ${rate.toFixed(2)}`;
          list.appendChild(listItem);
        }
        searchResultText.appendChild(list);
      } else {
        searchResultText.textContent = `Base currency ${searchFrom} not found.`;
      }
    })
    .catch(error => {
      console.log("Error fetching data:", error);
    });
}


const notification = document.getElementById('notification')

function checkCurrencyRate() {
  // Retrieve values when the function is called
  const baseSpecialValue = document.getElementById('baseSpecialValue').value.trim();
  const conjugateSpecialValue = document.getElementById('conjugateSpecialValue').value.trim();

  const baseCurrencyIndex = currencyData.findIndex(currency => currency.baseCurrency === baseSpecialValue);

  //Loop through rates
  if (baseCurrencyIndex !== -1) {
    if (currencyData[baseCurrencyIndex].rates && currencyData[baseCurrencyIndex].rates.hasOwnProperty(conjugateSpecialValue)) {
      //console.log('Congrats');
      notification.textContent = 'Today, currency fits your rate alarm.';
    } else {
      //console.log('Nope');
      notification.textContent = 'The currency has no special value today.';
    }
  }
}



function createAlarm(){
  const baseCurrencyInput = document.getElementById('baseCurrencyAlarm').value;
  const exchangeCurrencyInput = document.getElementById('exchangeCurrencyAlarm').value;
  const desiredRate = parseFloat(document.getElementById('rateAlarm').value);

  const baseCurrencyInputIndex = currencyData.findIndex(currency => currency.baseCurrency === baseCurrencyInput);

  if (baseCurrencyInputIndex !==-1) {
    const rates = currencyData[baseCurrencyInputIndex].rates;

    if (rates && rates.hasOwnProperty(exchangeCurrencyInput)){
      const currentRate = rates[exchangeCurrencyInput];

      if (currentRate >= desiredRate) {
        window.alert(`Rate alarm met!\nCurrent Rate: ${currentRate.toFixed(2)}`);
      } else {
        window.alert(`Rate alarm not met.\nCurrent Rate: ${currentRate.toFixed(2)}`);
      }
    }
  }
}
