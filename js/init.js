function init () {
    console.log('The DOM is ready!');
	document.addEventListener('mousemove', onMouseMove, false);
	
	var options = {
	
	};
	r = new Root_Controller();
	r.startGame(options);
	r.game.map.seedTilesRandom(8,8);
	
	//r.render();
	r.last_minute = new Date();
	r.last_total = 0;
	//r.draw();
	r.runGameLoop(0, new Date());
	
	////load variables from HTML5 storage
	//S = new Settings();
	//r.game.map = new Map();
	//Z = new Zoom();
	//UI = new UsetInterface();
	
	//r.game.map.seedTilesRandom(8,8); 
	//RENDER ();
	
	
}
function RENDER (){
	console.log ('dont call global::RENDER()');
	return false;
	
	var style = {
		'width' : window.innerWidth+'px',
		'height' : window.innerHeight+'px'
	};
	$$('body').setStyles(style);
	//$$('section').setStyles(style);
	r.game.map.render();
}