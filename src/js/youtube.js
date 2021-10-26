;(function () {
	let player
	function onYouTubeIframeAPIReady() {
		player = new YT.Player('yt-player', {
			height: '405',
			width: '660',
			videoId: 'cEBkvm0-rg0',
			events: {
				onReady: onPlayerReady,
				onStateChange: onPlayerStateChange,
			},
		})
	}
})()
