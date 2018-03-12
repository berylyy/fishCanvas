(function() {
	var Hunter = window.Hunter = Actor.extend({
		init : function() {
			this.imageNumber = 1;
			this.type = 3;
			this.image = game.R["hunterImage"+this.type+"_"+this.imageNumber];
			this.x = 380;
			this.y = 0;
			this.firstTime = true;
			this.direction = "front";
			//碰撞盒
			this.A = this.x;
			this.B = this.x+this.image.width;
			this.C = this.y+this.image.height;
			this.D = this.y;
			this._super();
			//是否有道具
			this.hasTool = false;
			//拥有道具之前的type
			if(!this.hasTool){
				this.toolType = this.type;
			}
			//提示框image，显示时间
			this.tipImage = game.R["tipImage"];
			this.tipDuration = 0;
			this.globalAlpha = 0;
			//拥有的生命值
			this.hasLife = 3;
			this.loseLife = 0;
			//是否吃到小鱼
			this.eat = false;
			//顶级鱼
			this.topImageNumber = 0;
			this.topImage = game.R["topFish"+this.topImageNumber];
			//是否有金币改变
			this.goldChange = false;
			this.goldChangeType = 0;
			this.goldDuration = 0;
			//丢失一命计时
			this.loseLiftStart = 0;
			//是否丢失生命
			this.loseLife = false;
			this.loseLiftNum = 0;
			//是否有盾牌
			this.hasShield = false;
			this.hasShileDuration = 0;
			this.shileImage = game.R["shield"];
		},
		update : function() {
			this.topImageNumber ++;
			if(this.topImageNumber > 14){
				this.topImageNumber = 0;
			}
			this.tipDuration++;
			this.imageNumber++;
			if(this.direction == "front"){
				if(this.imageNumber > 3){
					this.imageNumber = 1;
				}
			}else if(this.direction == "back"){
				if(this.imageNumber > 7){
					this.imageNumber = 5;
				}
			}
			//更新碰撞盒
			this.A = this.x;
			this.B = this.x+this.image.width;
			this.C = this.y+this.image.height;
			this.D = this.y;
			if(this.firstTime){
				this.hasShield = true;
				this.y += 30;
				if(this.y > 150){
					this.y = 150;
					this.firstTime = false;
				}
			}
			if(this.hasShield){
				this.hasShileDuration++;
				if(this.hasShileDuration == 50){
					this.hasShield = false;
					this.hasShileDuration = 0;
					console.log("可以吃了");
				}
			}

		},
		render : function() {
			if(this.eat){
				game.ctx.drawImage(game.R["add10"],100,100,100,100);
			}
			//判断是否是第一次产生的，第一次将鱼放到屏幕中间
			if(this.tipDuration <= 20 || this.firstTime){
				game.failWater.play();
				game.ctx.drawImage(this.tipImage,this.x+10,this.y-this.tipImage.height,this.tipImage.width,this.tipImage.height);
			}
			this.image = game.R["hunterImage"+this.type+"_"+this.imageNumber];
			game.ctx.drawImage(this.image,this.x,this.y,this.image.width,this.image.height);
			//判断是否是顶级
			this.topImage = game.R["topFish"+this.topImageNumber];
			if(this.type == 20){
				game.ctx.drawImage(this.topImage,this.x-50,this.y-50,300,300);
			}
			//判断是否有金币
			if(this.goldChange){
				this.goldImage = game.R["gold"+this.goldChangeType];
				game.ctx.drawImage(this.goldImage,this.x+this.image.width/2,this.y-this.image.height/2,this.goldImage.width,this.goldImage.height);
			}
			//是否有盾牌
			if(this.hasShield){
				game.ctx.drawImage(this.shileImage,this.x-20,this.y-30,this.shileImage.width,this.shileImage.height);
			}
		}
	});
})()