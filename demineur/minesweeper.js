var minesweeper = [[],[],[],[],[],[],[],[],[],[]];
var flags = [[],[],[],[],[],[],[],[],[],[]];
var conf = [16, 24, 36];
var flag = false;
var mines = -1;
var win = false;
var debug = false;

// Méthode pour gerer les évènements clavier.
document.addEventListener('keydown', (event) => {
	if (event.keyCode == 70) {
		toggleFlag(event.keyCode);
	}
	if (event.keyCode == 68) {
		toggleDebug(event.keyCode);
	}
});
// Ne rien modifier au dessus de ce commentaire

// Fonction pour créer automatiquement les mines sur une nouvelle grille
// Ne pas modifier cette fonction
function setGrille(difficulty) {
	restart()
	mines = 0;
	for (var x = 0; x < 16; x++) {
		for (var y = 0; y < 10; y++) {
			var random = Math.floor(Math.random() * 101);
			if (random <= conf[difficulty]) {
				minesweeper[y][x] = 'M';
				if (debug == true) {
					document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('mine');
				}
				mines++;
			}
		}
	}
	document.getElementById('infos').children[0].innerHTML = 'Il reste ' + mines + ' mine' + (mines > 1 ? 's' : '');
}

// Fonction pour vérifier si les drapeaux ont été posés corretement
// Ne pas modifier cette fonction
function verify() {
	for (var x = 0; x < 16; x++) {
		for (var y = 0; y < 10; y++) {
			if (flags[y][x] == 1 && minesweeper[y][x] != 'M') {
				document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('flag');
				if (minesweeper[y][x] != 'E' && minesweeper[y][x] != undefined) {
					document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('m' + minesweeper[y][x]);
					document.getElementById('minesweeper').children[y].children[x].children[0].innerHTML = minesweeper[y][x];
				}
				document.getElementById('minesweeper').children[y].children[x].classList.add('explose');
			} else if (minesweeper[y][x] == 'M') {
				document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('mine');
			}
		}
	}
	completerGrille();
}

// Fonction pour dessiner automatiquement la grille
// Ne pas modifier cette fonction
function dessinerGrille() {
	for (var x = 0; x < 16; x++) {
		for (var y = 0; y < 10; y++) {
			if (win == false) {
				document.getElementById('minesweeper').children[y].children[x].classList.add('clicked');
			}
			if (minesweeper[y][x] == 'M') {
				document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('mine');
			} else if (minesweeper[y][x] != 'E' && minesweeper[y][x] != undefined) {
				document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('m' + minesweeper[y][x]);
				document.getElementById('minesweeper').children[y].children[x].children[0].innerHTML = minesweeper[y][x];
			}
		}
	}
	if (win == false) {
		win = true;
		is_win();
	}
}

// Fonction action/désactivation du mode Debug
// Ne pas modifier cette fonction
function toggleDebug(event) {
	if (debug == true) {
		debug = false;
		document.getElementById('cogs').children[0].classList.remove('toggleOn');
		document.getElementById('cogs').children[0].classList.add('toggleOff');
		if (win == false) {
			var items = document.querySelectorAll('.mine');
			for (let item of items) {
				item.classList.remove('mine');
			}
		}
	} else {
		debug = true;
		document.getElementById('cogs').children[0].classList.remove('toggleOff');
		document.getElementById('cogs').children[0].classList.add('toggleOn');
		for (var x = 0; x < 16; x++) {
			for (var y = 0; y < 10; y++) {
				if (minesweeper[y][x] == 'M') {
					document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('mine');
				}
			}
		}
	}
}

// Fonction action/désactivation du mode Drapeau
// Ne pas modifier cette fonction
function toggleFlag(event) {
	if (flag == true) {
		flag = false;
		document.getElementById('flag').children[0].classList.remove('toggleOn');
		document.getElementById('flag').children[0].classList.add('toggleOff');
	} else {
		flag = true;
		document.getElementById('flag').children[0].classList.remove('toggleOff');
		document.getElementById('flag').children[0].classList.add('toggleOn');
	}
}

// Fonction pour recommencer
// Ne pas modifier cette fonction
function restart() {
	minesweeper = [[],[],[],[],[],[],[],[],[],[]];
	flags = [[],[],[],[],[],[],[],[],[],[]];
	mines = -1;
	win = false;
	for (var x = 0; x < 16; x++) {
		for (var y = 0; y < 10; y++) {
			document.getElementById('minesweeper').children[y].children[x].classList.remove('clicked');
			document.getElementById('minesweeper').children[y].children[x].classList.remove('explose');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('mine');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('flag');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m1');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m2');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m3');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m4');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m5');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m6');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m7');
			document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('m8');
			document.getElementById('minesweeper').children[y].children[x].children[0].innerHTML = '';
		}
	}
	document.getElementById('infos').children[0].innerHTML = '';
}

// Fonction pour dessiner une mine qui a explosée si on clique sur une mine
// Ne pas modifier cette fonction
function dessinerMineExplose(x, y) {
	document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('mine');
	document.getElementById('minesweeper').children[y].children[x].classList.remove('clicked');
	document.getElementById('minesweeper').children[y].children[x].classList.add('explose');
	document.getElementById('infos').children[0].innerHTML = 'BOOM !!!';
	win = 'mine';
}

// Fonction pour dessiner un drapeau si on clique sur une case
// Ne pas modifier cette fonction
function dessinerFlag(x, y, toggle) {
	if (toggle == 1) {
		document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('flag');
	} else {
		document.getElementById('minesweeper').children[y].children[x].children[0].classList.remove('flag');
	}
}

