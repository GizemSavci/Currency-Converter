

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
function generateCurrencyTable() {
  const tableContainer = document.getElementById('currencyRateGrid');
  //Create table and tbody elements
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  //Create header row
  const headerRow = document.createElement('tr');
  const baseHeader = document.createElement('th');
  baseHeader.textContent = 'Base Currency';
  headerRow.appendChild(baseHeader);

  fetch("https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json")
  .then(response => response.json())
  .then(data => {
    const currencyNames = [];
    data.forEach(item => {
      currencyNames.push(item.baseCurrency);
      Object.keys(item.rates).forEach(rateCurrency => {
        if (!currencyNames.includes(rateCurrency)) {
          currencyNames.push(rateCurrency);
        }
      });
    });

    currencyNames.forEach(currencyName => {
      const nameHeader = document.createElement('th');
      nameHeader.textContent = currencyName;
      headerRow.appendChild(nameHeader);
    });
    tbody.appendChild(headerRow);

    data.forEach(item => {
      const row = document.createElement('tr');
      const baseCurrencyCell = document.createElement('td');
      baseCurrencyCell.textContent = item.baseCurrency;
      row.appendChild(baseCurrencyCell);

      currencyNames.forEach(currencyName => {
        const rateCell = document.createElement('td');
        const rate = (currencyName === item.baseCurrency) ? 1 : item.rates[currencyName];
        rateCell.textContent = rate.toFixed(2);
        row.appendChild(rateCell);
      })
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
    })
    .catch(error => {
      console.log("Error fetching data:", error);
    });
}


//Function to generate a table
function generateCurrencyTable() {
  const tableContainer = document.getElementById('currencyRateGrid');
  //Create table and tbody elements
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  //Create header row
  const headerRow = document.createElement('tr');
  const baseHeader = document.createElement('th');
  baseHeader.textContent = 'Base Currency';
  headerRow.appendChild(baseHeader);

  fetch("https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json")
    .then(response => response.json())
    .then(data => {
      const currencyNames = [];
      data.forEach(item => {
        currencyNames.push(item.baseCurrency);
        Object.keys(item.rates).forEach(rateCurrency => {
          if (!currencyNames.includes(rateCurrency)) {
            currencyNames.push(rateCurrency);
          }
        });
      });

      currencyNames.forEach(currencyName => {
        const nameHeader = document.createElement('th');
        nameHeader.textContent = currencyName;

        // Add click event listener for sorting
        nameHeader.addEventListener('click', () => {
          sortColumn(currencyName, data);
        });

        headerRow.appendChild(nameHeader);
      });
      tbody.appendChild(headerRow);

      data.forEach(item => {
        const row = document.createElement('tr');
        const baseCurrencyCell = document.createElement('td');
        baseCurrencyCell.textContent = item.baseCurrency;
        row.appendChild(baseCurrencyCell);

        currencyNames.forEach(currencyName => {
          const rateCell = document.createElement('td');
          const rate = (currencyName === item.baseCurrency) ? 1 : item.rates[currencyName];
          rateCell.textContent = rate.toFixed(2);
          row.appendChild(rateCell);
        })
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      tableContainer.innerHTML = '';
      tableContainer.appendChild(table);
    })
    .catch(error => {
      console.log("Error fetching data:", error);
    });
}

