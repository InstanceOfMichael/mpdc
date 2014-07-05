var Zoom_UI = new Class({
	Implements: [Events, GetSet],
	initializeDefaults: function (options){
	},
	jump: function(x,y,z){
		r.game.settings.pan_x += x;
		r.game.settings.pan_y += y;
		if (typeof z === 'undefined'){
			z=1;
		} else if (r.game.settings.zoom * z < 0.25 || r.game.settings.zoom * z > 2.00){
			z=1;
		}
		r.game.settings *= z || 1;
		//RENDER();
	},
	pan: function(keys){
		if (!keys.time) {
			this.jump(keys.x,keys.y,keys.z);
		}
		if (Math.abs(keys.x) > Math.abs(keys.y)){
			keys.until = Math.abs(keys.x);
		} else {
			keys.until = Math.abs(keys.y);
		}
		if (keys.until > 20 * keys.time){
			keys.until = 20 * keys.time;
		}
		keys.time *= 1000;	//expect seconds as input
		keys.time /= keys.until;
		keys.x /= keys.until;
		keys.z /= keys.until;
		keys.y /= keys.until;
			
		panRecursion(keys);
	},
	increase: function(z){
		var Z = r.game.settings.zoom;
		if (Z * z < 0.25 || Z * z > 2.00){
			return false;
		}
		r.game.settings.zoom *= z;
		
		//console.log(Z);
		//console.log(r.game.settings.zoom);
		//RENDER();
	},
	render: function(){
		if ($$('article#game section.ui menu.zoom').length == 0){
			$$('article#game section.ui').adopt(new Element("menu",{class: 'zoom',text:null}));
			$$('article#game section.ui menu.zoom').adopt(new Element("ul",{class: 'zoom',text:null}));
			var ul = 'article#game section.ui menu.zoom ul';
			$$(ul).adopt(new Element("li",{'onclick': 'r.game.ui.zoom.increase(1.25);',text:'Zoom In'}));
			$$(ul).adopt(new Element("li",{'onclick': 'r.game.ui.zoom.increase(0.80);',text:'Zoom Out'}));
		}
	}
});
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
function panRecursion(keys){
	//console.log("entered panRecursion: until="+keys.until);
	console.log(keys.time);
	keys.until--;
	
	//console.log(fn);
	Z.jump(keys.x,keys.y,keys.z);
	
	if (keys.until > 0){
		window.setTimeout(
			function(){
				panRecursion(keys);
			},
			keys.time
		);
	}
}


