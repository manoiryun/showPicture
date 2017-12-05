
function myMove(obj,attrs,endFn){
	var iCur = 0;
	var iSpeed = 0;
	clearInterval(obj.timer)
	
	obj.timer = setInterval(function(){
		var iOff = true
		
		for(var attr in attrs){
			
			if(attr == "opacity"){
				var iTarget =  Math.round(attrs[attr]*100);
				iCur = Math.round( css(obj, 'opacity' )*100 );
			}else{
				var iTarget  = Math.round(attrs[attr]);
				iCur = parseInt(css(obj,attr));
			}
			iSpeed = ( iTarget - iCur ) / 7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			
			if(iCur != iTarget){
				iOff = false;			//鍙鏈変竴涓繘鏉ュ氨浼氬弽
				if(attr == "opacity"){
					obj.style.opacity = (iCur + iSpeed)/100;
					obj.style.filter = 'alpha(opactity = '+(iCur + iSpeed)+')';
					
				}else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
				
			}
			
		}
	
		if(iOff == true){			//琛ㄧず涓€涓兘娌¤繘鍘绘墽琛岋紝鍗冲叏閮ㄥ埌杈剧粓鐐�
			
			clearInterval(obj.timer);
			
			endFn && endFn();
		}
	},30)
	
}

function css(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
	
}

function startMove(obj,json,endFn){
	
	clearInterval(obj.timer);
	for(var attr in json){
		obj[attr] = 0;			//瀹氫箟閫熷害
	}
	
	obj.timer = setInterval(function(){
		var iOff = true

		for(var attr in json){
			
			if(attr == "opacity"){
				var iTarget =	Math.round(json['opacity']*100);
				var iCur = css(obj,'opacity')*100;
			}else{
				var iTarget = json[attr];
				var iCur = parseInt(css(obj,attr));
			}
			
		
			obj[attr] += (iTarget - iCur)/8;	//璺▼				//閫熷害涓嶈兘鍏辩敤锛屽鏋滃彧鍐檌Speed灏嗗叡鐢ㄩ€熷害
			obj[attr] *= 0.75;
//			obj[attr] = obj[attr] > 0?Math.ceil(obj[attr]) : Math.floor(obj[attr]);
//			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
				
				
				if(attr == "opacity"){
					
					if( Math.abs(obj[attr])<=1 && Math.abs(iTarget -iCur)<=1 ){
						iCur = iTarget
						obj.style.opacity =  iTarget/100;
						obj.style.filter = 'alpha(opacity='+iTarget+')';
						obj[attr] = 0;
					}else{
						obj.style.opacity =  (iCur + obj[attr])/100;			//css璁ゅ皬鏁般€�
						obj.style.filter = 'alpha(opacity='+(iCur + obj[attr])+')';
					}
					
				}else{
					if( Math.abs(obj[attr])<=1 && Math.abs(iTarget -iCur)<=1){
						iCur = iTarget;
						obj.style[attr] = iTarget + 'px';
						obj[attr] = 0;
					}else{
						
						iOff = false;
						if(Math.abs(obj[attr])<=1){
							obj[attr] = obj[attr] > 0?Math.ceil(obj[attr]) : Math.floor(obj[attr]);
						}
						obj.style[attr] =  iCur + obj[attr] + 'px';
						
					}
					
				
			}
		}
		if(iOff){
			clearInterval(obj.timer);
			endFn && endFn();
		}
		
	},30);
	
}