
(function(window){

var  swatchIntervalId
	,appWidth = M.screen().width
	,gData = M.json(localStorage.getItem('kr.morpheus.global'))

,Charmbar = function(){
	// 토스트 팝업 아이디 index
	this.popId = 0;
}

Charmbar.prototype = {
	
	// 우측상단에 마우스를 올리면 참바가 활성화 된다.
	show: function(){
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
					that.showSubCharm(mp);
				})
				.on('mouseover', function(evt, mp){
					that.showBack();
				})
		}
		
		// 마우스 움직임을 감지해서 참바를 비활성화 시킨다.
		M('body').on('mousemove', function(evt){
			that.traceMousePosX(evt);
		});
	},

	// 참바 배경 활성화
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

		// 시계창 활성화
		M('#systemInfo')
			.css('display', 'block')
			.animate({
				 'opacity': '1'
				,'time': '.3s'
			}, function(evt, mp){
				mp.css('display', 'block')
			})
		
		// system info표시
		if (app.global('info') == 'PAGE') {

		} else if (app.global('info') == 'SWATCH') {
			that.swatch();
			swatchIntervalId = setInterval(function(){
				that.swatch();
			}, 1000)
		}
		M('.menuBack').on('click', function(){
			if (app.global('info') == 'PAGE') {
				app.global('info', 'SWATCH');
			} else if (app.global('info') == 'SWATCH') {
				app.global('info', 'PAGE');
			}
		})
	},

	// 마우스 위치 추적해서 참바영역을 벗어나면 참바 비활성화
	traceMousePosX: function(evt){
		var that = this
		if (evt.pageX <= appWidth - 100) {
			this.hideIcons()
		}
	},

	// 시계작동
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

	// 참바와 참바배경을 비활성화한다.
	hideIcons: function(argument){
		clearInterval(swatchIntervalId);
		swatchIntervalId = null;

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

	// 메인참바에서 아이콘을 선택하면 하부참바를 활성화한다.
	showSubCharm: function(mp){
		var that = this
			idx = mp.data('navi').substr(4)
		
		that.hideIcons();
		switch(idx) {
			
			// 재구동
			case '0':
				that.hideSubCharm(2);
				that.reLaunchCharm();
			break;

			// 데이터 확인
			case '1':
				that.openCharm(2);
				that.dataCharm();
			break;

			// 가상데이터
			case '2':
				that.openCharm(3);
				that.virtualCharm();
			break;

			// 배포모드
			case '3':
				that.hideSubCharm(2);
				that.distributeCharm();
			break;

			// 설정
			case '4':
				that.openCharm(5);
				that.settingCharm();
			break;
		}
	},

	// 하부참바를 활성화한다.
	openCharm: function(idx){
		var that = this;

		that.resetSubCharm()
		setTimeout(function(){
			M('#subCharm')
				.addClass('theme'+idx)
				.animate({
					 'right': '0px'
					,'time': '.3s'
				})
				.first()
				.on('click', function(){
					that.hideSubCharm();
				})
		}, 10)
	},

	// 하부참바 초기화
	resetSubCharm: function(){
		M('#subCharm')
			.removeAttr('class')
			.css('right', '-330px')
			.find('.content').html('')
	},

	// 하부참바를 비활성화한다.
	hideSubCharm: function(){
		M('#subCharm')
			.animate({
				 'right': '-330px'
				,'time': '.3s'
			}, function(evt, mp){
				mp.removeAttr('class')
			})
	},

	// 하부참바 : 재구동
	reLaunchCharm: function(){
		// 재구동
	},

	// 하부참바 : 데이터 확인 DOM 파싱
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
		
		M('#subCharm h1')
			.text('데이터 확인')
			.parent()
			.find('.content').html(str)
	},

	// 하부참바 : 가상데이터 DOM 파싱
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
		
		M('#subCharm h1')
			.text('가상데이터')
			.parent()
			.find('.content').html(str)
	},

	// 하부참바 : 배포모드
	distributeCharm: function(){
		// 배포모드
	},

	// 하부참바 : 설정 DOM 파싱
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
		
		M('#subCharm h1')
			.text('설정')
			.parent()
			.find('.content').html(str)
	},

	// 토스트 팝업
	pop: function(msg, time){
		M('#component').append('div', {
			 'className': 'pop'
			,'id': 'pop'+this.popId
		})
		M('#pop'+this.popId)
			.html(msg)
			.animate({
				 'opacity': '0.8'
				,'time': '0.6s'
			})
			.on('click', function(evt, mp){
				mp.animate({
					 'left': '-230px'
					,'time': '0.7s'
				}, function(evt, mp){
					mp.remove();
				})
			})

		setTimeout(function(id){
			if (M('#pop'+id).selector.length == 0) {
				return
			}
			M('#pop'+id).animate({
				 'left': '-230px'
				,'time': '0.7s'
			}, function(evt, mp){
				mp.remove();
			})
		}, time | 3000, this.popId)
		this.popId++;
	}
}

window.Charmbar = Charmbar;
window.gData = gData;
})(window)

