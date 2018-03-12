(function() {
	var Scene = window.Scene = Class.extend({
		init : function() {
			this.bindEvent();
		},
		changeScene : function(number) {
			game.sceneNumber = number;
			switch (game.sceneNumber) {
				//开始界面
				case 0:
					this.titleImage = game.R["titleImage"];
					this.startBtn = game.R["startBtnImage"];
					this.titleX = -325;
					this.startBtnX = 961;
					game.background = new Background();
					break;
				//简单
				case 1:
					game.audioBg.play();
					game.background = new Background();
					game.hunter = new Hunter();
					game.hunter.loseLife = false;
					break;
				//复杂
				case 2:
					break;
				//结束游戏
				case 3:
					this.gameOverImage = game.R["gameOverImage"];
					this.startBtn = game.R["startBtnImage"];
					this.gameOverX = -325;
					this.startBtnX = 961;
					game.background = new Background();
			}
		},
		show : function() {
			switch (game.sceneNumber) {
				//开始界面
				case 0:
					this.titleX += 50;
					this.startBtnX -= 55;
					if(this.titleX > 230){
						this.titleX = 230;
					}
					if(this.startBtnX < 330){
						this.startBtnX = 330;
					}
					game.background.render();
					game.ctx.drawImage(this.titleImage,this.titleX,80,325,89);
					game.ctx.drawImage(this.startBtn,this.startBtnX,200,161,77);
					break;
				//简单关界面
				case 1:
					game.ctx.globalAlpha += 0.06;
					if(game.ctx.globalAlpha > 1){
						game.ctx.globalAlpha = 1;
					}
					game.f++;
					if(game.score < 200){
						if(game.f%30 == 0){
							game.fishType = _.random(1,2);
							game.fish = new Fish();
						}
						if(game.f%60==0){
							game.fishType = 3;
							game.fish = new Fish();
						}
						if(game.f%80==0){
							game.fishType = _.sample([4,10],1)[0];
							game.fish = new Fish();
						}
						if(game.f%150==0){
							if(!game.hunter.hasTool){
								game.tool = new Tool();
								game.tool.name = "shark";
								game.tool.type = "shark";
							}
						}
					}else{
						if(game.f%10 == 0){
							game.fishType = _.random(1,2);
							game.fish = new Fish();
						}
						if(game.f%30==0){
							game.fishType = 3;
							game.fish = new Fish();
						}
						if(game.f%60==0){
							game.fishType = _.sample([10,4,10,10,10,10],1)[0];
							game.fish = new Fish();
						}
						if(game.f%300==0){
							if(!game.hunter.hasTool){
								game.tool = new Tool();
								game.tool.name = "shark";
								game.tool.type = "shark";
							}
						}
						if(game.f%60==0){
							game.fishType = 11;
							game.fish = new Fish();
						}
					}
					_.each(game.actors,function(actor){
						actor.update();
						actor.render();
					},0);
					//要放在其他角色来正当角色渲染完后，不然会被遮挡
					if(!game.hunter.hasTool){
						if(game.score >= 100 && game.score <= 200){
							game.hunter.type = 5;
						}else if(game.score > 200){
							game.hunter.type = 9;
						}else if(game.score < 100){
							game.hunter.type = 3;
						}
					}else if(game.hunter.hasTool){
						game.changeFishType.play();
						game.tool.duration++;
						//提示事件快到了
						if(game.tool.duration == 90){
							game.tip.play();
						}
						if(game.tool.duration == 100){
							game.hunter.type = game.hunter.toolType;
							game.hunter.hasTool = false;
							game.changeFishType.pause();
						}
					}
					if(game.score <= 0 && game.hunter.loseLiftNum >= 3){
						console.log(game.f);
						this.changeScene(3);
						game.score = 0;
						game.f = 0;
						game.ctx.globalAlpha = 0;
						game.over.play();
					}
					showScore();
					showLife();
					break;
				//复杂关界面
				/*case 2:
					
					break;*/
				//结束界面
				case 3:
					game.ctx.globalAlpha+=0.06;
					if(game.ctx.globalAlpha > 1){
						game.ctx.globalAlpha = 1;
					}
					this.gameOverX += 50;
					this.startBtnX -= 55;
					this.rankX -= 50;
					if(this.gameOverX > 230){
						this.gameOverX = 230;
					}
					if(this.startBtnX < 330){
						this.startBtnX = 330;
					}
					//清空所有演员
					_.each(game.actors,function(actor){
						game.actors = _.without(game.actors,actor);
					},0);
					game.background.render();
					game.ctx.drawImage(this.gameOverImage,this.gameOverX,80,325,89);
					game.ctx.drawImage(this.startBtn,this.startBtnX,200,161,77);
					//showScore();
			}
		},
		bindEvent : function(){
			var self = this;
			game.canvas.onmousedown = function(event){
				var x = event.offsetX;
				var y = event.offsetY;
				switch(game.sceneNumber){
					case 0:
						if(x>self.startBtnX && x<self.startBtnX+206 && y >200 && y <270 ){
							self.changeScene(1);
							game.ctx.globalAlpha = 0;
						}
						break;
					case 1:
						
						break;
					case 2:
						break;
					case 3:
						if(x>self.startBtnX && x<self.startBtnX+206 && y >200 && y <270 ){
							self.changeScene(1);
							game.ctx.globalAlpha = 0;
						}
						break;						
				}
			},
			document.onkeydown = function(event){
				switch(event.keyCode){
					case 37:
						game.hunter.x-=10;
						game.hunter.direction = "back";
						if(game.hunter.x < 0 ){
							game.hunter.x = 0;
						}
						break;
					case 38:
						game.hunter.y-=10;
						if(game.hunter.y < 0 ){
							game.hunter.y = 0;
						}
						break;
					case 39:
						game.hunter.x+=10;
						game.hunter.direction = "front";
						if(game.hunter.x > (game.canvas.width - game.hunter.image.width) ){
							game.hunter.x = game.canvas.width - game.hunter.image.width;
						}
						break;
					case 40:
						game.hunter.y+=10;
						if(game.hunter.y > (game.canvas.height - game.hunter.image.height)){
							game.hunter.y = game.canvas.height - game.hunter.image.height;
						}
						break;
				}
			}
		}
	});
	//分数显示
	function showScore(){
		var score = game.score.toString();
		game.ctx.fillStyle = "#fafa38";
		game.ctx.fillText("score",game.canvas.width - 300 ,30);
		for(var i=0;i<score.length;i++){
			var char = score[i];
			game.ctx.drawImage(game.R["number"+char+"Image"],game.canvas.width - 230 + i * 20 ,7,20,27);
		}
	}
	//生命值显示
	function showLife(){
		this.lifeImage = game.R["heartImage"];
		for(var i=0;i<game.hunter.hasLife;i++){
			game.ctx.drawImage(this.lifeImage,game.canvas.width - 90 - (i*20),7,this.lifeImage.width,this.lifeImage.height);
		}
	}
})()