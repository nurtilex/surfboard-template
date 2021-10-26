;(function () {
	const buttons = Array.from(document.querySelectorAll('.reviews__slider'))

	const state = [
		{
			author: 'Ольга Макарова',
			title: 'Лучший дизайн',
			description:
				'Я увидела доски на сайте и влюбилась в их дизайн. К летнему сезону я заказала себе доску в SurfBoard. Дизайнер команды - волшебница! Она учла все мои предпочтения и комментарии. В итоге получился прекрасный дизайн. А я катаюсь на доске, которая мне нравится)',
			imgPath: '../../../img/reviews__person-one.png',
		},
		{
			author: 'Марк Брюлов',
			title: 'Нереальная скорость',
			description:
				'Я занимаюсь профессиональным спортом. Доверил изготовление доски для соревнований ребятам из Surfboard и не пожалел: 1 место на соревнованиях. Нереальная скорость, устойчивая, удобная и легкая: всё что нужно для победы на соревнованиях!',
			imgPath: '../../../img/reviews__person-two.png',
		},
		{
			author: 'Василий Поперечный',
			title: 'Устойчивость и безопасность',
			description:
				'Я заказывал доски для своих детей. Мне было важно, чтобы они были устойчивые, так как безопасность детей на первом месте. Доски были изготовлены по индивидуальным замерам с учетом роста и веса каждого ребенка. Теперь дети катаются и им нравится!',
			imgPath: '../../../img/reviews__person-three.png',
		},
	]

	buttons.forEach((btn, i) => {
		btn.addEventListener('click', () => {
			const titleEl = document.querySelector('.review__title')
			const authorEl = document.querySelector('.review__author')
			const descriptionEl = document.querySelector('.review__description')
			const pic = document.querySelector('.review__pic')

			titleEl.textContent = state[i].title
			authorEl.textContent = state[i].author
			descriptionEl.textContent = state[i].description
			pic.style.backgroundImage = `url(${state[i].imgPath})`

			buttons.forEach(i => i.classList.remove('reviews__slider--active'))
			btn.classList.add('reviews__slider--active')
		})
	})
})()
