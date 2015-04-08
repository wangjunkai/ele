/**
 * Created by wangjunkai on 2015/2/28.
 */


(function (window) {
    var Ele = function () {
    }
    Ele.prototype = {
        constructor: Ele,
        getDomById: function (selecter) {
            var elem = document.getElementById(/[^#].*/.exec(selecter)[0]);
            this[0] = elem;
            return this;
        },
        getDomByclass: function (selecter) {
            var elem = document.getElementsByClassName(/[^.].*/.exec(selecter)[0]);
            this[0] = elem;
            return this;
        },
        removeClass: function (str, selecter) {
            //i 大小写 g全局
            var newstr = str;
            var find = new RegExp("\\s+\\b" + selecter + "\\b");
            if (str.match(find)) {
                newstr = str.replace(find, "");
            }
            return newstr;
        }
    }
    window.Ele = new Ele();
})(window)

(function(){
    var st = Ele.getDomByclass('.search_text')[0];
    st.onfocus = function () {
        this.parentNode.className += ' focus';
    };
    st.onblur = function () {
        this.parentNode.className = ele.removeClass(this.parentNode.className, 'focus');
    }
})()


