const ballImg = document.querySelector('.ball-img')
const inputText = document.querySelector('input')
const answer = document.querySelector('.answer')
const error = document.querySelector('.error')

const navItem = document.querySelector('.nav__items')
const burgerBtn = document.querySelector('.burger-btn')
const allNavItems = document.querySelectorAll('.nav__item')
const barsIco = document.querySelector('.ti-menu-2')
const xIco = document.querySelector('.ti-x')

const clickMenu = () => {
	navItem.classList.toggle('show-menu')

	allNavItems.forEach(item => {
		item.addEventListener('click', () => {
			navItem.classList.remove('show-menu')
			barsIco.classList.remove('hide')
			xIco.classList.add('hide')
		})
	})

	xIco.classList.toggle('hide')
	barsIco.classList.toggle('hide')
}

burgerBtn.addEventListener('click', clickMenu)

// const randomAnswer = ['Wygląda to całkiem dobrze', 'Gwiazdy mówią TAK', 'To zależy tylko od Ciebie', 'Całkiem prawdopodobne','Zdecydowanie TAK','Zdecydowanie NIE','Bez problemu','Nie licz na to', 'Tak!', 'Nie', 'Może.', 'Ciężko powiedzieć...', 'Nie chcesz znać odpowiedzi na to pytanie...']
const randomAnswer = [
	'It looks pretty good',
	'The stars say YES',
	'It is only up to You',
	'Quite likely',
	'Definitely YES',
	'Definitely NOT',
	'No problem.',
	'Do not count on it',
	'Yes!',
	'No!',
	'Maybe.',
	'It is hard to say...',
	'You do not want to know the answer to this question...',
]

const AnimateBall = () => {
	ballImg.firstElementChild.classList.add('shake-animation')
	setTimeout(checkAnswer, 1000)
}

const randomNumberAnswer = () => {
	let value = Math.floor(Math.random() * randomAnswer.length)
	answer.innerHTML = `<span>Answer:</span> ${randomAnswer[value]}`
}

const checkAnswer = () => {
	const lastElement = inputText.value.slice(-1)
	const firstElement = inputText.value.charAt(0)
	const textWithoutLastEl = inputText.value.substring(0, inputText.value.length - 1)
	const characters = [
		'?',
		'!',
		'@',
		'#',
		'$',
		'%',
		'^',
		'&',
		'*',
		'(',
		')',
		'-',
		'+',
		'=',
		'_',
		'/',
		'\\',
		'|',
		'[',
		']',
		'{',
		'}',
		'<',
		'>',
		';',
		':',
	]

	if (inputText.value !== '' && lastElement === '?') {
		let findInsideElement = []
		for (let i = 0; i < characters.length; i++) {
			findInsideElement[i] = textWithoutLastEl.includes(characters[i])

			if (firstElement === characters[i] || findInsideElement[i] === true) {
				error.textContent = `You gave a sign: "${characters[i]}", or sign "?" you put in the wrong place. It must be a complete sentence followed by "?".`
				answer.textContent = ''
				break
			} else if (inputText.value.length < 8) {
				error.textContent = `Too short question, make an effort!`
				answer.textContent = ''
			} else {
				randomNumberAnswer()
				error.textContent = ''
			}
		}
	} else if (inputText.value !== '' && lastElement !== '?') {
		error.textContent = 'The question must end with "?".'
		answer.textContent = ''
	} else {
		error.textContent = 'You need to ask a question!'
		answer.textContent = ''
	}
	ballImg.firstElementChild.classList.remove('shake-animation')
}

ballImg.addEventListener('click', AnimateBall)
