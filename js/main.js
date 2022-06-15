/* *******************************************************
 * filename : main.js
 * description : 메인에만 사용되는 JS
 * date : 2021-06-15
******************************************************** */

$(document).ready(function  () {
	/* ************************
	* Func : fullpage 레이아웃 사용시
	* fullpage.js , detectBrowser() 필요
	************************ */
	if ($.exists('#fullpage')) {
		var $fullPage = $("#fullpage");
		var $fullPageSection = $fullPage.children(".section");
		$fullPage.fullpage({
			css3: true,
			fitToSection: false,
			navigation: true,
			scrollBar:false,
			scrollingSpeed:800,
			navigationPosition: 'right',
			navigationTooltips: ['Content01', 'Content02', 'Content03', 'Content04'],
			responsiveWidth: tabletWidth,
			responsiveHeight : 750,
			onLeave : function(origin, destination, direction){
				setTimeout(function  () {
					$(".section").eq(destination-1).find("[data-scroll]").addClass("animated");
				},500);
				// 사이드바 색상변경
				if ( destination > 1) {
					$("#fp-nav").addClass("black");
				}else {
					$("#fp-nav").removeClass("black");
				}

				if ( destination > 4 )  {
					$("body:not('.fp-responsive')").find("#header").hide();	// ie responsive모드에서 상단으로 이동시 destination 오류로 추가
				}else {
					$("body:not('.fp-responsive')").find("#header").show();
				}
			}
		});
	}
	
	
	setTimeout(function  () {
		addClassName($("#mainVisual"), "active");
	},100);

	/* ************************
	* Func : 메인 비주얼 높이 설정 및 slick 슬라이드
	* slick.js , getWindowWidth(), getWindowHeight() 필요
	************************ */
	// 메인 비주얼 높이값 설정
	if ($.exists('#mainVisual.full-height')) {
		mainVisualHeight();
		$(window).on('resize', mainVisualHeight);

		function mainVisualHeight () {
			var visual_height = getWindowHeight()	- $("#header").height();	// header가 fixed or absolute일경우 - $("#header").height() 삭제
			$("#mainVisual").height(visual_height);
		}
	}

	// 메인 비주얼 슬라이드
	var $mainVisualItem = $(".main-visual-con");
	var visualPausePlay = false;		// Pause, play 사용시 변경

	$mainVisualItem.on('init', function(event, slick, currentSlide) {
		$(".main-visual-item").eq(0).addClass("active-item");
		if ($.exists('.main-visual-conuter')) {
			$(".main-visual-conuter .total-num").text(slick.slideCount);
		}
	});
	$mainVisualItem.on('beforeChange', function(event, slick, currentSlide, nextSlide) {	
		$(".main-visual-item").removeClass("active-item");
		$(this).find(".main-visual-item").eq(nextSlide).addClass("active-item");
		if ($.exists('.main-visual-conuter')) {
			$(".main-visual-conuter .cur-num").text(nextSlide+1);
		}
	});

	// 메인 비주얼 슬라이드
	$mainVisualItem.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		dots:true,
		autoplay: true,
		speed:1000,
		infinite:true,
		autoplaySpeed: 6000,
		easing: 'easeInOutQuint',
		pauseOnHover:false,
		zIndex:1,
		prevArrow: '.main-visual-arrow .prev',
		nextArrow: '.main-visual-arrow .next',
		appendDots: $(".main-visual-dot-inner"),
	});

	$(".main-visual-dot").find(".slick-dots").wrap("<aside class='slick-dots-wrapper'><div class='clearfix'></div></aside>");
	$(".main-visual-dot").find(".slick-dots li").prepend("<div class='circle-line'><div id='halfclip'><div class='halfcircle' id='clipped'></div></div><div class='halfcircle' id='circle-fixed'></div></div>")


	// 일시정지, 재생버튼 사용시
	if ( visualPausePlay ) {
		$(".slick-dots-wrapper").children().append("<span class='slick-control-btns'><button class='slick-pause-btn' title='일시정지'><i class='xi-pause'></i></button><button class='slick-play-btn' title='재생'><i class='xi-play-circle-o'></i></button></span>");

		$(document).on("click",".slick-pause-btn",function  () {
			$mainVisualItem.slick("slickPause");
			$(this).hide();
			$(".slick-play-btn").show();
		});
		$(document).on("click",".slick-play-btn",function  () {
			$mainVisualItem.slick("slickPlay");
			$(this).hide();
			$(".slick-pause-btn").show();
		});
	}

	$(".main-visual-arrow .slick-arrow").on("mouseenter",function  () {
		$(this).next().addClass("active")
	});

	$(".main-visual-arrow a").on("mouseleave",function  () {	
		$(".hover-circle").removeClass("active")
	});


	
	/* ************************
	* Func : 해당영역갔을때 슬라이드 autoPlay
	* wayPoint.js 필요
	************************ */
	// 해당영역갔을때 슬라이드 autoPlay
	if ($.exists('.start-autoplay-scroll-object')) {
		$(".start-autoplay-scroll-object").slick("slickPause");
		$(".start-autoplay-scroll-object").waypoint(function  () {
			$(this).slick("slickPlay");
		}, { 
			offset: startOffset
		});
	}

	/* ************************
	* Func : 사이드바 FIXED
	* objectFixed() 필요
	************************ */
	if ($.exists('#rightBar')) {
		$(window).scroll(function  () {
			var rightStartTop = $(window).height() / 2;
			objectFixed($("#rightBar"), rightStartTop);
		});
	}
	

	/* ************************
	* portfolio 슬라이드
	************************ */
