let currenciesArray = []; // ['DKK', 'EUR', 'USD', 'SEK', 'NOK', 'CHF', 'GBP', 'TL']
let ratesArray = []; // 

async function getBaseCurrencies(){
  try {
    const response = await fetch('https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json');
    if (response.ok){
      const jsonData = await response.json();
      const currencies = jsonData.map(item => item.baseCurrency);
      console.log(jsonData)
      populateCurrencyDropdown("fromCurrency", currencies);
      populateCurrencyDropdown("toCurrency", currencies);
      currenciesArray.push(currencies)
    }
    return currenciesArray;
  }catch (error){
    console.log(error);
  }
  //return currencies
}


console.log(currenciesArray)
getBaseCurrencies();


async function convertCurrency(){
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = document.getElementById('amount').value;
  try {
    const response = await fetch('https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json');
    if (response.ok){
      const jsonData = await response.json();
      const fromRate = jsonData.find(item => item.baseCurrency === fromCurrency).rates[toCurrency];
      const convertedAmount = amount * fromRate;
      document.getElementById('result').textContent = `${amount} ${fromCurrency} equals ${convertedAmount.toFixed(2)} ${toCurrency}`;
    }
    }catch (error){
      console.log(error);
  }
}

//getBaseCurrencies();

async function extractRates(){
  try {
    const response = await fetch('https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json');
    if (response.ok){
      const jsonData = await response.json();
      jsonData.forEach(obj => {
        const ratesObject = obj.rates;
        const ratesEntries = Object.entries(ratesObject);
        ratesArray.push(ratesEntries);
      })
      return ratesArray;
    }
  }catch (error){
    console.log(error);
}
}

console.log(ratesArray)
extractRates()

function createTable(currenciesArray){
  currenciesArray.forEach(data => {
    const row = document.createElement('tr');
    data.forEach(cellData => {
      const cell = document.createElement('td');
      cell.textContent = cellData;
      row.appendChild(row);
    })
    table.appendchild(tbody);
    document.body.appendChild(table);
  })
}

createTable(currenciesArray);
console.log(createTable(currenciesArray))