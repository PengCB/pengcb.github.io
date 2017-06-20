(function(){

  /** get data **/
  $.ajax({
    url: 'data/data.json',
    type: "GET",
    async: true,	//默认true，异步默认true，同步false。
    contentType: "application/json; charset=utf-8",
    beforeSend: function (XMLHttpRequest) {},
    success: function (data, textStatus) {
      // data skills
      var skills = data.skills;
      var html = '';
      for (var i=0;i<skills.length;i++){
        html += '<li>' + skills[i] + '</li>';
      }
      $('.skill-list').html(html);


      // data experience
      var experience = data.experience;
      html = '';
      for (var i=0;i<experience.length;i++){
        html += '<li><h3>'+ experience[i].time +'</h3><p>' + experience[i].description + '</p></li>';
      }
      $('.experience').html(html);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {},
    complete: function (XMLHttpRequest, textStatus) {}
  });

  // 菜单
  $('.menu-list').html(
    (function() {
      var $box_title = $('.box-title');
      var html = '';
      for (var i = 0; i < $box_title.length; i++) {
        html += '<li><a href="javascript:;">' + $box_title.eq(i).html() + '</a></li>';
      }
      return html;
    })()
  );


  /** header **/
  // 返回顶部
  $('.to-top').click(function(){
    $("html,body").animate({scrollTop: 0}, 200)
  });

  // 菜单
  $('.menu-icon').hover(
    function(){$('.menu-list').stop().show(500);},
    function(){$('.menu-list').stop().hide(500);}
  );

  // 头像显名
  $('.my-head').hover(
    function(){$('.show-name').stop().animate({'margin-top':'-60px'});},
    function(){$('.show-name').stop().animate({'margin-top':'0px'});}
  );






  /** box2**/



  /** box4 **/
  $('.hobby-img')
    .on('mouseenter', function() {$(this).find('.over-img').fadeIn(500);})
    .on('mouseleave', function() {$(this).find('.over-img').fadeOut(500);});


  /** box5 **/
  $('.my-prod li')
    .hover(
      function(){
        var $li = $(this);
        var $img = $li.find('img');

        var li_h = parseInt($li.css('height'));
        var img_h = parseInt($img.css('height'));
        var minus = -(img_h-li_h+20);

        if(minus<0) {
          $img.stop().animate({'margin-top': minus}, 1000);
        }
      },
      function(){
        var $li = $(this);
        var $img = $li.find('img');
        $img.stop().animate({'margin-top': 0}, 1000);
      }
    )
    .on('mouseenter', function() {
      $(this).addClass('active').siblings('.active').removeClass('active');
    });

})();