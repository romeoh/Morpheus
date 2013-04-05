
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
	},

	// 아이콘 배경 보기
	showBack: function(){
		var that = this;

		M('#charmbar .menuBack')
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
		that.swatch.call(that);
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
		var  d = new Date()
			,month = d.getMonth() + 1
			,date = d.getDate()
			,day = d.getDay()
			,hour = d.getHours()
			,minute = d.getMinutes()
			,days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
		//date < 10 ? date = '0'+date : date
		hour > 12 ? hour = hour - 12 : hour
		minute < 10 ? minute = '0'+minute : minute
		M('#systemInfo .time').text(hour + ':' + minute)
		M('#systemInfo .date').text(month + '월 ' + date + '일')
		M('#systemInfo .day').text(days[day])
		//console.log(month, date, days[day], hour, minute)
	},

	// 아이콘 / 배경 숨기기
	hideIcons: function(argument){
		clearInterval(this.swatchIntervalId);
		this.swatchIntervalId = null;

		M('body').off('mousemove');
		M('#charmbar .menuBack')
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
				.off('click')
				.off('mouseover')
		}
	},

	// 하부 참보기
	showSubCharm: function(mp){
		var that = this
			idx = mp.data('navi').substr(4)
		
		that.hideIcons.call(that);
		switch(idx) {
			case '0':
				that.hideSubCharm.call(that, 2);
				that.reLaunchCharm.call(that);
			break;
			case '1':
				that.openCharm.call(that, 2);
				that.dataCharm.call(that);
			break;
			case '2':
				that.openCharm.call(that, 3);
				that.virtualCharm.call(that);
			break;
			case '3':
				that.hideSubCharm.call(that, 2);
				that.distributeCharm.call(that);
			break;
			case '4':
				that.openCharm.call(that, 5);
				that.settingCharm.call(that);
			break;
		}
	},

	openCharm: function(idx){
		var that = this;

		that.resetSubCharm.call(that);
		setTimeout(function(){
			M('#charm')
				.addClass('theme'+idx)
				.animate({
					 'right': '0px'
					,'time': '.3s'
				})
				.first()
				.on('click', function(){
					that.hideSubCharm.call(that);
				})
		}, 10)
	},

	resetSubCharm: function(){
		M('#charm')
			.removeAttr('class')
			.css('right', '-330px')
			.find('.content').html('')
	},

	hideSubCharm: function(){
		M('#charm')
			.animate({
				 'right': '-330px'
				,'time': '.3s'
			}, function(evt, mp){
				mp.removeAttr('class')
			})
	},

	reLaunchCharm: function(){
		// 재구동
	},

	// 데이터 확인
	dataCharm: function(){
		var str = '';
		for (var i=0; i<10; i++){
			str += '<section>'
			str += '	<h2>Global</h2>'
			str += '	<dl>'
			str += '		<dt>storage</dt>'
			str += '		<dd>'
			str += '			<span>chart</span>'
			str += '			<span><input type="text"></span>'
			str += '		</dd>'
			str += '		<dd>'
			str += '			<span>chart</span>'
			str += '			<span><input type="text"></span>'
			str += '		</dd>'
			str += '	</dl>'
			str += '	<dl>'
			str += '		<dt>storage</dt>'
			str += '		<dd>'
			str += '			<span title="mychartstoragesection">mychartstoragesection</span>'
			str += '			<span><input type="text"></span>'
			str += '		</dd>'
			str += '		<dd>'
			str += '			<span>chart</span>'
			str += '			<span><input type="text"></span>'
			str += '		</dd>'
			str += '	</dl>'
			str += '</section>'
		}
		
		M('#charm h1')
			.text('데이터 확인')
			.parent()
			.find('.content').html(str)
	},

	// 가상데이터
	virtualCharm: function(){
		var str = '';
		
		str += '<section>'
		str += '	<dl>'
		str += '		<dt></dt>'
		str += '		<dd>'
		str += '			<span>callback</span>'
		str += '			<span><input type="text"></span>'
		str += '		</dd>'
		str += '		<dd>'
		str += '			<span>trCode</span>'
		str += '			<span><input type="text"></span>'
		str += '		</dd>'
		str += '		<dd>'
		str += '			<span>tagId</span>'
		str += '			<span><input type="text"></span>'
		str += '		</dd>'
		str += '		<dd>'
		str += '			<textarea></textarea>';
		str += '		</dd>'
		str += '		<dd>'
		str += '			<button>전송</button>';
		str += '		</dd>'
		str += '	</dl>'
		str += '</section>'
		str += '<section>'
		str += '	<dl>'
		str += '		<dt>10012</dt>'
		str += '		<dt>10012</dt>'
		str += '	</dl>'
		str += '</section>'
		
		M('#charm h1')
			.text('가상데이터')
			.parent()
			.find('.content').html(str)
	},

	distributeCharm: function(){
		// 배포모드
	},

	// 설정
	settingCharm: function(){
		var str = '';
		
		str += '<section>'
		str += '	<dl>'
		str += '		<dt>초기환</dt>'
		str += '		<dd>'
		str += '			<span>프로젝트 초기화</span>'
		str += '		</dd>'
		str += '		<dd>'
		str += '			<span>storage 초기화</span>'
		str += '		</dd>'
		str += '		<dd>'
		str += '			<span>앱 재구동</span>'
		str += '		</dd>'
		str += '	</dl>'
		str += '	<dl>'
		str += '		<dt>설정</dt>'
		str += '		<dd>'
		str += '			<span>해상도</span>'
		str += '			<span><input type="text" style="width:50px"> * <input type="text" style="width:50px"></span>'
		str += '		</dd>'
		str += '		<dd>'
		str += '			<span>화면전환 속도</span>'
		str += '			<span><input type="text"></span>'
		str += '		</dd>'
		str += '	</dl>'
		str += '</section>'
		str += '<section>'
		str += '	<dl>'
		str += '		<dd>'
		str += '			<button>프레임웍 다운로드</button>';
		str += '		</dd>'
		str += '	</dl>'
		str += '</section>'
		
		M('#charm h1')
			.text('설정')
			.parent()
			.find('.content').html(str)
	}
}



