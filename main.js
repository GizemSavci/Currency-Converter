const currencyData = [];

function addCurrency(){

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

    return currencyData;
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

    if (targetCurrencyData){
        const result = amount*targetCurrencyData.rate;
        document.getElementById('result').innerText =`${amount} ${targetCurrency} equals ${result.toFixed(2)} ${mainCurrency}`;
        return result;
    }
}
