(function(){
	var Background = window.Background = Actor.extend({
		init:function(){
			if(game.sceneNumber == 0){
				this.image = game.R["bgImage"];
			}else if(game.sceneNumber == 1){
				this.image = game.R["bgGameImage"];
			}else if(game.sceneNumber == 2){
				this.image = game.R["bgGameImage2"];
			}else if(game.sceneNumber == 3){
				this.image = game.R["bgGameImage3"];
			}
			this._super();
		},
		update:function(){
			
		},
		render:function(){
			game.ctx.drawImage(this.image,0,0,this.image.width,this.image.height);
		}
	});
})()