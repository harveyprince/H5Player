$(".panel-key").click(function(){
	$(this).parent().trigger("lock");
	var content = $(this).html();
	if(content.indexOf('left')>=0){
		$(this).html(content.replace('left','right'));
	}else{
		$(this).html(content.replace('right','left'));
	}
});
$(".HP-User-List").bind("lock",function(e){
	var $target = $(e.target);
	$target.find(".user-panel").animate({width: 'toggle'});	
});
$(".HP-Comment-List").bind("lock",function(e){
	var $target = $(e.target);
	$target.find(".comment-panel").animate({width: 'toggle'});	
});
//video action
$(document).ready(function(){
	$("video").bind("pause",function(){
		$(".button-play-pause i").attr("class","fa fa-play");
	});
	$("video").bind("play",function(){
		$(".button-play-pause i").attr("class","fa fa-pause");
	});
	$("video").bind("timeupdate",function(){
		if(!dragging){
			$(".progress-bar .bar .dark").css("width",((this.currentTime / this.duration) * 100) + "%");
		}
	});
	$("video").bind("ended",function(){
		$(".progress-bar .bar .dark").css("width","0%");
	});
	$("video").bind("loadedmetadata",function(){
		if(this.buffered!=null){
			try{
				var load_end = this.buffered.end(0);
			}catch(e){return;}
			var dur = this.duration;
			$(".progress-bar .bar .load").css("width",((load_end / dur) * 100) + "%");
		}
	});
	var dragging = false;
	$(".progress-bar .bar").bind("mousedown",function(e){
		dragging = true;
	});
	$(".progress-bar .bar").bind("mouseup",function(e){
		dragging = false;
		var newTime = ((e.offsetX) / this.offsetWidth) * $("video").get(0).duration;
		$("video").get(0).currentTime = newTime;
	});
});
// play
$(".button-play-pause").click(function(){
	if($("video").get(0).paused){
		$("video").trigger("play");
	}else{
		$("video").trigger("pause");
	}
});

//fullscreen
$(".arrows").click(function(){
	if($(".H5Player").width()<window.screen.availWidth){
		launchFullScreen($(".H5Player").get(0)); // any individual element
	}else{
		cancelFullscreen();
	}
	
	
});
function launchFullScreen(element) {
	if(element.requestFullScreen) {
		element.requestFullScreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	}
}

// Whack fullscreen
function cancelFullscreen() {
	if(document.cancelFullScreen) {
		document.cancelFullScreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
}