const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[length-Display]");
const passwordDisplay= document.querySelector("[data-passwordDisplay]");
const copyButton= document.querySelector("[data-copy]");
const copyMsg= document.querySelector("[data-copyMsg]");
const uppercase= document.querySelector("#uppercase");
const lowercase= document.querySelector("#lowercase");
const numbers= document.querySelector("#numbers");
const symbols= document.querySelector("#symbols");
const indicator= document.querySelector(".indicator");
const generateBtn= document.querySelector("#generateBtn");
const allcheckbox= document.querySelectorAll("input[type= checkbox]");
let password="";
let passwordlength=10;
let checkCount=1;
const symbolStr = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

handleSlider();
function handleSlider(){
    inputSlider.value= passwordlength;
    lengthDisplay.innerText= passwordlength;
}
inputSlider.addEventListener('input', (event) => {
    passwordlength = event.target.value;
    handleSlider();
});
function setIndicator(color){
    indicator.style.backgroungColor= color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}
// Default Indicator 
setIndicator("#ccc");
function getRandomInteger(max, min){
  return Math.floor( Math.random()*(max-min))+min;
}
function generateRndNumber(){
    return getRandomInteger(0,9);
}
function generateLower(){
    return String.fromCharCode(getRandomInteger(97, 123));
}
function generateUpper(){
    return String.fromCharCode(getRandomInteger(65, 91));
}
function generateSymbol(){
    const rnd= getRandomInteger(0, symbolStr.length);
    return symbolStr.charAt(rnd);
}
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;
    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordlength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordlength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied!";
    }
    catch(e){
        copyMsg.innerText="failed!";
    }
    copyMsg.classList.add('active');

    setTimeout(() => {
        copyMsg.classList.remove('active');
    }, 2000);  
}
copyButton.addEventListener("click", () => {
    if (passwordDisplay.value)
        copyContent();
});
function handleCheckbox(){
    checkCount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    });
    if(passwordlength<checkCount){
        passwordlength=checkCount;
        handleSlider();
    }
}
allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckbox);
});
function shufflePass(arr){
   //fisher yates method
   for(let i=arr.length-1; i>=0; i--){
    const j= Math.floor(Math.random()*i+1);
    const temp= arr[i];
    arr[i]= arr[j];
    arr[j]= temp;
   }
   let str = "";
   arr.forEach((el) => (str += el));
   return str;
}
generateBtn.addEventListener('click',()=>{
    if(checkCount<=0) return;
    if(passwordlength<checkCount){
        passwordlength=checkCount;
        handleSlider();
    }
    //new password
    //step1: remove old password
    password="";
    //step2: add according to checkboxes
   
    let funcArr=[];
    if(uppercase.checked)
    funcArr.push(generateUpper);
    if(lowercase.checked)
    funcArr.push(generateLower);
    if(numbers.checked)
    funcArr.push(generateRndNumber);
    if(symbols.checked)
    funcArr.push(generateSymbol);
    //compulsory addition
    for(let i=0; i<funcArr.length; i++){
        password+=funcArr[i]();
    }
    //remaining addition
    for(let i=0; i<passwordlength-funcArr.length; i++){
        let rndIndex= getRandomInteger(0, funcArr.length);
        password+=funcArr[rndIndex]();
    }
    //shuffle password
    password= shufflePass(Array.from(password));
    //display
    passwordDisplay.value = password;
    //calc strength
    calcStrength();
});
