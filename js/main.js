var oList = document.getElementById('list');
var picBody = document.getElementById('pic_body');
var aLi = oList.getElementsByTagName('li');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var arrImg = [];
var imgLen = 25;

for(var i = 0; i < imgLen; i++) {
	arrImg.push('img/' + i + '.jpg');
}
window.view = null;

init();

function init() {
	var W = document.documentElement.clientWidth;
	var H = document.documentElement.clientHeight;
	document.body.style.width = W + 'px';
	document.body.style.height = H + 'px';

	for(var i = 0; i < imgLen; i++) {
		createEles(i);
	}
}

function createEles(n) {
	window.cancelRandom = false;

	var oLi = document.createElement('li');
	var span = document.createElement('span');
	var a = document.createElement('a');
	var img = document.createElement('img');
	var strong = document.createElement('strong');
	oLi.index = n;
	a.href = "javascript:";
	img.src = arrImg[n]
	span.appendChild(a);
	span.appendChild(img);
	span.appendChild(strong);
	oLi.appendChild(span);
	oLi.onmouseover = function() {
		this.style.zIndex = '20';
		this.style.webkitTransform = 'rotate(' + 0 + 'deg) scale(1.2)';
	}
	oLi.onmouseout = function() {
		this.style.zIndex = '';
		var rotate = Math.floor(Math.random() * 30) * Math.pow(-1, Math.floor(Math.random() * 1000));
		this.style.webkitTransform = 'rotate(' + rotate + 'deg)';
	}

	var yImg = new Image();
	yImg.src = arrImg[n];
	yImg.onload = function() {
		oList.appendChild(oLi);
		drag(oLi);
		if(n == imgLen - 1) {
			setTimeout(function() {
				for(var i = 0; i < aLi.length; i++) {
					aLi[i].ondblclick = function() {
						if(window.cancelRandom) {
							toSplit();
							oRange.style.display = '';
						} else {
							window.view = this.index;
							toJoin();
							this.style.zIndex = '';
							oRange.style.display = 'none';
						}
					}
				}
				positionRandom();
			}, 80);
		}
	}
}

function positionRandom() {

	var maxL = oList.offsetWidth - aLi[0].offsetWidth;
	var maxT = oList.offsetHeight - aLi[0].offsetHeight;
	for(var i = 0; i < aLi.length; i++) {
		var L = Math.floor(Math.random() * maxL);
		var T = Math.floor(Math.random() * maxT);
		var rotate = Math.floor(Math.random() * 36) * Math.pow(-1, Math.floor(Math.random() * 1000));
		myMove(aLi[i], {
			left: L,
			top: T
		});
		aLi[i].style.webkitTransform = 'rotate(' + rotate + 'deg)';
	}
	oList.onclick = null;
}

function drag(obj) {
	var disX = 0;
	var disY = 0;
	var prevX = 0;
	var prevY = 0;
	var iSpeedX = 0;
	var iSpeedY = 0;
	obj.onmousedown = function(e) {
		var e = e || window.event;
		disX = e.clientX - obj.offsetLeft;
		disY = e.clientY - obj.offsetTop;
		prevX = e.clientX;
		prevY = e.clientY;

		document.onmousemove = function(e) {
			var e = e || window.event;
			obj.style.left = e.clientX - disX + 'px';
			obj.style.top = e.clientY - disY + 'px';

			iSpeedX = e.clientX - prevX;
			iSpeedY = e.clientY - prevY;

			prevX = e.clientX;
			prevY = e.clientY;
		}
		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
			objMove();
		}
		return false;
	}

	function objMove() {
		clearInterval(obj.dragTimer);
		clearInterval(obj.timer)
		obj.dragTimer = setInterval(function() {
			var L = obj.offsetLeft + iSpeedX;
			var T = obj.offsetTop + iSpeedY;
			var maxL = oList.offsetWidth - obj.offsetWidth;
			var maxT = oList.offsetHeight - obj.offsetHeight
			iSpeedX *= 0.97;
			iSpeedY *= 0.97;
			if(L > maxL) {
				L = maxL;
				iSpeedX *= -1;
				iSpeedX *= 0.75;
				iSpeedY *= 0.85;
			} else if(L < 0) {
				L = 0
				iSpeedX *= -1;
				iSpeedX *= 0.75;
				iSpeedY *= 0.90;
			}

			if(T > maxT) {
				T = maxT;
				iSpeedY *= -1;
				iSpeedY *= 0.75
				iSpeedX *= 0.90;
			} else if(T < 0) {
				T = 0;
				iSpeedY *= -1;
				iSpeedY *= 0.75;
				iSpeedX *= 0.90;
			}

			if(Math.abs(iSpeedX) < 1 && Math.abs(iSpeedY) < 1) {
				clearInterval(obj.dragTimer);
			}
			obj.style.left = L + 'px';
			obj.style.top = T + 'px';
		}, 20);
	}
}

