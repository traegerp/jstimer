/*
	Patrick Traeger (C) 2015
	JSTimer 
	MIT License
*/

	function Timer(options){
		if(Object.prototype.toString.call(options) === '[object Object]'){
			this.time 		= options.init || 0;
			this.enabled 	= false;
			this.id  		= options.target || null;
			this.method 	= options.method || 'interval';
			this.output 	= options.format || 'mmss';
			return this;			
		}
	}

	Timer.prototype.format = function(time){
		if(Object.prototype.toString.call(time) !== '[object Undefined]'){	
			if(this.output.toLowerCase() == 'mmss'){
				var min = time / 60;
				var sec = ('.' + min.toString().split('.')[1]) * 60;
				if(isNaN(sec)){
					sec = 0;
				}
				return (Math.floor(min) < 10 ? '0' + Math.floor(min) : Math.floor(min)) + ':' + (Math.ceil(sec) < 10 ? '0' + Math.ceil(sec) : Math.ceil(sec));				
			}		
			else if(this.format.toLowerCase() == 'mm'){
				return Math.floor(time / 60);
			}
		}
	};

	Timer.prototype.start = function(){
		if(!this.enabled){
			if(this.method === 'interval'){
				this.enabled = true;
				var second 	 = 1000;
				var self 	 = this;
				if(this.id){
					self.html = document.getElementById(this.id);
				}
				this.intervalId = setInterval(function(){
					self.time++;
					if(self.html){
						self.html.innerHTML = self.format(self.time);
					}
				}, second);
			}
			else{
				this.startTime = Date.now();
			}
		}
	};

	Timer.prototype.stop = function(){
		if(this.method === 'interval'){
			this.enabled = false;
			clearInterval(this.intervalId);
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
			this.html.innerHTML = this.format(this.time);
		}
	};