(function() {
	var Bubble = window.Bubble = Class.extend({
		init: function() {
			this.bubbleIndex = _.random(1, 2, 3);
			this.imageName = (["bubbele1", "bubble2", "bubble3"])[this.bubbleIndex];
			this.image = game.R[this.imageName];
		},
		render: function() {
			game.ctx.drawImage(this.image, 0, 100, 100, 100);
		},
		update: function() {}
	});
})()