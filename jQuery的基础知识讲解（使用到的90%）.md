###### 简介：我相信做前端的大部分人都是用过这个框架，严格意义上还不能说是框架，只能说是常用函数库的一个封装。
###### jQuery的优势：
- 强大的选择器（利用CSS的优势）
- 出色的DOM操作
- 可靠的事件处理机制
- 完善的ajax 
- 出色的浏览器兼容
- 链式操作 （一大特点）
- 丰富的插件并支持扩展
- 完善的文档
- 开源
###### 如何使用呢，可以下载它的压缩包或者引入网上的CDN。总的来说还是很方便的。
###### 我们闲话少说，直接开始我们的讲解：
### 1. jQuery选择器：
###### 选择器是jQuery的根基，在jQuery中，对事件处理、遍历DOM和Ajax操作都依赖于选择器, jQuery的行为规则都必须在获取到元素后才能生效。
###### jQuery选择器分为：
	基本选择器; 
	层级选择器; 
	常用伪类选择器: 可以看作是一种特殊的类选择符; 
- Query基本选择器:
包括ID选择器，标签选择器，类选择器，通配选择器和组选择器5种
   1. ID选择器： $("#id")  根据给定的ID匹配一个元素。 
	如果选择器中包含特殊字符，可以用两个反斜杠转义。
   2. 标签选择器：$("element")  根据给定的元素名匹配所有元素
   3. 类选择器：$(".className")  根据给定的类匹配元素。
   4. 通配选择器：$("*")    匹配指定上下文中所有元素 
   5. 组选择器：$(“selector1,selector2,selectorN”) 特点：无数量限制，以逗号分隔(逐个匹配，并将匹配到的元素合并到一个结果内返回)
- 层级选择器:通过DOM的嵌套关系匹配元素 
jQuery层级选择器----包含后代选择器、子选择器、相邻选择器、兄弟选择器4种 
  1. 包含选择器：$("a b")在给定的祖先元素下匹配所有后代元素。  (不受层级限制)
        ```
        //表示的是id为main 的元素下的所有的input
        	$('#main input').css('background','red');
        ```
  2. 子选择器：$("parent > child") 在给定的父元素下匹配所有子元素
        ```
        //改变id为main的元素下的所有的input子元素的背景为黑色；
        $('#main > input').css('background','black');
        ```
  3. 相邻选择器：$(“div + next”)匹配所有紧接在div元素后的next元素。等同于next()方法
  
        ```
        找寻同级后面的元素
        		//查找id为main的 同级的 下一个input元素
        		$('#main + input').css('background','pink');
        //next()  jq 的方法 查找同级的下一个元素
        $('#main').next('input').css('background','red');
        		$('#main').next().css('background','red');
        
        		//查找id为mian的同级的后面的所有的input
        		$('#main ~ input').css('background','royalblue');
        		//nextAll（）
        		$('#main').nextAll('input').css('background','royalblue');
        //查找id为mian的同级的后面的所有的元素
        $('#main').nextAll().css('background','royalblue');
        ```
    4. d.兄弟选择器：$(“div ~ siblings”)匹配div元素之后的所有兄弟节点。等同于nextAll()方法.
    
        ```
        同级前面的元素
        	//prev() 查找同级的前面一个元素
        	$('#main').prev('input').css('background','red');
        //prevAll() 同级的前面所有的元素
        	$('#main').prevAll('input').css('background','red');
        $('#main').prevAll().css('background','red');
        	//siblings()查找所有的兄弟节点；不包括它自己，可用来做排除节点
        	$('#main').siblings('input').css('background','green')；
        	$('#main').siblings().css('background','green')；
        ```
- 常用伪类选择器:

            选择器 | 说明
            ---|---
            :first |  匹配找到的第1个元素
            :last	 |  匹配找到的最后一个元素
            :eq(index) | 匹配一个给定索引值的元素
            :even | 匹配所有索引值为偶数的元素
            :odd | 匹配所有索引值为奇数的元素
            :gt(index) | 匹配所有大于给定索引值的元素
            :lt(index) |匹配所有小于给定索引值的元素
            :not	 | 去除所有与给定选择器匹配的元素
            :gt(index) | row 2 col 2

