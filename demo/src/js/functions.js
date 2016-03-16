$(function () {
	// Animation support
	function whichAnimationEnd() {
		var el = document.createElement('div'),
			animation,

		eventNames = {
			'WebkitAnimation': 'webkitAnimationEnd',
			'MozAnimation': 'animationend',
			'animation': 'animationend'
		};

		for (var transition in eventNames) {
			if (el.style[transition] !== undefined) {
				return eventNames[transition];
			}
		}
	}

	// Header logo animation
	$('header').on('mouseover', function() {
		$(this)
		.addClass('hover')
		.on(whichAnimationEnd(), function() {
			$(this).removeClass('hover');
		});
	});

	// Add link to headers
	$('h2, h3, h4').each(function() {
		if($(this).attr('id')) $(this).prepend('<a href="#'+$(this).attr('id')+'" class="anchor icon-font"></a>');
	});

	// Add link to table rows
	$('tbody tr').each(function() {
		if($(this).attr('id')) $(this).find('th').append('<a href="#'+$(this).attr('id')+'" class="anchor icon-font"></a>');
	});

	// Toggle meta styles
	$('#meta-styles a').click(function(e) {
		e.preventDefault();

		// Remove active
		$('#meta-styles a').removeClass('active');

		// Update active link, and toggle class
		$(this)
		.addClass('active')
		.closest('ul')
		.prev('figure')
		.find('div[class*="paver__meta"]')
			.removeClass()
			.addClass($(this).children('div').data('meta-class'));
	});
});