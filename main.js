let currencies = [];

async function getBaseCurrencies(){
  try {
    const response = await fetch('https://raw.githubusercontent.com/GizemSavci/gizem.github.io/main/data/currencies.json');
    if (response.ok){
      const jsonData = await response.json();

      currencies = jsonData.map(item => item.baseCurrency);
      console.log(jsonData)
      populateCurrencyDropdown("fromCurrency", currencies);
      populateCurrencyDropdown("toCurrency", currencies);
      return jsonData;
    }
  }catch (error){
    console.log(error);
  }
  return currencies
}


//console.log(currencies)
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