(function() {
	var Score = window.Score = Actor.extend({
		init: function() {
			this.type = "add10";
			this.image = game.R[this.type];
			this.time = 0;
			this.addX = game.fish.x;
			this.addY = game.fish.y - this.image.height;
			this._super();
		},
		update: function() {
			this.time++;
			
		},
		render: function() {
			game.ctx.drawImage(this.image, this.addX,this.addY,this.image.width,this.image.height);
		}
	});
})()