let ratesArr = [];

//Update Data structure JS3 Week1
//Fetch data from API to update dropdown
fetch("https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json")
  .then(response => response.json())
  .then(data => {
    const currencies = data.map(item => item.baseCurrency);
    updateCurrencyDropdown('fromCurrency', currencies);
    updateCurrencyDropdown('toCurrency', currencies)
  })
  .catch(error => {
    console.log("Error fetching data:", error);
  });
  
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

  //Button for ascending order
  const ascBtn = document.createElement('button');
  ascBtn.textContent = 'Sort Ascending';
  //Add eventlistener for asc
  ascBtn.addEventListener('click', () => sortTable('asc'));
  headerRow.appendChild(ascBtn);

  //Button for descending order
  const dscBtn = document.createElement('button');
  dscBtn.textContent = 'Sort Descending';
  //Add eventlistener for dsc
  ascBtn.addEventListener('click', () => sortTable('desc'));
  headerRow.appendChild(dscBtn);



  fetch("https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json")
    .then(response => response.json())
    //console.log(response)
    .then(data => {
      const baseCurrency = "Danish Krone";

      const baseRates = findBaseRates(data, baseCurrency);
      //const baseRates = data.find(item => item.baseCurrency === baseCurrency).rates;
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