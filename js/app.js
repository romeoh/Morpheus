window.addEventListener("load", main, false);
window.addEventListener("resize", resize, false);

function main() {
	init();
	getProjectPath();
	getPolicy();
	initUI();
}
function resize(){
	var  w = window
	
	w.appWidth = M.screen().width;
}

// 브라우저 상태 체크
function init(){
	var  w = window
		,launcher = new Launcher();
		
	// 전역변수 설정
	if (!w.morpheus) {	
		w.morpheus = {};
	}
	w.appWidth = M.screen().width;

	// 전역 저장소 설정
	if (!M.storage('kr.morpheus')) {
		M.storage('kr.morpheus', '{}');
	}

	// project path 체크
	if (!M.json(M.storage('kr.morpheus')).projectPath) {
		console.log('projectpath 없음')
	}
	w.morpheus.project = M.json(M.storage('kr.morpheus')).projectPath;
	//console.log(w.morpheus.project)
}

// 브라우저 상태 체크
function getProjectPath(){
	M.storage('kr.morpheus');
}

// 브라우저 상태 체크
function getPolicy(){
	//console.log(M)
}

// UI
function initUI(){
	var  w = window
		,naviTimeoutId
		,navi
	
	// 참바 보기
	M('#anchor').on('mouseover', function(){
		naviTimeoutId = setTimeout(function(){
			navi = new Charmbar();
		}, 500);
		
	})
	M('#anchor').on('mouseout', function(){
		if (naviTimeoutId) {
			clearTimeout(naviTimeoutId);
		}
	})
}














