;(function () {
	const menuBtn = Array.from(
		document.querySelectorAll('section.menu .menu__item')
	)
	const menuFullElems = Array.from(
		document.querySelectorAll('section.menu .menu__full')
	)
	const menuCloseBtns = Array.from(
		document.querySelectorAll('section.menu .close-menu-full')
	)

	const addHiddenClass = el => {
		el.classList.add('menu__full-hidden')
	}
	const removeHiddenClass = el => {
		el.classList.remove('menu__full-hidden')
	}

	menuBtn.forEach((btn, i) => {
		btn.addEventListener('click', () => {
			if (!menuFullElems[i].classList.contains('menu__full-hidden')) {
				addHiddenClass(menuFullElems[i])
				return
			}

			menuFullElems.forEach(div => addHiddenClass(div))
			removeHiddenClass(menuFullElems[i])
		})
	})

	menuCloseBtns.forEach((btn, i) => {
		btn.addEventListener('click', () => {
			addHiddenClass(menuFullElems[i])
		})
	})
})()
