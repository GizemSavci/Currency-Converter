const currencyData = [];

function addCurrency(event){
    event.preventDefault();
    const baseCurrency = document.getElementById('baseCurrency').value;
    const conjugateCurrency =document.getElementById('conjugateCurrency').value;
    const rate = parseFloat(document.getElementById('rate').value);

    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const formattedDate = currentDate.toISOString();

    let newCurrency = {
        base: baseCurrency,
        conjugate: conjugateCurrency,
        rate: rate,
        timestamp: timestamp,
        date: formattedDate
    };

    currencyData.push(newCurrency);
    console.log(currencyData);

    //return currencyData;
    return false;
}


function convertCurrency(){
    let mainCurrency = document.getElementById('mainCurrency').value;
    let targetCurrency = document.getElementById('targetCurrency').value;
    let amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount)){
        document.getElementById('result').innerText = 'Please enter a valid amount';
        return;
    }

    const targetCurrencyData = currencyData.find(currency => currency.conjugate === targetCurrency);
    const result = amount*targetCurrencyData.rate;
    if (targetCurrencyData){
        document.getElementById('result').innerText =`${amount} ${targetCurrency} equals ${result.toFixed(2)} ${mainCurrency}`;
        return result;
    }else if(!targetCurrencyData){
      document.getElementById('result').innerText = 'Please try another currency.';
      return result;
    }
}
