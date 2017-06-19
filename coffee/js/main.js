(function() {
  /**
   * 页头计算时间
   */
  function greetings($elem) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();

    var greetings =
      hour < 6 ? '凌晨好' :
        hour < 9 ? '早上好' :
          hour < 12 ? '上午好' :
            hour < 14 ? '中午好' :
              hour < 17 ? '下午好' :
                hour < 19 ? '傍晚好' :
                  hour < 22 ? '晚上好' : "夜里好";

    var week = date.getDay();
    week =
      week === 0 ? "日" :
        week === 1 ? "一" :
          week === 2 ? "二" :
            week === 3 ? "三" :
              week === 4 ? "四" :
                week === 5 ? "五" : "六";

    $elem.html(greetings + " " + year + "年" + month + "月" + day + "日 " + "星期" + week);
  }

  greetings($(".greetings"));


  /**
   * 轮播
   */
  $(".slider_banner").lightSlider({
    item: 1,
    autoWidth: false,
    slideMove: 1,             //一次滚动1张
    slideMargin: 10,          //间距

    addClass: 'active',
    mode: "slide",            //使用的模式
    useCSS: false,            //是否使用CSS样式
    cssEasing: 'ease',        //'cubic-bezier(0.25, 0, 0.25, 1)',//
    easing: 'linear',         //'for jquery animation',////

    speed: 1000,              //动画时间 ms'
    auto: true,               //自动播放
    pauseOnHover: true,       //暂停在hover
    loop: true,               //循环播放
    slideEndAnimation: true,  //幻灯片结束动画
    pause: 3000,              //播放的间隔时间

    keyPress: false,          //支持键盘按键
    controls: true,           //显示按钮
    prevHtml: '',             //上一张按钮html内容
    nextHtml: '',             //下一张按钮html内容

    rtl: false,
    adaptiveHeight: false,     //自适应高度

    vertical: false,           //垂直
    verticalHeight: 500,       //垂直高度
    vThumbWidth: 100,          //垂直缩略图宽度

    thumbItem: 10,             //缩略图数量
    pager: true,              //分页
    gallery: false,           //是否使用画廊
    galleryMargin: 5,         //画廊间距
    thumbMargin: 5,           //缩略图间距
    currentPagerPosition: 'middle',//当前页显示的方式

    enableTouch: true,
    enableDrag: true,
    freeMove: true,
    swipeThreshold: 40,       //动画缓冲阀值

    responsive: [],

    onBeforeStart: function (el) {
    },    //初始前执行的函数
    onSliderLoad: function (el) {
    },     //加载时执行的函数
    onBeforeSlide: function (el) {
    },    //滚动开始前执行的函数
    onAfterSlide: function (el) {
    },     //滚动开始后执行的函数
    onBeforeNextSlide: function (el) {
    },//下一滚动时执行的函数
    onBeforePrevSlide: function (el) {
    } //上一帧动画时执行的函数
  });

  /**
   * 页脚占位
   */
  $(document).ready(function () {
    $(".footer_placeholder").height($(".footer_container").outerHeight());
  });


  /**
   * 返回顶部btn
   */
  $(".up_to_top").click(function () {
    $("html,body").animate({
      scrollTop: 0
    }, 200);
  });
})();
