var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
function enc(txt) {
	var unenc = txt;
	return encodeURIComponent(unenc).replace(/'/g, "%27").replace(/"/g, "%22");
}
(function() {
	'use strict';
	const devtools = {
		isOpen: false,
		orientation: undefined
	};
	const threshold = 160;
	const emitEvent = (isOpen, orientation) => {
		window.dispatchEvent(new CustomEvent('devtoolschange', {
			detail: {
				isOpen,
				orientation
			}
		}));
	};
	const main = ({
		emitEvents = true
	} = {}) => {
		const widthThreshold = window.outerWidth - window.innerWidth > threshold;
		const heightThreshold = window.outerHeight - window.innerHeight > threshold;
		const orientation = widthThreshold ? 'vertical' : 'horizontal';
		if (!(heightThreshold && widthThreshold) && ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
			if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) {
				emitEvent(true, orientation);
			}
			devtools.isOpen = true;
			devtools.orientation = orientation;
		} else {
			if (devtools.isOpen && emitEvents) {
				emitEvent(false, undefined);
			}
			devtools.isOpen = false;
			devtools.orientation = undefined;
		}
	};
	main({
		emitEvents: false
	});
	setInterval(function() {
		main();
		debugchange();
	});
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = devtools;
	} else {
		window.devtools = devtools;
	}
})();
debugchange();
window.addEventListener('devtoolschange', event => {
	debugchange();
});

function debugchange() {
	if (!window.location.href.includes("https://thumbs.dreamstime.com/b/oops-49260938.jpg")){
		if (window.devtools.isOpen && !mobile && window.self === window.top) {
			window.location = "https://thumbs.dreamstime.com/b/oops-49260938.jpg" + enc(window.location);
		} else {
			var startTime = performance.now();
			eval('debugger');
			var stopTime = performance.now();
			if ((stopTime - startTime) > 1000) {
				window.location = "https://thumbs.dreamstime.com/b/oops-49260938.jpg" + enc(window.location);
			}
		}
	}
}
