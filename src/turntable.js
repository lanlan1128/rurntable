// 转盘转动part
var $cj_btn = getEleById('cj-button'), 
	pointer = getEleById('pointer');

$cj_btn.onclick = function() {
	startGame();
}

var part = 8,        // 转盘分成的等分
	randomDeg,       // 中奖角度
	cycle = 2,       // 定义转动圈数
	rotate;          // 已经转过的角度

function startGame() {
	clearInterval(timer);
	rotate = 0;

	// 随机获取中奖角度
	randomDeg = Math.floor(Math.random() * 360);
	if((randomDeg % (360 / part)) == 0) {
		randomDeg++;
	}
	// 定义匀速运动的动画部分
	cycleDeg = cycle * 360 + randomDeg;
	oCycleDeg = (cycle * 360 + randomDeg) - 220;    // 220为要缓冲动画的角度

	speed = (220)/10;
    speed = Math.ceil(speed);

	timer = setInterval(function(){

		if(rotate > oCycleDeg - speed) {
			setRotate(pointer, oCycleDeg);
			rotate = oCycleDeg;
			clearInterval(timer);
			playBox(cycleDeg);   // 开始缓冲运动 
		}else {
			rotate += speed;
			setRotate(pointer, rotate);
		}

	}, 50);
};


// 定义缓冲动画
var timer = null,
	speed;     // 固定时间转过的角度

function playBox(target){
	//先清除之前的定时器,避免开多个定时器造成bug
    clearInterval(timer);

    timer = setInterval(function(){

        //非匀速运动的速度计算
        speed = (target - rotate)/10;
        speed = Math.ceil(speed);
        
        if(rotate >= target ){ // 到达指定角度后，清空定时器，停止运动
            setRotate(pointer, target);
            clearInterval(timer);
            alert("恭喜您，获得" + is(randomDeg));
        }else{
        	rotate += speed;
           setRotate(pointer, rotate);
        }

    },50);
}

var jiang=[
    [1,45,"30元优惠券"],  
    [45,90,"10元优惠券"], 
    [90,135,"兰蔻新精华1支"], 
    [135,180,"20元优惠券"], 
    [180,225,"15元优惠券"], 
    [225,270,"iphone6"], 
    [270,315,"谢谢参与"], 
    [315,360,"谢谢参与"] 
 ]; 

 //奖项判定函数
 function is(randomDeg){
    var i, res="";
    for(i = 0; i < jiang.length; i++){

    	if(randomDeg >= jiang[i][0] && randomDeg <= jiang[i][1]){
    		res=jiang[i][2];
        };

    };
    return res;
};


// 轮播中奖列表 (无缝轮播)
window.onload = function() {
	var speed = 40,
		rollBox = getEleById('award-list-box'),
		list = getEleById('award-list'),
		listCopy;

	if(rollBox.clientHeight < list.clientHeight) {
		// 生成一个副本以供无缝轮播
		listCopy = document.createElement('ul');
		listCopy.innerHTML = list.innerHTML;
		rollBox.insertBefore(listCopy, list.nextSibling);

		function roll() {
			if(rollBox.scrollTop >= list.offsetHeight) {
				rollBox.scrollTop = 0;
			}else {
				rollBox.scrollTop += 1;
			}
		}
	}

	var rollTimer = setInterval(roll, speed);
	rollBox.onmouseover = function() { clearInterval(rollTimer); };
	rollBox.onmouseout = function() { rollTimer = setInterval(roll, speed); };

}

// 获取元素
function getEleById(id) {
	return document.getElementById(id);
}

function setRotate(obj, value) {
	obj.style.webkitTransform = 'rotate('+ value +'deg)';  
	obj.style.mozTransform = 'rotate('+ value +'deg)';  
	obj.style.msTransform = 'rotate('+ value +'deg)';  
	obj.style.transform = 'rotate('+ value +'deg)';  
}
