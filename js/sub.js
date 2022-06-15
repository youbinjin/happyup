/* *******************************************************
 * filename : sub.js
 * description : 서브컨텐츠에만 사용되는 JS
 * date : 2021-06-14
******************************************************** */


$(document).ready(function  () {
	/* ************************
	* Func : 서브 Visual Active 클래스 붙이기
	* addClassName () 필요
	************************ */
	setTimeout(function  () {
		addClassName($("#visual"), "active");
	},200);

	/* ************************
	* Func : 모달팝업 플러그인 사용
	* MagnificPopup.js 필요
	************************ */
	if ($.exists(".popup-gallery")) {
		magnificPopup($(".popup-gallery"));
	}

	/* ************************
	* Func : 일정 가로사이즈 아래부터 scroll 사용하기
	* mCustomScrollbar.js, customScrollX() 필요
	************************ */
	/* 서브 Scrollbar object  */
	$(".custom-scrollbar-wrapper").each(function  () {
		if ( $("html").attr("lang") == "ko" ) {
			var dragTxt = "좌우로 드래그 해주세요.";
		}else {
			var dragTxt = "Drag left and right.";
		}
		$(this).append("<div class='custom-scrollbar-cover'><div class='scroll-cover-txt'><i class='xi-touch'></i><p>"+dragTxt+"</p></div></div>");
		var $scrollObject = $(this).find(".scroll-object-box");
		if ($.exists($scrollObject)) {
			customScrollX($scrollObject);
		}
		$(this).on("touchmove click",function  () {
			$(this).find(".custom-scrollbar-cover").fadeOut(200);
		});
	});

	/* ************************
	* Func : 서브 상단 메뉴 FIXED
	* getWindowWidth(), checkOffset(), toFit() 필요
	************************ */
	if ($.exists(".fixed-sub-menu")) {
		var $fixedSubMenu = $(".fixed-sub-menu");
		var topMenuStart =  checkOffset($fixedSubMenu);
		$(window).resize(function  () {
			if ( getWindowWidth() > tabletWidth ) {
				topMenuStart =  checkOffset($fixedSubMenu);
			}else {
				$fixedSubMenu.removeClass("top-fixed");
			}
		});
		window.addEventListener('scroll', toFit(function  () {
			if ( getWindowWidth() > tabletWidth ) {
				objectFixed($fixedSubMenu, topMenuStart, "top-fixed");
			}else {
				$fixedSubMenu.removeClass("top-fixed");
			}
		}, {
		}),{ passive: true })
	}

	/* ************************
	* Func : 컨텐츠 메뉴 FIXED 및 클릭시 해당영역 이동
	* getScrollTop(), getWindowWidth(), checkOffset(), toFit(), checkFixedHeight(), moveScrollTop() 필요
	************************ */
	if ($.exists(".cm-fixed-tab-container-JS")) {
		var $fixedMoveTab = $(".cm-fixed-tab-list-JS");		// fixed되는 메뉴 클래스
		var $moveTabItem = $fixedMoveTab.find("li");
		var menuCount= $moveTabItem.size();
		var nav = [];
		
		$(window).on('load', function  () {
			checkStartOffset();
			nav = checkTopOffset();
		});
		$(window).on('resize', function  () {
			checkStartOffset();
			nav = checkTopOffset();
		}); 		
		
		// 탭이 붙기 시작하는 지점 체크
		function checkStartOffset () {
			var fixedStartPoint =  $(".cm-fixed-tab-container-JS").offset().top - checkFixedHeight();	
			return fixedStartPoint;
		}		

		// 해당되는 각각의 영역 상단값 측정
		function checkTopOffset () {
			var arr = [];
			for(var i=0;i < menuCount;i++){
				arr[i]=$($moveTabItem.eq(i).children("a").attr("href")).offset().top;
			}
			return arr;
		}
		
		// 스크롤 0일때 상단fixed되는 높이값 체크
		function checkFixedObjectHeight () {
			var fixedObjectTotalHeight = 0;
			for (var i=0; i<$(".top-fixed-object").length; i++) {
				var fixedObjectTotalHeight = fixedObjectTotalHeight + $(".top-fixed-object").eq(i).outerHeight();
			}
			return fixedObjectTotalHeight;
		}

		// 스크롤 event 
		window.addEventListener('scroll', toFit(function  () {
			// 메뉴fixed
			// objectFixed($fixedMoveTab, checkStartOffset(), "top-fixed");

			if ( getScrollTop() >  checkStartOffset() ) {
				$fixedMoveTab.addClass("top-fixed");
			}else if ( getScrollTop() <  (checkStartOffset() + $fixedMoveTab.height()) ) {
				$fixedMoveTab.removeClass("top-fixed");
			}

			$moveTabItem.each(function  (idx) {
				var eachOffset = nav[idx] -  checkFixedHeight();
				if( getScrollTop() >= eachOffset ){
					$moveTabItem.removeClass('selected');
					$moveTabItem.eq(idx).addClass('selected');
					// 모바일 드롭메뉴일때
					if ($.exists($moveTabItem.parents(".cm-drop-menu-box-JS"))) {
						$fixedMoveTab.find(".cm-drop-open-btn-JS > span").text($moveTabItem.eq(idx).find("em").text());
					}
				};
			});
			}, {
		}),{ passive: true })
		
		// 클릭 event 
		$moveTabItem.find("a").click(function  () {
			var goDivOffset = $($(this).attr("href")).offset().top - checkFixedHeight() +1;	// 이동해야할 지점
			if ( getScrollTop()  < checkStartOffset()) {
				if ( getScrollTop() == 0 ) {
					var goDiv = goDivOffset - checkFixedObjectHeight();
				}else {
					var goDiv = goDivOffset - $fixedMoveTab.height();
				}
			}else {
				var goDiv = goDivOffset;
			}
			setTimeout(function  () {
				moveScrollTop(goDiv);
			});

			// 모바일 드롭메뉴일때
			if ($.exists($(this).parents(".cm-drop-menu-box-JS")) ) {
				if ( getWindowWidth () < $fixedMoveTab.data("drop-width")+1 ) {
					$fixedMoveTab.find("ul").slideUp();
				}
			}
			 
			return false;
		});
	}

	/* ************************
	* Func : 에디터관련
	************************ */
	if ($.exists(".editor")) {
		/* 테이블 스크롤넣기 */ 
		$(".editor table").each(function  () {
			$(this).wrap("<div class='editor-table-box'></div>");
		});
		
		/* iframe 태그 감싸기 */ 
		$(".editor iframe").each(function  () {
			var iframeSrc = $(this).attr("src");
			var findStr = "https://www.youtube.com/embed"; 

			if (iframeSrc.indexOf(findStr) != -1) {
			  $(this).wrap("<div class='editor-iframe-box'></div>");
			}
		});
	}

	/* ************************
	* Business 이미지 슬라이드
	************************ */
	$('.business-sec').each( function() {
	  $(this).find(".bs-img-slide").slick({
			autoplay: true, 
			arrows: false,
			infinite:false,
			slidesToShow: 1,
			slidesToScroll: 1,
			speed:1000,
			fade:false,
			dots: true,
			pauseOnHover:false,
			autoplaySpeed:2000
	  });
	});
});