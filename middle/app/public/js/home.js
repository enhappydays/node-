$(function() {

  // ------------------ 页头吸顶效果 ------------------------------------------------------

  $(window).on('scroll', function() {
    const scrollTop = $(this).scrollTop();
    const $sticky = $('.app-header-sticky');

    if (scrollTop >= 78) {
      $sticky.addClass('show');
      $sticky.find('> .container').show();
    } else {
      $sticky.removeClass('show');
      $sticky.find('> .container').hide();
    }
  });

  // ------------------ 页头菜单鼠标悬停，显示下级子菜单 ------------------------------------

  $('.app-header-nav > li').on('mouseenter', function() {
    $(this).find('.layer').addClass('open');
  }).on('mouseleave', function() {
    $(this).find('.layer').removeClass('open');
  });

  // ------------------ 轮播图 ------------------------------------------------------

  let timer = null;
  let caroIndex = 0;

  const $homeBanner = $('.home-banner');
  const $sliders = $homeBanner.find('.carousel-item');
  const $indicators = $homeBanner.find('.carousel-indicator span');

  // 切换到第 index 张图片
  const gotoSlider = function(index) {
    $sliders.removeClass('fade').eq(index).addClass('fade');
    $indicators.removeClass('active').eq(index).addClass('active');
  };

  // 自动轮播
  const autoPlaySliders = () => {
    // 防止定时器重复添加
    clearInterval(timer);

    // 自动播放，每隔多久切换索引
    timer = setInterval(() => {
      caroIndex++;
      if (caroIndex >= $sliders.length) {
        caroIndex = 0;
      }
      gotoSlider(caroIndex);
    }, 3000);
  };

  // 向前向后 step 张图片
  const toggleSlider = step => {
    // 将要改变的索引
    const newIndex = caroIndex + step;

    // 超出的情况，太大了
    if (newIndex > $sliders.length - 1) {
      caroIndex = 0;
    }
    // 超出的情况，太小了
    else if (newIndex < 0) {
      caroIndex = $sliders.length - 1;
    }
    // 正常
    else {
      caroIndex = newIndex;
    }

    gotoSlider(caroIndex);
  };

  // 显示第一张图片
  gotoSlider(0);

  // 开始自动播放
  autoPlaySliders();

  // 鼠标出入，自动停止和启动自动轮播
  $('.xtx-carousel').on('mouseenter', function() {
    clearInterval(timer);
  }).on('mouseleave', function() {
    autoPlaySliders();
  });

  // 向前按钮
  $('.carousel-btn.prev').on('click', function() {
    toggleSlider(-1);
  });

  // 向后按钮
  $('.carousel-btn.next').on('click', function() {
    toggleSlider(1);
  });

  // ------------------ 热门品牌 ------------------------------------------------------
  let brandCaroIndex = 0;

  const $homeBrand = $('.home-brand');
  const $brandPrevBtn = $homeBrand.find('.prev');
  const $brandNextBtn = $homeBrand.find('.next');
  const $brandList = $homeBrand.find('.list');

  const toggleBrandSlider = function(step) {
    // 切换效果，限定只有 0，1 两页
    const newIndex = brandCaroIndex + step;
    if (newIndex < 0 || newIndex > 1) return;
    brandCaroIndex = newIndex;

    $brandPrevBtn.toggleClass('disabled', brandCaroIndex === 0);
    $brandNextBtn.toggleClass('disabled', brandCaroIndex === 1);
    $brandList.css({
      transform: `translateX(${-brandCaroIndex * 1240}px`,
    });
  };

  // 向前按钮
  $brandPrevBtn.on('click', function() {
    toggleBrandSlider(-1);
  });

  // 向后按钮
  $brandNextBtn.on('click', function() {
    toggleBrandSlider(1);
  });

});
