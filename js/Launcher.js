
var Launcher = function(){
	
	this.init();
}

Launcher.prototype = {
	// 초기화
	init: function(){
		console.log('show')
		return;
		var  that = this

		for (var i=0; i<5; i++) {
			M('[data-navi="menu'+i+'"]')
				.css('opacity', '1')
				.animate({
					 'left': '0px'
					,'time': '.2s'
					,'delay': i * 0.05 + 's'
				})
				.on('click', function(evt, mp){
					that.showSubCharm.call(that, mp);
				})
				.on('mouseover', function(evt, mp){
					that.showBack.call(that);
				})
				
		}
				
		M('body').on('mousemove', function(evt){
			that.traceMousePosX.call(that, evt);
		});
	}
}



