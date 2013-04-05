
var Charmbar = function(){
	this.menuIconsTimeoutId = null;
	this.swatchIntervalId = null;
	this.appWidth = M.screen().width;
	this.showIcons();
}

Charmbar.prototype = {
	// 아이콘 보기
	showIcons: function(){
		console.log('show')
		var  that = this

		for (var i=0; i<5; i++) {
			M('[data-navi="menu'+i+'"]')
				.css('opacity', '1')
				.animate({
					 'left': '0px'
					,'time': '.2s'
					,'delay': i * 0.05 + 's'
				})
				.on('mouseover', function(evt, mp){
					if (M('#navi .menuBack').css('display') == 'none') {
						that.showBack.call(that);
					}
				})
				//.on('click', showPanelHandler)
		}
				
		M('body').on('mousemove', function(evt){
			that.traceMousePosX.call(that, evt);
		});
	},

	// 아이콘 배경 보기
	showBack: function(){
		var that = this;

		M('#navi .menuBack')
			.css('display', 'block')
			.animate({
				 'opacity': '1'
				,'time': '.3s'
			}, function(evt, mp){
				mp.css('display', 'block')
			})
		M('#systemInfo')
			.css('display', 'block')
			.animate({
				 'opacity': '1'
				,'time': '.3s'
			}, function(evt, mp){
				mp.css('display', 'block')
			})
		
		// 시계
			console.log('dd')
		this.swatchIntervalId = setInterval(function(){
			that.swatch.call(that);
		}, 1000)
	},

	// 마우스 위치 추적
	traceMousePosX: function(evt){
		var that = this
		if (evt.pageX <= this.appWidth - 100) {
			that.hideIcons.call(that);
		}
	},

	// 시계
	swatch: function(){
		console.log('a')
	},

	// 아이콘 / 배경 숨기기
	hideIcons: function(argument){
		M('body').off('mousemove');
		M('#navi .menuBack')
			.animate({
				 'opacity': '0'
				,'time': '.3s'
			}, function(evt, mp){
				mp.css('display', 'none')
			})
		M('#systemInfo')
			.animate({
				 'opacity': '0'
				,'time': '.3s'
			}, function(evt, mp){
				mp.css('display', 'none')
			})
		for (var i=0; i<5; i++) {
			M('[data-navi="menu'+i+'"]')
				.animate({
					 'opacity': '0'
					,'time': '.2s'
				}, function(evt, mp){
					mp.css('left', '100px')
				})
				.off('mouseover')
		}
	},
}



