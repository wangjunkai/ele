/**
 * Created by wangjunkai on 2015/3/30.
 */


(function (window) {
    var Ele = function () {
        this.init.call(this);
    };

    Ele.prototype = {
        init: function () {
            this.stimer = null;
            this.itimer = null;
            this.elem = null;
        },
        //封装浏览器高级选择器,兼容ie8+以及各大浏览器
        queryDom: function (dom, selecter) {
            if (typeof selecter !== 'string') {
                return false;
            }
            else {
                return dom.querySelectorAll(selecter);
            }
        },
        //通过dom id获取该元素
        getDomById: function (selecter) {
            Ele.elem = document.getElementById(/[^#].*/.exec(selecter)[0]);
            this[0] = Ele.elem;
            return this;
        },
        //通过dom class获取该元素
        getDomByClass: function (selecter) {
            Ele.elem = document.getElementsByClassName(/[^.].*/.exec(selecter)[0]);
            this[0] = Ele.elem;
            return this;
        },
        //删除所选元素的指定class,返回替换后的class
        removeClass: function (target, selecter) {
            var newStr = target.className;
            var find = new RegExp("\\s+\\b" + selecter + "\\b");
            if (newStr.match(find)) {
                //替换为空
                newStr = newStr.replace(find, "");
            }
            return newStr;
        },
        //通用注册事件,兼容ie5+ 以及各大浏览器
        bindListenerEven: function (target, type, handler) {
            if (target.addEventListener) {
                target.addEventListener(type, handler);
            }
            else {
                target.attachEvent('on' + type, handler);
            }
        },
        //创建指定dom元素,并循环复制属性
        createDom: function (target, obj) {
            var dom = document.createElement(target);
            for (var o in obj) {
                dom[o] = obj[o];
            }
            return dom;
        },
        //删除指定dom元素
        deleteDom: function (selecter) {
            var dom = typeof selecter === 'string' ? Ele.queryDom(document, selecter) : selecter;
            dom.parentNode.removeChild(dom);
        },
        //设置元素style样式
        setCss: function (target, obj) {
            for (var o in obj) {
                switch (o) {
                    case 'left':
                        target.style[o] = obj[o] + 'px';
                        break;
                    case 'top':
                        target.style[o] = obj[o] + 'px';
                        break;
                    case 'right':
                        target.style[o] = obj[o] + 'px';
                        break;
                    case 'bottom':
                        target.style[o] = obj[o] + 'px';
                        break;
                    case 'opacity':
                        //兼容ie8+滤镜
                        target.style.opacity = obj[o];
                        target.style.filter = 'Alpha(opacity=' + obj[o] * 100 + ')';
                        break;
                    default :
                        target.style[o] = obj[o];
                        break;
                }
            }

            return this;
        },
        //计算宽度和距离
        getPosition: {
            //获取距离浏览器文档左边的距离,兼容ie,display:table
            left: function (target) {
                var left = 0;
                while (target != null) {
                    left += target.offsetLeft;
                    target = target.offsetParent;
                }
                return left;
            },
            //获取距离浏览器文档上边的距离
            top: function (target) {
                var top = 0;
                while (target != null) {
                    top += target.offsetTop;
                    target = target.offsetParent;
                }
                return top;
            },
            //获取元素包括边宽的宽度
            width: function (target) {
                return target.offsetWidth;
            },
            //获取元素包括边宽的高度
            height: function (target) {
                return target.offsetHeight;
            },
            //获取元素包括滚动条的宽度
            bodyWidth: function () {
                return document.body.offsetWidth;
            },
            //获取元素包括滚动条的高度
            bodyHeight: function () {
                return document.body.offsetHeight;
            },
            //
            scrollTop: function () {
                var top = 0;
                if (window.pageYOffset) {
                    top = window.pageYOffset;
                }
                else if (document.compatMode == 'CSS1Compat') {
                    top = document.documentElement.scrollTop;
                }
                else {
                    top = document.body.scrollTop;
                }
                return top;
            }
        },
        //设置文档滚动条的位置,兼容ie
        setPosition: {
            scollTop: function (top) {
                document.documentElement.scrollTop = top;
                document.body.scrollTop = top;
            }
        },
        //card标签渐变动画 type（out:鼠标移出）
        setAnimate: function (target, type) {
            var num = 0;
            var that = this;
            if (type == 'out') {
                //清除计时器
                clearTimeout(Ele.stimer);
                clearInterval(Ele.itimer);
                that.setCss(target, {'opacity': 0});
                that.setCss(target, {'visibility': 'hidden'});
            } else {
                function repeat() {
                    //每隔30毫秒渐变
                    Ele.itimer = setInterval(function () {
                        num = num + 0.2;
                        if (num > 1) {
                            num = 1;
                        }
                        that.setCss(target, {'opacity': num});
                        if (num == 1) {
                            clearInterval(Ele.itimer);
                        }
                    }, 30);
                }

                Ele.stimer = setTimeout(repeat, 500);
            }
        },
        clone: function (obj) {
            var o = '';
            if (obj != null && typeof obj === 'object') {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0; i < obj.length; i++) {
                        o[i] = arguments.callee(obj[i]);
                    }
                }
                else {
                    o = {};
                    for (var a in obj) {
                        o[a] = arguments.callee(obj[a]);
                    }
                }
            }
            else {
                o = obj;
            }
            return o;
        },
        clonetwo: function (obj) {
            var o, i, j;
            //函数typeof 为function
            if (obj != null && !(obj instanceof RegExp) && !(obj instanceof Date) && typeof obj === 'object') {
                if (obj instanceof Array) {
                    o = [];
                    for (i = 0; i < obj.length; i++) {
                        o[i] = arguments.callee(obj[i]);
                    }
                }
                else {
                    o = {};
                    for (j in obj) {
                        o[j] = arguments.callee(obj[j]);
                    }
                }
            }
            else {
                o = obj;
            }
            return o;
        },
        clonefor: function (parent, child) {
            child = child || {};
            for (var i in parent) {
                if (parent.hasOwnProperty(i)) {
                    if (typeof parent[i] === 'object' && parent[i] != null && !(parent[i] instanceof RegExp) && !(parent[i] instanceof Date)) {
                        child[i] = parent[i] instanceof Array ? [] : {};
                        arguments.callee(parent[i], child[i]);
                    }
                    else {
                        child[i] = parent[i];
                    }
                }
            }
            return child;
        },
        //ES5
        clonetre: function (obj) {
            var o;
            o = JSON.stringify(obj);
            return JSON.parse(o);
        },
        //获取对象类别
        classtype: function (obj) {
            if (obj === null)return 'null';
            if (obj === undefined)return 'undefined';
            return Object.prototype.toString.call(obj).slice(8, -1);
        },
        //通过原型继承创建一个对象
        inherit: function (obj) {
            var type = typeof obj;
            if (type != 'object' || type == 'function' || obj == null)return null;

            if (Object.create) {
                return Object.create(obj);
            }
            function Fun() {
            }

            Fun.prototype = obj;
            return new Fun();

        },
        extend: function (prototype, methed) {
            for (var p in methed) {
                prototype[p] = methed[p];
            }
        },
        //nextSibling
        //previousSibling
        //firstChild
        //lastChild
        //childNodes
        //nodeValue
        //nodeName
        //nodeType

        //parentNode
        //appendChild
        //insertBefore
        //replaceChild
        //removeChild
        traverse: function (target) {
            var array = [];
            var childs = target.childNodes;
            var len = childs.length;
            for (var i = 0; i < len; i++) {
                array = Array.prototype.concat(array, arguments.callee(childs[i]));
            }
            return array;
        },
        //去除array相同的项
        arrayDiffer: function (a, b) {
            var ary = [];
            var i, j;
            ary = ary.concat(a, b);
            for (i = 0; i < ary.length; i++) {
                j = ary.lastIndexOf(ary[i], -1);
                if (ary.indexOf(ary[i], 0) !== j) {
                    ary.splice(j, 1);
                    i = 0;
                }
            }
            return ary;
        },
        //向后插入元素
        insertAfter:function(obj,newcreat){
            var parent = obj.parentNode;
            if(parent.lastChild != obj){
                parent.insertBefore(newcreat,obj.nextSibling);
            }
            else{
                parent.appendChild(newcreat);
            }
        }
    };
    window.Ele = new Ele();


}(window));