// Fonction pour dessiner une case vide si on clique sur une case vide
// Ne pas modifier cette fonction
function dessinerCaseVide(x, y) {
	document.getElementById('minesweeper').children[y].children[x].classList.add('clicked');
}

// Fonction pour dessiner le nombre de mine si on clique sur une case qui a des mines autour d'elle
// Ne pas modifier cette fonction
function dessinerNbMine(x, y) {
	document.getElementById('minesweeper').children[y].children[x].classList.add('clicked');
	document.getElementById('minesweeper').children[y].children[x].children[0].classList.add('m' + minesweeper[y][x]);
	document.getElementById('minesweeper').children[y].children[x].children[0].innerHTML = minesweeper[y][x];
}

// Fonction pour jouer
function play(x, y) {
	if (mines >= 0 && win === false) {
		if (flag == true) {
			if (flags[y][x] == 1) {
				flags[y][x] = 0;
				dessinerFlag(x, y, 0);
				mines++;
				document.getElementById('infos').children[0].innerHTML = 'Il reste ' + mines + ' mine' + (mines > 1 ? 's' : '');
			} else if (minesweeper[y][x] === undefined || minesweeper[y][x] == 'M') {
				flags[y][x] = 1;
				dessinerFlag(x, y, 1);
				mines--;
				document.getElementById('infos').children[0].innerHTML = 'Il reste ' + mines + ' mine' + (mines > 1 ? 's' : '');
			}
		}
		else if (minesweeper[y][x] == 'M' && flags[y][x] != 1) {
			dessinerMineExplose(x, y);
		}
		else {
			if (flags[y][x] == 1) {
				if (win !== false) {
					flags[y][x] = 0;
					dessinerFlag(x, y, 0);
					mines++;
					document.getElementById('infos').children[0].innerHTML = 'Il reste ' + mines + ' mine' + (mines > 1 ? 's' : '');
				}
			}
			else {
				// Ne rien modifier au dessus de ce commentaire
				var count = 0;

				if(y == 0){
					for(i = (x-1); i <= (x+1); i++){
						for(j = y; j <= (y+1); j++){
							if(minesweeper[j][i] == 'M'){
							count++;
							}	
						}
					}
				}
				else if(y == 9){
					for(i = (x-1); i <= (x+1); i++){
						for(j = (y-1); j <= y; j++){
							if(minesweeper[j][i] == 'M'){
							count++;
							}	
						}
					}
				}
				else{
					for(i = (x-1); i <= (x+1); i++){
						for(j = (y-1); j <= (y+1); j++){
							if(minesweeper[j][i] == 'M'){
							count++;
							}
						}
					}
				}
				if(count == 0){
					minesweeper[y][x] = 'E';					
				}
				else{
					minesweeper[y][x] = count;
				}
				if(minesweeper[y][x] == 'E'){
					dessinerCaseVide(x,y);
				}
				else{
					dessinerNbMine(x,y);
				}
				// Ne rien modifier au dessous de ce commentaire
			}
		}
		is_win();
	}
}

// Fonction pour completer automatiquement la grille
function completerGrille() {
	// Ne rien modifier au dessus de ce commentaire
	var count = 0;
	var x = 0;
	var y = 0;
	var k = 0;
	var l = 0;


	for(x = 0; x <= 15; x++){
		for(y = 0; y <= 9; y++){
				var count = 0;

			if(minesweeper[y][x] != 'M'){
				if(y == 0){
					for(i = (x-1); i <= (x+1); i++){
						for(j = y; j <= (y+1); j++){
							if(minesweeper[j][i] == 'M'){
							count++;
							}	
						}
					}
				}
				else if(y == 9){
					for(i = (x-1); i <= (x+1); i++){
						for(j = (y-1); j <= y; j++){
							if(minesweeper[j][i] == 'M'){
							count++;
							}	
						}
					}
				}
				else{
					for(i = (x-1); i <= (x+1); i++){
						for(j = (y-1); j <= (y+1); j++){
							if(minesweeper[j][i] == 'M'){
							count++;
							}
						}
					}
				}
				if(count == 0){
					minesweeper[y][x] = 'E';					
				}
				else{
					minesweeper[y][x] = count;
				}
				if(minesweeper[y][x] == 'E'){
					dessinerCaseVide(x,y);
				}
				else{
					dessinerNbMine(x,y);
				}
			}
		}
	}

	// Ne rien modifier au dessous de ce commentaire
	dessinerGrille();
}

// Fonction de vérification de victoire
function is_win() {
	// Ne rien modifier au dessus de ce commentaire

	var winCount = 0;
	/*	for(x = 0; x <= 15; x++){
			for(y = 0; y <= 9; y++){
				if
				(
					(minesweeper[y][x] === 1) ||
					(minesweeper[y][x] === 2) ||
					(minesweeper[y][x] === 3) ||
					(minesweeper[y][x] === 4) ||
					(minesweeper[y][x] === 5) ||
					(minesweeper[y][x] === 6) ||
					(minesweeper[y][x] === 7) ||
					(minesweeper[y][x] === 8) ||
					(minesweeper[y][x] === 'E')||
					(minesweeper[y][x] === 'M')
				)

					winCount ++;
					console.log('win:'+win);
					console.log('x:'+x+' y:'+y);
				}
			}
			if (winCount === 0) {
				win = true;
			}	
		}

	*/	
	// Ne rien modifier au dessous de ce commentaire
	if (win == 'mine') {
		verify();
	}
	else if (win !== false && win != 'mine') {
		document.getElementById('infos').children[0].innerHTML = 'Partie gagnée';
	}
}