# JQuery的整体框架,从下图我们可以看出jquery的整体架构

![image](https://github.com/zhanghuiqi205/Source-code-analysis/blob/master/image/001.png)

JQuery的设计中，最主要的就是功能就是操作DOM的能力，jQuery把复杂的DOM选取映射到了简单的CSS选择器。其次就是提供了很多工具方法。通过简单的API实现很多很复杂的功能，以达到其核心的目的：The Write Less, Do More.

## 我们先把JQuery大体进行简单的分析，首先是最外层的结构：
- 1.外层沙箱及命名空间（闭包结构）：
代码如下：
 ``` 
(function( window, undefined ) {
     //用一个函数域包起来，就是所谓的沙箱
     //在这里边var定义的变量，属于这个函数域内的局部变量，避免污染全局
     //把当前沙箱需要的外部变量通过函数参数引入进来
     //只要保证参数对内提供的接口的一致性，你还可以随意替换传进来的这个参数
    "use strict";
    window.jQuery = window.$ = jQuery;
   })( window ); 
```
 ### 匿名函数自执行，内部形成独立的作用域.给外部暴露了一个接口，挂载在了window上.
jQuery 具体的实现，都被包含在了一个立即执行函数构造的闭包里面，为了不污染全局作用域，只在后面暴露 $ 和 jQuery 这 2 个变量给外界，尽量的避开变量冲突。
- 2.JQuery的实例化
在我们使用JQuery的时候，并没有用new的方法来创建一个实例化，而是直接使用的，比如：直接使用$('text')的方法，并没有使用new $("text")。当然使用也没有错误，不过我们习惯了使用第一种的方式，使用第一种其本质也是相当于 new jQuery()。那么JQuery的内部是怎么处理的呢？我们来看代码，如下：
```
 (function(window, undefined) {
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
         jQuery.fn.init.prototype = jQuery.fn;
 })(window);
```
我们看上面的代码，看到我着重标注的地方，就是关键的地方，这就是为什么我们不需要实例化就可以使用JQuery的方法的原因。我们来进行分析一下：
   1. 为什么我们可以直接使用$('')的方法，是因为其内部调用的是 return new jQuery.fn.init(selector, context, rootjQuery) 这一句话，也就是构造实例是交给了 jQuery.fn.init() 方法去完成。
   1. jQuery.fn.init 的 prototype 属性设置为 jQuery.fn，那么使用 new jQuery.fn.init() 生成的对象的原型对象就是 jQuery.fn ，所以挂载到 jQuery.fn 上面的函数就相当于挂载到 jQuery.fn.init() 生成的 jQuery 对象上，所有使用 new jQuery.fn.init() 生成的对象也能够访问到 jQuery.fn 上的所有原型方法.
   1. 也就是实例化方法存在这么一个关系链jQuery.fn.init.prototype = jQuery.fn = jQuery.prototype.                 
   1. new jQuery.fn.init() 相当于 new jQuery() ;                                                                                     
   1. jQuery() 返回的是 new jQuery.fn.init()，而 var obj = new jQuery()，所以这 2 者是相当的，所以我们可以无 new 实例化 jQuery 对象。通过上面的代码，我们看出来为什么我们不需要实例化就可以使用jQuery的方法。用网上的一张图片说明关系：

![image](https://github.com/zhanghuiqi205/Source-code-analysis/blob/master/image/002.jpg)
- .jQuery.fn.extend 与 jQuery.extend的理解：
   1. extend 方法在 jQuery 中是一个很重要的方法，jQuey 内部用它来扩展静态方法或实例方法，而且我们开发 jQuery 插件开发的时候也会用到它。但是在内部，是存在 jQuery.fn.extend 和 jQuery.extend 两个 extend 方法的，而区分这两个extend方法是理解 jQuery 的很关键的一部分。
      1.  jQuery.extend(object) 为扩展 jQuery 类本身，为类添加新的静态方法；
      2.  jQuery.fn.extend(object) 给 jQuery 对象添加实例方法，也就是通过这个 extend 添加的新方法，实例化的 jQuery 对象都能使用，因为它是挂载在 jQuery.fn 上的方法（上文有提到，jQuery.fn = jQuery.prototype ）。 
它们的官方解释是：
      - [x] jQuery.extend(): 把两个或者更多的对象合并到第一个当中，
      - [x] jQuery.fn.extend()：把对象挂载到 jQuery 的 prototype 属性，来扩展一个新的 jQuery 实例方法。
也就是说，使用 jQuery.extend() 拓展的静态方法，我们可以直接使用 $.xxx 进行调用（xxx是拓展的方法名）,而使用 jQuery.fn.extend() 拓展的实例方法，需要使用 $().xxx 调用.下面我们看一下Jquery的源码中是怎么实现的.
```
jQuery.extend = jQuery.fn.extend = function() { 这里是比较关键的地方.
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;
    // Handle a deep copy situation
    // target 是传入的第一个参数
    // 如果第一个参数是布尔类型，则表示是否要深递归，
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        // 如果传了类型为 boolean 的第一个参数，i 则从 2 开始
        i = 2;
    }
 
    // Handle case when target is a string or something (possible in deep copy)
    // 如果传入的第一个参数是 字符串或者其他
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {};
    }
 
    // extend jQuery itself if only one argument is passed
    // 如果参数的长度为 1 ，表示是 jQuery 静态方法
    if (length === i) {
        target = this;
        --i;
    }
    // 可以传入多个复制源
    // i 是从 1或2 开始的
    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        // 将每个源的属性全部复制到 target 上
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                // src 是源（即本身）的值
                // copy 是即将要复制过去的值
                src = target[name];
                copy = options[name];
 
                // Prevent never-ending loop
                // 防止有环，例如 extend(true, target, {'target':target});
                if (target === copy) {
                    continue;
                }
                // Recurse if we're merging plain objects or arrays
                // 这里是递归调用，最终都会到下面的 else if 分支
                // jQuery.isPlainObject 用于测试是否为纯粹的对象
                // 纯粹的对象指的是 通过 "{}" 或者 "new Object" 创建的
                // 如果是深复制
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                    // 数组
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];
 
                        // 对象
                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }
 
                    // Never move original objects, clone them
                    // 递归
                    target[name] = jQuery.extend(deep, clone, copy);
 
                    // Don't bring in undefined values
                    // 最终都会到这条分支
                    // 简单的值覆盖
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    // Return the modified object
    // 返回新的 target
    // 如果 i < length ，是直接返回没经过处理的 target，也就是 arguments[0]
    // 也就是如果不传需要覆盖的源，调用 $.extend 其实是增加 jQuery 的静态方法
    return target;
};
```
- [x] 需要注意的是这一句 jQuery.extend = jQuery.fn.extend = function() {} ，也就是 jQuery.extend 的实现和 jQuery.fn.extend 的实现共用了同一个方法，但是为什么能够实现不同的功能了，这就要归功于 Javascript 强大（怪异？）的 this 了。
   1. 在 jQuery.extend() 中，this 的指向是 jQuery 对象(或者说是 jQuery 类)，所以这里扩展在 jQuery 上；
   1. 在 jQuery.fn.extend() 中，this 的指向是 fn 对象，前面有提到 jQuery.fn = jQuery.prototype ，也就是这里增加的是原型方法，也就是对象方法.

- jQuery 的链式调用及回溯:
接下来我们来看看jQuery中另一个不错的功能，就是它的链式操作，这一点的实现其实很简单，只需要在要实现链式调用的方法的返回结果里，返回this,就能够实现链式调用了。除了链式调用，jQuery 甚至还允许回溯的功能：
// 通过 end() 方法终止在当前链的最新过滤操作，返回上一个对象集合
```
$('div').eq(0).show().end().eq(1).hide();
```
### jQuery 完整的链式调用、增栈、回溯通过 return this 、 return this.pushStack() 、return this.prevObject 实现，看看源码实现：
```
jQuery.fn = jQuery.prototype = {
    // pushStack() 方法通过改变一个 jQuery 对象的 prevObject 属性来跟踪链式调用中前一个方法返回的 DOM 结果集合
    // 当我们在链式调用 end() 方法后, 内部就返回当前 jQuery 对象的 prevObject 属性
  pushStack: function(elems) {
        // 构建一个新的jQuery对象，无参的 this.constructor()，只是返回引用this
        // jQuery.merge 把 elems 节点合并到新的 jQuery 对象
        // this.constructor 就是 jQuery 的构造函数 jQuery.fn.init，所以 this.constructor() 返回一个 jQuery 对象
        var ret = jQuery.merge(this.constructor(), elems);
 
        // 给返回的新 jQuery 对象添加属性 prevObject
        // 所以也就是为什么通过 prevObject 能取到上一个合集的引用了
        ret.prevObject = this;
        ret.context = this.context;
 
     // Return the newly-formed element set
    return ret;
    },
    // 回溯链式调用的上一个对象
    end: function() {
        // 回溯的关键是返回 prevObject 属性
        // 而 prevObject 属性保存了上一步操作的 jQuery 对象集合
    return this.prevObject || this.constructor(null);
    },
    // 取当前 jQuery 对象的第 i 个
    eq: function(i) {
        // jQuery 对象集合的长度
        var len = this.length,
            j = +i + (i < 0 ? len : 0);
 
        // 利用 pushStack 返回
 #### return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    }, 
}
```
- 总的来说，
  1. end() 方法返回 prevObject 属性，这个属性记录了上一步操作的 jQuery 对象合集；
  1. 而 prevObject 属性由 pushStack() 方法生成，该方法将一个 DOM 元素集合加入到 jQuery 内部管理的一个栈中，通过改变 jQuery 对象的 prevObject 属性来跟踪链式调用中前一个方法返回的 DOM 结果集合
  1. 当我们在链式调用 end() 方法后，内部就返回当前 jQuery 对象的 prevObject 属性，完成回溯。

### jQuery中值得学习的地方：
1. 对于正则表达式的使用：jQuery 当中用了大量的正则表达式，我觉得如果研读 jQuery ，正则水平一定能够大大提升.
1. 对于变量冲突的处理：jQuery一开始保存全局变量的 window.jQuery 以及 windw.$.当需要处理冲突的时候，调用静态方法 noConflict()，让出变量的控制权
下面使用网上的一张图片说明一下：

![image](https://github.com/zhanghuiqi205/Source-code-analysis/blob/master/image/003.jpg)

## 这一篇只是jQuery的部分优秀的观点提出来,对后续我们开始对jQuery的源码进行认真仔细的分析
