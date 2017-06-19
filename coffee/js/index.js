(function() {
  /**
   * data
   */
  $.ajax({
    url: "data/index.json",
    type: "GET",
    async: false,	//默认true，异步默认true，同步false。
    contentType: "application/json; charset=utf-8",
    beforeSend: function (XMLHttpRequest) {
    },
    success: function (data, textStatus) {

      //今日推荐
      var $today_lis = $(".today_prod_list li");
      var data_prod_today = data.prod_today;
      for (var i = 0; i < data_prod_today.length; i++) {
        if (i > 5) {
          return false;
        }
        $today_lis.eq(i).find("a").attr("href", data_prod_today[i][0]).html(data_prod_today[i][1]);
      }

      //滚动产品
      var $prod_hot = $(".cycle_box1 li");
      var data_prod_hot = data.prod_hot;
      for (var i = 0; i < data_prod_hot.length; i++) {
        if (i > 5) {
          return false;
        }
        $prod_hot.eq(i).find("a").attr("href", data_prod_hot[i][0]);
        $prod_hot.eq(i).find("img").attr("src", data_prod_hot[i][1]);
        $prod_hot.eq(i).find(".cycle_prod_tit").html(data_prod_hot[i][2]);
      }

      //近期动态 菜单
      var $latest_list_menu = $(".latest_list_menu li");
      var data_latest_menu = data.latest_news.menu;
      for (var i = 0; i < data_latest_menu.length; i++) {
        if (i > 5) {
          return false;
        }
        $latest_list_menu.eq(i).find("a").attr("href", data_latest_menu[i][0]).html(data_latest_menu[i][1]);
      }
      //近期动态 新闻
      var $latest_list_new = $(".latest_list_new li");
      var data_latest_new = data.latest_news.new;
      for (var i = 0; i < data_latest_new.length; i++) {
        if (i > 5) {
          return false;
        }
        $latest_list_new.eq(i).find("a").attr("href", data_latest_new[i][0]).html(data_latest_new[i][1]);
      }
      //近期动态 资讯
      var $latest_list_info = $(".latest_list_info li");
      var data_latest_info = data.latest_news.info;
      for (var i = 0; i < data_latest_info.length; i++) {
        if (i > 5) {
          return false;
        }
        $latest_list_info.eq(i).find("a").attr("href", data_latest_info[i][0]).html(data_latest_info[i][1]);
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
    },
    complete: function (XMLHttpRequest, textStatus) {
    }
  });


  /**
   * 滚动产品
   */
  function cycle_sroll() {
    /*使用div时，请保证colee_left2与colee_left1是在同一行上*/
    //速度数值越大速度越慢

    var interval = 30;

    var $container = $("#cycle_container");
    var $box1 = $(".cycle_box1");
    var $box2 = $(".cycle_box2");

    //将 class 为 cycle_box1 的元素的内容 复制给 class 为 cycle_box2 的元素的内容中
    $box2.html($box1.html());

    //如果 colee_left2的宽度-右拉距离 小于等于0
    //右拉距离=右拉距离-colee_left1的宽度
    //否则
    //右拉距离+1
    function Marquee() {
      if ($box2[0].offsetWidth - $container[0].scrollLeft <= 0) {//offsetWidth 是对象的可见宽度
        $container[0].scrollLeft -= $box1[0].offsetWidth;//scrollLeft 是对象的实际内容的宽，不包边线宽度(初始化)
      } else {
        $container[0].scrollLeft++;
      }
    }

    var timer = setInterval(Marquee, interval);
    //鼠标悬停，停止左移
    //鼠标移开，继续移动
    $container
      .mouseenter(function () {
        clearInterval(timer);
      })
      .mouseleave(function () {
        timer = setInterval(Marquee, interval);
      });
  }


  cycle_sroll();


})();







