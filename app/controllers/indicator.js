var args = arguments[0] || {};

$.ind.applyProperties({
	message: args.message || ''
});

//$.ind.message = args.message;
//
$.indicator.opacity = 0.0;

// コレはActivityIndicator
$.ind.show();

var parent;

$.on('show', function(e) {

	parent = e.parent;
	e.parent.add($.indicator);
	$.indicator.animate({
		duration: 500,
		opacity: 1.0
	}, 
	function() {
	});
});


$.on('hide', function() {

	// indicator はコントローラ自体
	//var parent = $.indicator.getParent();

	setTimeout(function() {

		$.indicator.animate({
			duration: 300,
			opacity: 0.0
		}, 
		function() {
			parent.remove($.indicator);
		});

	}, 2000);

});

