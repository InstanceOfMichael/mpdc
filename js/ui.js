var User_Interface = new Class({
	Implements: [Events, GetSet],
	initializeDefaults: function (options){
		this.zoom = new Zoom_UI(options);
		//document.getElementById('game').addEventListener('click', this.input, false);
		//document.getElementById('game').addEventListener('mousedown', this.input, false);
		//	http://css.dzone.com/articles/all-mouse-events-javascript
		//document.getElementById('game').addEventListener('mousedown', this.input, false);
		document.addEventListener('mousedown', this.input, false);
		window.addEventListener('keydown', this.input, false);
		//this.ui.city_planner = new City_Planner_UI(options));
	},
	input : function (e) {
		console.log('r.ui.input(e);');
		console.log(e);
		return true;
		
		// When a click is detected, translate the mouse coordinates to pixel coordinates
		var row = Math.floor((e.clientX + scroll.x) / tile.width);
		var column = Math.floor((e.clientY + scroll.y) / tile.height);

		if (tileMap[row] == null) {
			tileMap[row] = [];
		}
		tileMap[row][column] = 1;
	},
	draw: function(){
	
	
		return true;
	},
	render: function(){
		//lets make this
		if ($$('article#game section.ui').length == 0){
			//$$('article#game').adopt(new Element("section",{class: 'ui',text:null}));
		}
		
		//lets build the children
		if (this.zoom){
			this.zoom.render();
		}
		if (this.city_planner){
			this.city_planner.render();
		}
	
	},
	keys : {
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39
	},
	push: function (i){
		//	i = new Interface Element
		return this.interface_elements.push(i);
	},
	
	destroy: function(){
		$$('article#game section.ui').dispose();
		delete this;
	}
	
});
var MOUSE = {
	'x':0,
	'y':0,
	'getX':function(){return this.x;},
	'getY':function(){return this.y;}
};

document.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(e){
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;
	
	//console.log('mouse: ('+MOUSE.x+','+MOUSE.y+')');
}
/*
			<section class="ui">
				<menu class="zoom">
					<ul>
						<li onclick="Z.increase(1.25);">Zoom In</li>
						<li onclick="Z.increase(0.80);">Zoom Out</li>
					</ul>
				</menu>
			</section>
*/