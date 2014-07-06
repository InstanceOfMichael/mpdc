var Tile = new Class({
	Implements: [Events, GetSet],
	initializeDefaults: function (){
		this.trees     = Math.floor(Math.random()*101);
		this.elevation = Math.floor(Math.random()*101) - Math.floor(Math.random()*101);
		this.seed      = Math.floor(Math.random()*1001);
		this.guest     = null; // guest refers to the occupant object, as in a character or wall
		this.is_wall   = 1;
		
	},
	draw: function(c){

		var source = {}; //source // from tileset
		var size_w = 32;
		var size_h = 32;
		var imageObj = new Image();
		var x = this.x;
		var y = this.y
		var w_s = {//wall_section
			w : 2,
			h : 0
		};

		var source = Object.append(source,{
			sx : 142,
			sy : 556,
			sw : size_w,
			sh : size_h
		});

		if (this.is_wall)
		{
			var source = Object.append(source,{
				//source // from tileset
				sx : 4 + (w_s.w * ((32+2)*4)+4) + size_w * 0,
				sy : 0 + (w_s.h * ((32+2)*4)+4) + size_h * 0,
				sw : size_w,
				sh : size_h
			});
		}
		
		imageObj.tile = Object.append(source,{
			//destination // to canvas
			dw : size_w,
			dh : size_h,
			dx : x*size_w,
			dy : y*size_h
		});
		
		imageObj.onload = function (){
			
			/*
			var sourceX = 0;
			var sourceY = 0;
			var sourceWidth = this.tile.w;
			var sourceHeight = this.tile.h*1.5;
			var destX = this.tile.x * size;
			var destY = this.tile.y * size*0.25;
			var destWidth = this.tile.w;
			var destHeight = this.tile.h*1.5;
			//*/
			//console.log(this.x);
			
			c.drawImage(imageObj,
					this.tile.sx, this.tile.sy, /* source X,Y */
					this.tile.sw, this.tile.sh, /* source width, height */
					this.tile.dx, this.tile.dy,	/* destination X,Y */
					this.tile.dw, this.tile.dh	/* destination width, height */
			);
		};
		//imageObj.src = 'img/tiles/plains.png';
		//imageObj.src = 'img/vendor/opengameart/gauntlet-like-tiles/tiles.png';
		imageObj.src = 'img/vendor/opengameart/gauntlet-like-tiles/tiles-cust.png';
		
		
		return true;
	},
	getZIndex: function(){
		var flip_x = -1;
		var flip_y = 1;
		return (flip_x*this.x + flip_y*this.y);
	},
	selectTile: function(){
		console.log('tile selected: '+this.index());
		$$('div.tile.'+this.index()).addClass('selected');
	},
	index: function(){
		return mapIndex(this.x,this.y);
	},
	getNorth:function(){
		return this.getAdjacentTile(-1,0);
	},
	getSouth:function(){
		return this.getAdjacentTile(1,0);
	},
	getWest:function(){
		return this.getAdjacentTile(0,-1);
	},
	getEast:function(){
		return this.getAdjacentTile(0,1);
	},
	getAdjacentTile: function(ox,oy){
		return r.map.tiles[mapIndex(this.x + ox, this.y + oy)];
	}
});


