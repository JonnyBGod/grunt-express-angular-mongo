'use strict';

/* Google Analytics Services */

angular.module('analytics', []).provider('Analytics', function() {
	function createGaScriptTag() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	}

	var Analytics = [
		'$rootScope', '$window', 'account',
		function($rootScope, $window, account) {
			$window._gaq = $window._gaq || [];
			$window._gaq.push(['_setAccount', account]);

			this.trackPageview = function(path) {
				$window._gaq.push(['_trackPageview', path]);
			};

			createGaScriptTag();
		}
	];

	this.$get = [
		'$injector',
		function($injector) {
			return $injector.instantiate(Analytics, {
				account: this.account
			});
		}
	];
}).run([
	'$rootScope', '$location', 'Analytics',
	function($rootScope, $location, Analytics) {
		$rootScope.$on('$viewContentLoaded', function() {
			Analytics.trackPageview($location.path());
		});
	}
]);