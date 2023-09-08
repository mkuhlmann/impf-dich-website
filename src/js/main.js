export default function main() {
	document.addEventListener('DOMContentLoaded', () => {});
}

if (window.location.host.includes('impf-dich.org')) {
	var _paq = (window._paq = _paq || []);
	_paq.push([
		function () {
			console.log(Matomo.getAsyncTracker());
			Matomo.getAsyncTracker().setCustomRequestProcessing(function (request) {
				return btoa(request);
			});
		},
	]);
	_paq.push(['trackPageView']);
	_paq.push(['enableLinkTracking']);
	_paq.push(['enableHeartBeatTimer']);
	(function () {
		var u = 'https://analytics.mkuhlmann.org/';
		_paq.push(['setTrackerUrl', u + 'js/trck.php']);
		_paq.push(['setSiteId', '2']);
		var d = document,
			g = d.createElement('script'),
			s = d.getElementsByTagName('script')[0];
		g.type = 'text/javascript';
		g.async = true;
		g.defer = true;
		g.src = u + 'js/';
		s.parentNode.insertBefore(g, s);
	})();
}
