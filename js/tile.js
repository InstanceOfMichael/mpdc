var Tile = new Class({
	Implements: [Events, GetSet],
	initializeDefaults: function (){
		this.trees = Math.floor(Math.random()*101);
		this.elevation = Math.floor(Math.random()*101) - Math.floor(Math.random()*101);
		this.seed = Math.floor(Math.random()*1001);
	},
	draw: function(c){
		//console.log(this);
		var size_w = 128;
		var size_h = 128*1.5;
		var imageObj = new Image();
		var x = this.x;
		var y = this.y
		imageObj.tile = {
			//source
			sx : 0,
			sy : 0,
			sw : size_w,
			sh : size_h,
			//destination
			dw : size_w,
			dh : size_h,
			dx : (x*size_w/2) + (y*size_w/2),
			dy : (y*size_h/2) - (x*size_h/2)
			
			
			/*
			dx : (this.x*size_w + 2*this.y*size_h)/size_w * (MOUSE.getX()/10),
			dy : (2*this.y*size_h - this.x*size_w)/size_h * (MOUSE.getY()/10)
			//*/
			//x : this.x * size,
			//y : this.y * size*0.25
		}
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
		imageObj.src = 'img/vendor/opengameart/gauntlet-like-tiles/tiles.png';
		
		
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
	}
});


