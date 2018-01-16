1. 面向对象是一种编程思想,不同的编程语言都可以实现面向对象这种思想。
2. 我们现在复习一下JS的数据类型，JS数据类型被分为了两大门派，基本类型和引用类型。

     基本类型：Undefined,Null,Boolean,Number,String

     引用类型：Object,Array,Date,RegExp等，说白了就是对象。。
我们都知道，引用类型有方法和属性，但是基本类型是木有的，但是你一定见过这样的代码
```
var str ='abcdef';
var s2 =str.length;
console.log(s2); //6
str是一个基本数据类型，为什么确可以使用length这样的属性。
主要是因为在基本类型中，有三个比较特殊的存在就是：String Number Boolean，
这三个基本类型都有自己对应的包装对象。并且随时等候召唤。
包装对象呢，其实就是对象，有相应的属性和方法。
至于这个过程是怎么发生呢，其实是在后台偷偷发生的。
```

3. 对象与构造器：
```
临时包装对象：
在JS系统中,当我们试图访问一个基本类型数据的属性时,系统会自动地把这个基本类型数据转换成对象。
系统帮助数据捆绑上相关的属性或方法,让它成为对象.这种机制被称为包装对象机制。
上面提到的代码,真正执行的过程是这样的：
//我们平常写程序的过程：
var str = 'abcdef'; //string 基本类型
var s2 = str.length; //在执行到这一句的时候 后台会自动完成以下动作 ：
（ 
 var str = new String('abcdef'); // 1 找到对应的包装对象类型，然后通过包装对象创建出一个和基本类型值相同的对象
 var s2 = str.length; // 6 然后这个对象就可以调用包装对象下的方法，并且返回结给s2.
 str = null;  //    3 之后这个临时创建的对象就被销毁了， str =null; 
 ） 
alert(s2);//6
alert(str);//abcdef     注意这是一瞬间的动作 实际上我们没有改变字符串本身的值。就是做了下面的动作.
这也是为什么每个字符串具有的方法并没有改变字符串本身的原因。
```
4.引用类型和基本包装对象的区别在于：生存期。
引用类型所创建的对象，在执行的期间一直在内存中，而基本包装对象只是存在了一瞬间。
所以我们无法直接给基本类型添加方法：
```
下面两行代码中的str是同一个吗？
var str ='hello';
str.a =10;
console.log(str.a) //undefined
下面我们分析一下这两行代码的执行过程：
var str = 'hello';
str.a = 10; //假设我们想给字符串添加一个属性number ，后台会有如下步骤
{ 
 var str = new String('hello'); // 1 找到对应的包装对象类型，然后通过包装对象创建出一个和基本类型值相同的对象
 str.a = 10; // 2 通过这个对象调用包装对象下的方法 但结果并没有被任何东西保存
 str =null; // 3 这个对象又被销毁
 }
alert(str.a); //undefined  当执行到这一句的时候，因为基本类型本来没有属性，后台又会重新重复上面的步骤
{ 
 var str = new String('hello'); // 1 找到基本包装对象，然后又新开辟一个内存，创建一个值为hello对象
 str.a = undefined   // 2 因为包装对象下面没有number这个属性，所以又会重新添加，因为没有值，所以值是未定 ;然后弹出结果
 str =null; // 3 这个对象又被销毁
}
 由此我们可以得出这样的结论：
 
 JS为了满足万物皆对象,设计了一个包装对象机制。
如果不访问基本类型数据的属性,那么,该数据还是呈现出基本类型数据的特征。
如果需要访问基本类型数据的属性,那么就临时让该数据转换为对象,呈现出对象特性。

那么我们怎么才能给基本类型添加方法或者属性呢？
答案是在基本包装对象的原型下面添加，每个对象都有原型。
String.prototype.a=10;
console.log(str.a); //10
字符串相关方法都是系统在产生字符串包装对象时捆绑到添加的
后续我们会从原型链的角度，详细叙述这个过程。
```
5.JavaScript中this的指向问题：
```
this的指向取决于如何调用，一般来说,this指向谁,就看this所在函数是由哪个对象调用的。
实例化时的this,指向正在实例化的对象。
JS中,由于没有明确的类结构,所以对象成员只有属性,但是把保存了函数的属性又叫做方法。
for in 结构可以遍历处一个对象的所有属性.
下面我们对this的指向问题，认真谈论一下：
this的指向可以分为以下几种情况：
①.this出现在行内绑定中:this指向触发事件的对象
<button onclick="alert(this)">点击我</button>
此时的this代表的是触发事件的对象
②.this出现在动态绑定中: this指向触发事件的对象,this指向调用方法的对象
 <button>点击我</button>
var btn =document.getElementsByTagName("button")[0];
    btn.onclick = function() {
        alert(this);
    }
③.全局函数中出现this:全局函数中的this指向window, this指向调用方法的对象.
function demo(){
    alert(this);
}
demo()
④一个函数不仅能被普通调用,还能被实例化:this指向正在实例化的对象.
function funcA() {
    this.show = function () {
        console.log(this);
    }
}
var a = new funcA();
a.show();
⑤call与apply方法的使用：
这两个方法主要用于改变this的指向：
function funcA() {
    this.name = "hello";
    console.log(this.name);
    this.show = function() {
        console.log(this.name);
    }
}
var objA = {
    name: "objA"
}
a.show.call(objA); //hello  objA
函数.call(对象):  函数中的this指向传参的这个对象
call与apply的作用是一样的,但是传参的形式不同:
函数.call(对象,参数列表);
函数.apply(对象,参数数组);
```
6.JavaScript中原型链的关系：代码如下，我们用图像来标识一下他们的关系

```
function Light() {
    this.name = "hello";
    this.show = function() {
        console.log(this.name);
    }
}
 
var li = new Light();
```
![image](https://note.youdao.com/favicon.ico)