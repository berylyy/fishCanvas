(function() {
	var Fish = window.Fish = Actor.extend({
		init: function() {
			this.fishType = game.fishType;
			this.fishNumber = 1;
			this.image = game.R["fish" + this.fishType + "_" + this.fishNumber];
			if (this.fishType == 3 || this.fishType == 10) {
				this.x = -this.image.width;
				this.y = _.random(50, 300);
			} else if(this.fishType==11){
				this.x = 800 + this.image.width;
				this.y = _.random(50, 300);
			}else {
				this.x = 800 + this.image.width;
				if (this.fishType == 4) {
					this.y = _.random(50, 300);
				} else {
					this.y = _.random(150, 250);
				}
			}
			this.speed = 5;
			//碰撞盒
			this.A = this.x;
			this.B = this.x + this.image.width;
			this.C = this.y + this.image.height;
			this.D = this.y;
			this.lock = true;
			this._super();
			//透明度
			game.ctx.globalAlpha = 1;
			//分数图片
			this.addImage = game.R["add10"];
		},
		update: function() {
			if (this.fishType == 3 || this.fishType == 10) {
				this.x += 10;
				if (this.x > 800) {
					this.remove();
				}
			} else {
				this.x -= this.speed;
				if (this.x < 0) {
					this.remove();
				}
			}
			this.fishNumber++;
			if (this.fishNumber > 5) {
				this.fishNumber = 1;
			}
			//更新碰撞
			this.A = this.x;
			this.B = this.x + this.image.width;
			this.C = this.y + this.image.height;
			this.D = this.y;
			//检测碰撞
			if (!game.hunter.hasShield) {
				if (((game.hunter.B > this.A) && (game.hunter.A < this.A) && (game.hunter.C > this.D) && (game.hunter.D < this.D)) ||
					((game.hunter.B > this.A) && (game.hunter.A < this.A) && (game.hunter.D < this.C) && (game.hunter.C > this.C)) ||
					((game.hunter.A < this.B) && (game.hunter.B > this.B) && (game.hunter.C > this.D) && (game.hunter.D < this.D)) ||
					((game.hunter.A < this.B) && (game.hunter.B > this.B) && (game.hunter.C > this.C) && (game.hunter.D < this.C))) {
					game.hunter.goldChange = true;
					if (this.fishType < game.hunter.type) {
						this.remove();
						game.score += this.fishType * 10;
						game.audioEat.play();
						//game.hunter.eat = true;
						game.hunter.goldChangeType = 0;

					} else {
						if (this.lock) {
							game.score -= this.fishType * 10;
							game.hunter.goldChangeType = 1;
							//当分数为0时，失一命
							if (game.score <= 0) {
								game.hunter.hasLife--;
								game.hunter.loseLiftNum++;
								game.score = 0;
								game.hunter.y = -100;
								game.hunter.x = 380;
								game.hunter.loseLifeStart = game.f;
								game.hunter.loseLife = true;
								game.hunter.resurgence = true;
							}
							setLock(this, false);
							game.audioBump.play();
						}
					}
				}
			}

			//检测分离
			if (this.A > game.hunter.B) {
				setLock(this, true);
			}
			//金币显示持续时间为20帧
			if (game.hunter.goldChange) {
				game.hunter.goldDuration++;
				if (game.hunter.goldDuration == 20) {
					game.hunter.goldChange = false;
					game.hunter.goldDuration = 0;
				}
			}
			//丢失生命持续时间
			if (game.hunter.loseLife) {
				game.hunter.y = -100;
				game.hunter.x = 380;
				if (game.f - game.hunter.loseLifeStart > 30) {
					game.hunter.loseLife = false;
					game.hunter.firstTime = true;
					
				}
			}
		},
		render: function() {

			this.image = game.R["fish" + this.fishType + "_" + this.fishNumber];
			game.ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
		},
		remove: function() {
			game.actors = _.without(game.actors, this);
		},
	});
})()

function setLock(fish, status) {
	fish.lock = status;
}