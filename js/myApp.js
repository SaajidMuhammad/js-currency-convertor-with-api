
window.onload = () => {
    fetch('https://free.currconv.com/api/v7/currencies?apiKey=b2926387e0a03a02fa74')
    
    .then(function(response) {
        return response.json();
    })
    .then(function(resp) {

        let allCurrency = resp.results;
        let currencyCodes = Object.keys(allCurrency);

        let list = document.getElementById('listOfCurrency');
        let list2 = document.getElementById('listOfCurrency1');

        currencyCodes.forEach(cc => {
            let option = document.createElement('option');
            option.value = cc;
            option.innerText = `${cc} - ${allCurrency[cc].currencyName}`;
            list.appendChild(option);
        });

        currencyCodes.forEach(cc => {
            let option = document.createElement('option');
            option.value = cc;
            option.innerText = `${cc} - ${allCurrency[cc].currencyName}`;
            list2.appendChild(option);
        });
    });
}


const convertCurrency = () => {

    let myCurrency = document.getElementById("listOfCurrency1");
    let currencyToChange = document.getElementById("listOfCurrency");
    let myAmount = document.getElementById('myAmount').value;

    let mySelectedCurreny = myCurrency.options[myCurrency.selectedIndex].value;
    let selectedCurreny = currencyToChange.options[currencyToChange.selectedIndex].value;
      
    let amountValidate = document.getElementById("amountValidate");
    let fromValidate = document.getElementById("fromValidate");
    let toValidate = document.getElementById("toValidate");

    if(selectedCurreny == "") {
        let error2 = "Please select a Currency";
        fromValidate.innerText = error2;      
    }
    if(myAmount == "") {
        let error1 = "Please fill a Valid amount";
        amountValidate.innerText = error1;
    }
    if(mySelectedCurreny == "") {
        let error3 = "Please select a Currency";
        toValidate.innerText = error3;
    }
    else {

    fromValidate.innerText = "";
    amountValidate.innerText = "";
    toValidate.innerText = "";

    let button1 = document.getElementById("button1");
    button1.className = "button is-link is-loading";

    let convertFrom = mySelectedCurreny;

    const convertorEndpoint = `${baseEndpoint}q=${selectedCurreny}_${convertFrom}&compact=ultra&apiKey=${APIkey}`;
    fetch(convertorEndpoint).then(function(response) {
        return response.json();
      })
      .then(function(resp) {
            
            let idOfCurrency = selectedCurreny+'_'+convertFrom;
            let singleCurrency = resp[idOfCurrency];  
            let finalTransferRate = (myAmount*singleCurrency) 
            let currentTime = new Date();
            
            let answerHere = document.getElementById('finalResult');
            let currentDate = document.getElementById('currentDate');

            answerHere.innerHTML = `<h6> ${myAmount} ${selectedCurreny} = ${finalTransferRate} ${convertFrom} </h6>`;
            currentDate.innerHTML = `<p> on ${currentTime} </p>`
            button1.classList.remove("is-loading");

      }).catch(e => console.log(e))    
    }
}

let button = document.getElementById('button1');
button.addEventListener('click', convertCurrency);
const baseEndpoint = 'https://free.currconv.com/api/v7/convert?';
const APIkey = 'b2926387e0a03a02fa74';

