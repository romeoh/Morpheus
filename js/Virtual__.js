
(function(){

var Virtual = function(){
	// 히스토리 스택
	this.stack = 0;
	
	// 프로젝트 경로
	this.path;
	
	// app width, height
	this.width;
	this.height;

	// AppManifest.xml 값
	this.manifest = {}
}

Virtual.prototype = {
	// 초기화
	init: function(){
		// app width, height 초기화 설정
		this.setWidth( app.global('width') )
		this.setHeight( app.global('height') )
	},

	// 앱 최초 구동
	launch: function(){
		this.init()
		this.move()
		console.dir(this)
	},

	testAppManifestFile: function(url){
		M.ajax({
			 'url': url
			,'success': function(text){
				return true;
			}
			,'error': function(){
				return false;
			}

		})
	},

	getAppManifestFile: function(url){
		M.ajax({
			 'url': url
			,'success': function(text){
				console.log(url)
				if (text != '') {
					
					app.global('projectPath', url);
					navi.pop('프로젝트 경로가 세팅되었습니다.');
					virtual.setProjectPath(path);
					virtual.appmanifestXmlParser(text);
				}
			}
			,'error': function(){
				app.global('projectPath', '');
				M('#pPath').val('');
				navi.pop('프로젝트 경로가 올바르지 않습니다.');
			}

		})
	},

	// AppManifest.xml parser
	appmanifestXmlParser: function(xml){
		console.log(xml)
		root = new DOMParser().parseFromString(xml, "text/xml").firstChild;
		this.getManifestValue('default-version');
		this.getManifestValue('logging');
		this.getManifestValue('using-ext-storage');
		this.getManifestValue('security');
		this.getManifestValue('default-orientation-mode');
		this.getManifestValue('resource-update-mode');
		this.getManifestValue('start-page');
		this.getManifestValue('controller');
		this.getManifestValue('extend-wninterface');
		this.getManifestValue('network-setting');
		this.getManifestValue('show-screen-switching-indicator');

		// 삭제된 어트리뷰트
		this.getManifestValue('master-orientation-mode');
		this.getManifestValue('startpage-name');

		//console.log(root)this.manifest.version
		console.log(this.manifest)
		//console.log(root)
	},

	getManifestValue: function(value){
		if (value == 'start-page') {
			this.manifest['start-page'] = {
				 'page-name': root.getElementsByTagName(value)[0].getElementsByTagName('page-name')[0].textContent
				,'page-mode': root.getElementsByTagName(value)[0].getElementsByTagName('page-mode')[0].textContent
			}
			return;
		}
		if (value == 'network-setting') {
			return;
		}
		if (root.getElementsByTagName(value).length > 0) {
			this.manifest[value] = root.getElementsByTagName(value)[0].textContent;
		}	
	},

	// 프로젝트 경로설정
	setProjectPath: function(path){
		this.path = path;
	},

	// app width 설정
	setWidth: function(width){
		this.width = width;
	},

	// app height 설정
	setHeight: function(height){
		this.height = height;
	},

	// 화면이동
	move: function(url, param, actionType, animationType, orientation){
		this.createView(url)
	},

	// 뷰생성
	createView: function(url){
		M('#mpWrap').append('iframe', {
			 'id': 'view'+this.stack
			,'src': this.path
		})

		M('#view'+this.stack)
			.css('width', this.width + 'px')
			.css('height', this.height + 'px')
	}

}

window.Virtual = Virtual;
})()
//console.log(app)


WNMoveToHtmlPage = function(url, param, actionType, animationType, orientation) {
	virtual.move(url, param, actionType, animationType, orientation)
}