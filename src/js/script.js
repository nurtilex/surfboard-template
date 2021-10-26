;(function () {
	const open = document.querySelector('.header__burger')
	const close = document.querySelector('.close-full-nav')
	const main = document.querySelector('.wrapper')
	const fullNav = document.querySelector('.nav--full-menu')

	open.addEventListener('click', () => {
		main.style.visibility = 'hidden'
		fullNav.style.visibility = 'visible'
	})

	close.addEventListener('click', () => {
		main.style.visibility = 'visible'
		fullNav.style.visibility = 'hidden'
	})
})()
