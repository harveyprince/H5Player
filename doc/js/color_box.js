var ColorBox = function($dom){
	this.root = $dom;
	this.value = 0xFFFFFF;
};
Number.prototype.colorFormat = function(){
	var str = this.toString(16);
	for(var i = str.length;i<6;i++){
		str = "0"+str;
	}
	return ("#"+str).toUpperCase();
}
ColorBox.prototype.getStringValue = function(){
	return this.value.colorFormat();
}
ColorBox.prototype.initBox = function(){
	var box = [];
	var color_b = 0x000000;
	var $block = $("<table class='color_box'>");
	$block.append($("<thead>").append($("<tr>").append($("<td colspan='3'>").append($("<div class='color_chosen'>")).append($("<div class='color_code'>").html("#FFFFFF")))));
	var $block_body = $("<tbody>");
	var $block_line = $("<tr>");
	var $block_line_1 = $("<tr>");
	for(var b = 0;b<6;b++){
		var $box_block = $("<td>");
		var color = color_b;
		var color_block = [];
		for(var i = 0;i<6;i++){
			var $box_line = $("<tr>");
			var color_x = color;
			var color_line = [];
			for(var j = 0;j<6;j++){
				var $box_cell = $("<td class='color_cell'>");
				$box_cell.css("background-color",color_x.colorFormat());
				$box_cell.attr("value",color_x);
				color_line.push(color_x.toString(16));
				color_x+=0x003300;
				$box_line.append($box_cell);
			}
			color_block.push(color_line);
			$box_block.append($box_line);
			color+=0x000033;
		}
		box.push(color_block);
		if(b<3){
			$block_line.append($box_block);
		}else{
			$block_line_1.append($box_block);
		}
		color_b+=0x330000;
	}
	$block_body.append($block_line);
	$block_body.append($block_line_1);
	$block.append($block_body);
	this.root.append($block);
	this.eventInit();
}
ColorBox.prototype.eventInit = function(){
	var $dom = this.root;
	var box = this;
	var color = 0xFFFFFFFF;
	$dom.find(".color_cell").click(function(){
		$dom.find(".color_chosen").css("background-color",Number($(this).attr("value")).colorFormat());
		$dom.find(".color_code").html(Number($(this).attr("value")).colorFormat());
		color = Number($(this).attr("value"));
		box.value = color;
	});
}