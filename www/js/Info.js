(function() {
	var Info = window.Info = Actor.extend({
		init: function() {
			this.type = "add10";
			this.image = game.R[this.type];
			this._super();
		},
		update: function() {
		},
		render: function() {
			//game.ctx.drawImage(this.image,100,100,100,100);
			game.ctx.fillStyle = "#fafa38"
			game.ctx.fillText("score",game.canvas.width - 300 ,30);
		}
	});
})()