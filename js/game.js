var n = 1; //每行显示多少个方块
var num = 1; //游戏关数
var imgIndex = 1; //游戏中轮播图切换
var remain_time = parseInt($("#remain-time").html()); //剩余时间

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
			$("#start .music-head").eq(0).attr("src","images/music_1.png");
			break;
		case 1:
			$("#start .music-head").eq(0).attr("src","images/music_2.png");
			break;
		case 2:
			$("#start .music-head").eq(0).attr("src","images/music_3.png");
			break;
		case 3:
			$("#start .music-head").eq(0).attr("src","images/music_4.png");
			break;
		default:
			$("#start .music-head").eq(0).attr("src","images/music-head.png");
			break;
	}

	$("#start .startPlayBtn").animate({opacity:"1"},1000);
}

//初始化
function init(){
	$("#game-body").empty();
	if(n >= 7){
		n = 7;
	}else{
		n++;
	}
	var rgb1 = parseInt(Math.random()*255);
	var rgb2 = parseInt(Math.random()*255);
	var rgb3 = parseInt(Math.random()*255);
	var blockWidth = ($("#game-body").width()-(n+1)*8)/n;
	var blockHeight = ($("#game-body").height()-(n+1)*8)/n;
	for(i=0;i<n*n;i++){
		$("#game-body").append("<div class='block' onclick='chooseDiff(this)'></div>");
	}
	$(".block").width(blockWidth);
	$(".block").height(blockHeight);
	for(i=0;i<n*n;i++){
		var y = (i+1)%n;
		var s = parseInt((i+1)/n);
		$(".block").eq(i).css("background-color","rgb("+rgb1+","+rgb2+","+rgb3+")");
		if(y == 0){
			$(".block").eq(i).css("left",(n-1)*(blockWidth+8)+"px");
			$(".block").eq(i).css("top",(s-1)*(blockHeight+8)+"px");
		}else{
			$(".block").eq(i).css("left",(y-1)*(blockWidth+8)+"px");
			$(".block").eq(i).css("top",s*(blockHeight+8)+"px");
		}
	}
	$(".block").eq(parseInt(Math.random()*n*n)).css("background-color","rgb("+rgb1+","+rgb2+","+(rgb3+50)+")");
}

//轮播图片动画
function imgAnimate(){
	var imgLen = $("#banner img").length;
	setInterval(function(){
		$("#banner img").eq(imgIndex).fadeIn(3000).siblings().fadeOut(3000);
		imgIndex++;
		if(imgIndex > imgLen){
			imgIndex = 0;
		}
	},6000);
}

//游戏开始
function gameStart(){
	$("#start").fadeOut(1000);
	$("#container").fadeIn(1000);
	$("#container").height($(window).height());
	init();
	$("#num").html(1);
	imgAnimate();

	var end = setInterval(function(){
		remain_time = parseInt($("#remain-time").html());
		remain_time--;
		$("#remain-time").html(remain_time);
		if(remain_time == 0){
			clearInterval(end);
			alert("时间到");
			$("#end-oper").fadeIn(400);
			$("#score").animate({top:($(window).height()-200)/2+"px",left:($(window).width()-280)/2+"px"},1000);
			$("#yourScore").html(num);
		}
	},1000);
}

//选择不同色方块
function chooseDiff(index){
	var mathNum = $(index).index();
	if(mathNum == n*n-1){
		var pre = $(index).index()-1;
		if($(index).css("background-color") != $(".block").eq(pre).css("background-color")){
			init();
			num++;
			$("#num").html(num);
		}
	}else if(mathNum == 0){
		var next = $(index).index()+1;
		if($(index).css("background-color") != $(".block").eq(next).css("background-color") && $(index).css("background-color") != $(".block").eq(2).css("background-color")){
			init();
			num++;
			$("#num").html(num);
		}
	}else{
		var pre = $(index).index()-1;
		var next = $(index).index()+1;
		if($(index).css("background-color") != $(".block").eq(next).css("background-color") && $(index).css("background-color") != $(".block").eq(pre).css("background-color")){
			init();
			num++;
			$("#num").html(num);
		}
	}
}

//再玩一次
function playAgain(){
	// window.location.href="";
	window.location.reload();
}