var Settings = new Class({
	Implements: [Events, GetSet],
	initializeDefaults: function (options){
		this.tilePixelSize = 100;
		this.zoom = 1;
		this.pan_x = 0;
		this.pan_y = 0;
	},
});