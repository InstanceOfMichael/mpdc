var Game_Controller = new Class({
	Implements: [Events, GetSet],
	initializeDefaults: function (options){
		console.log(options);
		this.pause = false;
		this.settings = new Settings(options);
		
		this.map = new Map(options);
		//this.ui = new User_Interface(options);

	},
	draw: function(c){
		this.map.draw(c);
	
		return true;
	},
	
	render: function(){
		//lets make this
		if ($$('article#game').length == 0){
			$$('body').adopt(new Element("article",{id: 'game',text:null}));
		}
		
		//this.settings.render();	//settings dont render
		this.map.render();
		//this.ui.render();
		
	},
	
	push: function (i){
		//	i = new Interface Element
		//return this.interface_elements.push(i);
	},
	
	destroy: function(){
		//$$('article#game ').dispose();
		//delete this;
		console.log('Root_Controller::destroy() is nonfunctional');
	}
});