```
//:first : 所有ul下的所有li中的第一个li（只有一个）
			$("ul li:first ").css("background-color", "orange");

//:first-child : 每个ul下的第一个li
			$("ul li:first-child").css("background-color", "orange");
				
	//:last-child : 每个ul下的最后一个li
			$("ul li:last-child").css("background-color", "yellow");
				
	//:nth-child(n) : 第n个子节点
			$("ul li:nth-child(2)").css("background-color", "green");
	//偶数 nth-child(even)
		$("ul li:nth-child(even)").css("background-color", "green");
				
	//奇数 nth-child(odd)
		$("ul li:nth-child(odd)").css("background-color", "yellow");
//公式   隔3个改变一下颜色
			$("ul li:nth-child(4n+1)").css("background-color", "pink");
```
- 常用属性选择器：

```
    //返回 含有id属性的div 		
    $(“div[id]”)； 
	//返回name属性等于newsletter	
    $("input[name='newsletter']");
	//返回name属性不等于newsletter
	$("input[name!='newsletter']");
	//[id^=p]: 匹配id以p开头的元素
	$(“input[id^=p] ”);		
	//[id$=p] : 匹配id以p结束的元素
	$(“input[id$=2]”)； 
	//返回name属性包含man的标签 
	$(“input[name*=‘man’]”)； 
//找到所有含有 id 属性，并且它的 name 属性是包含 man 的$("input[id][name*='man']") 
   val()方法：
    $(“input[id$=2]”).val();  //获取该节点的value值
    $(“input[id$=2]”).val(“修改value值”);	//给该节点的value赋值（修改value值）
```
- 常用表单选择器：

```
    :input //匹配所有 input, textarea, select 和 button 元素 
	:text //匹配所有的单行文本框 
	:password //匹配所有密码框 
	:radio //匹配所有单选按钮 
	:checkbox //匹配所有复选按钮 
	:submit //匹配所有提交按钮 
	:reset //匹配所有重置按钮 
	:button //匹配所有按钮 
	:hidden //匹配所有不可见元素，或者type为hidden的元素 
:visible //匹配所有可见元素，或者type为visible的元素 
div:parent //匹配div的父节点元素
p:empty //匹配所有空的p元素
div:contains(x) //匹配文本包含x内容的div元素

查找所有的属性值为radio和checked的节点
console.log($(':radio:checked'));
不能查找下一个文本节点，只能查找下一个标签节点的内容
console.log($(':radio:checked').next().text() )  
得到input后边跟的text文本节点的内容
console.log($(':radio:checked')[0].nextSibling.nodeValue)
//通过判断jq对象的长度 来确定匹配成功的对象的个数
if($('div').length>0){
	console.log('不为空');
}else{
	console.log('为空');
}
```
- 基本筛选器和过滤方法：
###### 元素内容与属性：
```
内容修改 
html([val|fn])    //用于获取（设置）元素HTML内容
text([val|fn])     //用于获取（设置）元素文本内容 
val([val|fn|arr]) //用于获取（设置）表单元素的值
```
###### 属性操作：

```
attr(name|pro|key,val|fn)     //设置或返回被选元素的属性值 
removeAttr(name) 
prop(n|p|k,v|f)    //设置或返回被选元素的属性值（布尔属性） 
removeProp(name)
console.log($('img').attr('src'));		//img/1.jpg
console.log($('img').prop('src'));
//http://127.0.0.1:8020/JQ/november15/img/1.jpg
console.log($('img').attr('title'));		//img
```
   - [x] attr 和 prop的区别
共同点：样式是外联样式时，都找不到，会返回underfind；
不同： attr获取（设置）的是可见的属性值，porp既可以获取（设置）可见属性，也可以获取（设置）隐形属性，prop的返回值为 true或false

```
console.log($(':checkbox').attr('checked') );		//undefined
console.log($(':checkbox').prop('checked'));		//false
$(':checkbox').prop('checked','checked'); //设置checked属性为checked
console.log($(':checkbox').prop('checked'));		//true
$('img').eq(0).attr('attrd','ddd');//设置的属性检查的时候可以看到
$('img').eq(0).prop('propd','ddd');//设置的属性检查的时候看不到
```
###### CSS 类操作：

