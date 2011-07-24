/*
 * jQuery Plugin: Scroller
 * Version 0.2
 *
 * Copyright (c) 2011 Shilov Vlad [Omgovich] (http://omgovich.ru)
 * No copyrights or licenses. Do what you want!
 * 
 */

(function($) {

	$.fn.scroller = function(options) {
	
		// Settings
		var settings = jQuery.extend({
			interval:	10,
			step:		5,
			direction:	'horizontal',
			fixed:		'.fixed'
		}, options);
	
		// {Event} Content ready
		this.each(function(){
	
			//** Variables
			var cursor = {
				position:	0
			};
			var data = {
				size:	0,
				offset:	0
			};
			var scroller = {
				offset:	0,
				ratio:	0,
				size:	0
			};
			var animation;
	
			//** Objects
			var $body = $('body');
			var $scroller = $(this);
			var $data = $scroller.wrapInner('<div class="slide-wrap"><div class="slide-data" /></div>').find('.slide-data');
			var $fixed = $scroller.find(settings.fixed);
	
			//** Sizes and offsets
			if (settings.direction=='vertical') {
				$scroller.addClass('vertical-slide-pane');
				data.size = $data.height();
				scroller.offset = $scroller.offset().top;
				scroller.size = $scroller.height();
			} else {
				$scroller.addClass('slide-pane');
				data.size = $data.width();
				scroller.offset = $scroller.offset().left;
				scroller.size = $scroller.width();
			}
	
			//** Implementation
	
			// {EVENT} Mousemove
			$body.mousemove(function(event){
				if (settings.direction == 'vertical') {
					cursor.position = event.pageY - scroller.offset;
				} else {
					cursor.position = event.pageX - scroller.offset;
				}
				scroller.ratio = ((cursor.position+scroller.size)/(scroller.size)-1.5)*2;
			});
	
			// {EVENT} Mouseenter/Mouseover on scroller
			$scroller.hover(function(){
				clearInterval(animation);
				if (data.size > scroller.size) {
					$data.stop();
					animation = setInterval(function(){
						data.offset = Math.min(0, data.offset - scroller.ratio * settings.step);
						data.offset = Math.max(data.offset, scroller.size - data.size);
						data.offset = Math.round(data.offset);
						if (settings.direction == 'vertical') {
							$data.css({top: data.offset});
							$fixed.css({top: -data.offset});
						} else {
							$data.css({left: data.offset});
							$fixed.css({left: -data.offset});
						}
					}, settings.interval);
				}
			},function(){
				clearInterval(animation);
			});
	
			// {EVENT} Window resize - recalculate offset
			$(window).resize(function(){
				if (settings.direction == 'vertical') {
					scroller.offset = $scroller.offset().top;
				} else {
					scroller.offset = $scroller.offset().left;
				}
			});
	
	
		});
	
		return this;
	};

})(jQuery);