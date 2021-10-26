;(function () {
	const sections = Array.from(document.querySelectorAll('section'))
	const display = document.querySelector('.maincontent')
	const footer = document.querySelector('footer')
	let inScroll = false
	

	sections[0].classList.add('activeSection')

	const performTransition = sectionNumber => {
		if (inScroll === false) {
			inScroll = true
			const position = sectionNumber * -102

			display.style.transform = `translateY(${position}%)`

			sections[sectionNumber].classList.add('activeSection')
			sections.forEach((sect, i) => {
				if (i !== sectionNumber && sect.classList.contains('activeSection')) {
					sect.classList.remove('activeSection')

					return null
				}
			})
			setTimeout(() => {
				inScroll = false
                updateActivePaginator()
			}, 1300)
		}
	}

	const isSection = el => sections.indexOf(el) > -1
	const scrollViewport = direction => {
		const activeSection = sections.filter(s =>
			s.classList.contains('activeSection')
		)[0]
		const nextSection = activeSection.nextElementSibling
		const prevSection = activeSection.previousElementSibling
		if (direction === 'next' && isSection(nextSection)) {
			performTransition(sections.indexOf(nextSection))
		}

		if (direction === 'prev' && isSection(prevSection)) {
			performTransition(sections.indexOf(prevSection))
		}
	}

	window.addEventListener('wheel', e => {
		const deltaY = e.deltaY > 0 ? 1 : -1
		console.log(deltaY)

		if (deltaY === 1) scrollViewport('next')
		if (deltaY === -1) scrollViewport('prev')
	})

	window.addEventListener('keydown', e => {
		let DEPRECATED = ['INPUT', 'TEXTAREA']
		let tagName = e.target.tagName
		let key = e.key
		if (!DEPRECATED.includes(tagName)) {
			if (key === 'ArrowDown') scrollViewport('next')
			if (key === 'ArrowUp') scrollViewport('prev')
		}
		
	})

	const tagLinks = document.querySelectorAll('[data-scroll-to]')
	tagLinks.forEach(link => {
		link.onclick = e => {
			e.preventDefault()

			const target = e.target.dataset.scrollTo
			const reqSection = sections.filter(s => s.dataset.sectionId === target)[0]
			performTransition(sections.indexOf(reqSection))
		}
	})

	const paginatorItems = Array.from(
		document.querySelectorAll('.paginator__item')
	)
	paginatorItems.forEach((item, i) => {
		item.onclick = e => {
			performTransition(sections.indexOf(sections[i]))
		}
	})
	function updateActivePaginator() {
	
		paginatorItems.forEach(item => item.classList.remove('paginator__item--active'))
		
        let activeSection = sections.filter(s => s.classList.contains('activeSection'))[0]
		let indexOfActiveSection = sections.indexOf(activeSection)
        
        paginatorItems[indexOfActiveSection].classList.add('paginator__item--active')
	}
})()
