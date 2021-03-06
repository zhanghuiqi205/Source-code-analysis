1. 主要讲述：两链一包(作用域链 原型链 闭包);先讲述作用域，然后闭包，最后原型链.
2. 不同作用域下的变量,可以被引用的空间范围不同。一个变量可以被引用的区域,就是该变量的作用域。
3. 根据全局和局部:可以划分为全局作用域和局部作用域。根据函数:可以划分外部作用域和内部作用域。
4. 全局作用域不能访问局部变量.
```
function fn1(params) {
    var i = 10;
}
fn1();
alert(i); //报错，没有声明这个变量
在函数fn1调用时,调用结束前,i被保存为函数临时对象的属性。调用结束后,函数临时对象都被释放了,其中的i也一起被释放了。
```
5. 局部能访问全局变量
```
var j = 20;
function fn2() {
    alert(j);
}
fn2(); //弹窗输出20
```
6. 作用域链原则4条:
  - [x] 当对一个变量产生引用时,要遵循作用域链原则。尝试引用一个变量,先在当前作用域寻找该变量的声明语句(var 变量名)。有,直接使用该变量。
  - [x] 如果没有,继续向上一级作用域寻找var声明语句。有,直接使用
  - [x] 如果还是没有,继续向上一级作用域寻找var声明语句。有,直接使用
  - [x] 周而复始,直到查询到全局作用域,依然没有var声明语句,系统会隐式(自动)地创建该变量的声明语句。
```
函数作用域是以函数的定义划分的,不是以调用划分的.
示例一：
var a ="全局变量";
function fn1(params) {
    alert(a); //全局变量
}
function fn2(params) {
    var a = "局部变量";
    fn1();
}
fn2();

示例二：
i= 100;
function set_i() {
    var i =10;
    alert(i);
}
set_i(); //10
alert(i);//100
示例三：
function fn1() {
    var i ="a";
    function fn2() {
        i ="b";
        function fn3() {
            i="c";
        }
        fn3();
    }
    fn2();
    alert(i);
}

fn1(); //c

```
7.很多时候可以通过调试来观察：在开发JS时, alert console.log 断点监控技术 console.table console.dir.
8.闭包：在JavaScript中,局部能直接访问全局变量,全局不能访问局部变量.利用这一作用域的特性
```
示例：
function fn1(params) {
    var data = "fn1的局部变量";
}

function fn2() {
    alert(data);
}
fn2(); //报错.

我们利用作用域的原理,改造如下：
function fn1(params) {
    var data = "fn1的局部变量";
    return function(params) {
        alert(data);
    }
}

var fn2 =fn1();
fn2(); //fn1的局部变量
上述的代码，通过抛出一个匿名函数的包袱，实现了外部访问内部变量的功能，称为闭包.
```
9.从这里开始，开始对原型链进行深入的研究：

```
普通对象是由构造器实例化的,原型对象不是构造器实例化出来的,是系统产生的。

构造器和原型有关联关系.可以通过构造器访问原型对象
构造器.prototype 可以访问原型对象

普通对象也可以访问原型对象：普通对象.__proto__ 可以访问原型对象
当然了：原型对象也访问构造器：原型对象.constructor 可以访问构造器
构造器和原型对象之间,是环状引用关系,可以不断循环访问.
示例：

function Light() {
    this.price = 5;
    this.on = function () {
        alert("发光发热");
    }
}
var li = new Light();

```
![image](https://github.com/zhanghuiqi205/Source-code-analysis/blob/master/image/%E5%8E%9F%E5%9E%8B%E9%93%BE%E7%A4%BA%E6%84%8F%E5%9B%BE.png)
10. 形态决定功能:原型链作为一种结构,它带来什么功能?

```
原型链访问原则,共4条:
1、当试图访问一个对象上的属性时,要遵循原型链访问原则。首先在当前对象寻找该属性,如果有,直接使用。
2、如果没有,向该对象的原型对象上继续寻找属性,如果有,使用
3、如果没有,向该对象的原型的原型继续寻找属性,以此类推
4、直到原型链的终点,null也没有,返回undefined
```
11.除了null和undefined,其他所有的数据类型都有对应的系统构造器.
```
字符串对应的系统构造器是 String
数值型对应的系统构造器是 Number
布尔值对应的系统构造器是 Boolean
数组对应的系统构造器是 Array
对象对应的系统构造器是 Object
函数对应的系统构造器是 Function

```
12.函数也是一种对象。对象可以拥有原型。对象可以添加属性。我们主要对函数这种数据类型需要好好分析一下他的原型链结构：
```
我们依然拿上面的例子来说明问题
function Light() {
    this.price = 5;
    this.on = function () {
        alert("发光发热");
    }
}
var li = new Light();
```
![image](https://github.com/zhanghuiqi205/Source-code-analysis/blob/master/image/完整原型链示意图.png)



