
/**
 * 创建一个pager（页码）对象的函数
 */
function Pager(param) {
     
     //默认配置页码对象 
     var DefaultObj = {
         firstPage: "首页",
         prevPage:  "<上一页",
         nextPage:  "下一页>",
         lastPage:  "尾页",
         total: 0,      //总页数
         current:  1,     //当前页数
         limit:   10,      
         panelNumber:   8,    //分页面板中，一行显示最多页码数
         container: document.querySelector(".pager"),       //页码容器
         PageChange: null,      //回调函数,当页码发生改变的时候，会调用该函数
     };
     this.param = Object.assign(DefaultObj, param);         //用Object.assign方法覆盖，得到最终配置
     //ES6 对象提供了 Object.assign()这个方法来实现浅复制, Object.assign() 可以把任意多个源对象自身可枚举的
    // 属性拷贝给目标对象，然后返回目标对象。第一参数即为目标对象,在实际项目中，我们为了不改变源对象。一般会把目标对象传为{}
     
     this.showPage();
     this.registEvent();
}

/**
 *  一个根据当前配置，重新显示页码的函数
 */
Pager.prototype.showPage = function () { 

    this.param.container.innerHTML = "";
    var disabled = "";
    if(this.param.current === 1){
        disabled = "disabled";
    }
    this.createItemPage("first " + disabled, this.param.firstPage);
    console.log("--创建了首页文字--");

    this.createItemPage("prev " + disabled, this.param.prevPage);
    console.log("--创建了上一页文字--");

    //  中间数值
    this.createNumbers();

    var pageNumber = this.getPageNumber();          //总页数
    disabled = "";
    if(this.param.current === pageNumber){
        disabled = "disabled";
    }
    this.createItemPage("next " + disabled, this.param.nextPage);
    console.log("--创建了下一页文字--");

    this.createItemPage("last " + disabled, this.param.lastPage);
    console.log("--创建了尾页文字--");    

    //创建页码文本
    var span = document.createElement("span");
    span.className = "pagerText";
    span.innerHTML = `<i class="current">${this.param.current}</i> / <i class="total">${pageNumber}</i>`;
    this.param.container.appendChild(span);
}

/**
 *  创建单个页码
 */
Pager.prototype.createItemPage = function (exClassName, content) {
    var page = document.createElement("page");
    page.className = "pagerItem " + exClassName;
    page.innerText = content;
    this.param.container.appendChild(page);
    return page;
}

/**
 *  创建中间的面板数字
 */
Pager.prototype.createNumbers = function () {
    var mins = this.param.current - Math.floor(this.param.panelNumber / 2);  //1 -- 8  8/4 = 2,  3-2 = 1 
    if(mins < 1){
        mins = 1;
    }
    var max = mins + this.param.panelNumber - 1;
    var pageNumber = this.getPageNumber();
    if(max > pageNumber){
        max = pageNumber;
    }
    for(var i = mins; i <= max; i++){
        var style = "";
        if(i === this.param.current){
            style = "active";
        }
        this.createItemPage("number " + style, i);
    }
}


/**
 *  根据配置，得到最大页码数
 */
Pager.prototype.getPageNumber = function(){
    return Math.ceil(this.param.total / this.param.limit);  //Math.ceil 向上取整
}


// 注册事件
Pager.prototype.registEvent = function () {
    var that = this;
    this.param.container.addEventListener("click", function (e) {
         //事件委托
         if(e.target.classList.contains("first")){
             that.toPage(1);

         } else if(e.target.classList.contains("prev")){
             that.toPage(that.param.current - 1);

         } else if(e.target.classList.contains("next")){
             that.toPage(that.param.current + 1);

         } else if(e.target.classList.contains("last")){
             that.toPage(that.getPageNumber());

         } else if(e.target.classList.contains("number")){
             that.toPage( + e.target.innerText);
         }

    });
}

/**
 *  跳转到制定页码数
 */
Pager.prototype.toPage = function (page) {
    if(page < 1){
        page = 1;
    }
    var pageNumber = this.getPageNumber();
    if(page > pageNumber){
        page = pageNumber;
    }
    if(this.param.current === page){
        return;
    }
    this.param.current = page;
    this.showPage();
    if(this.param.PageChange){
        this.param.PageChange(page);    //调用回调函数
    }
}





