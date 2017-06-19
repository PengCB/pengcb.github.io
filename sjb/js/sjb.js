(function () {


  /********** 找设计师 **********/
  $('.des-tab-list').mouseenter(function(){
    $(this).addClass('active').siblings().removeClass('active');
    $('.designers_list').eq(($(this).index())).addClass('active').siblings().removeClass('active')
  });
  /********** 设计机构 **********/

  function company_mouseenter() {
    $('.index_rank_img_1').mouseenter(function () {
      $('.index_rank_img_2').stop().animate({'left': '550px'});
      $('.index_rank_img_3').stop().animate({'left': '760px'});
      $('.index_rank_img_4').stop().animate({'left': '970px'});
    });
    $('.index_rank_img_2').mouseenter(function () {
      $('.index_rank_img_2').stop().animate({'left': '210px'});
      $('.index_rank_img_3').stop().animate({'left': '760px'});
      $('.index_rank_img_4').stop().animate({'left': '970px'});
    });
    $('.index_rank_img_3').mouseenter(function () {
      $('.index_rank_img_2').stop().animate({'left': '210px'});
      $('.index_rank_img_3').stop().animate({'left': '420px'});
      $('.index_rank_img_4').stop().animate({'left': '970px'});
    });
    $('.index_rank_img_4').mouseenter(function () {
      $('.index_rank_img_2').stop().animate({'left': '210px'});
      $('.index_rank_img_3').stop().animate({'left': '420px'});
      $('.index_rank_img_4').stop().animate({'left': '630px'});
    });
  }

  company_mouseenter();


  /********** 最新动态 **********/

  function news_list(i) {
    var $info_container = $('.info_container').eq(i);
    var $info_list = $info_container.find('.info_list').eq(0);

    var ul_clone = $info_list.clone();
    $info_container.append(ul_clone[0]);

    var top = 0;

    var timer = setInterval(function () {

      var $info_list_height = parseInt($info_list.css('height')) * (-1);
      // console.log(top);
      // console.log($this_height);
      // console.log(top > $this_height);
      if (top > $info_list_height) {
        top -= 100;
        $info_list.animate({'margin-top': top}, 300);
      } else {
        top = -100;
        $info_list.css({'margin-top': 0}).animate({'margin-top': top}, 1200);
      }
    }, 2000);
  }

  for (var i = 0; i < $('.info_container').length; i++) {
    news_list(i);
  }


  /********** side_tool_box **********/

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll == 0) {
      $('.down_code_box').css('bottom', '0');
      $('.side_tool.go_top').stop().removeAttr('style');
    } else {
      $('.down_code_box').css('bottom', '60px');
      $('.side_tool.go_top').css('display', 'block').stop().animate({'opacity': '1'}, 300);
    }
  });
  $('.side_tool.go_top').click(function () {
    $('html,body').stop().animate({scrollTop: 0});
  });

  $('.side_tool.app_down')
    .mouseenter(function () {
      $('.down_code_box').show();
      $('.down_code_box .down_code').stop().animate({'margin-left': '0'}, 500);
    })
    .mouseleave(function () {
      $('.down_code_box .down_code').stop().animate({'margin-left': '150px'}, 500, function () {
        $('.down_code_box').hide();
      });
    });
})();