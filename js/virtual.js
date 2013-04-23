
(function(window){

var Virtual = function(){
	this.stack = 0
	this.appManifest = {}
}

Virtual.prototype = {
	// AppManifest.xml파서: AppManifest.xml파일을 읽어와서 Virtual.appManifest객체에 저장한다.
	appmanifestParser: function(url){
		var  that = this
			,root
			,xmlPath = url + 'www/AppManifest.xml'
		
		M.ajax({
			 'url': xmlPath
			,'success': function(text){
				if (text != '') {
					root = new DOMParser().parseFromString(text, "text/xml").firstChild;
					
					if (root.getElementsByTagName('default-version').length > 0) {
						that.appManifest['default-version'] = root.getElementsByTagName('default-version')[0].textContent;
					}
					if (root.getElementsByTagName('logging').length > 0) {
						that.appManifest['logging'] = root.getElementsByTagName('logging')[0].textContent;
					}
					if (root.getElementsByTagName('using-ext-storage').length > 0) {
						that.appManifest['using-ext-storage'] = root.getElementsByTagName('using-ext-storage')[0].textContent;
					}
					if (root.getElementsByTagName('security').length > 0) {
						that.appManifest['security'] = root.getElementsByTagName('security')[0].textContent;
					}
					if (root.getElementsByTagName('default-orientation-mode').length > 0) {
						that.appManifest['default-orientation-mode'] = root.getElementsByTagName('default-orientation-mode')[0].textContent;
					}
					if (root.getElementsByTagName('start-page').length > 0) {
						that.appManifest['start-page'] = {
							 'page-name': root.getElementsByTagName('start-page')[0].getElementsByTagName('page-name')[0].textContent
							,'page-mode': root.getElementsByTagName('start-page')[0].getElementsByTagName('page-mode')[0].textContent
						}
					}
					if (root.getElementsByTagName('controller').length > 0) {
						that.appManifest['controller'] = root.getElementsByTagName('controller')[0].textContent;
					}
					if (root.getElementsByTagName('extend-wninterface').length > 0) {
						that.appManifest['extend-wninterface'] = root.getElementsByTagName('extend-wninterface')[0].textContent;
					}
					if (root.getElementsByTagName('network-setting').length > 0) {
						// network setting
					}
					if (root.getElementsByTagName('show-screen-switching-indicator').length > 0) {
						that.appManifest['show-screen-switching-indicator'] = root.getElementsByTagName('show-screen-switching-indicator')[0].textContent;
					}

					// 삭제된 attribute
					if (root.getElementsByTagName('master-orientation-mode').length > 0) {
						that.appManifest['master-orientation-mode'] = root.getElementsByTagName('master-orientation-mode')[0].textContent;
					}
					if (root.getElementsByTagName('startpage-name').length > 0) {
						that.appManifest['startpage-name'] = root.getElementsByTagName('startpage-name')[0].textContent;
					}
				}
			}
			,'error': function(){
				M('#pPath').val('');
				navi.pop('프로젝트 경로가 올바르지 않습니다.');
			}
		})
	},

	// virtual.appManifest객체를 반환한다.
	getAppManifest: function(){
		return this.appManifest;
	},

	testAppmanifest: function(url){
		var  xmlPath = url + 'www/AppManifest.xml'
			,status = false

		M.ajax({
			 'url': xmlPath
			,'async': false
			,'success': function(text){
				if (text != '') {
					return status = true;
				}
			}
			,'error': function(){
				//console.log('b')
			}
		})
		return status;
	},

	// 앱 구동
	launch: function(){
		// project 경로 설정창 숨기기
		M('#projectPath').animate({
			 opacity: 0
			,time: '0.4s'
		}, function(evt, mp){
			mp.remove();
		})
		// help 숨기기
		M('#help').animate({
			bottom: '-240px'
		})
		this.createView(app.setGlobal('startPage'));
	},

	// 화면생성
	createView: function(url, param, action, animation, orientation){
		var  appWidth, appHeight
			,appPosX, appPosY
			,stack

		// 개발모드일경우
		if (app.global['mode'] == 'DEV') {
			appWidth = app.global['appWidth'];
			appHeight = app.global['appHeight'];
			appPosX = app.global['posX'];
			appPosY = app.global['posY'];
		
		// 배포모드일 경우
		} else {
			appWidth = app.global['screenWidth'];
			appHeight = app.global['screenHeight'];
			appPosX = 0;
			appPosY = 0;
		}
		
		// wrapper 설정
		M('#mpWrap')
			.append('iframe', {
				 'src': app.global['projectPath'] + 'www/html/' + url
				,'id': 'view' + this.stack
			})
			.css('width', appWidth + 'px')
			.css('height', appHeight + 'px')
			.css('top', appPosX + 'px')
			.css('left', appPosY + 'px')

		// 화면설정
		M('#view'+this.stack)
			.css('width', appWidth + 'px')
			.css('height', appHeight + 'px')
			.css('top', this.getTopPosNewView(animation) + 'px')
			.css('left', this.getLeftPosNewView(animation) + 'px')
		
		// 스택관리
		stack = app.setGlobal('stack') || {}
		stack[url] = {
			 'name': url
			,'param': param || ''
			,'action': action || 'NEW_SCR'
			,'animation': animation || 'DEFAULT'
			,'orientation': orientation || 'DEFAULT'
		}
		app.setGlobal('stack', stack);
		
		// 스택카운트 관리
		app.setGlobal('stackCount', this.stack);
		this.initInterface(document.getElementById('view'+this.stack).contentWindow);
		
		this.stack++;
	},


	// 새로 생성하는 화면의 x, y 좌표값
	getTopPosNewView: function(animation) {
		switch (animation) {
		case undefined: 
		case 'NONE':
		case 'DEFAULT': 
		case 'SLIDE_LEFT': 
		case 'SLIDE_RIGHT':
		case 'ZOOM_IN':
		case 'ZOOM_OUT':
		case 'FADE':
			return 0;
			break;
		
		case 'SLIDE_TOP':
		case 'MODAL_UP':
			return app.global['appHeight'];
		
		case 'SLIDE_BOTTOM':
		case 'MODAL_DOWN':
			return -1 * app.global['appHeight'];
			break;
		}
	},
	getLeftPosNewView: function(animation) {
		switch (animation) {
		case undefined: 
		case 'NONE': 
		case 'ZOOM_IN': 
		case 'ZOOM_OUT': 
		case 'FADE':
		case 'MODAL_UP':
		case 'MODAL_DOWN':
			return 0;
			break;
		
		case 'DEFAULT': 
		case 'SLIDE_LEFT': 
		case 'MODAL_LEFT':
			return app.global['appWidth'];
			break;
		
		case 'SLIDE_RIGHT': 
		case 'MODAL_RIGHT':
			return -1 * app.global['appWidth'];
			break;
		}

	},

	move: function(url, param, actionType, animationType, orientation){
		this.createView(url, param, actionType, animationType, orientation);
		for (var i=0, length = app.setGlobal('stackCount'); i<length; i++) {
			console.log(i)
		}
		console.log(app.setGlobal('stackCount'))
		//M('#view'+this.stack)
	},


	/*
	 * 화면에 WNInterface 함수를 override함
	 */
	initInterface: function(view) {
		var that = this;
		view.prompt = function(str){
			if (str == '66QO7ZS87JA07IQK') {
				// 화면이동
				view.WNMoveToHtmlPage = function(url, param, actionType, animationType, orientation){
					that.move(url, param, actionType, animationType, orientation);
				}
			}
			return '';
		}
	}
}

window.Virtual = Virtual;
})(window)















