/*
	var swiper = new Swiper(".main-portfolio-slide", {	
		slidesPerView:4,
        spaceBetween: 35,
		mousewheel: true,
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
		  draggable: true,
        },
		breakpoints: {
          481: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
		  801: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
		  1221: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
        }
    });*/
	

	let options = {};

    if ( $(".main-portfolio-slide .swiper-slide").length < 5 ) {
        options = {
            slidesPerView:4,
			spaceBetween: 35,
			//mousewheel: false,
			scrollbar: {
			  el: ".swiper-scrollbar",
			  hide: false,
			  draggable: true,
			},
			breakpoints: {
			  481: {
				slidesPerView: 1,
				spaceBetween: 20,
			  },
			  801: {
				slidesPerView: 2,
				spaceBetween: 20,
			  },
			  1221: {
				slidesPerView: 3,
				spaceBetween: 25,
			  },
			}
        }
    } else {
        options = {
            slidesPerView:4,
			spaceBetween: 35,
			//mousewheel: true,
			scrollbar: {
			  el: ".swiper-scrollbar",
			  hide: false,
			  draggable: true,
			},
			breakpoints: {
			  481: {
				slidesPerView: 1,
				spaceBetween: 20,
			  },
			  801: {
				slidesPerView: 2,
				spaceBetween: 20,
			  },
			  1221: {
				slidesPerView: 3,
				spaceBetween: 25,
			  },
			}
        }
    }

    var swiper = new Swiper('.main-portfolio-slide', options);




	/* ************************
	* portfolio 슬라이드
	************************ */
	/*
	var swiper = new Swiper(".main-news-slide", {	
		slidesPerView: 3,
        spaceBetween: 25,
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
		  draggable: true,
        },
		breakpoints: {
		  481: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
		  961: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }
    });*/

	let options2 = {};

    if ( $(".main-news-slide .swiper-slide").length < 4 ) {
        options2 = {
            slidesPerView: 3,
			spaceBetween: 25,
			//mousewheel: false,
			scrollbar: {
			  el: ".swiper-scrollbar",
			  hide: false,
			  draggable: true,
			},
			breakpoints: {
			  481: {
				slidesPerView: 1,
				spaceBetween: 20,
			  },
			  961: {
				slidesPerView: 2,
				spaceBetween: 20,
			  },
			}
        }
    } else {
        options2 = {
            slidesPerView: 3,
			spaceBetween: 25,
			//mousewheel: true,
			scrollbar: {
			  el: ".swiper-scrollbar",
			  hide: false,
			  draggable: true,
			},
			breakpoints: {
			  481: {
				slidesPerView: 1,
				spaceBetween: 20,
			  },
			  961: {
				slidesPerView: 2,
				spaceBetween: 20,
			  },
			}
        }
    }

    var swiper = new Swiper('.main-news-slide', options2);


	


});
