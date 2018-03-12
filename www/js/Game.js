(function() {
	var Game = window.Game = Class.extend({
		init: function() {
			this.sceneNumber = 0;
			this.canvas = document.querySelector("#myCanvas");
			this.ctx = this.canvas.getContext("2d");
			//存放actor
			this.actors = [];
			this.fishArr = [];
			//加载图片
			this.RtextUrl = "R.txt";
			this.RObj = null;
			this.R = {};
			//分数
			this.score = 0;
			//fish类型
			this.fishType = 1;
			//背景音频
			this.audioBg = document.querySelector("#audioBg");
			//吃音频
			this.audioEat = document.querySelector("#audioEat");
			//撞击音频
			this.audioBump = document.querySelector("#audioBump");
			//落水声音
			this.failWater = document.querySelector("#failWater");
			//hunter  Type变化音效
			this.changeFishType = document.querySelector("#changeFishType");
			//结束游戏音效
			this.over = document.querySelector("#over");
			//hunter  等级提升音效
			this.upgrade = document.querySelector("#upgrade");
			//提示特效时间到
			this.tip = document.querySelector("#tip");
			var self = this;
			this.loadResource(function() {
				self.start();
			});
		},
		start: function() {
			//this.audio.play();
			this.scene = new Scene();
			var self = this;
			this.f = 0;
			this.scene.changeScene(self.sceneNumber);
			this.timer = setInterval(function() {
				self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
				self.scene.show();
				/*document.querySelector("h1").innerHTML = self.score;
				document.querySelector("h2").innerHTML = self.f;*/
			}, 100);
		},
		loadResource: function(callback) {
			var self = this;
			//加载好的图片编号
			var count = 0;
			this.ctx.fillStyle = "#fff";
			this.ctx.font = "30px 微软雅黑";
			this.ctx.textAlign = "center";
			this.ctx.fillText("正在加载图片...", this.canvas.width / 2, this.canvas.height / 2);
			//Ajax请求
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
					self.RObj = JSON.parse(xhr.responseText);
					console.log(self.RObj);
					var imagesAmount = _.size(self.RObj);
					for (var k in self.RObj) {
						self.R[k] = new Image();
						self.R[k].src = self.RObj[k];
						self.R[k].onload = function() {
							count++;
							self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
							self.ctx.textAlign = "center";
							//self.ctx.drawImage(self.bgImage,0,0,self.canvas.width,self.canvas.height);
							self.ctx.fillText("正在加载图片" + count + "/" + imagesAmount, self.canvas.width / 2, self.canvas.height / 2);
							if (count == imagesAmount) {
								callback();
							}
						}
					}
				}
			}
			xhr.open("get", this.RtextUrl, true);
			xhr.send();
		}
	});
})()