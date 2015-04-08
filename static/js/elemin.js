/**
 * Created by wangjunkai on 2015/3/30.
 */


(function (window) {
    var Ele = function () {
        this.stimer = null;
        this.itimer = null;
        this.elem = null;
        this.owidth = 0;
        this.oleft = 0;
        this.otop = 0;
        this.oright = 0;
    };

    Ele.prototype = {
        queryDom: function (dom, selecter) {
            if (typeof selecter !== 'string') {
                return false;
            }
            else {
                return dom.querySelectorAll(selecter);
            }
        },
        getDomById: function (selecter) {
            Ele.elem = document.getElementById(/[^#].*/.exec(selecter)[0]);
            this[0] = Ele.elem;
            return this;
        },
        getDomByClass: function (selecter) {
            Ele.elem = document.getElementsByClassName(/[^.].*/.exec(selecter)[0]);
            this[0] = Ele.elem;
            return this;
        },

        removeClass: function (target, selecter) {
            var newstr = target.className;
            var find = new RegExp("\\s+\\b" + selecter + "\\b");
            if (str.match(find)) {
                newstr = str.replace(find, "");
            }
            return newstr;
        },

        bindListenerEven: function (target, type, handler) {
            if (target.addEventListener) {
                target.addEventListener(type, handler);
            }
            else {
                target.attachEvent('on' + type, handler);
            }
        },
        createDom: function (target, obj) {
            var dom = document.createElement(target);
            for (var o in obj) {
                dom[o] = obj[o];
            }
            return dom;
        },
        deleteDom: function (selecter) {
            var dom = typeof selecter === 'string' ? Ele.queryDom(document, selecter) : selecter;
            dom.parentNode.removeChild(dom);
        },
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
        getPosition: {
            left: function (target) {
                var left = 0;
                while (target != null) {
                    left += target.offsetLeft;
                    target = target.offsetParent;
                }
                return left;
            },
            top: function (target) {
                var top = 0;
                while (target != null) {
                    top += target.offsetTop;
                    target = target.offsetParent;
                }
                return top;
            },
            width: function (target) {
                return target.offsetWidth;
            },
            height: function (target) {
                return target.offsetHeight;
            },
            bodyWidth: function () {
                return document.body.offsetWidth;
            },
            bodyHeight: function () {
                return document.body.offsetHeight;
            },
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
        setPosition: {
            scollTop: function (top) {
                document.documentElement.scrollTop = top;
                document.body.scrollTop = top;
            }
        },
        setAnimate: function (target, type) {
            var num = 0;
            var that = this;
            if (type == 'out') {
                clearTimeout(Ele.stimer);
                clearInterval(Ele.itimer);
                that.setCss(target, {'opacity': 0});
                that.setCss(target, {'visibility': 'hidden'});
            } else {
                function repeat() {
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
        }

    };
    window.Ele = new Ele();
}(window));

window.onload = function () {
    var searchText = Ele.queryDom(document, '.search-text input[type=text]')[0];

    Ele.bindListenerEven(searchText, 'focus', function () {
        Ele.setCss(this.parentNode, {'background': '#fff'});
    });
    Ele.bindListenerEven(searchText, 'blur', function () {
        Ele.setCss(this.parentNode, {'background': '#4e4e4e'})
    });

    var creatcards = function () {
        var card = Ele.createDom('div', {'className': 'cards ie8'});
        var p = Ele.createDom('p');
        var i = Ele.createDom('i', {'className': 'cards-icon'});
        card.appendChild(p);
        card.appendChild(i);
        return card;
    };

    var getposition = function (houselogo, cards) {
        var cardwidth = Ele.getPosition.width(cards);
        var cardheight = Ele.getPosition.height(cards);
        var logoleft = Ele.getPosition.left(houselogo);
        var logowidth = Ele.getPosition.width(houselogo);
        var logotop = Ele.getPosition.top(houselogo);
        var cardleft = logoleft + logowidth / 2 - cardwidth / 2;
        var cardtop = logotop - cardheight - 5;
        return {'cardleft': cardleft, 'cardtop': cardtop};
    };
    //绑定店铺详细信息
    var elegoli = Ele.queryDom(document, '.house-list li');
    for (var i = 0, j = elegoli.length; i < j; i++) {
        var li = elegoli;
        var bind = function (n) {
            var stime = null;
            var col = Ele.queryDom(li[n], '.house-collect > .collect')[0];
            var infodetail = Ele.queryDom(li[n], '.house-infodetail')[0];
            var infoicon = Ele.queryDom(infodetail, '.info-icon')[0];
            var setdetailposition = function () {
                var position = '';
                var obj = [];
                var detailwidth = Ele.getPosition.width(infodetail);
                var detailheight = Ele.getPosition.height(infodetail);
                var liwidth = Ele.getPosition.width(li[n]);
                var lileft = Ele.getPosition.left(li[n]);
                var litop = Ele.getPosition.top(li[n]);
                var bwidth = Ele.getPosition.bodyWidth();
                var bheight = Ele.getPosition.bodyHeight();
                var right = bwidth - (lileft + liwidth);

                if (detailwidth > right) {
                    detailleft = lileft - detailwidth - 5;
                    obj['right'] = -10;
                    position = '0 -820px';
                }
                else {
                    detailleft = lileft + liwidth + 5;
                    obj['left'] = -6;
                    position = '0 -810px';
                }
                if (detailheight > (bheight - litop)) {
                    detailtop = litop - detailheight + 45;
                    obj['bottom'] = 15;
                }
                else {
                    detailtop = litop - 30;
                    obj['top'] = 45;
                }
                Ele.setCss(infoicon, obj);
                Ele.setCss(infoicon, {'background-position': position});
                Ele.setCss(infodetail, {'left': detailleft, 'top': detailtop, 'visibility': 'visible'});
            };

            Ele.bindListenerEven(li[n], 'mouseover', function (event) {
                Ele.setCss(col, {'display': 'inline-block'});
                setdetailposition();
            });
            Ele.bindListenerEven(li[n], 'mouseout', function () {
                Ele.setCss(col, {'display': 'none'});
                Ele.setCss(infodetail, {'visibility': 'hidden'});
            });
            Ele.bindListenerEven(infodetail, 'mouseover', function (event) {
                var e = event || window.event;
                if (e.stopPropagation) {
                    e.stopPropagation()
                } else {
                    e.cancelBubble = true;
                }
            })
        }(i);
        //绑定标签信息
        var bind = function (n) {
            var houselogo = Ele.queryDom(li[n], '.house-logo span')[0];

            var cards = Ele.queryDom(houselogo.parentNode, '.cards')[0];


            Ele.bindListenerEven(houselogo, 'mouseover', function () {
                Ele.queryDom(houselogo.parentNode, '.cards > p')[0].innerHTML = houselogo.getAttribute('cards-data');
                var obj = getposition(houselogo, cards);
                Ele.setCss(cards, {'left': obj['cardleft'], 'top': obj['cardtop'], 'visibility': 'visible'});
                Ele.setAnimate(cards, 'over');
            });
            Ele.bindListenerEven(houselogo, 'mouseout', function () {
                Ele.setAnimate(cards, 'out');
            });

        }(i)
    }
    var houseprivilege = Ele.queryDom(document, '.privilege');
    for (var i = 0; i < houseprivilege.length; i++) {
        var bindprivilege = function (n) {
            var privilegecards = Ele.queryDom(houseprivilege[n].parentNode, '.cards')[0];
            Ele.bindListenerEven(houseprivilege[n], 'mouseover', function () {
                Ele.queryDom(privilegecards, 'p')[0].innerHTML = houseprivilege[n].getAttribute('cards-data');
                var obj = getposition(houseprivilege[n], privilegecards);
                Ele.setCss(privilegecards, {'left': obj['cardleft'], 'top': obj['cardtop'], 'visibility': 'visible'});
                Ele.setAnimate(privilegecards, 'over');
            });
            Ele.bindListenerEven(houseprivilege[n], 'mouseout', function () {
                Ele.setAnimate(privilegecards, 'out');
            });
        }(i)
    }

    //底部标签
    var tagapplay = Ele.queryDom(document, '.tag > .tag-apply > a')[0];
    Ele.bindListenerEven(tagapplay.parentNode, 'mouseover', function () {
        Ele.setCss(tagapplay, {'display': 'inline-block'});
    });
    Ele.bindListenerEven(tagapplay.parentNode, 'mouseout', function () {
        Ele.setCss(tagapplay, {'display': 'none'})
    });

    //返回顶部
    var Tag = function () {
        this.top = 0;
        this.tagtop = Ele.queryDom(document, '.tag-top')[0];
        this.stime = null;
        this.dis = 'none';
        this.scrollf = function () {
            this.settop();
            if (this.top) {
                this.dis = 'inline-block';
                clearInterval(this.stime)
            }
            else {
                this.dis = 'none';
            }
            Ele.setCss(this.tagtop, {'display': this.dis});
        };
        this.settop = function () {
            this.top = Ele.getPosition.scrollTop();
        }
        this.scroll = function (that) {
            that.scrollf();
            window.onscroll = function () {
                that.scrollf()
            }
        }(this);
        this.bindclick = function (that) {
            Ele.bindListenerEven(that.tagtop, 'click', function () {
                Ele.setPosition.scollTop(0);
            });
        }(this)
    };
    var t = new Tag();

    //
    var carousel = function () {
        var img = Ele.queryDom(document, '.carousel img');
        var playli = Ele.queryDom(document, '.carousel > ul > li');
        var timer = loader = null;
        var i = index = 0;
        var autoplay = function (a) {
            a && (index = a);
            timer = setInterval(function () {
                index++;
                (index >= img.length) && (index = 0);
                loadertimer(index);
            }, 6000);
        };
        var loadertimer = function (a) {
            index = a;
            var numbe = 0;
            clearInterval(loader);
            for (var i = 0, j = img.length; i < j; i++) {
                Ele.setCss(img[i], {'display': 'none'});
                playli[i].className = "";
            }
            playli[index].className = "hover";
            loader = setInterval(function () {
                numbe++;
                (numbe > 50) && (numbe = 50);
                Ele.setCss(img[index], {'display': 'block', 'opacity': (numbe * 2) / 100});
                (numbe == 50) && clearInterval(loader);
            }, 20)
        };
        autoplay();

        for (i = 0; i < playli.length; i++) {
            var f = function (i) {
                playli[i].index = img[i].index = i;
                Ele.bindListenerEven(playli[i], 'click', function () {
                    clearInterval(timer);
                    clearInterval(loader);
                    loadertimer(playli[i].index);
                    autoplay(playli[i].index);
                });
            }(i);
        }
    }()
};



