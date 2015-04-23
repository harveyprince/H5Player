/*
	author:harveyprince
*/
/*
	panel lockin and lockout
*/
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
/*
	font and setting panel
*/
$(".text-style .font").click(function(){
	$(".panel-box").hide();
	$(".font-panel").animate({width:'toggle'});
});
$(".text-style .setting").click(function(){
	$(".panel-box").hide();
	$(".setting-panel").animate({width:'toggle'});
});
$(".panel-title i").click(function(){
	$(this).parent().parent().animate({width:'toggle'});
});
$(".option").click(function(){
	$(this).parent().attr('value',$(this).attr('value'));
});
$(document).ready(function(){
	window.colorbox = new ColorBox($(".font-color"));
	colorbox.initBox();
});
// insert user in userlist
/*
	icon:image url
	name:string
	isSelf:boolean(keep)
*/
var UserBlock = function(icon,nicname,isSelf){
	this.icon = icon;
	this.nicname = nicname;
	this.isSelf = isSelf;
}
UserBlock.prototype.constructDOM = function(){
	var $block = $('<div class="user-block">');
	$block.append($('<div class="head-icon">').append($('<img>').attr("src",this.icon)));
	$block.append($('<div class="detail-info">').append($('<div class="name">').html(this.nicname)));
	return $block;
}
$(".HP-User-List").bind("insert",function(e,ub){
	var $target = $(e.target);
	var list = $target.find(".user-list");
	list.append(ub.constructDOM());
});
// insert comment in commentlist
/*
	icon:image url
	comment:string
	isSelf:boolean
*/
var CommentBlock = function(icon,comment,isSelf){
	this.icon = icon;
	this.comment = comment;
	this.isSelf = isSelf;
};
CommentBlock.prototype.constructDOM = function(){
	var $block = $('<div class="comment-block">');
	if(this.isSelf){
		$block.addClass("fr");
	}
	$block.append($('<div class="head-icon">').append($('<img>').attr("src",this.icon)));
	$block.append($('<div class="bubble">').append($('<span class="triangle">')).append($('<div class="article">').html(this.comment)));
	return $block;
}
$(".HP-Comment-List").bind("insert",function(e,cb){
	var $target = $(e.target);
	var list = $target.find(".comment-list");
	list.append(cb.constructDOM());
});

/*
	extra function
*/
Number.prototype.timeformat = function(){
	var val = this;
	var minite = Math.floor(val/60);
	var sec = Math.floor(val - minite*60);
	minite = minite<10?'0'+minite.toString():minite;
	sec = sec<10?'0'+sec.toString():sec;
	return minite+":"+sec;
}
//video action
$(document).ready(function(){
	$("video").bind("canplay",function(){
		$(".time-label").html("00:00/"+this.duration.timeformat());
	});
	$("video").bind("pause",function(){
		$(".button-play-pause i").attr("class","fa fa-play");
	});
	$("video").bind("play",function(){
		$(".button-play-pause i").attr("class","fa fa-pause");
	});
	$("video").bind("timeupdate",function(){
		if(!dragging){
			$(".progress-bar .bar .dark").css("width",((this.currentTime / this.duration) * 100) + "%");
			$(".time-label").html(this.currentTime.timeformat()+"/"+this.duration.timeformat());
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
	$(".volume-bar .bar").bind("mouseup",function(e){
		var newVolume = ((e.offsetX) / this.offsetWidth);
		if(newVolume<0.1){
			$(".video-button.volume").html('<i class="fa fa-volume-off"></i>');
		}else if(newVolume<0.6){
			$(".video-button.volume").html('<i class="fa fa-volume-down"></i>');
		}else{
			$(".video-button.volume").html('<i class="fa fa-volume-up"></i>');
		}
		$("video").get(0).volume = newVolume;
		$(".volume-bar .bar .load").css("width",newVolume * 100 + "%");
	});
});
// danmaku
$(document).ready(function(){
	window.CM = new CommentManager($("#danmaku-stage").get(0));
	CM.init();
	CM.start();
});
// danmaku send
$(".comment-send-button").click(function(){
	var text = $(this).siblings("input").val();
	if(text&&text.length>0){
	var someDanmakuAObj = {
	    "mode":Number($(".danmaku-mode").attr('value')),
	    "text":text,
	    "size":Number($(".font-size").attr('value')),
	    "color":window.colorbox.value
	};
	CM.send(someDanmakuAObj);
	}
	$(this).siblings("input").val("");
});
$(".text-block input").keydown(function(e){
	if(e.keyCode==13){
		$(".comment-send-button").click();
	}
});
// play and pause
$(".button-play-pause").click(function(){
	if($("video").get(0).paused){
		$("video").trigger("play");
	}else{
		$("video").trigger("pause");
	}
});

//fullscreen
$(".arrows").click(function(){
	if(!window.onfullscreen()){
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
function cancelFullscreen() {
	if(document.cancelFullScreen) {
		document.cancelFullScreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
}
window.onfullscreen = function (){
	if(window.outerHeigth==screen.heigth && window.outerWidth==screen.width){
		return true;
	}else{
		return false;
	}
}
$(document).bind("fullscreenchange",function(){
	CM.setBounds();
});
$(document).bind("mozfullscreenchange",function(){
	CM.setBounds();
});
$(document).bind("webkitfullscreenchange",function(){
	CM.setBounds();
});