;(function () {
	const prev = document.querySelector('.slider__move-btn-left')
	const next = document.querySelector('.slider__move-btn-right')
	const list = document.querySelector('.slider__list')
	const items = Array.from(document.querySelectorAll('.slide'))
	let current = 1
	let step = 100

	next.addEventListener('click', () => {
		if (current === 4) {
			current = -0
		}
		items.forEach(el => {
			el.style.transform = `translateX(${-current * 100}%)`
			el.style.transition = '1s'
		})
		current++
	})

	prev.addEventListener('click', () => {
		if (current === 0) {
			current = 4
		}
		items.forEach(el => {
			el.style.transform = `translateX(-${current * 100 - 100}%)`
			el.style.transition = '1s'
		})
		current--
	})
})()
