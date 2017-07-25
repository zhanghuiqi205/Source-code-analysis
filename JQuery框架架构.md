# JQuery的整体框架,从下图我们可以看出jquery的整体架构

![image](https://github.com/zhanghuiqi205/Source-code-analysis/blob/master/image/001.png)

JQuery的设计中，最主要的就是功能就是操作DOM的能力，jQuery把复杂的DOM选取映射到了简单的CSS选择器。其次就是提供了很多工具方法。通过简单的API实现很多很复杂的功能，以达到其核心的目的：The Write Less, Do More.

## 我们先把JQuery大体进行简单的分析，首先是最外层的结构：
## 1.外层沙箱及命名空间（闭包结构）：
代码如下：
 ## (function( window, undefined ) {
     //用一个函数域包起来，就是所谓的沙箱
     //在这里边var定义的变量，属于这个函数域内的局部变量，避免污染全局
     //把当前沙箱需要的外部变量通过函数参数引入进来
     //只要保证参数对内提供的接口的一致性，你还可以随意替换传进来的这个参数
    "use strict";
    window.jQuery = window.$ = jQuery;
 ##  })( window );      
 ### 匿名函数自执行，内部形成独立的作用域.给外部暴露了一个接口，挂载了window上.
jQuery 具体的实现，都被包含在了一个立即执行函数构造的闭包里面，为了不污染全局作用域，只在后面暴露 $ 和 jQuery 这 2 个变量给外界，尽量的避开变量冲突。
## 2.JQuery的实例化
在我们使用JQuery的时候，并没有用new的方法来创建一个实例化，而是直接使用的，比如：直接使用$('text')的方法，并没有使用new $("text")。当然使用也没有错误，不过我们习惯了使用第一种的方式，使用第一种其本质也是相当于 new jQuery()。那么JQuery的内部是怎么处理的呢？我们来看代码，如下：

## (function(window, undefined) {
    var                                                                                                      
    // ...
    jQuery = function(selector, context) {
        // The jQuery object is actually just the init constructor 'enhanced'
        // 看这里，实例化方法 jQuery() 实际上是调用了其拓展的原型方法 jQuery.fn.init
###         return new jQuery.fn.init(selector, context, rootjQuery);
    },
 
    // jQuery.prototype 即是 jQuery 的原型，挂载在上面的方法，即可让所有生成的 jQuery 对象使用
    jQuery.fn = jQuery.prototype = {
    
        // 实例化化方法，这个方法可以称作 jQuery 对象构造器
        init: function(selector, context, rootjQuery) {
            // ...
        }
    }
    // jQuery 没有使用 new 运算符将 jQuery 实例化，而是直接调用其函数
    // 要实现这样,那么 jQuery 就要看成一个类，且返回一个正确的实例
    // 且实例还要能正确访问 jQuery 类原型上的属性与方法
    // jQuery 的方式是通过原型传递解决问题，把 jQuery 的原型传递给jQuery.prototype.init.prototype
    // 所以通过这个方法生成的实例 this 所指向的仍然是 jQuery.fn，所以能正确访问 jQuery 类原型上的属性与方法
###         jQuery.fn.init.prototype = jQuery.fn;
## })(window);
我们看上面的代码，看到我着重标注的地方，就是关键的地方，这就是为什么我们不需要实例化就可以使用JQuery的方法的原因。我们来进行分析一下：
 ##### 1.为什么我们可以直接使用$('')的方法，是因为其内部调用的是 return new jQuery.fn.init(selector, context, rootjQuery) 这一句话，也就是构造实例是交给了 jQuery.fn.init() 方法去完成。
 ##### 2.jQuery.fn.init 的 prototype 属性设置为 jQuery.fn，那么使用 new jQuery.fn.init() 生成的对象的原型对象就是 jQuery.fn ，所以挂载到 jQuery.fn 上面的函数就相当于挂载到 jQuery.fn.init() 生成的 jQuery 对象上，所有使用 new jQuery.fn.init() 生成的对象也能够访问到 jQuery.fn 上的所有原型方法.
 ##### 3.也就是实例化方法存在这么一个关系链  
jQuery.fn.init.prototype = jQuery.fn = jQuery.prototype.                                                                         
new jQuery.fn.init() 相当于 new jQuery() ;                                                                                     
jQuery() 返回的是 new jQuery.fn.init()，而 var obj = new jQuery()，所以这 2 者是相当的，所以我们可以无 new 实例化 jQuery 对象。
通过上面的代码，我们看出来为什么我们不需要实例化就可以使用jQuery的方法。
## 3.jQuery.fn.extend 与 jQuery.extend

















