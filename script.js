const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[length-Display]");
const passwordDisplay= document.querySelector("[data-passwordDisplay]");
const copyButton= document.querySelector("[data-copy]");
const copyMsg= document.querySelector("[data-copyMsg]");
const uppercaseCheck= document.querySelector("#uppercase");
const lowercaseCheck= document.querySelector("#lowercase");
const numbersCheck= document.querySelector("#numbers");
const symbolsCheck= document.querySelector("#symbols");
const indicator= document.querySelector(".indicator");
const generateBtn= document.querySelector("#generateBtn");
const allcheckbox= document.querySelectorAll("input[type= checkbox]");
let password="";
let passwordlength=10;
let checkCount=1;
