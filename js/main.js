const burgerBtn = document.querySelector('.burger-btn')
const navItem = document.querySelector('.nav__items')
const allNavItems = document.querySelectorAll('.nav__item')
const barsIco = document.querySelector('.ti-menu-2')
const xIco = document.querySelector('.ti-x')

const zodiacHeading = document.querySelector('.section-heading-btn')

const boxText = document.querySelector('.horoscope__box-text')
const currZodiac = document.querySelector('.horoscope__zodiac')
const currDate = document.querySelector('.horoscope__text-date')
const compatibility = document.querySelector('.horoscope__text-compatibility')
const luckyNumber = document.querySelector('.horoscope__text-lucky-number')
const luckyTime = document.querySelector('.horoscope__text-lucky-time')
const color = document.querySelector('.horoscope__text-color')
const range = document.querySelector('.horoscope__text-range')
const mood = document.querySelector('.horoscope__text-mood')
const desc = document.querySelector('.horoscope__text-desc')

const todayBtn = document.querySelector('.horoscope__today-btn')
const tomorrowBtn = document.querySelector('.horoscope__tomorrow-btn')
const yesterdayBtn = document.querySelector('.horoscope__yesterday-btn')

const errorInfo = document.querySelector('.horoscope__error-info')
const goodInfo = document.querySelector('.horoscope__good-info')

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

const API_LINK = 'https://aztro.sameerkumar.website/?sign='

const zodiacArray = [
	'aries',
	'taurus',
	'gemini',
	'cancer',
	'leo',
	'virgo',
	'libra',
	'scorpio',
	'sagittarius',
	'capricorn',
	'aquarius',
	'pisces',
]

allZodiacBtn = []

let buttonClicked = false

let currDay

const createZodiacBtn = () => {
	for (let i = 0; i < zodiacArray.length; i++) {
		allZodiacBtn[i] = document.createElement('button')
		allZodiacBtn[i].innerHTML = zodiacArray[i]
		zodiacHeading.append(allZodiacBtn[i])

		allZodiacBtn[i].addEventListener('click', () => {
			const chooseZ = zodiacArray[i]
			chooseZodiac(chooseZ)
		})
	}
}

createZodiacBtn()

const chooseZodiac = zodiac => {
	currZodiac.textContent = ''
	errorInfo.textContent = ''
	goodInfo.textContent = ''
	currZodiac.append(zodiac)

	if (typeof currDay !== 'undefined') {
		const URL = API_LINK + zodiac + '&' + `day=${currDay}`

		axios
			.post(URL)
			.then(res => {
				currDate.innerHTML = `<span>Date:</span> ${res.data.current_date}`
				compatibility.innerHTML = `<span>Compatibility: </span> ${res.data.compatibility}`
				luckyNumber.innerHTML = `<span>Lucky number: </span> ${res.data.lucky_number}`
				luckyTime.innerHTML = `<span>Lucky time: </span> ${res.data.lucky_time}`
				color.innerHTML = `<span>Color: </span> ${res.data.color}`
				range.innerHTML = `<span>Date range: </span> ${res.data.date_range}`
				mood.innerHTML = `<span>Mood: </span> ${res.data.mood}`
				desc.innerHTML = `<span>Description: </span> ${res.data.description}`
			})
			.catch(error => {
				// Error 😨
				if (error.response) {
					errorInfo.textContent = 'You must first click on the zodiac sign!'
				} else if (error.request) {
					console.log(error.request)
				} else {
					console.log('Error', error.message)
				}
				console.log(error.config)
			})
	} else {
		goodInfo.textContent = 'Choose a day now and you will see the magic 😄'
	}
}

todayBtn.addEventListener('click', () => {
	currDay = todayBtn.textContent

	chooseZodiac(currZodiac.textContent)
})
tomorrowBtn.addEventListener('click', () => {
	currDay = tomorrowBtn.textContent

	chooseZodiac(currZodiac.textContent)
})

yesterdayBtn.addEventListener('click', () => {
	currDay = yesterdayBtn.textContent

	chooseZodiac(currZodiac.textContent)
})