window.onresize = function() {
	var W = document.documentElement.clientWidth;
	var H = document.documentElement.clientHeight;
	document.body.style.width = W + 'px';
	document.body.style.height = H + 'px';
	if(window.cancelRandom || oRange.onOff == true) {
		var aLiWidth = aLi[0].offsetWidth;
		var aLiHeight = aLi[0].offsetHeight;
		var moveL = (oList.offsetWidth - aLiWidth * 5) / 2;
		var moveT = (oList.offsetHeight - aLiHeight * 5) / 2;
		for(var i = 0; i < aLi.length; i++) {
			myMove(aLi[i], {
				'left': moveL + i % 5 * aLiWidth,
				'top': moveT + Math.floor(i / 5) * aLiHeight
			});
		}
	} else {
		positionRandom();
	}
}

function clearBugTab(obj, aLiWidth, aLiHeight, i) {
	var yImg = new Image();
	yImg.src = 'img/' + window.view + '.jpg';
	yImg.onload = function() {
		for(var j = 0; j < aLi[0].children.length; j++) {
			obj.children[j].style.backgroundImage = 'url(' + yImg.src + ')';
			obj.children[0].style.backgroundPosition = -i % 5 * aLiWidth + 'px ' + -Math.floor(i / 5) * aLiHeight + 'px';
		}
	}
}

function toJoin() {
	window.cancelRandom = true;
	var aLiWidth = aLi[0].offsetWidth;
	var aLiHeight = aLi[0].offsetHeight;
	var moveL = (oList.offsetWidth - aLiWidth * 5) / 2;
	var moveT = (oList.offsetHeight - aLiHeight * 5) / 2;

	var aA = oList.getElementsByTagName('a');
	aA[aA.length - 1].addEventListener('webkitTransitionEnd', end, false);
	for(var i = 0; i < aA.length; i++) {
		clearInterval(aLi[i].dragTimer);
		clearInterval(aLi[i].timer);
		aA[i].style.backgroundImage = 'url(img/' + window.view + '.jpg)';
		aA[i].style.backgroundPosition = (-i % 5 * aLiWidth) + 'px ' + (-Math.floor(i / 5) * aLiHeight) + 'px';
		aA[i].style.opacity = '1';
		aLi[i].style.transform = 'rotate(0)';
		aLi[i].onmouseover = null;
		aLi[i].onmouseout = null;
		aLi[i].onmousedown = null;
	}

	function end() {
		this.removeEventListener('webkitTransitionEnd', end, false);
		for(var i = 0; i < aLi.length; i++) {
			myMove(aLi[i], {
				'left': moveL + i % 5 * aLiWidth,
				'top': moveT + Math.floor(i / 5) * aLiHeight
			});
		}
		next.style.display = prev.style.display = 'block';
	}

}

function toSplit() {
	oList.onclick = null;
	window.cancelRandom = false;

	var aA = oList.getElementsByTagName('a');
	var aStrong = oList.getElementsByTagName('strong');
	for(var i = 0; i < aA.length; i++) {
		aA[i].style.opacity = '';
		aStrong[i].style.opacity = 0;
		drag(aLi[i]);
		aLi[i].onmouseover = function() {
			this.style.webkitTransform = 'rotate(' + 0 + 'deg) scale(1.2)';
			this.style.zIndex = '20';
		}
		aLi[i].onmouseout = function() {
			var rotate = Math.floor(Math.random() * 30) * Math.pow(-1, Math.floor(Math.random() * 1000));
			this.style.webkitTransform = 'rotate(' + rotate + 'deg)';
			this.style.zIndex = '';
		}
	}
	next.style.display = prev.style.display = '';
	positionRandom();
}
picTab();

function picTab() {

	next.onclick = function() {
		next.addEventListener('webkitTransitionEnd', btnChange, false);
		this.style.opacity = '0.2';
		this.style.webkitTransform = 'scale(1.3)';
		if(!oList.off) {
			picTab2D(1);
		}
	}
	prev.onclick = function() {
		prev.addEventListener('webkitTransitionEnd', btnChange, false);
		this.style.opacity = '0.2';
		this.style.webkitTransform = 'scale(1.3)';
		if(!oList.off) {
			picTab2D(-1);
		}
	}
	prev.onmousedown = next.onmousedown = function(ev) {
		var ev = ev || window.event;
		ev.preventDefault();
	}

	function btnChange() {
		this.removeEventListener('webkitTransitionEnd', btnChange, false);
		this.style.opacity = '1';
		this.style.webkitTransform = 'scale(1)';
	}
}

