var  virtual
	,navi
	,app

(function(window){


var App = function() {
	/* 전역객체: app이 구동하기 위하여 필요한 전역객체를 저장한다.
	 * global.startPage: 시작페이지
	 * global.projectPath: 프로젝트 Path
	 * global.appWidth, global.appHeight : 앱 가로세로 
	 * global.screenWidth, global.screenHeight : 브라우저 가로세로 
	 * global.posX, global.posY : 앱 구동 위치 x, y값  
	 * global.info: (PAGE, WATCH) info창에 페이지 스택표기, 시계 표기 
	 * global.mode: (DEV, REAL) 개발모드 / 배포모드
	 */
	this.global = {}

	// 전역저장객체: storage에 저장할 데이터
	this.storage = {}

	this.initData();
	this.initApp();
}
 
App.prototype = {
	
	// 데이터 초기화
	initData: function(){
		this.global['startPage'] = this.setGlobal('startPage') || '';
		this.global['projectPath'] = this.setGlobal('projectPath') || '';
		this.global['appWidth'] = this.setGlobal('appWidth') || 320;
		this.global['appHeight'] = this.setGlobal('appHeight') || 480;
		this.global['screenWidth'] = M.screen().width;
		this.global['screenHeight'] = M.screen().height;
		this.global['posY'] = this.setGlobal('posY') || this.global['screenWidth']/2 - this.global['appWidth']/2;
		this.global['posX'] = this.setGlobal('posX') || this.global['screenHeight']/2 - this.global['appHeight']/2;
		this.global['info'] = this.setGlobal('info') || 'PAGE';
		this.global['mode'] = this.setGlobal('mode') || 'DEV';

		M('#pPath').val( this.global['projectPath'] )
	},

	// 앱 구동 초기화 : 
	// 1. Virtual, Charmbar객체 생성
	// 2. appManifest.xml이 설정되어 있으면 virtual로 보내 파싱한다.
	// 3. start-page를 추출한후 대기한다.
	initApp: function(){
		var that = this;

		virtual = new Virtual();
		navi = new Charmbar()

		// appManifest.xml 파싱
		if ( M('#pPath').val() != '' ) {
			virtual.appmanifestParser( M('#pPath').val() );
		}

		// start-page 추출
		this.getStartPage(virtual.getAppManifest())

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

		// 앱구동
		M('#btnLaunch').on('click', function(evt, mp){
			if (M('#pPath').val() != '') {
				virtual.launch();
			} else {
				navi.pop('프로젝트 경로가 설정되지 않았습니다.');
			}
		})

		// 프로젝트 경로 설정
		M('#pPath').on('change', function(evt, mp){
			if (mp.val() == '') {
				navi.pop('프로젝트 경로가 삭제되었습니다.');
				app.setGlobal('projectPath', '');
				app.setGlobal('startPage', '');
				return;
			}
			// AppManifest.xml 경로가 올바른지 검사
			if ( virtual.testAppmanifest(mp.val()) ) {
				navi.pop('프로젝트 경로가 올바르게 설정되었습니다.');
				// project path 설정
				app.setGlobal('projectPath', mp.val());
				// appmanifest.xml파싱
				virtual.appmanifestParser( M('#pPath').val() );
				// 스타트 페이지 추출
				app.getStartPage(virtual.getAppManifest())
			} else {
				navi.pop('프로젝트 경로가 올바르지 않습니다.');
			}
		})

		// view derag 핸들러
		M('#viewHandler')
			.on('mouseover', function(evt, mp){
				mp.animate({
					'opacity': '1'
					,'time': '0.5s'
				})
			})
			.on('mouseout', function(evt, mp){
				mp.animate({
					'opacity': '0'
					,'time': '0.5s'
				})
			})
		M('#mpWrap').drag({
			 'handler': '#viewHandler'
			,'onEnd': function(evt, mp){
				
			}
		})
	},

	// virtual.getAppmanifest 객체에서 startpage를 추출한다.
	getStartPage: function(appmanifest){
		if (appmanifest['start-page'] == undefined) {
			return this.setGlobal('startPage', appmanifest['startpage-name']);
		}
		this.setGlobal('startPage', appmanifest['start-page']['page-name']);
	},

	// app.global객체 setter/getter
	setGlobal: function(key, value){
		var data = localStorage.getItem('kr.morpheus.global', this.global);
		if (key == undefined) {
			return M.json(data);
		}
		if (value == undefined) {
			return M.json(data)[key];
		}
		this.global[key] = value;
		localStorage.setItem('kr.morpheus.global', M.json(this.global));
	}
}




window.addEventListener("load", function(){
	app = new App();
}, false);


})(window)




















