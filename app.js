// Global Variables
const overlay = document.querySelector('#overlay');
const reset = document.querySelector('.btn__reset');
const qwerty = document.querySelectorAll('#qwerty button');
const phrase = document.querySelector('#phrase ul');
const tries = document.querySelectorAll('.tries img');
const phrases = ['a chip on your shoulder',
                    'back to square one',
                    'head over heels',
                    'photo finish',
                    'throw in the towel',
                ];

let missed = 0;

qwerty.forEach(btn => {
    btn.addEventListener('click', function() {
       this.classList.add('chosen');
       this.setAttribute('disabled', 'true');
       let letterFound = checkLetter(this);

       if (letterFound == null) {
            tries[missed].src = "images/lostHeart.png";
            missed++;
       }

       checkWin();
    })
})


let getRandomPhraseAsArray = arr => {
    let index = Math.floor(Math.random() * arr.length);

    return arr[index].split('');
}

let addPhraseToDisplay = arr => {
    arr.forEach(char => {
        let li = document.createElement('li');

        if (char != ' ') {
            li.classList.add('letter');
        }

        let text = document.createTextNode(char);

        li.appendChild(text);
        phrase.appendChild(li);
    });
}

let checkLetter = btn => {
    let letters = document.querySelectorAll('.letter');
    let match = false;

    letters.forEach(letter => {
        if (btn.textContent === letter.textContent) {
            letter.classList.add('show');
            match = true;
        }
    })

    if (match === false) {
        return null;
    } else {
        return "";
    }
}

let checkWin = () => {
    let letters = document.querySelectorAll('.letter');
    let lettersCorrect = document.querySelectorAll('.letter.show');
    
    if (letters.length === lettersCorrect.length) {
        reset.text = "You won! Play again!"
        overlay.className = 'win';
        overlay.style.display = 'flex';
    } else if (missed === 5) {
        reset.text = "You lost! Try again!"
        overlay.className = 'lose';
        overlay.style.display = 'flex';
    }
}

let resetGame = () => {
    if (reset.textContent != "Start Game") {
      qwerty.forEach(btn => {
          btn.classList.remove('chosen');
          btn.removeAttribute("disabled")
      });
      
      phrase.innerHTML = '';

      tries.forEach(heart => {
          heart.src = "images/liveHeart.png";
      })
    }
    missed = 0;
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    overlay.style.display = 'none';
}


// Adds event listener to "Start Game" button
reset.addEventListener('click', resetGame);

// let lets = document.querySelectorAll('.letter')
// console.log(lets.length)

// qwerty.forEach(row => {
//     console.log(row.textContent);
// })