let base_url = "https://api.frankfurter.app/latest?amount";
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".btn");
let fromCode = document.querySelector(".from");
let toCode = document.querySelector(".to");
for(let select of dropdowns){
    for(let code in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.className === "from" && code === "USD"){
            newOption.selected = "selected";
        }else{
            if(select.className === "to" && code === "INR"){
                newOption.selected = "selected";
            }
        }
        select.append(newOption);
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        })
    }
}
const updateFlag = (element) =>{
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
}
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".text");
    let amtValue = amount.value;
    if(amtValue == "" || amtValue < 0){
         amtValue = 1;
         amount.value ="1";
    }
    let url = `${base_url}&from=${fromCode.value}&to=${toCode.value}`;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    let data1 = data.rates;
    let rate = data1[toCode.value];
    let result = amtValue * rate;
    let div = document.querySelector(".msg");
    div.innerText = result;
})