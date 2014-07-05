var Map = new Class({
	Implements: [Events, GetSet],
	initializeDefaults: function (){
		this.tiles = [];
		this.sprites = {};
	},
	selectTile: function(i){
		$$('.selected').removeClass('selected');
		if (typeof this.tiles[i] === 'undefined'){
			//general unselect
			
		}
		else
		{
			this.tiles[i].selectTile();
		}
	},
	/*
	getSprite: function (name){
		if (typeof this.sprites[name]==='undefined'){
			switch (name){
				case 'plains':
					break;
					
				default:
			}
		}		
		return this.sprites[name];
	},
	//*/
	draw: function(c){
		//console.log('map.draw();');
		var a = this.tiles;
		var big_z = (this.radius_x+this.radius_y);
		for (var z = -1*big_z; z < big_z; z++)
		{
			for (key in a) {
				if (a.hasOwnProperty(key)) {
					if (a[key].getZIndex()==z)
					{
						a[key].draw(c);
					}
				} else {

				}
			}
		}
		return true;
		
		
		var a = this.tiles;
		for (var x = this.radius_x*1; x+1 > -1*this.radius_x; x--){
			for (var y = this.radius_y*1; y+1 > -1*this.radius_y; y--){
				var key = mapIndex(x,y);
				if (a.hasOwnProperty(key)) {
					a[key].draw(c);
				} else {
					console.log('nope ('+key+')');
				}
			}
		}
		return true;
	},
	render: function(){
		//	create section.map if we need to
		if ($$('article#game section.map').length == 0){
			
			$$('article#game').adopt(new Element("section",{class: 'map',text:null}));
			
			
			$$('article#game section.map').addEvent("mousedown", function(e){
				return false;
				console.log(e);
				mySwipeHandler();
				//console.log($map);
				
				var ref = arguments.callee;
				var handle = $(this);
				var start = {
					x : e.page.x,
					y : e.page.y
				};
				var zoom = r.game.settings.zoom;
				console.log(start);
				handle.removeEvent("mousedown", ref);
				handle.addEvent("mouseup", function(e){
					handle.removeEvent("mouseup", arguments.callee);
					handle.addEvent("mousedown", ref);
					var end = {
						x : e.page.x,
						y : e.page.y
					};
					console.log(end);
					var d = {
						x : end.x - start.x,
						y : end.y - start.y
					};
					
					if (	Math.abs(d.x) < 0.0025 * window.getSize().x
						&&	Math.abs(d.y) < 0.0025 * window.getSize().y
					){
						//did the mouse stay still? (select)
						
						//which mouse button?
						var mb = e.event.which || e.event.button || 1;
						
						if (mb == 1) {
							var t = e.target;
							
							if (!t.hasClass('tile')){
								t = t.parentElement;
								if (!t.hasClass('tile')){
									t = t.parentElement;
								}
							}
							r.game.map.selectTile(t.dataset.index);						
						}
						else if (mb == 3)
						{
							d.x = (0.5 * window.getSize().x - end.x) / zoom;
							d.y = (0.5 * window.getSize().y - end.y) / zoom;
							console.log(d);
							r.game.ui.zoom.jump(d.x, d.y, 0);
							e.preventDefault();
							return false;
						}
						else
						{
							console.log('no case for mouse button: '+mb);
						}
						
						
						
						/*
						//	this is actually code for right click
						
						d.x = 0.5 * window.getSize().x - end.x;
						d.y = 0.5 * window.getSize().y - end.y;
						console.log(d);
						Z.jump(d.x, d.y, 0);
						//*/
					}
					else
					{
						//the mouse moved (swype)
						r.game.ui.zoom.jump(d.x,d.y,0);
					}
					
					e.preventDefault();
					return false;
				});
				/*
				handle.addEvent("rightclick", function(e){
					console.log(e);
				});
				*/
			});	
			
		}
		
		
		var a = this.tiles;
		for (var x = -this.radius_x; x < this.radius_x + 1; x++){
			for (var x = -this.radius_x; x < this.radius_x + 1; x++){
				var key = mapIndex(x,y);
				if (a.hasOwnProperty(key)) {
					a[key].draw();
				} else {

				}
			}
		}
		
		
		return true;
		
		
		for (key in a) {
			/*
			//this thing is useless in this context, but i dont want to delete incase i need it later
			if (String(parseInt(key, 10)) === key){
				console.log('key ('+key+') has property => String(parseInt(key, 10)) === key');
				console.log(a[key]);
			}
			//*/
		
			if (a.hasOwnProperty(key)) {
				a[key].render();
			} else {

			}
		}
	},
	
	
	
	average: function (keys) {
		var ring = [];
	
		if (typeof keys.key != 'string'){
			//bail
			console.log ("keys.key in Map::average missing");
			return null;
			
		}else if (isNaN(keys.x) || isNaN(keys.y) ){
			// handle case of rows/cols only or all
			
			console.log('case not handled yet map.js(utb6stdfihksdf)');
		} else {
			//average surrounding 1 tile
			ring = this.buildRectangleRing(
				keys.x,
				keys.y,
				keys.range_x || 1,
				keys.range_y || 1
			);
		}
		
		//now the average part
		var d = 0;
		var a = 0;
		for (var x = 0; x < ring.length; x++){
			if (typeof this.tiles[ring[x]] != 'undefined'){
				var y = this.tiles[ring[x]].get(keys.key);
				if (!isNaN(y)){
					d++;
					a+=y;
				}
				//console.log(y);
			}
		}
		return (a/d);
	},
	sortTiles : function (){
		function compare(a,b) {
			if (a.getZIndex() < b.getZIndex())
			{
				return -1;
			}
			if (a.getZIndex() > b.getZIndex())
			{
				return 1;
			}
			return 0;
		}
		this.tiles.sort(compare);
	},
	
	seedTilesRandom: function (width,height){
		this.radius_x = width;
		this.radius_y = height;
		for (var x = width*-1; x < width; x++){
			for (var y = height*-1; y < height; y++){
				
				var tile = new Tile({
					x:x,
					y:y,
					settings:this.settings
				});
				//console.log(tile);
				this.tiles[tile.index()] = tile;
				//console.log(x.toString()+y.toString());
				//console.log (r.game.map[x.toString()+y.toString()]);
			}
		}
		//console.log(this.tiles);
		//this.sortTiles();
		//console.log(this.tiles);
		
	},
	
	//first ring builder
	buildRectangleRing: function (tx,ty,rx,ry){//tile of origin, range/distance
		var ring = [];
		for (var x = tx-rx; x < tx+rx+1; x++){
			for (var y = ty-ry; y < ty+ry+1; y++){
				ring.push(mapIndex(x,y));
			}
		}
		return ring;
	}
});
