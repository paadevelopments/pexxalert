/*
 * PexxAlert ~ v2.0.0
 *
 * Author : Paa <paa.code.me@gmail.com>
 * License : 'MIT'
 *
 */
(function (global,factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.pexxalert = factory());
}(this, (function () {

'use strict';

var pexxalert = function(jquery, win, type, options){
	const self = this,

	// Default main pexxalert object options
	defaults = {
		stack: false,
		stack_position: 'top', anchor: 'body', theme: true, theme_type: 'snow',
		theme_backgrounds: {
			snow: {	solid: '#FFFFFF', alpha: 'rgba(255,255,255,0.5)', color: '#36363D' },
			darcula: { solid: '#36363D', alpha: 'rgba(54,54,61,0.5)', color: '#FFFFFF' }
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
		force_padding: 0
	};

	// Bind object params and custom options
	self.$ = jquery;
	self.window = win;
	self.type = type;
	self.options = self.$.extend(true, defaults, options);
};


// Template build determiner on .display() call
pexxalert.prototype.display = function(data){
	const self = this;
	if (self.type == 'alert') return self.alert(data);
	if (self.type == 'confirm') return self.confirm(data);
	if (self.type == 'progress') return self.progress(data);
	if (self.type == 'input') return self.input(data);
	if (self.type == 'call') return self.call(data);
	return console.log('Invalid alert category. Accepted are [ alert, confirm, progress, input, call ]');
};


// Existing pexxalert options updater
pexxalert.prototype.update = function(options) {
	const self = this;
	self.options = self.$.extend(true, self.options, options);
};


// Alert type alert template builder
pexxalert.prototype.alert = function(data){
	const self = this,

	// Default alert template options
	defaults = {
		message: 'Test Message', type: 'success', call_back: function(){ /* natm */ }
	};

	// Template build globals
	var options = self.$.extend(true, defaults, data),
		pexx_alert = '',
		pexx_alert_inner = '',
		pexx_alert_box = '',
		pexx_alert_box_s1 = '',
		pexx_alert_box_s2 = '',
		pexx_alert_box_s2_div = '',
		pexx_alert_box_s3 = '',
		pexx_alert_box_s3_header = '',
		pexx_alert_box_s3_message = '',
		pexx_alert_box_s4 = '',
		pexx_alert_box_s4_button = '',
		background = '',
		color = '',
		lable = options.type.substring(0, 1).toUpperCase() + options.type.substring(1, options.type.length),
		icon = ''

	// Setup responsiveness
	if (self.options.responsive) {
		if (self.$(self.options.anchor).width() > self.options.responsiveness_threshold) {
			pexx_alert += 'bottom:0;right:0;width:300px;';
			pexx_alert_inner += 'max-width:300px;';
		} else {
			pexx_alert += 'top:'+ self.options.force_padding +'px;left:0;width:100%;';
			pexx_alert_inner += 'max-width:500px;';
		}
	} else {
		if (self.options.landscape) {
			pexx_alert += 'bottom:0;right:0;width:300px;';
			pexx_alert_inner += 'max-width:300px;';
		} else {
			pexx_alert += 'top:'+ self.options.force_padding +'px;left:0;width:100%;';
			pexx_alert_inner += 'max-width:500px;';
		}
	}

	// Setup theme (background and text color)
	if (self.options.theme) {
		if (self.options.blur) {
			background = self.options.theme_type == 'snow' ? 
						 self.options.theme_backgrounds.snow.alpha : 
						 self.options.theme_backgrounds.darcula.alpha;
		} else {
			background = self.options.theme_type == 'snow' ? 
						 self.options.theme_backgrounds.snow.solid : 
						 self.options.theme_backgrounds.darcula.solid;
		}
		color = self.options.theme_type == 'snow' ? 
				self.options.theme_backgrounds.snow.color : 
				self.options.theme_backgrounds.darcula.color;
	} else {
		background = self.options.blur ? self.options.static_alpha : self.options.static_background;
		color = self.options.static_color;
	}
	pexx_alert_box += self.options.blur ? 
					 '-webkit-backdrop-filter:blur(50px);backdrop-filter:blur(30px);' :
					 '-webkit-backdrop-filter:none;backdrop-filter:none;';
	pexx_alert_box += 'background:'+ background +';';
	pexx_alert_box += 'color:'+ color +';';
	pexx_alert_box_s4_button += 'color:'+ color +';';
	pexx_alert_box_s1 += options.type == 'success' ? 'background:#4BD863;' : 'background:#F0A92E;';
	pexx_alert_box_s2_div += options.type == 'success' ? 'background:#4BD863;' : 'background:#F0A92E;';
	icon = options.type == 'success' ? '<i class="pexx-a-icon-checkmark"></i>' : '<b>!</b>';
	
	// Construct template
	var id = 'pexx_alert_' + Date.now() + '_' + self.random_string(5),
		holder = '<div class="pexx_alert" style="'+ pexx_alert +'"></div>',
		element = (
			'<div id="'+ id +'" class="pexx_alert_inner" style="'+ pexx_alert_inner +'">'+
				'<div class="pexx_alert_box" style="'+ pexx_alert_box +'">'+
					'<div class="pexx_alert_box_s1" style="'+ pexx_alert_box_s1 +'"></div>'+
					'<div class="pexx_alert_box_s2" style="'+ pexx_alert_box_s2 +'">'+
						'<div style="'+ pexx_alert_box_s2_div +'">'+ icon +'</div>'+
					'</div>'+
					'<div class="pexx_alert_box_s3" style="'+ pexx_alert_box_s3 +'">'+
						'<div class="pexx_alert_box_s3_message" style="'+ pexx_alert_box_s3_message +'">'+ options.message +'</div>'+
					'</div>'+
					'<div class="pexx_alert_box_s4" style="'+ pexx_alert_box_s4 +'">'+
						'<button style="'+ pexx_alert_box_s4_button +'" data-id="'+ id +'"><i class="pexx-a-icon-cross"></i></button>'+
					'</div>'+
				'</div>'+
			'</div>'
		);

	// Setup stacking
	if (self.options.stack) {
		if (!self.$('.pexx_alert').length > 0) {
			self.$(self.options.anchor).append(holder);
		}
		if (self.$('.pexx_alert').length > 0) {
			if (self.options.stack_position == 'top') {
				self.$('.pexx_alert').prepend(element);
			} else {
				self.$('.pexx_alert').append(element);
			}
		} else {
			self.$(self.options.anchor).append(element);
		}
	} else {
		self.$('.pexx_alert').remove();
		self.$(self.options.anchor).append(holder);
		self.$(self.options.anchor).find('.pexx_alert').append(element);
	}

	// Display built template
	self.$('#'+ id).slideDown(100, function(){
		self.$('#'+ id).find('.pexx_alert_box_s4 button').on('click', function(){
			var element = self.$(this).data('id');
			self.$('#'+ element).slideUp(100, function(){
				self.$(this).remove();
				if (self.$('.pexx_alert').find('.pexx_alert_inner').length == 0) {
					self.$('.pexx_alert').remove();
				}
				new options.call_back();
			}).animate({ queue : false, duration : 100 });
		});
		if (self.options.auto_close) {
			setTimeout(function(){
				self.$('#'+ id).slideUp(100, function(){
					self.$(this).remove();
					if (self.$('.pexx_alert').find('.pexx_alert_inner').length == 0) {
						self.$('.pexx_alert').remove();
					}
					new options.call_back();
				}).animate({ queue : false, duration : 100 });
			},parseInt(self.options.auto_close_speed + 100));
		}
	}).animate({ queue : false, duration : 100 });
};


// Confirm type alert template builder
pexxalert.prototype.confirm = function(data){
	const self = this,

	// Default confirm template options
	defaults = {
		title: 'Run This Test?',
		message: 'This process will run and do what it has to',
		accept_label: 'Yes',
		reject_label: 'No',
		fragment: true,
		call_back: function(choice){ /* natm */ }
	};

	// Template build globals
	var options = self.$.extend(true, defaults, data ),
		pexx_confirm = '',
		pexx_confirm_inner = 'padding-top:'+ self.options.force_padding +'px;',
		pexx_confirm_box = '',
		pexx_confirm_header = '',
		pexx_confirm_body = '',
		pexx_confirm_footer = '',
		pexx_confirm_action_1 = '',
		pexx_confirm_action_2 = '',
		pexx_confirm_action_1_button = '',
		pexx_confirm_action_2_button = '',
		background = '',
		color = '';
	
	// Setup theme (background and text color)
	if (self.options.theme) {
		if (self.options.blur) {
			background = self.options.theme_type == 'snow' ? 
						 self.options.theme_backgrounds.snow.alpha : 
						 self.options.theme_backgrounds.darcula.alpha;
		} else {
			background = self.options.theme_type == 'snow' ?
						 self.options.theme_backgrounds.snow.solid :
						 self.options.theme_backgrounds.darcula.solid;
		}
		color = self.options.theme_type == 'snow' ?
				self.options.theme_backgrounds.snow.color :
				self.options.theme_backgrounds.darcula.color;
	} else {
		background = self.options.blur ? self.options.static_alpha : self.options.static_background;
		color = self.options.static_color;
	}
	pexx_confirm_box += self.options.blur ? 
					   '-webkit-backdrop-filter:blur(50px);backdrop-filter:blur(30px);' :
					   '-webkit-backdrop-filter:none;backdrop-filter:none;';
	pexx_confirm_box += 'background:'+ background +';';
	pexx_confirm_box += 'color:'+ color +';';
	pexx_confirm_action_1_button += 'color:'+ color +';';
	pexx_confirm_action_2_button += 'background:'+ self.options.accent +';';

	// Construct template
	var id = 'pexx_confirm_' + Date.now() + '_' + self.random_string(5),
		element = (
			'<div id="'+ id +'" class="pexx_confirm" style="'+ pexx_confirm +'">'+
				'<div class="pexx_confirm_inner" style="'+ pexx_confirm_inner +'">'+
					'<div class="pexx_confirm_box" style="'+ pexx_confirm_box +'">'+
						'<div class="pexx_confirm_header" style="'+ pexx_confirm_header +'">'+ options.title +'</div>'+
						'<div class="pexx_confirm_body" style="'+ pexx_confirm_body +'">'+ options.message +'</div>'+
						'<div class="pexx_confirm_footer" style="'+ pexx_confirm_footer +'">'+
							'<div class="pexx_confirm_action_1" style="'+ pexx_confirm_action_1 +'">'+
								'<button data-ch="0" style="'+ pexx_confirm_action_1_button +'">'+ 
									options.reject_label.toUpperCase() +
								'</button>'+
							'</div>'+
							'<div class="pexx_confirm_action_2" style="'+ pexx_confirm_action_2 +'">'+
								'<button data-ch="1" style="'+ pexx_confirm_action_2_button +'">'+ 
									options.accept_label.toUpperCase() +
								'</button>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
		);

	// Display built template
	self.$('.pexx_confirm').remove();
	self.$(self.options.anchor).append(element);
	self.$('#'+ id).find('.pexx_confirm_inner').fadeIn(100, function(){
		if (options.fragment) {
			self.$(self.window).on('hashchange', function(a){
				a.preventDefault();
				if (!self.window.location.hash) {
					return self.$('#'+ id).find('.pexx_confirm_inner').fadeOut(100, function(){
						self.$('#'+ id).remove();
					});
				}
				if (self.window.location.hash.split('#')[1] != 'pexx_confirm') {
					return self.$('#'+ id).find('.pexx_confirm_inner').fadeOut(100, function(){
						self.$('#'+ id).remove();
					});
				}
			});
			self.window.open('#pexx_confirm', '_self');
		}
		self.$('#'+ id).find('.pexx_confirm_footer button').on('click', function(){
			var choice = self.$(this).data('ch') == 0 ? 'no' : 'yes';
			if (options.fragment) {
				self.window.history.back();
			} else {
				self.$('#'+ id).find('.pexx_confirm_inner').fadeOut(100, function(){
					self.$('#'+ id).remove();
				});
			}
			return options.call_back(choice);
		});
	});
};


// Progress type alert template builder
pexxalert.prototype.progress = function(data){
	const self = this,

	// Default progress template options
	defaults = {
		title: 'Run This Test?', call_back: function(progress,element,box){ /* natm */ }
	};

	// Template build globals
	var options = self.$.extend(true, defaults, data),
		pexx_progress = 'padding-top:'+ self.options.force_padding +'px;',
		pexx_progress_inner = '',
		pexx_progress_box = '',
		pexx_progress_holder = '',
		pexx_progress_holder_inner = '',
		pexx_progress_h_one = '',
		pexx_progress_h_two = '',
		pexx_progress_h_two_div = '',
		pexx_progress_h_thr = '',
		pexx_progress_h_thr_one = '',
		pexx_progress_title = '',
		pexx_progress_action = '',
		pexx_progress_action_button = '',
		pexx_progress_h_thr_two = '',
		pexx_progress_h_thr_two_div = '',
		pexx_progress_view = 'display:none;',
		pexx_progress_view_button = '',
		background = '',
		color = '';
	
	// Setup theme (background and text color)
	if (self.options.theme) {
		if (self.options.blur) {
			background = self.options.theme_type == 'snow' ? 
						 self.options.theme_backgrounds.snow.alpha :
						 self.options.theme_backgrounds.darcula.alpha;
		} else {
			background = self.options.theme_type == 'snow' ?
						 self.options.theme_backgrounds.snow.solid :
						 self.options.theme_backgrounds.darcula.solid;
		}
		color = self.options.theme_type == 'snow' ? 
				self.options.theme_backgrounds.snow.color :
				self.options.theme_backgrounds.darcula.color;
	} else {
		background = self.options.blur ? self.options.static_alpha : self.options.static_background;
		color = self.options.static_color;
	}
	pexx_progress_holder_inner += self.options.blur ?
								 '-webkit-backdrop-filter:blur(50px);backdrop-filter:blur(30px);' :
								 '-webkit-backdrop-filter:none;backdrop-filter:none;';
	pexx_progress_view_button += self.options.blur ? 
								'-webkit-backdrop-filter:blur(50px);backdrop-filter:blur(30px);' : 
								'-webkit-backdrop-filter:none;backdrop-filter:none;';
	pexx_progress_holder_inner += 'background:'+ background +';';
	pexx_progress_view_button += 'background:'+ background +';';
	pexx_progress_holder_inner += 'color:'+ color +';';
	pexx_progress_view_button += 'color:'+ color +';';
	pexx_progress_action_button += 'color:'+ color +';';
	pexx_progress_h_one += 'background:'+ self.options.accent +';';
	pexx_progress_h_two_div += 'background:'+ self.options.accent +';';
	pexx_progress_h_thr_two_div += 'background:'+ self.options.accent +';';
	pexx_progress_h_thr_two += 'background:'+ self.options.static_alpha +';';
	
	// Construct template
	var id = 'pexx_progress_' + Date.now() + '_' + self.random_string(5),
		holder = '<div class="pexx_progress" style="'+ pexx_progress +'"></div>',
		element = (
			'<div id="'+ id +'" class="pexx_progress_inner" style="'+ pexx_progress_inner +'">'+
				'<div class="pexx_progress_box" style="'+ pexx_progress_box +'">'+
					'<div class="pexx_progress_holder" style="'+ pexx_progress_holder +'">'+
						'<div class="pexx_progress_holder_inner" style="'+ pexx_progress_holder_inner +'">'+
							'<div class="pexx_progress_h_one" style="'+ pexx_progress_h_one +'"></div>'+
							'<div class="pexx_progress_h_two" style="'+ pexx_progress_h_two +'">'+
								'<div style="'+ pexx_progress_h_two_div +'"><i class="pexx-a-icon-upload3"></i></div>'+
							'</div>'+
							'<div class="pexx_progress_h_thr" style="'+ pexx_progress_h_thr +'">'+
								'<div class="pexx_progress_h_thr_one" style="'+ pexx_progress_h_thr_one +'">'+
									'<div class="pexx_progress_title" style="'+ pexx_progress_title +'">'+ options.title +'</div>'+
									'<div class="pexx_progress_action" style="'+ pexx_progress_action +'">'+
										'<button data-id="'+ id +'" style="'+ pexx_progress_action_button +'">'+
											'<i class="pexx-a-icon-eye-blocked"></i>'+
										'</button>'+
									'</div>'+
								'</div>'+
								'<div class="pexx_progress_h_thr_two" style="'+ pexx_progress_h_thr_two +'">'+
									'<div style="'+ pexx_progress_h_thr_two_div +'"></div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="pexx_progress_view" style="'+ pexx_progress_view +'">'+
						'<button data-id="'+ id +'" style="'+ pexx_progress_view_button +'"><i class="pexx-a-icon-eye"></i></button>'+
					'</div>'+
				'</div>'+
			'</div>'
		);

	// Setup stacking
	if (self.options.stack) {
		if (!self.$('.pexx_progress').length > 0) {
			self.$(self.options.anchor).append(holder);
		}
		if (self.$('.pexx_progress').length > 0) {
			if (self.options.stack_position == 'top') {
				self.$('.pexx_progress').prepend(element);
			} else {
				self.$('.pexx_progress').append(element);
			}
		} else {
			self.$(self.options.anchor).append(element);
		}
	} else {
		self.$('.pexx_progress').remove();
		self.$(self.options.anchor).append(holder);
		self.$(self.options.anchor).find('.pexx_progress').append(element);
	}

	// Display built template
	self.$('#'+ id).slideDown(100, function(){
		self.$('#'+ id).find('.pexx_progress_action button').on('click', function(){
			var element = self.$(this).data('id');
			self.$('#'+ element).find('.pexx_progress_holder').slideUp(100, function(){
				self.$('#'+ element).find('.pexx_progress_view').show();
			}).animate({ queue : false, duration : 100 });
		});
		self.$('#'+ id).find('.pexx_progress_view button').on('click', function(){
			var element = self.$(this).data('id');
			self.$('#'+ element).find('.pexx_progress_view').hide();
			self.$('#'+ element).find('.pexx_progress_holder').slideDown(100);
		});
		new options.call_back('#'+ id +' .pexx_progress_h_thr_two div','#'+ id,'.pexx_progress');
	}).animate({ queue : false, duration : 100 });
};


// Input type alert template builder
pexxalert.prototype.input = function(data){
	const self = this,

	// Default input template options
	defaults = {
		title: 'Your Favorite Fruit?',
		message: 'No vegetables please.',
		placeholder: 'Type in the name of a fruit',
		type: 'text',
		process_label: 'Submit',
		discard_label: 'Discard',
		fragment : true,
		call_back : function(input, choice, element){ /* natm */ }
	};

	// Template build globals
	var options = self.$.extend(true, defaults, data ),
		pexx_input = '',
		pexx_input_inner = 'padding-top:'+ self.options.force_padding +'px;',
		pexx_input_box = '',
		pexx_input_header = '',
		pexx_input_body = '',
		pexx_input_body_input = '',
		pexx_input_indic = '',
		pexx_input_footer = '',
		pexx_input_action_1 = '',
		pexx_input_action_1_button = '',
		pexx_input_action_2 = '',
		pexx_input_action_2_button = '',
		background = '',
		color = '';

	// Setup theme (background and text color)
	if (self.options.theme) {
		if (self.options.blur) {
			background = self.options.theme_type == 'snow' ?
						 self.options.theme_backgrounds.snow.alpha : 
						 self.options.theme_backgrounds.darcula.alpha;
		} else {
			background = self.options.theme_type == 'snow' ?
						 self.options.theme_backgrounds.snow.solid : 
						 self.options.theme_backgrounds.darcula.solid;
		}
		color = self.options.theme_type == 'snow' ? 
				self.options.theme_backgrounds.snow.color : 
				self.options.theme_backgrounds.darcula.color;
	} else {
		background = self.options.blur ? self.options.static_alpha : self.options.static_background;
		color = self.options.static_color;
	}
	pexx_input_box += self.options.blur ? 
					  '-webkit-backdrop-filter:blur(50px);backdrop-filter:blur(30px);' :
					  '-webkit-backdrop-filter:none;backdrop-filter:none;';
	pexx_input_box += 'background:'+ background +';';
	pexx_input_box += 'color:'+ color +';';
	pexx_input_action_1_button += 'color:'+ color +';';
	pexx_input_body_input += 'color:'+ color +';';
	pexx_input_action_2_button += 'background:'+ self.options.accent +';';

	// Construct template
	var id = 'pexx_input_' + Date.now() + '_' + self.random_string(5),
		element = (
			'<div id="'+ id +'" class="pexx_input" style="'+ pexx_input +'">'+
				'<div class="pexx_input_inner" style="'+ pexx_input_inner +'">'+
					'<div class="pexx_input_box" style="'+ pexx_input_box +';">'+
						'<div class="pexx_input_header" style="'+ pexx_input_header +'">'+ options.title +'</div>'+
						'<div class="pexx_input_body" style="'+ pexx_input_body +'">'+
							'<input type="'+ options.type +'" placeholder="'+ options.placeholder +'" style="'+ pexx_input_body_input +'"/>'+
							'<div class="pexx_input_indic" style="'+ pexx_input_indic +'">'+ options.message +'</div>'+
						'</div>'+
						'<div class="pexx_input_footer" style="'+ pexx_input_footer +'">'+
							'<div class="pexx_input_action_1" style="'+ pexx_input_action_1 +'">'+
								'<button data-id="'+ id +'" data-ch="no" style="'+ pexx_input_action_1_button +'">'+
									options.discard_label.toUpperCase() +
								'</button>'+
								'<i style="display:none;" class="pexx-a-icon-spinner6 pexx-a-spin"></i>'+
							'</div>'+
							'<div class="pexx_input_action_2" style="'+ pexx_input_action_2 +'">'+
								'<button data-id="'+ id +'" data-ch="yes" style="'+ pexx_input_action_2_button + '">'+ 
									options.process_label.toUpperCase() +
								'</button>'+
								'<i style="display:none;" class="pexx-a-icon-spinner6 pexx-a-spin"></i>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
		);

	// Display built template
	self.$('.pexx_input').remove();
	self.$(self.options.anchor).append(element);
	self.$('#'+ id).find('.pexx_input_inner').fadeIn(100, function(){
		if (options.fragment) {
			self.$(self.window).on('hashchange', function(a){
				a.preventDefault();
				if (!self.window.location.hash) {
					return self.$('#'+ id).find('.pexx_input_inner').fadeOut(100, function(){
						self.$('#'+ id).remove();
					});
				}
				if (self.window.location.hash.split('#')[1] != 'pexx_input') {
					return self.$('#'+ id).find('.pexx_input_inner').fadeOut(100, function(){
						self.$('#'+ id).remove();
					});
				}
			});
			self.window.open('#pexx_input', '_self');
		}
		self.$('#'+ id).find('.pexx_input_body input').on('focus', function(){ /* natm */
		}).on('blur', function(){ /* natm */
		}).on('keypress', function(evnt){
			if (evnt.which === 13) {
				try {
					self.$('#'+ id).find('.pexx_input_body input').blur();
					self.$('#'+ id).find('.pexx_input_action_2 button').click();
				} catch(err){ console.log(err); // <!== FOR DEBUGGING PURPOSES
				}
				evnt.preventDefault();
			}
		});
		self.$('#'+ id).find('.pexx_input_action_1 button,.pexx_input_action_2 button').on('click', function(){
			var el = self.$(this);
			var input = self.$('#'+ el.data('id')).find('.pexx_input_body input').val();
			return options.call_back( input, el.data('ch'), el );
		});
	});
};


// Call type alert template builder
pexxalert.prototype.call = function(data){
	const self = this,

	// Default call template options
	defaults = {
		routing_id: 0,
		name: 'John',
		username: 'johnney',
		avatar: '',
		type: 'video',
		call_back: function(action, routing_id, username, type){ /* natm */ }
	};

	// Template build globals
	var options = self.$.extend(true, defaults, data),
		pexx_caller = 'padding-top:'+ self.options.force_padding +'px;',
		pexx_caller_inner = '',
		pexx_caller_box = '',
		pexx_caller_icon = '',
		pexx_caller_info = '',
		pexx_caller_info_name = '',
		pexx_caller_info_type = '',
		pexx_caller_rejt = '',
		pexx_caller_ansr = '',
		pexx_caller_avatar = options.avatar,
		background = '',
		color = '';

	// Setup theme (background and text color)
	if (self.options.theme) {
		if (self.options.blur) {
			background = self.options.theme_type == 'snow' ? 
						 self.options.theme_backgrounds.snow.alpha :
						 self.options.theme_backgrounds.darcula.alpha;
		} else {
			background = self.options.theme_type == 'snow' ? 
						 self.options.theme_backgrounds.snow.solid : 
						 self.options.theme_backgrounds.darcula.solid;
		}
		color = self.options.theme_type == 'snow' ? 
				self.options.theme_backgrounds.snow.color : 
				self.options.theme_backgrounds.darcula.color;
	} else {
		background = self.options.blur ? self.options.static_alpha : self.options.static_background;
		color = self.options.static_color;
	}
	pexx_caller_box += self.options.blur ? 
					   '-webkit-backdrop-filter:blur(50px);backdrop-filter:blur(30px);' : 
					   '-webkit-backdrop-filter:none;backdrop-filter:none;';
	pexx_caller_box += 'background:'+ background +';';
	pexx_caller_box += 'color:'+ color +';';
	pexx_caller_icon += 'background:'+ self.options.accent +';';

	// Construct template
	var id = 'pexx_caller_' + Date.now() + '_' + self.random_string(5),
		element = (
			'<div id="'+ id +'" class="pexx_caller" style="'+ pexx_caller +'">'+
				'<div class="pexx_caller_inner" style="'+ pexx_caller_inner +'">'+
					'<div class="pexx_caller_box" style="'+ pexx_caller_box +'">'+
						'<div class="pexx_caller_icon" style="'+ pexx_caller_icon +'">'+ pexx_caller_avatar +'</div>'+
						'<div class="pexx_caller_info" style="'+ pexx_caller_info +'">'+
							'<div class="pexx_caller_info_name" style="'+ pexx_caller_info_name +'">'+ options.name +'</div>'+
							'<div class="pexx_caller_info_type" style="'+ pexx_caller_info_type +'">'+ options.type +'</div>'+
						'</div>'+
						'<button data-id="'+ id +'" data-ch="no" class="pexx_caller_rejt" style="'+ pexx_caller_rejt +'">'+
							'<i class="pexx-a-icon-phone-hang-up"></i>'+
						'</button>'+
						'<button data-id="'+ id +'" data-ch="yes" class="pexx_caller_ansr" style="'+ pexx_caller_ansr +'">'+
							'<i class="pexx-a-icon-phone"></i>'+
						'</button>'+
					'</div>'+
				'</div>'+
			'</div>'
		);

	// Display built template
	self.$('.pexx_caller').remove();
	self.$(self.options.anchor).append(element);
	self.$('#'+ id).find('.pexx_caller_inner').slideDown(100, function(){
		self.$('#'+ id).find('.pexx_caller_rejt, .pexx_caller_ansr').on('click', function(){
			var el = self.$(this);
			self.$('#'+ el.data('id')).find('.pexx_caller_inner').slideUp(100, function(){
				self.$('#'+ el.data('id')).remove();
				return options.call_back(el.data('ch') , options.routing_id, options.username, options.type);
			});
		});
	});
};


// Utility function : Random string generator
pexxalert.prototype.random_string = function(length){
	var b = '',
		c = 'abcdefghijklmnopqrstuvwxyz0123456789',
		d = c.length;
	for (var e = 0;e < length;e++) {
		b += c.charAt(Math.floor(Math.random() * d));
	}
	return b;
};


return pexxalert;
})));