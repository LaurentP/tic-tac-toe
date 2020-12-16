'use strict';

const cases = document.getElementsByTagName('td');

// Contient la liste des combos gagnants sous forme d'expressions régulières
const allWinCombos = [
  /^012[3-8]*$/,
  /^[0-2]*345[6-8]*$/,
  /^[1-5]*678$/,
  /^0[1-2]*3[4-5]*6[7-8]*$/,
  /^[0]*1[2-3]*4[5-6]*7[8]*$/,
  /^[0-1]*2[3-4]*5[6-7]*8$/,
  /^0[1-3]*4[5-7]*8$/,
  /^[0-1]*2[3]*4[5]*6[7-8]*$/
];

let currentPiece = 'X';
let continueGame = true;

function showInfo(content) {
  const info = document.getElementById('info');
  info.classList.remove('new-info');
  info.classList.add('info-fadeout');
  setTimeout(() => {
    info.classList.replace('info-fadeout', 'new-info');
    info.textContent = content;
  }, 200);
}

function checkCombo() {
  let currentCombo = new String();
  for (let i = 0; i < 9; i++) {
    if (cases[i].textContent === currentPiece) {
      currentCombo += i;
    }
  }
  // Recherche si un combo gagnant correspond et déclare la victoire si c'est le cas
  for (let winCombo of allWinCombos) {
    if (currentCombo.match(winCombo)) {
      for (let i = 0; i < 9; i++) {
        cases[i].style.cursor = 'default';
      }
      continueGame = false;
      showInfo('Victoire de ' + currentPiece + ' !');
      break;
    }
  }
  // Si aucun combo gagnant n'a été trouvée pour l'instant
  if (continueGame) {
    let checked = 0;
    for (let i = 0; i < 9; i++) {
      if (cases[i].textContent === 'X' || cases[i].textContent === 'O') {
        checked++;
      }
    }
    if (checked === 9) {
      showInfo('Match nul'); // Si toutes les cases sont remplies
    }
    else {
      currentPiece = (currentPiece === 'X') ? 'O' : 'X';
      showInfo('En attente de ' + currentPiece + '...');
    }
  }
}

function addPiece(e) {
  if (continueGame && e.target.textContent === '') {
    e.target.textContent = currentPiece;
    e.target.classList.add('piece');
    e.target.style.cursor = 'default';
    checkCombo();
  }
}

function resetGame() {
  for (let i = 0; i < 9; i++) {
    cases[i].classList.add('piece-fadeout');
  }
  currentPiece = 'X';
  showInfo('En attente de ' + currentPiece + '...');
  setTimeout(() => {
    for (let i = 0; i < 9; i++) {
      cases[i].classList.remove('piece', 'piece-fadeout');
      cases[i].textContent = '';
      cases[i].style.cursor = 'pointer';
    }
    continueGame = true;
  }, 400);
}

for (let i = 0; i < 9; i++) {
  cases[i].addEventListener('click', addPiece);
}

document.getElementById('reset').addEventListener('click', (e) => {
  e.preventDefault();
  resetGame();
});

showInfo('En attente de ' + currentPiece + '...');