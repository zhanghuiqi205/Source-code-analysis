if (typeof mainUtil == "undefined") {
	mainUtil = {};
}

/*rgb颜色转换为hex*/
mainUtil.RGBToHex = function(rgb){
	var regexp = /[0-9]{0,3}/g;  
	   var re = rgb.match(regexp);
	   var hexColor = "#"; var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];  
	   for (var i = 0; i < re.length; i++) {
	        var r = null, c = re[i], l = c; 
	        var hexAr = [];
	        while (c > 16){  
	              r = c % 16;  
	              c = (c / 16) >> 0; 
	              hexAr.push(hex[r]);  
	         } hexAr.push(hex[c]);
	         if(l < 16&&l != ""){        
	             hexAr.push(0)
	         }
	       hexColor += hexAr.reverse().join(''); 
	   }   
	   return hexColor; 
}
/*hex颜色转换为rgb*/
mainUtil.HexToRgb=function(sColor){
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	if(sColor && reg.test(sColor)){
		if(sColor.length === 4){
			var sColorNew = "#";
			for(var i=1; i<4; i+=1){
				sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));	
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for(var i=1; i<7; i+=2){
			sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));	
		}
		return sColorChange.join(",");
	}else{
		return sColor;	
	}
}

//检验网址是否正确的函数
mainUtil.CheckUrl = function(str) {
	var RegUrl = new RegExp();
	RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
	if (!RegUrl.test(str)) {
		return false;
	}
	return true;
}
//将用户名添加到Cookie
mainUtil.addCookie=function(name,value,expireTime){//expireTime的单位为分钟
	var cookieString = name+"="+escape(value);          
    if(expireTime>0){ //判断是否设置过期时间
       var date=new Date(); 
       date.setTime(date.getTime()+expireTime*3600*1000); //设置Cookie有效时间
       cookieString=cookieString+"; expires="+date.toGMTString(); 
    } 
    document.cookie=cookieString; 
}
//获取Cookie
mainUtil.getCookie=function(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")); //通过正则表达式获取cookie为name的字符组
    if(arr!=null){
        return unescape(arr[2]); //输入返回
    }
	return null;
}
//删除Cookie
mainUtil.deleteCookie=function(name){
	var date=new Date(); 
    date.setTime(date.getTime()-10000); 
    var value = getCookie(name);
    if(value != null){//判断值是否存在
    	document.cookie = name+"=; expires="+date.toGMTString(); //Cookie值为空
	}
}

//检测Cookie是否被禁用
mainUtil.checkCookieEnabled=function(){
	var result = false;
	if(navigator.cookieEnabled){return true;}
	document.cookie = "testcookie=yes";
	var cookieSet = document.cookie;
	if(cookieSet.indexOf("testcookie=yes")>-1){
		result =  true;
		document.cookie="";
		return result;
	}
}
//设置Cookie
mainUtil.setCookie=function(name,value){
	var time = 30;//保存cookie30天
	var expire = new Date();
	expire.setTime(expire.getTime()+time*3600*24*1000);
	document.cookie = name+"="+escape(value)+"; expires="+expire.toUTCString();
}
//获取系统当前时间
mainUtil.showTime = function(id){
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var dateArr = ["日","一",'二','三','四','五','六'];
    var day = myDate.getDay();
    var hours = myDate.getHours();
    var minutes = mainUtil.formatTime(myDate.getMinutes());
    var seconds = mainUtil.formatTime(myDate.getSeconds());
    var systemTime = document.getElementById(id);
    systemTime.innerHTML = " " + year + "年" + month +"月" + date + "日" + " 星期" + dateArr[day] + " " + hours + ":" + minutes + ":" + seconds;
    setTimeout("showTime()",500);
  }
  //格式化时间：分秒。
  mainUtil.formatTime =function (i){
    if(i < 10){
      i = "0" + i;
    }
    return i;
  }
  
  /* Scroll to Top   返回顶部 */

  $(".totop").hide();

  $(function(){
    $(window).scroll(function(){
      if ($(this).scrollTop()>300)
      {
        $('.totop').slideDown();
      } 
      else
      {
        $('.totop').slideUp();
      }
    });

    $('.totop a').click(function (e) {
      e.preventDefault();
      $('body,html').animate({scrollTop: 0}, 500);
    });

  });
  /* Scroll to Top   返回顶部 */
  
  // 锚点滑动的动画函数封装
$(document).ready(function() {
	$("a.anchorLink").anchorAnimate()
});

jQuery.fn.anchorAnimate = function(settings) {

 	settings = jQuery.extend({
		speed : 1100
	}, settings);	
	
	return this.each(function(){
		var caller = this
		$(caller).click(function (event) {	
			event.preventDefault();
			var locationHref = window.location.href
			var elementClick = $(caller).attr("href")
			
			var destination = $(elementClick).offset().top;
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, settings.speed, function() {
				window.location.hash = elementClick
			});
		  	return false;
		})
	})
}
// 锚点滑动的动画函数封装
