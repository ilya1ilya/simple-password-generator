const resultEl = document.querySelector('#result');
const lengthEl = document.querySelector('#length');
const uppercaseEl = document.querySelector('#uppercase');
const lowercaseEl = document.querySelector('#lowercase');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');
const generateEl = document.querySelector('#generate');
const clipboardEl = document.querySelector('#clipboard');

const lowercaseLetters = 'qwertyuiopasdfghjklzxcvbnm';
const uppercaseLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const numbers = '0123456789';
const symbols = '!@#$%^&*(){}[]=<>/,.';

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})




clipboardEl.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) return;

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
})

function generatePassword(lower, upper, number, symbol, length) {
    if(length > 20) length = 20;

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        item => Object.values(item)[0] == true
      );

    if(typesCount == 0) return '';

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            let funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        })
    }
    
    let finalPassword = generatedPassword.slice(0, length);
    finalPassword = shuffelWord(finalPassword);

    return finalPassword;
}

function getRandomLower() {
    return lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
} 

function getRandomUpper() {
    return uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
} 

function getRandomNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
} 

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
} 

function shuffelWord (word){
    var shuffledWord = '';
    word = word.split('');
    while (word.length > 0) {
      shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
    }
    return shuffledWord;
}