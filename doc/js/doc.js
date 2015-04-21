$(".panel-key").click(function(){
	$(this).parent().trigger("lock");
});
$(".HP-User-List").bind("lock",function(e){
	var $target = $(e.target);
	var pos = Number($target.css("left").replace("px",""));
	pos = isNaN(pos)?0:pos;
	if(pos < 0){
		$target.animate({left:"0"},"slow");
		$target.find(".panel-key i").removeClass('fa-chevron-right').addClass('fa-chevron-left');
	}else{
		var width = $target.width();
		$target.animate({left:(10-width)+"px"},"slow");
		$target.find(".panel-key i").removeClass('fa-chevron-left').addClass('fa-chevron-right');
	}
});
$(".HP-Comment-List").bind("lock",function(e){
	var $target = $(e.target);
	var pos = Number($target.css("right").replace("px",""));
	pos = isNaN(pos)?0:pos;
	if(pos < -1){
		$target.animate({right:"-1"},"slow");
		$target.find(".panel-key i").removeClass('fa-chevron-left').addClass('fa-chevron-right');
	}else{
		var width = $target.width();
		$target.animate({right:(10-width)+"px"},"slow");
		$target.find(".panel-key i").removeClass('fa-chevron-right').addClass('fa-chevron-left');
	}
});