function picTab2D(num) {
	oList.off = true;
	var aA = oList.getElementsByTagName('a');
	var aStrong = oList.getElementsByTagName('strong');
	var aLiWidth = aLi[0].offsetWidth;
	var aLiHeight = aLi[0].offsetHeight;
	for(var i = 0; i < aStrong.length; i++) { //strong璁板綍褰撳墠
		aStrong[i].style.opacity = 1;
		aStrong[i].style.backgroundImage = 'url(img/' + window.view + '.jpg)';
		aStrong[i].style.backgroundPosition = (-i % 5 * aLiWidth) + 'px ' + (-Math.floor(i / 5) * aLiHeight) + 'px';
	}
	window.view += num;
	if(window.view == arrImg.length) {
		window.view = 0;
	} else if(window.view == -1) {
		window.view = arrImg.length - 1;
	}
	for(var i = 0; i < aA.length; i++) { //a鏍囩鍙樹笅涓€寮�
		aA[i].style.backgroundImage = 'url(img/' + window.view + '.jpg)';
		aA[i].style.backgroundPosition = (-i % 5 * aLiWidth) + 'px ' + (-Math.floor(i / 5) * aLiHeight) + 'px';
	}
	if(Math.random() > 0.7) {
		var randomArr = getChildArr(); //涓ゅ眰闅忔満鏁扮粍
		for(var i = 0; i < randomArr.length; i++) {
			(function(n) {
				var delay = n * 100;
				setTimeout(function() {
					for(var i = 0; i < randomArr[n].length; i++) {
						moveFn(aStrong[randomArr[n][i]], {
							'left': aLiWidth * num
						}, 250, 'easeOut');
					}
				}, delay);
			})(i);
		}
		setTimeout(function() {
			for(var i = 0; i < aStrong.length; i++) {
				aStrong[i].style.backgroundImage = 'url(img/' + window.view + '.jpg)';
				aStrong[i].style.left = 0;
			}
			oList.off = false;
		}, 700);

	} else if(Math.random() > 0.3) {

		for(var i = 0; i < aStrong.length; i++) {
			moveFn(aStrong[i], {
				'left': aLiWidth * num
			}, 250, 'easeOut');
		}
		setTimeout(function() {
			for(var i = 0; i < aStrong.length; i++) {
				aStrong[i].style.backgroundImage = 'url(img/' + window.view + '.jpg)';
				aStrong[i].style.left = 0;
			}
			oList.off = false;
		}, 300);
	} else {
		for(var i = 0; i < 5; i++) {
			(function(n) {
				var delay = n * 100;
				setTimeout(function() {
					for(var i = n * 5; i < n * 5 + 5; i++) {
						moveFn(aStrong[i], {
							'left': aLiWidth * num
						}, 250, 'easeOut');
					}
				}, delay);
			})(i);
		}
		setTimeout(function() {
			for(var i = 0; i < aStrong.length; i++) {
				aStrong[i].style.backgroundImage = 'url(img/' + window.view + '.jpg)';
				aStrong[i].style.left = 0;
			}
			oList.off = false;
		}, 700);
	}
}

function getChildArr() {
	var allArr = [];
	var newArr = [];
	for(var i = 0; i < imgLen; i++) {
		allArr.push(i);
	}
	for(var j = 0; j < 5; j++) {
		var oldArr = []
		for(var i = 0; i < 5; i++) {
			var val = Math.floor(Math.random() * allArr.length);
			oldArr.push(allArr.splice(val, 1));
		}
		newArr.push(oldArr);
	}
	return newArr;

}

lightMove();

function lightMove() {
	var oLight = document.getElementById('light')
	var num = -60;
	setInterval(function() {
		num += 5;
		oLight.style.backgroundPosition = num + 'px 0';

		if(num == 350) {
			num = -60;
		}
	}, 40);
}

var oRange = document.getElementById('range');
oRange.onclick = function() {
	if(this.onOff) {
		positionRandom();
		oRange.innerHTML = '平铺排序';
	} else {
		var aLiWidth = aLi[0].offsetWidth + 40;
		var aLiHeight = aLi[0].offsetHeight;
		var moveL = (oList.offsetWidth - aLiWidth * 5) / 2;
		var moveT = (oList.offsetHeight - aLiHeight * 5) / 2;
		for(var i = 0; i < aLi.length; i++) {
			myMove(aLi[i], {
				'left': moveL + i % 5 * aLiWidth,
				'top': moveT + Math.floor(i / 5) * aLiHeight
			});
		}
		oRange.innerHTML = '随机排序';
	}
	this.onOff = !this.onOff;
}

var linkCSS = document.getElementById('lickCSS');

window.mod3D = false;

var box = document.getElementById('box');