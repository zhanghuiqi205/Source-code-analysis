### 从现在开始,我们开始对jQuery的源码进行细致的分析。首先最外层的匿名函数自执行，创建的局部作用域，达到防止变量污染的目标。
- 那么接下来，我们进入源码的内部：我们分析的是jQuery 2.0.3的版本.
源码的开头是：
  1. ## (function( window, undefined ) {  将window作为参数,一是可以提升参数查找速度，二是方便压缩.
   1. undefined这个参数的传递，是为了防止外面的undefined被修改。                             
    // Can't do this because several apps including ASP.NET trace                                 
    // the stack via arguments.caller.callee and Firefox dies if                                                
    // you try to trace through "use strict" call chains. (#13335)  这些都是注释码(更详细的说明,在jQuery中官方网站可以查到)            
    // Support: Firefox 18+                                                     
    //"use strict";   是在严格模式下(很多问题会报错);并不推荐                                                         
......                                                                                              
    1. 接下来就是jQuery的变量声明：                                                                                       
var
	 A central reference to the root jQuery(document)
	rootjQuery,  //jQuery的根目录,提前声明

    1. 在代码后续中有这样的一个声明：第866行： rootjQuery = jQuery(document);
	   1. The deferred used on DOM ready
	readyList,     //DOM加载有关的变量，后续说明
	   1.  Support: IE9
	   1.  For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,  

	   1.  Use the correct document accordingly with window argument (sandbox)
            1. location = window.location,  //网址信息  存储一些全局变量，也方便后续压缩
        	1. document = window.document,
        	1. docElem = document.documentElement,
	// Map over jQuery in case of overwrite
	   1.  _jQuery = window.jQuery,     变量防冲突

	// Map over the $ in case of overwrite
1. 	      _$ = window.$,             变量防冲突

	// [[Class]] -> type pairs 
	
	   1. class2type = {},    类型判断
	// List of deleted data cache ids, so we can reuse them
	1. core_deletedIds = [],          ==和缓存数据有关的,后续说明==
	1. core_version = "2.0.3",     ==版本号==                                                        
    1. core_concat = core_deletedIds.concat, 
    1. re_push = core_deletedIds.push,
    1. re_slice = core_deletedIds.slice,
    1. re_indexOf = core_deletedIds.indexOf,
    1. re_toString = class2type.toString,
    1. re_hasOwn = class2type.hasOwnProperty,
    1. re_trim = core_version.trim,    ==去除前后空格==
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