```
addClass(class|fn) 	//为每个匹配的元素添加指定的类名。 
removeClass([class|fn])
toggleClass(class|fn[,sw]) 	//如果存在（不存在）就删除（添加）一个类。
//toggleClass（） 切换样式  判断是否存在样式 如果有就删除 没有就添加
$('button').first().click(function(){
		$('#box').toggleClass('box2');
})；
判断class是否存在的方法：
hasClass（）
console.log($('#box').hasClass('box2') )//false 返回值为false或者true

show() 和  hide()
$('div:hidden').show(1000); //显示隐藏的jq对象，参数为动画完成时间，可不写,同时改变宽高
$('div:visible').hide(2000);//隐藏jq对象
toggle()：切换显示和隐藏  hide隐藏  show 显示,同时改变宽高
$('button').last().click(function(){
	$('#box').toggle(1000);
})
```
###### CSS操作：

```
css(name|pro|[,val|fn])	//获取（设置）匹配元素的样式属性 
width([val|fn])/height([val|fn]) 
innerWidth()/innerHeight()	不包括边框 
outerWidth(o) /outerHeight (o)	options ? 包含外边距 

height()用法与width()一样
console.log($('#box').width() ) //width
			
console.log($('#box').innerWidth()); //width +padding
			
console.log($('#box').outerWidth()) //width +padding +border
				
console.log($('#box').outerWidth(true)) //width +_padding +border +maring

offset([coordinates])	//获取/设置匹配元素相对浏览器窗口的偏移(包含滚动条滚动的距离), 返回{left:xx,top:xx},。
设置：$(selector).offset({top:value,left:value});

offset () 相对于浏览器窗口的偏移量
console.log( $('#box').offset() );

position()	//获取匹配元素相对父元素(设置了定位)的偏移,如果无设置定位的父元素，则相对于根元素的偏移。(相对于offsetParent元素的偏移量)

position ()  相对于定位父级的偏移量
console.log($('#box2').position().left,$('#box2').position().top);

scrollTop ()
$('body,html').scrollTop(500)  
 //设置滚动距离，body兼容chrome,html兼容firefox
console.log( $('#box').scrollTop() );		//scrollTop获取当前的滚动
```
###### 基本过滤:

选择的样式 | 代表的含义
---|---
$("li:first"); | 第一个元素
$("li:last"); | 最后一个元素
$("ul:eq(1) ") | 第二个UL
$("li:even") | 偶数行 从0开始
$("li:odd") | 奇数行 从1开始
$("tr:gt(0)") | 比0大的
$("tr:lt(2)") | 比2小的
$("tr:hidden") | 隐藏的元素
$(":visible ") | 匹配所有的可见元素
$("li:not(.subnav) ") | 去除所有与给定选择器匹配的元素
$("div:contains('John')") | 包含
$("li:last"); | 最后一个元素
$("li:last"); | 最后一个元素
###### 过滤方法：

```
eq(index|-index),获取第N个元素 
filter(expr|obj|ele|fn),筛选出与指定表达式匹配的元素集合。这个方法用于缩小匹配的范围。用逗号分隔多个表达式 
filter()
$('li').filter('.li,:first').css({
		"width":100,
		"height":100,
		"background":"red"
});
//参数可以是一个回调函数,回调函数返回真和假,返回真的时候 遍历到的元素就会出现在匹配的结果里面,返回假 遍历的元素就不会出现在匹配结果里面
$('li').filter(function(index){
	//index 是遍历到的li 序号
		console.log(index);
		return index%2==0
}).css({
			"width":100,
			"height":100,
			"background":"red"					
		});
slice(start, [end]),选取一个匹配的子集
slice(a,b)   截取下标在[a,b)的元素
$('li').slice(1,4).css('background','red'); //前闭后开[1,4)
$('li').slice(-3).css('background','red'); //从倒数第一个到倒数第三个$('li').slice(-3，-1).css('background','red'); //从倒数第二个到倒数第三个
map(fn),将一组元素转换成其他数组（不论是否是元素数组）
可以用jq的map()方法替代for循环遍历
temp = $(':checkbox:checked').map(function(){
//此处的this相当于$(':checkbox:checked')[i]，是一个js对象,$(this)这样可以把this转化为jq对象
		return this.nextSibling.nodeValue;
}).get().join(' ');			//temp的值为：旅游 睡觉
//map  是一个jq的方法    遍历jq对象的数组部分 ，参数是一个回调函数  回调每执行一次都会有一个返回值
var te = $(':checkbox:checked').map(function(){	
//此处的this相当于$(':checkbox:checked')[i]，是一个js对象
			return this.nextSibling.nodeValue;
	});
console.log(te);		//["旅游↵            ", "睡觉↵            ", prevObject: jQuery.fn.init[2], context: document]
console.log(te.get());		//["旅游↵            ", "睡觉↵            "]
console.log(te.get().join(' '));		//旅游  睡觉


has(expr|ele),保留包含特定后代的元素，去掉那些不含有指定后代的元素。 
not(expr|ele|fn),删除与指定表达式匹配的元素;

not() 排除匹配结果，不能是文本内容
$('li').not('.li,#idli').css('background','red');

hasClass(class),检查当前的元素是否含有某个特定的类，如果有，则返回true。
is(expr|obj|ele|fn), 根据选择器、DOM元素或 jQuery 对象来检测匹配元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true。如果没有元素符合，或者表达式无效，都返回'false'。


is() 判断是否是该元素	
console.log($('#idli').parent().is('ul') );

```
###### 元素关系:

