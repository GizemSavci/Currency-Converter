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
  