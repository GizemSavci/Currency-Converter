function populateCurrencyDropdown(id, currencies){
    const select = document.getElementById(id);
    for (const currency of currencies){
        let option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;
        select.appendChild(option);
    }
}

function switchCurrencies() {
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");
  
    const tempValue = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = tempValue;
  }
  
document.getElementById("switchCurrency").addEventListener("click", switchCurrencies);


function generateTable(){
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

    tbody.appendChild(headerRow);
    table.appendChild(tbody);
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
    console.log("Table generated!");
}

document.getElementById("generateTable").addEventListener("click", generateTable)

//Search currencies
function searchCurrency() {
    const searchFrom = document.getElementById('searchFrom').value;
    //searchFrom.removeAttribute('hidden');
    //const searchResultText = document.getElementById('searchResult');
} 

document.getElementById("searchCurrency").addEventListener("click", searchCurrency);