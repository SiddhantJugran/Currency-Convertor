let select = document.querySelectorAll("select")
// function which is using exchange rate api to convert input amount
const convert = (event) => {
    let currencyFrom = select[0].value.toLowerCase();
    let currencyTo = select[1].value.toLowerCase();
    const apiurl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyFrom}.json`
    const func = async () => {
        let response = await fetch(apiurl)
        let data = await response.json();
        let rate = data[currencyFrom][currencyTo];
        let input = document.querySelector("input");
        input = input.value;
        let amount = input * rate;
        let answer = document.querySelector(".answer");
        if (isNaN(amount)) {
            answer.innerText = `Enter Valid Amount`;
        }
        else answer.innerText = `${input} ${currencyFrom.toUpperCase()} = ${amount.toFixed(3)} ${currencyTo.toUpperCase()}`;

    }
    func()
}
//  Populating Options
for (let currCode in countryList) { // countryList object containing country codes with thier currency codes
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    option1.value = currCode;
    option1.innerText = currCode;
    option2.value = currCode;
    option2.innerText = currCode;
    // adding the new created option elements into the select element
    select[0].append(option1);
    select[1].append(option2);
}
// Selecting initial Options
select[0].value = "USD"
select[1].value = "INR"
// whenever the page reloads i want my convert function to work
convert()
//   Changing Flag using Flag API
select.forEach((element) => {
    element.addEventListener("change", (event) => {
        let countryCode = countryList[element.value];
        const imgurl = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let imgSelector = element.classList[1];
        let img = document.querySelector(`.${imgSelector}`)
        img.src = imgurl;
    })
})
// Converting Currency
let button = document.querySelector("button");
button.addEventListener("click", convert)

