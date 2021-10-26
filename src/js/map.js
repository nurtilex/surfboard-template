// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
;(function () {
	ymaps.ready(init)

	function init() {
		let myMap = new ymaps.Map('map', {
			center: [59.93963569, 30.31468791],
			zoom: 10,
			controls: [],
		})
		const coords = [
			['59.957402', '30.297164'],
			['59.938989', '30.348039'],
			['59.936010', '30.270080'],
		]

		const myCollection = new ymaps.GeoObjectCollection(
			{},
			{
				draggable: false,
				iconLayout: 'default#image',
				iconImageHref: 'img/marker.svg',
				iconImageSize: [76, 95],
				iconImageOffset: [-3, -42],
			}
		)

		coords.forEach(coord => {
			myCollection.add(new ymaps.Placemark(coord))
		})

		myMap.geoObjects.add(myCollection)
	}
})()
