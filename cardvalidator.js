

// Function to validate credit card numbers using Luhn algorithm
function validateCred(arrNew) {
    let sum = 0;
    for (let i = 0; i < arrNew.length; i++) {
      let digit = arrNew[i];
      if ((arrNew.length - 1 - i) % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }
  
  
  
  //Function to find invalid credit card numbers from a nested array
  function findInvalidCards(nestArr){
    let invalidCards = [];
    nestArr.forEach((currCard) => {
      if (!validateCred(currCard)) {
        invalidCards.push(currCard);
      }
    })
    return invalidCards;
  };
  
  
  
  //Function to identify invalid card companies based on their first digit
  function idInvalidCardCompanies(arr){
  const companies = [];
  for (let i=0; i < arr.length; i++){
    switch (arr[i][0]){
      case 3:
        if (!companies.includes('Amex')){
          companies.push('Amex');
        }
        break;
      case 4:
        if (!companies.includes('Visa')){
          companies.push('Visa');
        }
        break;
      case 5:
        if (!companies.includes('Mastercard')){
          companies.push('Mastercard');
        }
        break;
      case 6:
        if (!companies.includes('Discover')){
          companies.push('Discover');
        }
        break;
      default:
        console.log('Company not found');
      }
    }
    return companies;
  }
  
  