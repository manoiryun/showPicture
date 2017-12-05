/*
 * 杩愬姩鍑芥暟锛�
 * 		move(obj,attrs,duration,fx,endFn)
 * 鍙傛暟锛�
 	obj:瑕佽繍鍔ㄧ殑鍏冪礌
 	attrs:瑕佹敼鍙樼殑澶氫釜灞炴€э紝浼犲叆瀵硅薄{top:800,width:800}锛屽嵆浣垮彧鏈変竴涓睘鎬э紝涔熻鍐欏湪瀵硅薄閲�
 	duration锛氳繍鍔ㄦ寔缁椂闂�
 	fx:杩愬姩褰㈠紡(linear鍖€閫焑aseIn鍔犻€熸洸绾縠aseOut鍑忛€熸洸绾縠aseBoth鍔犻€熷噺閫熸洸绾縝ackIn鍥為€€鍔犻€�)
 	endFn:鍥炶皟鍑芥暟
 * 	
 * */
/*
 	鎶栧姩鍑芥暟锛�
 * 		shake(obj,attr,endFn)
 * 	鍙傛暟锛�
 * 	 obj锛氳鎶栧姩鐨勫厓绱�
 * 	attr锛氭姈鍔ㄧ殑灞炴€э紙left,top锛�
 * endFn锛氬洖璋冨嚱鏁�
 * 
 * */

function moveFn(obj,attrs,duration,fx,endFn){
	var j = {};
	for(var attr in attrs){
		j[attr] = {};
		j[attr].b = parseFloat(getComputedStyle(obj)[attr])
		j[attr].c = attrs[attr] - j[attr].b;
	}
	var d = duration;
	var newTime = new Date().getTime();
	clearInterval(obj.time);
	obj.time = setInterval(function(){
		var t = new Date().getTime() - newTime;
		if(t >= d){
			t = d;
		}
		for(var attr in j){
			var b = j[attr].b;
			var c = j[attr].c;
			var v = Tween[fx](t, b, c, d);
			if(attr == 'opacity'){
				obj.style[attr] = v;
			}else{
				obj.style[attr] = v +'px';
			}
		}
		if(t == d){
			clearInterval(obj.time);
			endFn && endFn();
		}
	},20);
}
/*
 	t:宸茶繍鍔ㄦ椂闂�
 	b:璧峰浣嶇疆
 	c:杩愬姩璺濈
 	d:鎬绘椂闂�
 * */
var Tween = {
    linear: function (t, b, c, d){  //鍖€閫�
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //鍔犻€熸洸绾�
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //鍑忛€熸洸绾�
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //鍔犻€熷噺閫熸洸绾�
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //鍔犲姞閫熸洸绾�
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //鍑忓噺閫熸洸绾�
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //鍔犲姞閫熷噺鍑忛€熸洸绾�
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //姝ｅ鸡琛板噺鏇茬嚎锛堝脊鍔ㄦ笎鍏ワ級
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //姝ｅ鸡澧炲己鏇茬嚎锛堝脊鍔ㄦ笎鍑猴級
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //鍥為€€鍔犻€燂紙鍥為€€娓愬叆锛�
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //鍥炵缉鐨勮窛绂�
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //寮圭悆鍑忔尟锛堝脊鐞冩笎鍑猴級
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
}
function shake(obj,attr,endFn){
    var arr = [];
    var timer = null;
    var n = 0;
    if(!obj.num){
        obj.num = parseFloat(getComputedStyle(obj)[attr]);
    }
    //鎷垮埌涓€缁勬暟瀛楋紝鎶栧姩鐨勫箙搴︺€�
    for(var i=20;i>0;i-=2){
        arr.push(i,-i);
    }
    arr.push(0);
    //鐢ㄥ畾鏃跺櫒鏉ュ疄鐜版姈鍔ㄦ晥鏋溿€�
    clearInterval(timer);
    timer = setInterval(function(){
        n++;
        if(n > arr.length-1){
            clearInterval(timer);
            endFn&&endFn();
        }
        obj.style[attr]=arr[n]+obj.num+'px';
    },30);
}