```
parent([expr])  只筛选出最近的一个父节点;
parent（）父节点
$('#idli').parent().css("background","black")
parents（） 筛选出各层父节点
console.log($('#parents').parents());

closest(expr|obj|ele)	//从元素本身开始，逐级向上级元素匹配，并返回最先匹配的元素

//closest() 查找最近匹配成功的父节点
	$('#closest li').closest('div').css('background','red');
	
	offsetParent() 方法返回最近的父级定位元素。
定位元素指的是元素的 CSS position 属性被设置为 relative、absolute 或 fixed 的元素。

筛选子节点
//children()  筛选出所有子节点 
	$('#children').children().css('color','red');
//find（） 查找某个子节点，必须有参数
	$('#children').find('span').css('color','gold');
//nextUntil（） 直到匹配结果 结束  匹配范围是[#start,#end)
	$('#start').nextUntil('#end').css('background','green');	
```
###### 元素增删改:

```
元素创建 :   $('<div/>')
元素添加 
内部插入：（子元素） 
$('body').append('<h2>副标题</h2>') 在body内追加h1标题（后置）
$('body'). prepend ('<h1>主标题</h1>') ：向元素内部增加内容（前置）
appendTo()：将内容添加到元素内（后置）
prependTo()：将内容添加到元素内（前置）

append()    //在节点后面添加一个节点
$('.box').append($('<div>我是新创建的</div>'));
appendTo()   //把节点添加到某个节点的子节点的后面
$('<div>我是新创建的</div>').appendTo($('.box'));
//prepend（）  该节点添加新建节点到其子节点前面
$('.box').prepend( $('<div>我是新创建的</div>') );
//prependTo（）  新建节点添加到该节点的子节点前面
$('<div>我是新创建的</div>').prependTo( $('.box') );

外部插入：（同级） 
$("input").after("<span>用户名不合法</span>")：在元素后面插入内容 
$("input"). before("<label>用户名</label>"):在元素前面插入内容 
insertAfter()：将内容插入元素后面 
insertBefore()：将内容插入元素前面

//before（） 在节点的前面添加节点 
$('.box').before($('<div>我是通过before创建的</div>'));
//insertBefore()
$('<div>我是通过before创建的</div>').insertBefore( $('.box') );
//after在节点的后面添加节点
$('.box').after($('<div>我是通过before创建的</div>'))
//insertAfter()
$('<div>我是通过before创建的</div>').insertAfter( $('.box') );

$("p").remove();   删除元素p
$("p").empty();    清空p 

//empty() 清空子节点
$('#btn6').click(function(){
	$('.first').empty();
})
//remove() 移除节点
$('#btn7').click(function(){
	$('.third').remove();
});

clone([Even[,deepEven]])
Even：（true 或 false）是否复制元素的行为，默认为false
deepEven: （true 或 false）是否复制子元素的行为，默认为Even的值 

//clone（） 参数是否复制元素本身的事件 接两个参数 第二个参数是否复制子节点的事件
$('#btn7').clone(true).insertAfter( $('#btn8') );

元素替换：
replaceWith(content|fn)：将指定元素替换成匹配元素
replaceAll(selector)：用匹配的元素替换掉所有 selector匹配到的元素。


//wrap()在每个筛选到的节点的外层包裹一个节点 
$('#btn1').click(function(){
	$('#wrap p').wrap("<b></b>")
})
//unwrap()  移除外层节点
$('#btn2').click(function(){
	$('#wrap p').unwrap();
})
$('#btn3').click(function(){
	
// wrapAll ()把匹配的节点当成一个整体  在整体的外围包裹一个节点
	$('#wrap p').wrapAll('<b></b>')
})
$('#btn4').click(function(){
// wrapInner()在匹配节点的内部去添加一个节点 包裹里面的内容
	$('#wrap p').wrapInner('<b></b>')
})

$('#btn5').click(function(){
	//replaceAll()  替换节点
	$('#replace .first').replaceAll($('.third'))
	//调用对象是想要替换成的节点
	//参数 是将要替换的节点  新建的b标签替换'#replace .first'
	$('<b>替换</b>').replaceAll($('#replace .first'));
})
```
### 2.事件：
1. 事件方法：

