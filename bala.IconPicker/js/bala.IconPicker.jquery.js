(function($) {

	$.fn.IconPicker = function(parameter)
	{
		var __iconMargin__ = 3;
		var __containerMargin__ = 3;
		var __containerPadding__ = 5;

		var __iconSize__ = 30;
		var __currSelection__ = 0;
		var __hasNullIcon__ = true;
		var __containerPosition__ = 'right-bottom';
		var __containerWidth__ = 5;
		var __containerHeight__ = 3;
		var __onDisplayIconChange__ = function(){};

		var __displayerDiv__ = null;
		var __containerDivDisp__ = null;
		var __containerDiv__ = null;

		if (parameter.iconSize != undefined) __iconSize__ = parameter.iconSize;
		if (parameter.currSelection != undefined) __currSelection__ = parameter.currSelection;
		if (parameter.hasNullIcon != undefined) __hasNullIcon__ = parameter.hasNullIcon;
		if (parameter.containerPosition != undefined) __containerPosition__ = parameter.containerPosition;
		if (parameter.containerWidth != undefined) __containerWidth__ = parameter.containerWidth;
		if (parameter.containerHeight != undefined) __containerHeight__ = parameter.containerHeight;
		if (parameter.onDisplayIconChange != undefined) __onDisplayIconChange__ = parameter.onDisplayIconChange;

		this.each(function(){
			var baseDiv = $(this);
			if (baseDiv.prop('tagName') == 'DIV') {

				// record all image urls and remove all image
				var imgObjs = baseDiv.find('img');
				var imgUrls = new Array();
				imgObjs.each(function(){
					imgUrls.push($(this).attr('src'));
				});
				imgObjs.remove();

				// create icon-displayer and icon-container
				var contHtml =
					'<div class="balaIconPicker-icon-displayer" />         ' +
					'<div class="balaIconPicker-icon-container-displayer"> ' +
					'	<div class="balaIconPicker-icon-container" /></div>' ;
				baseDiv.append(contHtml);
				__displayerDiv__ = baseDiv.find('div.balaIconPicker-icon-displayer');
				__containerDivDisp__ = baseDiv.find('div.balaIconPicker-icon-container-displayer');
				__containerDiv__ = __containerDivDisp__.find('div.balaIconPicker-icon-container');

				// add all image into icon-container.
				var iconHtml = '';
				if (__hasNullIcon__) iconHtml += '<div class="balaIconPicker-null-icon" />';
				for (var n=0; n<imgUrls.length; ++n) iconHtml += '<div class="balaIconPicker-common-icon" style="background-image:url(\'' + imgUrls[n] + '\');" />';
				__containerDiv__.append(iconHtml);

				// apply dynamic CSS
				baseDiv.find('div.balaIconPicker-null-icon').css({
					'width':  __iconSize__,
					'height': __iconSize__,
					'background-size' : '' + __iconSize__ + 'px ' + __iconSize__ + 'px'
				});
				baseDiv.find('div.balaIconPicker-common-icon').css({
					'width':  __iconSize__,
					'height': __iconSize__,
					'background-size' : '' + __iconSize__ + 'px ' + __iconSize__ + 'px'
				});
				__displayerDiv__.css({
					'width':  (__iconSize__ + (__iconMargin__ * 2)),
					'height': (__iconSize__ + (__iconMargin__ * 2)),
					'background-size' : '' + __iconSize__ + 'px ' + __iconSize__ + 'px'
				});
				__containerDivDisp__.css({
					'width':  (__iconSize__ + (__iconMargin__ * 2)) * __containerWidth__ + __containerMargin__,
					'height': (__iconSize__ + (__iconMargin__ * 2)) * __containerHeight__ + __containerMargin__
				});
				__containerDiv__.css({
					'width':  (__iconSize__ + (__iconMargin__ * 2)) * __containerWidth__ + __containerMargin__ + 17,
					'height': (__iconSize__ + (__iconMargin__ * 2)) * __containerHeight__ + __containerMargin__ + 17
				});

				// change container position
				var displayerTop = __displayerDiv__.position().top;
				var displayerLft = __displayerDiv__.position().left;
				var containerTop = displayerTop;
				var containerLft = displayerLft + __iconSize__ + (__iconMargin__ * 4);
				switch(__containerPosition__)
				{
				case 'left-top-ext':
					containerTop = displayerTop - __containerDivDisp__.height();
					containerLft = displayerLft - __containerDivDisp__.width() - (__iconMargin__ * 2);
					//if (containerTop < 0) containerTop = 0;
					break;
				case 'left-top':
					containerTop = displayerTop - __containerDivDisp__.height() + __displayerDiv__.height();
					containerLft = displayerLft - __containerDivDisp__.width() - (__iconMargin__ * 2);
					//if (containerTop < 0) containerTop = 0;
					break;
				case 'left-middle':
					containerTop = displayerTop - (__containerDivDisp__.height() - __displayerDiv__.height()) / 2;
					containerLft = displayerLft - __containerDivDisp__.width() - (__iconMargin__ * 2);
					//if (containerTop < 0) containerTop = 0;
					break;
				case 'left-bottom':
					containerTop = displayerTop;
					containerLft = displayerLft - __containerDivDisp__.width() - (__iconMargin__ * 2);
					break;
				case 'left-bottom-ext':
					containerTop = displayerTop + __displayerDiv__.height();
					containerLft = displayerLft - __containerDivDisp__.width() - (__iconMargin__ * 2);
					break;
				case 'right-top-ext':
					containerTop = displayerTop - __containerDivDisp__.height();
					containerLft = displayerLft + __iconSize__ + (__iconMargin__ * 4);
					//if (containerTop < 0) containerTop = 0;
					break;
				case 'right-top':
					containerTop = displayerTop - __containerDivDisp__.height() + __displayerDiv__.height();
					containerLft = displayerLft + __iconSize__ + (__iconMargin__ * 4);
					//if (containerTop < 0) containerTop = 0;
					break;
				case 'right-middle':
					containerTop = displayerTop - (__containerDivDisp__.height() - __displayerDiv__.height()) / 2;
					containerLft = displayerLft + __iconSize__ + (__iconMargin__ * 4);
					//if (containerTop < 0) containerTop = 0;
					break;
				case 'right-bottom':
					containerTop = displayerTop;
					containerLft = displayerLft + __iconSize__ + (__iconMargin__ * 4);
					break;
				case 'right-bottom-ext':
					containerTop = displayerTop + __displayerDiv__.height();
					containerLft = displayerLft + __iconSize__ + (__iconMargin__ * 4);
					break;
				case 'top-left':
					containerTop = displayerTop - __containerDivDisp__.height();
					containerLft = displayerLft + __displayerDiv__.width() - __containerDivDisp__.width();
					break;
				case 'top-center':
					containerTop = displayerTop - __containerDivDisp__.height();
					containerLft = displayerLft - (__containerDivDisp__.width() - __displayerDiv__.width()) / 2;
					break;
				case 'top-right':
					containerTop = displayerTop - __containerDivDisp__.height();
					containerLft = displayerLft + __iconSize__ + (__iconMargin__ * 4);
					break;
				}
				__containerDivDisp__.css({ 'top': containerTop, 'left':containerLft });
				__containerDivDisp__.hide();

				// set displayer icon
				__displayerDiv__.css({
					'background-image': __containerDiv__.find('div:eq(' + __currSelection__ + ')').css('background-image')
				});

				// apply event handler
				__displayerDiv__.click(function(){
					if (__containerDivDisp__.is(':hidden')) {
						$('div.balaIconPicker-icon-container-displayer').slideUp(100);
						__containerDivDisp__.slideDown(200);
					}else{
						__containerDivDisp__.slideUp(100);
					}
				});
				__containerDiv__.find('div').click(function(){
					__displayerDiv__.css('background-image', $(this).css('background-image'));
					__currSelection__ = $(this).index();
					__containerDivDisp__.slideUp(100);

					// trigger onDisplayChange event
					__onDisplayIconChange__( __currSelection__, getSelectedUrl());
				});
			}
		});

		function getSelectedIndex(){ return __currSelection__; };
		function getSelectedUrl(){
			var retUrl = __containerDiv__.find('div:eq(' + __currSelection__ + ')').css('background-image');
			var regex = new RegExp(/url\("?(.+)"?\)/);
			retUrl = retUrl.split(regex)[1];
			if (retUrl.indexOf('bala.IconPicker.nullIcon.png', retUrl.length-28) >= 0) retUrl = '';
			return retUrl;
		};
		function setSelectedIndex(idx) {
			if (idx <= __containerDiv__.find('div').length) {
				__currSelection__ = idx;
				__displayerDiv__.css({'background-image': getSelectedUrl()});
			}
		};
		function setSelectedUrl(url){
			__displayerDiv__.css({'background-image': url});
		};
	};

})(jQuery);
