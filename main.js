//Define global arrays to store properties
const timestampDataArray = [];
const dateDataArray = [];
const baseCurrencyDataArray = [];
const ratesDataArray = [];
const trendingDataArray = [];

//Fetch data and store in arrays
async function fetchData(){
  try {
    const response = await fetch('https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json');
    const jsonData = await response.json();
    console.log('Object:', jsonData);
    for (let i=0; i < jsonData.length; i++){
      const timestampData = jsonData[i].timeStamp;
      const dateData = jsonData[i].date;
      const baseCurrencyData = jsonData[i].baseCurrency;
      const ratesData = jsonData[i].rates;
      const trendingData = jsonData[i].trending;
      
      timestampDataArray.push(timestampData);
      dateDataArray.push(dateData);
      baseCurrencyDataArray.push(baseCurrencyData);
      ratesDataArray.push(ratesData);
      trendingDataArray.push(trendingData);
    }
    processData();
    buildTable();
  } catch (error) {
    console.error(error);
  }
}

//Log arrays
function processData() {
console.log('Timestamps:', timestampDataArray);
console.log('Dates:', dateDataArray);
console.log('Base Currencies:', baseCurrencyDataArray);
console.log('Rates:', ratesDataArray);
console.log('Trending:', trendingDataArray);
};

fetchData();

function buildTable() {
  const tableBody = document.getElementById('tableBody');

  // Clear existing table rows
  tableBody.innerHTML = '';

  // Get the index of DKK in the baseCurrencyDataArray
  const dkkIndex = baseCurrencyDataArray.indexOf('DKK');

  // Create rows for DKK base currency
  for (let i = dkkIndex + 1; i < dkkIndex + 9; i++) {
      let row = document.createElement('tr');

      // Create table data for base currency (DKK)
      let baseCurrencyCell = document.createElement('td');
      baseCurrencyCell.textContent = 'DKK';
      row.appendChild(baseCurrencyCell);

      // Get the exchange currency and rate
      let exchangeCurrency = Object.keys(ratesDataArray[dkkIndex])[i - (dkkIndex + 1)];
      let rate = ratesDataArray[dkkIndex][exchangeCurrency];

      // Create table data for exchange currency
      let exchangeCurrencyCell = document.createElement('td');
      exchangeCurrencyCell.textContent = exchangeCurrency;
      row.appendChild(exchangeCurrencyCell);

      // Create table data for rate
      let rateCell = document.createElement('td');
      rateCell.textContent = rate;
      row.appendChild(rateCell);

      // Create empty table data for trending (you may adjust this according to your needs)
      let trendingCell = document.createElement('td');
      trendingCell.textContent = 'increasing'; // You can adjust this according to your needs
      row.appendChild(trendingCell);

      // Append the row to the table body
      tableBody.appendChild(row);
  }
}

function searchBaseCurrency() {
  // Get the search query from the input field
  const searchQuery = document.getElementById('searchBaseCurrency').value.toUpperCase();

  // Get the table body element
  const tableBody = document.getElementById('tableBody');

  // Get all rows in the table
  const rows = tableBody.getElementsByTagName('tr');

  // Loop through all rows and check if any base currency cell matches the search query
  for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      let cells = row.getElementsByTagName('td');
      let found = false;

      // Loop through all cells in the row
      for (let j = 0; j < cells.length; j++) {
          let cell = cells[j];
          let cellText = cell.textContent.toUpperCase();

          // Check if the cell content matches the search query
          if (cellText === searchQuery) {
              found = true;
              break; // No need to check further cells in this row
          }
      }

      // Display or hide the row based on the search result
      if (found) {
          row.style.display = '';
      } else {
          row.style.display = 'none';
      }
  }
}