if (!window.elemy) {
    elemy = {};
}
window.onload = function () {
    elemy.ceshi = function () {
        function supera() {
            this.supsa = true;
        }

        supera.prototype = {
            pushary: [1, 3, 5],
            getsups: function () {
                return this.supsa;
            }
        };
        function superb() {
            this.supsb = false;
        }

        superb.prototype = new supera();
        var newasuperb = new superb();
        newasuperb.pushary.splice(3, 0, 6);
        var newbsuperb = new superb();
        alert(newbsuperb.pushary.toString());

        function outer() {
            inner();
        }

        function inner() {
            alert(arguments.callee.caller);
        }

        var qwe = [1, 2, 3, 3, 4, 4, 8];
        var erwer = [1, 2, 4, 5, 6, 7];
        //var m = a(qwe, erwer);
        var html = '';
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 5; j++) {
                html = '<div>' + html + '</div>';
            }
            html = new Array(4).join(html);
        }
        var ara = Ele.traverse(document.documentElement);
        var llll = new Date();
        var m = {
            a: {
                q: '1',
                w: function () {
                    return 1;
                },
                e: [1, 2, 3, 4, 5],
                t: null,
                y: undefined,
                u: /^qq/ig,
                i: llll
            },
            b: [
                1, {
                    qwe: function () {
                        return 2;
                    }
                }, function () {
                    return 3
                }
            ]
        };
        var qqq = Ele.clonetwo(m);
        qqq.a.q = '2';
        var eee = m;
        var sdfs = Ele.clonetre(m);
        sdfs.a.q = '3';
        var sd = m;
        var sdfsdf = Ele.clonefor(m);
        var ssss = sdfsdf;

        function Myfunc2() {
            this.x = arguments[0];
            this.y = arguments[1];
        }

        Myfunc2.prototype = {
            abc: function () {
                return 123;
            },
            xy: function () {
                return this.x * this.y;
            }
        };
        function Myfunc3() {
            this.z = arguments[0];
            Myfunc2.call(this, 4, 5);
        }


        function Bbbbb() {

        }

        Bbbbb.prototype = Ele.inherit(Myfunc2.prototype);
        Bbbbb.prototype.constructor = Bbbbb;
    };

    //注册搜索框的渐变效果
    elemy.searchState = function () {
        var searchText = Ele.queryDom(document, '.search-text input[type=text]')[0];
        Ele.bindListenerEven(searchText, 'focus', function () {
            Ele.setCss(this.parentNode, {'background': '#fff'});
        });
        Ele.bindListenerEven(searchText, 'blur', function () {
            Ele.setCss(this.parentNode, {'background': '#4e4e4e'})
        });
    }();

    //创建cards标签
    elemy.createCards = function () {
        var card = Ele.createDom('div', {'className': 'cards ie8'});
        var p = Ele.createDom('p');
        var i = Ele.createDom('i', {'className': 'cards-icon'});
        card.appendChild(p);
        card.appendChild(i);
        return card;
    };

    //获取cards提示标签的位置信息,返回一个对象
    elemy.getPosition = function (houseLogo, cards) {
        var cardWidth = Ele.getPosition.width(cards);
        var cardHeight = Ele.getPosition.height(cards);
        var logoLeft = Ele.getPosition.left(houseLogo);
        var logoWidth = Ele.getPosition.width(houseLogo);
        var logoTop = Ele.getPosition.top(houseLogo);
        var cardLeft = logoLeft + logoWidth / 2 - cardWidth / 2;
        var cardTop = logoTop - cardHeight - 5;
        return {'cardleft': cardLeft, 'cardtop': cardTop};
    };

    //绑定店铺详细信息
    elemy.bindCard = function () {
        var eleGoLi = Ele.queryDom(document, '.house-list li');
        for (var i = 0, j = eleGoLi.length; i < j; i++) {
            var li = eleGoLi;
            var bind = function (n) {
                var col = Ele.queryDom(li[n], '.house-collect > .collect')[0];
                var infoDetail = Ele.queryDom(li[n], '.house-infodetail')[0];
                var infoIcon = Ele.queryDom(infoDetail, '.info-icon')[0];
                var setDetailPosition = function () {
                    var position = '';
                    var detailLeft = null;
                    var detailTop = null;
                    var obj = [];
                    var detailWidth = Ele.getPosition.width(infoDetail);
                    var detailHeight = Ele.getPosition.height(infoDetail);
                    var liWidth = Ele.getPosition.width(li[n]);
                    var liLeft = Ele.getPosition.left(li[n]);
                    var liTop = Ele.getPosition.top(li[n]);
                    var bWidth = Ele.getPosition.bodyWidth();
                    var bHeight = Ele.getPosition.bodyHeight();
                    var right = bWidth - (liLeft + liWidth);
                    //设置边框小三角位置(宽度超出浏览器宽度,高度超出底部最大距离)
                    if (detailWidth > right) {
                        detailLeft = liLeft - detailWidth - 5;
                        obj['right'] = -10;
                        position = '0 -820px';
                    }
                    else {
                        detailLeft = liLeft + liWidth + 5;
                        obj['left'] = -6;
                        position = '0 -810px';
                    }
                    if (detailHeight > (bHeight - liTop)) {
                        detailTop = liTop - detailHeight + 45;
                        obj['bottom'] = 15;
                    }
                    else {
                        detailTop = liTop - 30;
                        obj['top'] = 45;
                    }
                    //设置提示详细信息框的位置和显示属性
                    Ele.setCss(infoIcon, obj);
                    Ele.setCss(infoIcon, {'background-position': position});
                    Ele.setCss(infoDetail, {'left': detailLeft, 'top': detailTop, 'visibility': 'visible'});
                };
                //注册鼠标移到指定商店上的事件
                Ele.bindListenerEven(li[n], 'mouseover', function (event) {
                    Ele.setCss(col, {'display': 'inline-block'});
                    setDetailPosition();
                });
                //注册鼠标离开指定商店上的事件
                Ele.bindListenerEven(li[n], 'mouseout', function () {
                    Ele.setCss(col, {'display': 'none'});
                    Ele.setCss(infoDetail, {'visibility': 'hidden'});
                });
                //清除移到提示详细信息框上的冒泡,兼容ie8
                Ele.bindListenerEven(infoDetail, 'mouseover', function (event) {
                    var e = event || window.event;
                    if (e.stopPropagation) {
                        e.stopPropagation()
                    } else {
                        e.cancelBubble = true;
                    }
                })
            }(i);

            //绑定标签提示信息
            var bind = function (n) {
                var houseLogo = Ele.queryDom(li[n], '.house-logo span')[0];
                var cards = Ele.queryDom(houseLogo.parentNode, '.cards')[0];
                //注册鼠标移动到需要显示提示信息元素上时的事件
                Ele.bindListenerEven(houseLogo, 'mouseover', function () {
                    //填充标签信息
                    Ele.queryDom(houseLogo.parentNode, '.cards > p')[0].innerHTML = houseLogo.getAttribute('cards-data');
                    var obj = elemy.getPosition(houseLogo, cards);
                    Ele.setCss(cards, {'left': obj['cardleft'], 'top': obj['cardtop'], 'visibility': 'visible'});
                    Ele.setAnimate(cards, 'over');
                });
                Ele.bindListenerEven(houseLogo, 'mouseout', function () {
                    Ele.setAnimate(cards, 'out');
                });

            }(i)
        }

        //绑定商店活动标签提示信息
        var housePrivilege = Ele.queryDom(document, '.privilege');
        for (var i = 0, j = housePrivilege.length; i < j; i++) {
            var bindPrivilege = function (n) {
                var privilegeCards = Ele.queryDom(housePrivilege[n].parentNode, '.cards')[0];
                //注册鼠标移动到需要显示商店活动信息 元素上时的事件
                Ele.bindListenerEven(housePrivilege[n], 'mouseover', function () {
                    //填充数据
                    Ele.queryDom(privilegeCards, 'p')[0].innerHTML = housePrivilege[n].getAttribute('cards-data');
                    var obj = elemy.getPosition(housePrivilege[n], privilegeCards);
                    Ele.setCss(privilegeCards, {
                        'left': obj['cardleft'],
                        'top': obj['cardtop'],
                        'visibility': 'visible'
                    });
                    Ele.setAnimate(privilegeCards, 'over');
                });
                Ele.bindListenerEven(housePrivilege[n], 'mouseout', function () {
                    Ele.setAnimate(privilegeCards, 'out');
                });
            }(i)
        }
    }();


    //注册右下标签事件 扫描二维码
    elemy.bindtagApply = function () {
        var tagApply = Ele.queryDom(document, '.tag > .tag-apply > a')[0];
        Ele.bindListenerEven(tagApply.parentNode, 'mouseover', function () {
            Ele.setCss(tagApply, {'display': 'inline-block'});
        });
        Ele.bindListenerEven(tagApply.parentNode, 'mouseout', function () {
            Ele.setCss(tagApply, {'display': 'none'})
        });
    }();

    //注册手机扫描二维码弹框事件
    elemy.bindSweep = function () {
        var sweep = Ele.queryDom(document, '.mobile-content > .show-mobile')[0];
        Ele.bindListenerEven(sweep.parentNode, 'mouseover', function () {
            Ele.setCss(sweep, {'display': 'inline-block'});
        });
        Ele.bindListenerEven(sweep.parentNode, 'mouseout', function () {
            Ele.setCss(sweep, {'display': 'none'})
        });
    }();

    //注册右下标签事件 返回顶部
    elemy.bindTagTop = function () {
        var top = 0;
        var tagTop = Ele.queryDom(document, '.tag-top')[0];
        var iTimer = null;
        var dis = 'none';
        var setDis = function () {
            top = Ele.getPosition.scrollTop();
            dis = top ? 'inline-block' : 'none';
            //到达顶部清除计时器,并将计时器置为null,用来判断是否是 点击向上按钮 触发的滚动条事件
            if (!top) {
                clearInterval(iTimer);
                iTimer = null;
            }
            Ele.setCss(tagTop, {'display': dis});
        };
        var animat = function () {
            //滚动动画
            iTimer = setInterval(function () {
                setDis();
                top = top - Math.ceil(top / 10);
                Ele.setPosition.scollTop(top);
            }, 10);
        };
        //初始化 向上按钮
        setDis();

        Ele.bindListenerEven(window, 'scroll', function () {
            //如果是用户拖动滚动条，就去初始化 向上按钮
            if (!iTimer) {
                setDis();
            }
        });
        Ele.bindListenerEven(tagTop, 'click', function () {
            animat();
        });
    }();

    //轮播图(向上滚动)
    elemy.carousel = function () {
        var carImg = Ele.queryDom(document, '.carousel > .carousel-img')[0];
        var img = Ele.queryDom(carImg, 'img')[0];
        var playLi = Ele.queryDom(document, '.carousel > ul > li');
        var iTimer = null;
        var loader = null;
        var index = 0;
        //图片滚动计时器
        var autoPlay = function (i) {
            //更新索引
            i && (index = i);
            //每隔5秒，将选择显示的图片以滑动的方式显示出来
            iTimer = setInterval(function () {
                index++;
                index = index > (playLi.length - 1) ? 0 : index;//选择的图片索引
                var imgTop = index * Ele.getPosition.height(img);//图片叠加的高度
                loaderTimer(imgTop);
            }, 5000);
        };
        //图片滑动效果计时器
        var loaderTimer = function (imgTop) {
            //如果触发了滑动效果计时器,清除上一次计时器
            clearInterval(loader);
            //添加索引样式
            for (var i = 0; i < playLi.length; i++) {
                playLi[i].className = "";
            }
            playLi[index].className = "hover";
            loader = setInterval(function () {
                //每次增加剩余图片距离的1/10
                var math = (imgTop + carImg.offsetTop ) / 10;
                //处理向前滚动和向后滚动时的两种情况
                math = math < 0 ? -Math.ceil(Math.abs(math)) : Math.ceil(math);
                //如果图片显示完毕，清除此次计时器
                imgTop == Math.abs(carImg.offsetTop) ? clearInterval(loader) : Ele.setCss(carImg, {'top': carImg.offsetTop - math});
            }, 15);
        };
        //初始化滚动计时器
        //autoPlay();
        for (var i = 0; i < playLi.length; i++) {
            var f = function (i) {
                Ele.bindListenerEven(playLi[i], 'click', function () {
                    //每次单击索引时，去更新索引号并且移除前面的计时器
                    index = i;
                    clearInterval(iTimer);
                    clearInterval(loader);
                    loaderTimer(i * Ele.getPosition.height(img));
                    //autoPlay(i);
                });
            }(i);
        }
    }();
    //轮播图(渐变)
    elemy.carouselOpacity = function () {
        var img = Ele.queryDom(document, '.carousel img');
        var playLi = Ele.queryDom(document, '.carousel > ul > li');
        var iTimer = null;
        var loader = null;
        var index = 0;
        var autoPlay = function (a) {
            a && (index = a);
            iTimer = setInterval(function () {
                index++;
                (index >= img.length) && (index = 0);
                loaderTimer(index);
            }, 6000);
        };
        var loaderTimer = function (a) {
            index = a;
            var number = 0;
            clearInterval(loader);
            for (var i = 0; i < img.length; i++) {
                Ele.setCss(img[i], {'display': 'none'});
                playLi[i].className = "";
            }
            playLi[index].className = "hover";
            loader = setInterval(function () {
                number++;
                (number > 50) && (number = 50);
                Ele.setCss(img[index], {'display': 'block', 'opacity': (number * 2) / 100});
                (number == 50) && clearInterval(loader);
            }, 20)
        };
        autoPlay();

        for (var i = 0; i < playLi.length; i++) {
            var f = function (i) {
                playLi[i].index = img[i].index = i;
                Ele.bindListenerEven(playLi[i], 'click', function () {
                    clearInterval(iTimer);
                    clearInterval(loader);
                    loaderTimer(playLi[i].index);
                    autoPlay(playLi[i].index);
                });
            }(i);
        }
    }
};



