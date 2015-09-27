/*
	Patrick Traeger (C) 2015
	JSTimer 
	MIT License
*/

	function Timer(options){
		if(Object.prototype.toString.call(options) === '[object Object]'){
			this.time 		= options.init || 0;
			this.enabled 	= false;
			this.html 		= options.target || null;
			this.method 	= options.method || 'interval';
			return this;			
		}
	}

	Timer.prototype.format = function(time){
		if(Object.prototype.toString.call(time) !== '[object Undefined]'){			
			return Math.floor(time / 60);
		}
	};

	Timer.prototype.start = function(){
		if(this.method === 'interval'){
			this.enabled = true;
			var second 	 = 1000;
			var self 	 = this;
			if(this.html){
				self.html = document.getElementById(this.html);
			}
			this.id = setInterval(function(){
				self.time++;
				if(self.html){
					self.html.innerHTML = self.format(self.time);
				}
			}, second);
		}
		else{
			this.startTime = Date.now();
		}
	};

	Timer.prototype.stop = function(){
		if(this.method === 'interval'){
			clearInterval(this.id);
		}
		else{
			this.endTime = Date.now();
			this.time = Math.abs(this.endTime - this.startTime);
		}
	};

	Timer.prototype.getTime = function(){
		return this.time;
	};

	Timer.prototype.clear = function(){
		this.stop();
		this.time = 0;
		if(this.html){
			document.getElementById(this.html).innerHTML = this.time;	
		}
	};