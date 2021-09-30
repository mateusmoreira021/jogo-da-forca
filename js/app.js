const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll('.figure-part');

const words = ['desenvolvedor', 'programador', 'javascript', 'vida', 'trabalho'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetter = [];
const wrongLetter = [];


function displayWord(){
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                (letter) =>`
                    <span class="letter">
                        ${correctLetter.includes(letter) ? letter : ''}
                    </span>
                
                `)
        .join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord){
        finalMessage.innerText = 'Parabéns vc ganhou 😃';
        popup.style.display = "flex";
    }
}

function upadateWrongLettersEl(){
    wrongLettersEl.innerHTML = `
        ${wrongLetter.length > 0 ? '<p>Errado</p>' : ''}
        ${wrongLetter.map((letter) => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) =>{
        const erros = wrongLetter.length;

        if(index < erros){
            part.style.display = "block";
        }else{
            part.style.display = "none";
        }
    });

    if(wrongLetter.length === figureParts.length){
        finalMessage.innerText = 'Vc perdeu kkkkkkk';
        popup.style.display = "flex";
    }
}

function showNotification(){
    notification.classList.add('show');

    setTimeout(() =>{
        notification.classList.remove('show');
    }, 2000);
}

window.addEventListener('keydown', (e) =>{
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        
        if(selectedWord.includes(letter)){
            if(!correctLetter.includes(letter)){
                correctLetter.push(letter);

                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrongLetter.includes(letter)){
                wrongLetter.push(letter);

                upadateWrongLettersEl();
            }else{
                showNotification();
            }
        }
    }
});

playAgainBtn.addEventListener("click", () =>{
    correctLetter.splice(0);
    wrongLetter.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    upadateWrongLettersEl();

    popup.style.display = "none";
});

displayWord();