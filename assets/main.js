let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
 
    if(answer.value == '' || attempt.value == ''){
    	setHiddenFields()
    }

    if(!validateInput(input.value)) {
    	return false;
    } else {
    	attempt = attempt.value++;
    }


    var test = getResults(input.value);
    if(test) {
    	setMessage('You Win! :)');
    	showAnswer(true);
    	showReplay();
    } else if(!test && attempt >= 10) {
    	setMessage('You Lose! :(');
		showAnswer(false);
    	showReplay();
    } else {
    	setMessage('Incorrect, try again.');
    }
}

function setHiddenFields() {
	attempt = 0;
	answer.value = Math.floor(Math.random() * 10000).toString();

	while(answer.length < 4){
		answer = '0' + answer.value;
	}

}

function setMessage(message) {
	let messageLabel = document.getElementById('message');
	messageLabel.innerHTML = message;
}

function validateInput(input) {
	if(input.toString().length == 4){
		return true;
	} else {
		setMessage('Guesses must be exactly 4 characters long.');
		return false;
	}
}

function getResults(input) {
	let correct = 0;
	let container = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
	let results = document.getElementById('results');

	for(i = 0; i < input.length; i++){
		if(input.charAt(i) == answer.value.charAt(i)) {
			container += '<span class="glyphicon glyphicon-ok"></span>';
			correct++;
		} else if (answer.value.indexOf(input.charAt(i)) > -1) {
			container += '<span class="glyphicon glyphicon-transfer"></span>';
		} else {
			container += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}

	container += '</div></div>';

	results.innerHTML += container;

	if(correct == input.length) {
		return true;
	} else {
		return false;
	}

}

function showAnswer(winner) {
	let code = document.getElementById('code');

	code.innerHTML = '<strong>' + answer + '</strong>';

	if(winner) {
		code.className += ' success';
	} else {
		code.className += ' failure';
	}
}

function showReplay() {
	document.getElementById('guessing-div').style.display = 'none';
	document.getElementById('replay-div').style.display = 'block';

}