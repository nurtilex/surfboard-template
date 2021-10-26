let player
const playerStartElem = document.querySelector('.player__start')
const eventsInit = () => {
	playerStartElem.onclick = e => {
		e.preventDefault()

		if (playerStartElem.classList.contains('paused')) {
			// playerStartElem.classList.remove('paused')
			// playerStartElem.classList.add('active')
			player.pauseVideo()
		} else {
			// playerStartElem.classList.add('paused')
			// playerStartElem.classList.remove('active')
			player.playVideo()
		}
	}
}
const formatTime = timeSecs => {
	const roundTime = Math.floor(timeSecs)
	let minutes = Math.floor(roundTime / 60)
	let seconds = roundTime - minutes * 60
	const addZero = num => (num < 10 ? `0${num}` : num)
	return `${addZero(minutes)}:${addZero(seconds)}`
}

const onPlayerReady = () => {
	let interval
	const estimateElem = document.querySelector('.player__duration-estimate')
	const completedElem = document.querySelector('.player__duration-completed')
	const playbackBtn = document.querySelector('.player__playback-button')
	const bar = document.querySelector('.player__playback')
	let durationInSeconds = Math.floor(player.getDuration())
	if (typeof interval !== 'undefined') {
		clearInterval(interval)
	}
	bar.onclick = e => {
		const clickedPos = e.layerX
		const barWidth = getComputedStyle(bar).width.slice(0, -2)
		const newButtonPosPercent = (clickedPos / barWidth) * 100
		const newPlaybackPos = (player.getDuration() / 100) * newButtonPosPercent
		playbackBtn.style.left = `${newButtonPosPercent}%`
		player.seekTo(newPlaybackPos)
	}
	interval = setInterval(() => {
		const completedSecs = player.getCurrentTime()
		const completedPercent = (completedSecs / durationInSeconds) * 100
		playbackBtn.style.left = `${completedPercent}%`
		completedElem.textContent = `${formatTime(completedSecs)}`
	}, 1000)

	estimateElem.textContent = `${formatTime(durationInSeconds)}`
}
const onPlayerStateChange = e => {
	/*
	-1 – воспроизведение видео не началось
	0 – воспроизведение видео завершено
	1 – воспроизведение
	2 – пауза
	3 – буферизация
	5 – видео находится в очереди
	*/
	const showSplashScreen = bool => {
		const splash = document.querySelector('.player__splash')
		const player = document.querySelector('#yt-player')

		if (bool) {
			splash.style.display = 'block'
			player.style.display = 'none'
		} else {
			splash.style.display = 'none'
			player.style.display = 'block'
		}
	}
	if (e.data === 1) {
		playerStartElem.classList.add('paused')
		playerStartElem.classList.remove('active')
		showSplashScreen(false)
	}
	if (e.data === 2) {
		playerStartElem.classList.remove('paused')
		playerStartElem.classList.add('active')
		showSplashScreen(true)
	}
}
function onYouTubeIframeAPIReady() {
	player = new YT.Player('yt-player', {
		height: '405',
		width: '660',
		videoId: 'M7lc1UVf-VE',
		events: {
			onReady: onPlayerReady,
			onStateChange: onPlayerStateChange,
		},
	})
}

eventsInit()
