var alertt, confirm, progress, input, call, interval,
	
	// Default pexxalert demo options
	defaults = {
		stack: false,
		stack_position: 'top',
		anchor: 'body',
		theme: true,
		theme_type: 'snow',
		theme_backgrounds : {
			snow : { solid : '#FFFFFF', alpha : 'rgba(255,255,255,0.5)', color : '#363636' },
			darcula : { solid : '#363636', alpha : 'rgba(54,54,61,0.5)', color : '#FFFFFF' }
		},
		accent: '#6671F0',
		blur: true,
		static_background: '#6671F0',
		static_color: '#FFFFFF',
		static_alpha: 'rgba(102,113,240,0.5)',
		responsive: true,
		responsiveness_threshold: 800,
		auto_close: true,
		auto_close_speed: 2500,
		landscape: false,
		force_padding : 0
	};

$(document).ready(() => {
	return px_in(defaults, true, () => {
		$('.px_a1_a_b button').removeAttr('disabled');
		$('.px_splash').remove();
	});
});

var px_op = (a,b) => {
	if (a) {
		$('.px_a1_a_b_b_b').hide();
		$('.px_a1_a_b_b_b input').val('');
		$('.px_a1_a_b_b_a button:eq(1)').removeClass('px_a1_a_b_b_a_active');
		$('.px_a1_a_b_b_a button:eq(0)').addClass('px_a1_a_b_b_a_active');
		return px_in(defaults, false, () => {
			return alertt.display({ type: 'success', message: 'Defaults applied successfully!' });
		});
	}
	$('.px_a1_a_b_b_b').show();
};

var px_in = (a,b,c,d = false) => {
	
	// Apply/update already declared pexxalert options
	try {
		if (b) {
			alertt = new pexxalert($, window, 'alert', a );
			confirm = new pexxalert($, window, 'confirm', a );
			progress = new pexxalert($, window, 'progress', a );
			input = new pexxalert($, window, 'input', a );
			call = new pexxalert($, window, 'call', a );
		} else {
			alertt.update(a);
			confirm.update(a);
			progress.update(a);
			input.update(a);
			call.update(a);
		}
	} catch(er){
		console.log(er);
		d = true;
	}
	if (!d) return c();
	alert('Error during init');
};

var px_co = (a) => {
	var b = $('.px_a1_a_b_b_b input'),
		c = b.val();
	if (c.trim().length == 0) return alertt.display({ type: 'error', message: 'Try entering an object' });
	var d = c.replace(/\'/g,'\"');
	if (!px_js(d)) return alertt.display({ type: 'error', message: 'Object string only' });
	return px_in( JSON.parse(d), false, () => {
		$('.px_a1_a_b_b_a button:eq(0)').removeClass('px_a1_a_b_b_a_active');
		$('.px_a1_a_b_b_a button:eq(1)').addClass('px_a1_a_b_b_a_active');
		return alertt.display({ type: 'success', message: 'New options applied successfully!' });
	});
};

var px_tg = (a) => {

	// Alerts per category display router
	switch(a){
		case 'alert_A':
			alertt.display({ type: 'success', message: 'All went well!' });
			break;
		case 'alert_B':
			alertt.display({ type: 'error', message: 'Shh! Something happened!' });
			break;
		case 'confirm':
			confirm.display({
				title: 'Process This?',
				message: 'This process will run and do what it has to',
				call_back: function(choice) {
					if (choice == 'yes') return alertt.display({ type: 'success', message: 'Processing' });
				}
			});
			break;
		case 'progress':
			progress.display({
				title: 'Faking an upload..',
				call_back: function(progress,element,box,aaa = this) {
					aaa.counter = 0;
					aaa.interval = setInterval(() => {
						aaa.counter += 0.5;
						$(progress).css({ 'width' : aaa.counter+ '%' });
						if (aaa.counter >= 100) {
							clearInterval(aaa.interval)
							return $(element).slideUp(100, () => {
								$(this).remove();
								if ($(box).children().length == 0) return $(box).remove();
							});
						}
					},10)
				}
			});
			break;
		case 'input':
			input.display({
				title: 'Your Favorite Fruit?',
				message: 'No vegetables please',
				placeholder: 'Type in the name of a fruit',
				type: 'text',
				process_label: 'Submit',
				discard_label: 'Discard',
				fragment: true,
				call_back: function(data, choice, element) {
					if (choice == 'no') return window.history.back();
					if (data.trim().length == 0) return alertt.display({ type: 'error', message: 'Type in the name of a fruit' });
					$(element).hide();
					$(element).siblings().show();
					setTimeout(() => {
						alertt.display({ type: 'success', message: 'Your fruit is '+ data });
						$('#'+ element.data('id')).find('input').val('');
						$(element).show();
						$(element).siblings().hide();
					}, 2000);
				}
			});
			break;
		default:
			call.display({
				routing_id: 22,
				name: 'John',
				username: 'johnnyboy',
				avatar: '',
				type: 'video',
				call_back: function(action, routing_id, username, type) {
					if (action == 'yes') return alertt.display({ type: 'success', message: 'You answered' });
					alertt.display({ type: 'success', message: 'You rejected' });
				}
			});
			break;
	}
};

var px_js = (a) => {
	a = typeof a !== 'string' ? JSON.stringify(a) : a;
	try {
		a = JSON.parse(a);
	} catch (b) {
		return false;
	}
	if (typeof a === 'object' && a !== null) {
		return true;
	}
	return false;
};

var px_li = (a) => {
	var b = document.createElement('a');
	b.href = a;
	b.target = '_blank';
	b.click();
};
