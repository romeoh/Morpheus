var  app
	,virtual;

(function(window){

var  navi
	,path
,App = function() {
	this.init();
}
 
App.prototype = {
	init: function(){
		navi = new Charmbar();
		virtual = new Virtual();
		this._initGlobalData();
		this._initUI();
		
		M('#mpWrap')
			.css('x', this.global('posX')+'px')
			//.css('top', this.global('posY')+'px')
			//.css('scale', '0.1')
			
			/*.animate({
				 'scale': '1'
				,'time':'1.5s'
			})*/
//this.testProjectPath('file:///Users/brianpaek/Documents/workspace/MorpheusExtendSample/res/')
	},

	// 글로벌 데이터 초기화
	_initGlobalData: function(){
		if (gData === 'null') {
			gData = {};
		}

		/* info: systemInfo에 시계 또는 페이지명을 표시한다.
		 * PAGE : page정보
		 * SWATCH : 시계표시
		 */
		if (gData.info === undefined) {
			gData.info = 'PAGE';
		}

		/* mode : app 구동모드 결정
		 * DEV : 개발모드
		 * REAL : 배포모드
		 */
		if (gData.mode === undefined) {
			gData.mode = 'DEV';
		}

		// projectPath : 디폴트 프로젝트 path
		if (gData.projectPath === undefined) {
			gData.projectPath = '';
		} else {
			M('#pPath').val(gData.projectPath)
		}

		//projectPath : 디폴트 프로젝트 path
		if (gData.stack === undefined) {
			gData.stack = [];
		}

		// app width
		if (gData.width === undefined) {
			gData.width = '320';
		}
		// app height
		if (gData.height === undefined) {
			gData.height = '480';
		}
		// app position x
		if (gData.posX === undefined) {
			gData.posX = M.screen().width/2 - 320/2;
		}
		// app position y
		if (gData.posY === undefined) {
			gData.posY = M.screen().height/2 - 480/2;
		}

		localStorage.setItem('kr.morpheus.global', M.json(gData));
	},

	_initUI: function(){
		var that = this
		// 참바 보기
		M('#anchor').on('mouseover', function(){
			naviTimeoutId = setTimeout(function(){
				navi.show();
			}, 500);
			
		})
		M('#anchor').on('mouseout', function(){
			if (naviTimeoutId) {
				clearTimeout(naviTimeoutId);
			}
		})

		// 프로젝트 경로 재설정
		M('#pPath')
			.on('change', function(evt, mp){
				that.setProject.call(that, mp)
			})

		// 프로젝트 경로 세팅
		if (M('#pPath').val() !== ''){
			path = M('#pPath').val() + 'www/AppManifest.xml'
			console.log(virtual.testAppManifestFile(path))
			//virtual.getAppManifestFile(path);
		}

		// 앱구동
		M('#btnLaunch').on('click', function(){
			if (app.global('projectPath') === ''){
				navi.pop('프로젝트 경로가 설정되지 않아 구동할수 없습니다.')
				return;
			}
			M('#projectPath').css('display', 'none');
			M('#help').animate({
				 'bottom': '-240px'
				,'time': '0.5s'
			})
			virtual.launch();
		})
	},

	setProject: function(mp){
		//console.log(this)
		this.testProjectPath(mp.val());
	},

	testProjectPath: function(respath){
		//	file:///Users/brianpaek/Documents/workspace/DY_MOBILE_iOS/res/
		//	www/AppManifest.xml
		//var xmlPath = respath + 'AppManifest.xml'
		//path = respath + 'www/';
		

	},


	/*
	 * public Method
	 */
	// 글로벌 데이터 setter / getter
	global: function(key, value){
		// getter
		if (!key) {
			return M.json(localStorage.getItem('kr.morpheus.global'));
		}

		// getter
		if (!value) {
			return M.json(localStorage.getItem('kr.morpheus.global'))[key];
		}

		// setter
		gData[key] = value
		localStorage.setItem('kr.morpheus.global', M.json(gData));
	},
}




window.addEventListener("load", function(){
	app = new App();
}, false);

//window.addEventListener("resize", resize, false);

//window.App = App;
})(window)




