```
blur([[data],fn])  //失去焦点时触发 
change([[data],fn]) //值改变时触发 
click([[data],fn])  //点击时触发 
dblclick([[data],fn]) //双击事件 
focus([[data],fn])  //获得焦点
focusin()  focusout()
//在div内部获取到了焦点时触发（只有div内部有input时才能使用）
$('#box').focusin(function(){
	console.log('内部获取到了焦点');
}).focusout(function(){
	console.log('内部失去了焦点');
});
//键盘事件  绑定键盘事件的对象是window
//keydown() 键盘被按下
$(window).keydown(function(e){
	//e 表示键盘
	console.log('按键的值'+e.keyCode);
});


keypress()
$(window).keypress(function(e){
	var charCode = e.charCode;		//e.charCode是按下字母对应的ASCII码
	var ch = String.fromCharCode(charCode);
	console.log(ch);
});
鼠标事件 
mousedown([[data],fn])
mouseup([[data],fn])
mouseenter([[data],fn]) //事件不会冒泡 
mouseleave([[data],fn]) ) //事件不会冒泡 
mouseover([[data],fn])
mouseout([[data],fn])
mousemove([[data],fn])

resize([[data],fn])	窗口大小改变时触发，对象是window
scroll([[data],fn]);
scroll()
$('#box').scroll(function(){
					console.log( $('#box').scrollTop() );
				})
```
2.事件绑定：

```
on(eve,[sel],[data],fn)
命名空间, 自定义事件（对事件加以细分），一次性绑定多个事件，事件之间以空格隔开；
on绑定的事件也可以写成对象
$('div').on({
	'mouseenter': function() {
				$('div').show();
		},
	'mouseleave': function() {
				$('div').hide();
		}
});

//上下拉显示 slide   
$('button').eq(0).click(function(){
	//$('#box').hide(2000);
	//slideUp 向上隐藏
	$('#box').slideUp(2000,function(){
		//动画结束后的回调
		console.log("动画结束");
	});
});

$('button').eq(1).click(function(){
	//$('#box').show(2000);
	//slideDown 下拉显示
	$('#box').slideDown(2000);
});

$('button').eq(2).click(function(){
	//$('#box').toggle(2000);
	//切换上下拉 slideToggle
	$('#box').slideToggle(2000);
});
//animate 组合使用 形成以个动画序列
$('#box').animate({
	"width":"+=200px",
	"height":"+=200px",
	"left":"+=200px",
	"top":"+=200px"
	},1000);
	
	
//stop()
$('button').eq(1).click(function(){
	//首先要知道停止动画的对象,这里的对象就是动画的对象
	//如果不加参数 默认是停止当前动画   剩下的动画会顺序执行
//	$('#box').stop();
	$('#box').stop(true);
})

//finish（） 立即完成
$('button').eq(2).click(function(){
	$('#box').finish();
});


e.pageX 、 e.pageY 、 e.target 、 e.type
$(".cart-list").click(function(e){
	console.log(e.pageX);		//鼠标相对于浏览器的左边距
	console.log(e.pageY);		//鼠标相对于浏览器的上边距
	console.log(e.target);		//事件发生的源头,也就是触发事件的对象
	console.log(e.type);		//事件的种类 比如click、mouseover...	
var $node =$(e.target)  //也可以转换成jq对象
	//判断元素的节点类型是否是span nodeName的值是大写的
	if(e.target.nodeName=="SPAN"){
		e.target.parent().remove();
	};
	
//trim 删除字符串前后的空白字符,字符串中间的空白字符不能删除;

bind() 方法为被选元素添加一个或多个事件处理程序，并规定事件发生时运行的函数。所有bind的事件on都有，现在主流用on，少用bind;


//map 通过jquery调用
	var newArr = [11,22,33,44,55,66,77];
	var newnewArr = $.map(newArr, function(ele,index) {
		console.log(ele); //遍历到的数组的元素的值
		console.log(index) //遍历的数组的元素的序号
		return num*num
	});
// each与map的区别  each没有返回值  each 更快 
each：传入的参数是什么类型，返回的就是什么类型
map :返回值始终为数组
//each  
$(window).scroll(function() {
	$('.louti').each(function(index, ele) {
if($(window).scrollTop() >= $('.louti').eq(index).offset().top) {
		$('ul li').eq(index).find('span').addClass('active');
$('ul li').eq(index).siblings().find('span').removeClass('active');
		}
	})
})			//$('body,html').animate({'scrollTop':0});
//each 用jquery调用
$.each(newArr,function(idnex ,ele){
	console.log(this);
	console.log(idnex);
	console.log(ele);
});


$('a').click(function(e){
	//e eve 执行事件的控件
	//阻止冒泡
	e.stopPropagation();
	//阻止默认行为
	e.preventDefault();
	//return false 即阻止默认行为 也会阻止冒泡
	return false;
});

trigger() 方法触发被选元素的指定事件类型
```
### 完善的ajax
###### ajax优势:
   - [x] 优秀的用户体验  表单实时验证，局部刷新
   - [x]  提高Web程序性能 
   - [x]  减轻服务器与宽带负担


