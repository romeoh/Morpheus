
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
		return status
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
		this.createView(app.setGlobal('startPage'))
	},

	createView: function(page){
		var  appWidth, appHeight
			,appPosX, appPosY

		if (app.global['mode'] == 'DEV') {
			appWidth = app.global['appWidth']
			appHeight = app.global['appHeight']
			appPosX = app.global['posX']
			appPosY = app.global['posY']
		} else {
			appWidth = app.global['screenWidth']
			appHeight = app.global['screenHeight']
			appPosX = 0
			appPosY = 0
		}
		
		M('#mpWrap')
			.append('iframe', {
				 'src': app.global['projectPath'] + 'www/html/' + page
				,'id': 'view' + this.stack
			})
			.css('width', appWidth + 'px')
			.css('height', appHeight + 'px')
			.css('top', appPosX + 'px')
			.css('left', appPosY + 'px')

		M('#view'+this.stack)
			.css('width', appWidth + 'px')
			.css('height', appHeight + 'px')
			

	}
}

window.Virtual = Virtual;
})(window)



WNMoveToHtmlPage = function(url, param, actionType, animationType, orientation) {
	virtual.move(url, param, actionType, animationType, orientation)
}
































