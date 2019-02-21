var n = 1; //每行显示多少个方块
var num = 1; //游戏关数
var imgIndex = 1; //游戏中轮播图切换

$(document).ready(function(){
	var $elie = $("#chooseMusic");
	$elie.css("margin-top","30%");
	$elie.fadeIn(3000);
	rotate(0);
	function rotate(degree) {
		$elie.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
		$elie.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
		setTimeout(function() {
			if(degree<360){
				rotate(++degree);
			}
		},5);
	}
	$("#start .music-head").eq(0).animate({
		left:($(window).width()-168)/2/$(window).width()*100+"%"
	},1000);
});

//播放背景音乐
function playMusic(i){
	$("#prevGameStart").hide();
	$("#myaudio").attr("src","music/"+$(i).attr("data-music"));
	$("#myaudio")[0].play();
	var index = $(i).index();
	switch(index){
		case 0:
			$("#start .music-head").eq(0).attr("src","images/1.png");
			break;
		case 1:
			$("#start .music-head").eq(0).attr("src","images/2.png");
			break;
		case 2:
			$("#start .music-head").eq(0).attr("src","images/3.png");
			break;
		case 3:
			$("#start .music-head").eq(0).attr("src","images/4.png");
			break;
		default:
			$("#start .music-head").eq(0).attr("src","images/music-head.png");
			break;
	}

	$("#start .startPlayBtn").animate({opacity:"1"},1000);
}