```
$.get(url,[data],[fn],[type]); 		
$.post(url,[data],[fn],[type]);
url:待载入页面的URL地址
data:待发送 Key/value 参数。
callback:载入成功时回调函数。
type:返回内容格式，json, jsonp, text, html, xml, script;
ajax全局设置:
.ajaxError(callback)	//AJAX 请求发生错误时执行函数
.ajaxStart(callback) 	//AJAX 请求开始时执行函数
.ajaxSuccess(callback) 	//AJAX 请求成功时执行函数
```
###### $.ajaxSetup([options]):
设置全局 AJAX 默认选项，options为$.ajax方法中的参数。

```
API地址：
1）/ajax/ajaxtest
	返回一个字符串
2）/ajax/getCity
	获取城市列表，返回json字符串（数组）
3）/ajax/checkname
	验证用户名是否被注册,返回"true"(未注册)/"false"(已注册)
	参数：regname
	已经注册的名字：['张三','李四','王尼玛','奥巴马']
4）/ajax/weibo
	微博信息，返回
5）/ajax/football
	足球解说信息，返回
6）多人聊天室
	获取：/ajax/chat?type=query
	发送：/ajax/chat?type=send
	
	
//	通过jsonp取实现跨域请求
$.ajax({
			dataType:'jsonp',
			type:"get",
			url:"http://localhost:3000/ajax/getJSONP",
  			// ajax/getJSONP 这个是后端给到的一个接口
			success:function(res){
				console.log(res)
			//	update(res)
			},
			error:function(){
				console.log(arguments);			
	}
//从josn文件获得商品列表
$.get("goodlist.json",function(res){
	console.log(res)
	$.each(res,function(index,obj){
		$('ul').append("<li><img src="+this.img+"><span class=goodname>"+this.title+"</span><span class=goodprice>"+this.price+"</span><a href=goodinfo.html?"+this.id+"></a></li>")
	})
})
// 商品详情页
var  gIndex = location.search.replace("?","");
$.get('goodlist.json',function(res){
	$.each(res,function(){
		//如果当前的对象的id == 获取到搜索值得id
		//就是商品的信息
		if(this.id == gIndex){
			//通过产品信息刷新界面
			$('body').append("<div><img src="+this.img+"></div>")
		}
	})
})
	
 	
```
###### 其他知识：

```
Jq入口：
$(function(){});
jQuery(function(){});
$(document).ready(function(){ });
jQuery(document).ready(function(){ });

美化input选择框：
input[type="checkbox"] {
    position: relative;
    width: 10px;
    height: 10px;
    border: 1px solid #006aaf;
    border-radius: 2px;
    vertical-align: middle;
    background: white;
}
input{font-size: 100%;-webkit-appearance: none;outline: none;}
input[type="checkbox"]:checked:after {
    content: '';
    position: absolute;
    left: 1px;
    top: 1px;
    width: 7px;
    height: 4px;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: rotate(-45deg);
}
 input[type="checkbox"]:checked {
    background-color: #006aaf;
}
```

#### 链式写法在取值之后就不能再继续写，因为取值时返回的是取到的值，不再是对象本身。还有其他不会的知识点，可以在工作中使用到去看jQuery的api，不需要每个意思我们都了解到。感谢大家的关注和阅读。

















