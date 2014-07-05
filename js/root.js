var Root_Controller = new Class({
	Implements: [Events, GetSet],
	initializeDefaults: function (options){
		this.game = null;
		//this.canvasElement = document.getElementById('game');
		//this.canvas = document.getElementById('game').getContext('2d');
		this.view_port = this.viewport();
		this.DrawingBuffer = 0;
		this.Buffers = [
			document.getElementById('a'),
			document.getElementById('b')
		];
		this.ui = new User_Interface(options);
		this.interval = 1;
		this.fps = [];
		this.last_frame = new Date();
		
	},
	
	mainMenu: function () {
		//display the main menu
	
	},
	
	startGame: function (options) {
		console.log(options);
		//new game
		
		//delete mainMenu
		
		this.game = new Game_Controller(options);
	},
	
	runGameLoop: function (total_frames){
		//console.log("r.runGameLoop("+(total_frames++)+");");
		//console.log("r.runGameLoop();");
		//console.log(new Date().getTime()+', '+r.last_minute.getTime());
		r.this_frame = new Date;
		r.fps.unshift(1000 / (r.this_frame - r.last_frame));
		if (r.fps.length > 25){
			console.log (average(r.fps)+' frame per second; interval('+r.interval+'ms)');
			r.fps = [];
		}
		r.last_frame = r.this_frame;
		
		if (r.fps[0] > 30){
			r.interval++;
		}
		else if (r.fps[0] < 25){
			r.interval--;
			if (r.interval < 1){r.interval = 1;}
		}
		
		this.draw();
		
		r.last_frame = new Date();
		if (r.pause != true){
			setTimeout("r.runGameLoop("+(++total_frames)+");",r.interval);
		}
	},
	
	draw: function(){
		
		//this.view_port = this.viewport();
		
		var c = this.canvas;
	//	console.log(this.Buffers);
		this.Buffers[1-this.DrawingBuffer].style.visibility='hidden';
		this.Buffers[this.DrawingBuffer].style.visibility='visible';

		this.DrawingBuffer=1-this.DrawingBuffer;
		
		
		var c = this.Buffers[this.DrawingBuffer].getContext('2d');
		//c.clearRect(0, 0, c.canvas.width, c.canvas.height);
		
		c.canvas.width  = window.innerWidth;
		c.canvas.height = window.innerHeight;
		
		//c.fillStyle = '#FFFFFF';
		//c.fillRect (10,10, this.view_port.width-20,this.view_port.height-20);
		//c.fillRect (10,10, document.documentElement.clientWidth,document.documentElement.clientHeight);
		//c.fillRect (10,10,  window.innerWidth, window.innerHeight);
		
		this.game.draw(c);
		this.ui.draw(c);
	},
	viewport: function () {
		var e = window, a = 'inner';
		if (!('innerWidth' in window )) {
			a = 'client';
			e = document.documentElement || document.body;
		}
		return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
	},	
	render: function(){
		
		return this.game.render();
	},
	
	destroy: function(){
		//$$('article#game ').dispose();
		//delete this;
		console.log('Root_Controller::destroy() is nonfunctional');
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