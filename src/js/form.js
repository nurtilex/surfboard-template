;(function () {
	const form = document.querySelector('.form')
	const send = document.querySelector('.form .form__sending .btn')

	const overlay = document.querySelector('.form-overlay')
	const closeBtn = document.querySelector(
		'.form-overlay  button.request__close'
	)
	const requestMessage = document.querySelector('.form-overlay .request__text')
	form.addEventListener('submit', e => {
		e.preventDefault()
		const data = {
			name: form.elements.name.value,
			phone: form.elements.phone.value,
			comment: form.elements.comment.value,
			to: 'nurtilex@gmail.com',
		}
		const xhr = new XMLHttpRequest()
		xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail')
		xhr.setRequestHeader('content-type', 'application/json')
		xhr.send(JSON.stringify(data))
		xhr.addEventListener('load', () => {
			requestMessage.textContent =
				xhr.status >= 400 ? 'Отправка не получилась' : 'Сообщение отправлено'
			overlay.style.display = 'flex'
		})
	})

	function closeFormOverlay() {
		overlay.style.display = 'none'
	}

	closeBtn.onclick = e => {
		e.preventDefault()
		closeFormOverlay()
	}
	overlay.onclick = () => closeFormOverlay()
})()
