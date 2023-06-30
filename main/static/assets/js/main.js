/***************************************************
==================== JS INDEX ======================
****************************************************
01. PreLoader Js


****************************************************/

(function ($) {
	"use strict";

	var windowOn = $(window);
	////////////////////////////////////////////////////
	// 01. PreLoader Js
	windowOn.on('load',function() {
		$("#loading").fadeOut(500);
	});

	$("body").addClass("nft-body-connect");
	

	$("#theme-setting-toggle").on("click", function () {
		$(".theme__settings").addClass("theme-setting-opened");
	});

	$("#theme-setting-close").on("click", function () {
		$(".theme__settings").removeClass("theme-setting-opened");
	});

	const colorInput = document.querySelector('input[data-color=color]');
	const colorVariable = '--tp-theme-1';
	const colorVariable2 = '--tp-theme-2';

	colorInput.addEventListener('change', function(e){
		var clr = e.target.value;
		document.documentElement.style.setProperty(colorVariable, clr);
		document.documentElement.style.setProperty(colorVariable2, clr);
	})



	var styleMode = document.querySelector('meta[name="theme-style-mode"]').content;
	var cookieKey = styleMode == 1 ? 'client_dark_mode_style_cookie' : 'client_light_mode_style_cookie';
	if (Cookies.get(cookieKey) == 'dark') {
		$('body').removeClass('active-light-mode');
		$('body').addClass('active-dark-mode');

	} else if( Cookies.get(cookieKey) == 'light') {
		$('body').removeClass('active-dark-mode');
		$('body').addClass('active-light-mode');

	} else {
		if(styleMode == 1){
			$('body').addClass('active-dark-mode');
		} else{
			$('body').addClass('active-light-mode');
		}
	}


	////////////////////////////////////////////////////
	// 02. Mobile Menu Js
	$('#mobile-menu').meanmenu({
		meanMenuContainer: '.mobile-menu',
		meanScreenWidth: "1199",
		meanExpand: ['<i class="fal fa-plus"></i>'],
	});

	////////////////////////////////////////////////////
	// 03. Sidebar Js
	$(".offcanvas-toggle-btn").on("click", function () {
		$(".offcanvas__area").addClass("opened");
		$(".body-overlay").addClass("opened");
	});
	$(".offcanvas__close-btn").on("click", function () {
		$(".offcanvas__area").removeClass("opened");
		$(".body-overlay").removeClass("opened");
	});




	////////////////////////////////////////////////////
	// 04. Body overlay Js
	$(".body-overlay").on("click", function () {
		$(".offcanvas__area").removeClass("opened");
		$(".body-overlay").removeClass("opened");
	});


	////////////////////////////////////////////////////
	// 05. Search Js
	$(".search-toggle").on("click", function () {
		$(".search__area").addClass("opened");
	});
	$(".search-close-btn").on("click", function () {
		$(".search__area").removeClass("opened");
	});


	////////////////////////////////////////////////////
	// 06. Sticky Header Js
	windowOn.on('scroll', function () {
		var scroll = $(window).scrollTop();
		if (scroll < 100) {
			$("#header-sticky").removeClass("header-sticky");
		} else {
			$("#header-sticky").addClass("header-sticky");
		}
	});


	////////////////////////////////////////////////////
	// 07. Data CSS Js
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});
	
	$("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});

	$("[data-bg-color]").each(function () {
        $(this).css("background-color", $(this).attr("data-bg-color"));
    });

	////////////////////////////////////////////////////
	// 07. Nice Select Js
	$('select').niceSelect();


	// mainSlider
	function mainSlider() {
		var BasicSlider = $('.slider__active-2');
		BasicSlider.on('init', function (e, slick) {
			var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
			doAnimations($firstAnimatingElements);
		});
		BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
			var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			doAnimations($animatingElements);
		});
		BasicSlider.slick({
			autoplay: true,
			autoplaySpeed: 4000,
			dots: false,
			fade: true,
			arrows: true,
			prevArrow: '<button type="button" class="slick-prev"><i class="fa-regular fa-angle-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="fa-regular fa-angle-right"></i></button>',
			responsive: [{
			breakpoint: 767,
			settings: {
				dots: false,
				arrows: false
			}
			}]
		});
	
		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
			});
		}
	}
	mainSlider();

	$('.bid__slider-active').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa-regular fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa-regular fa-angle-right"></i></button>',
		appendArrows: '.bid__nav',
		responsive: [
		  {
			breakpoint: 1399,
			settings: {
			  slidesToShow: 3
			}
		  },
		  {
			breakpoint: 1199,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 768,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1
			}
		  }
		]
	});

	$('.bid__slider-active-2').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa-regular fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa-regular fa-angle-right"></i></button>',
		appendArrows: '.bid__nav',
		responsive: [
		  {
			breakpoint: 1399,
			settings: {
			  slidesToShow: 3
			}
		  },
		  {
			breakpoint: 1199,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 768,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1
			}
		  }
		]
	});

	$('.bid__slider-active-3').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa-regular fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa-regular fa-angle-right"></i></button>',
		appendArrows: '.bid__nav-2',
		responsive: [
		  {
			breakpoint: 1399,
			settings: {
			  slidesToShow: 3
			}
		  },
		  {
			breakpoint: 1199,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 768,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1
			}
		  }
		]
	});

	$('.auction__slider-active-2').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa-regular fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa-regular fa-angle-right"></i></button>',
		appendArrows: '.auction__nav',
		responsive: [
		  {
			breakpoint: 1399,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 1199,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 992,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 991,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1
			}
		  }
		]
	});

	$('.auction__slider-active-3').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa-regular fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa-regular fa-angle-right"></i></button>',
		appendArrows: '.auction__nav-2',
		responsive: [
		  {
			breakpoint: 1399,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 1199,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 992,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 991,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1
			}
		  }
		]
	});

	$('.auction__slider-active').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa-regular fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa-regular fa-angle-right"></i></button>',
		appendArrows: '.auction__nav',
		responsive: [
		  {
			breakpoint: 1399,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 1199,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 992,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 991,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1
			}
		  }
		]
	});

	$('.marque__slider').slick({
		dots: false,
		infinite: true,
		arrows: false,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa-regular fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa-regular fa-angle-right"></i></button>',
		appendArrows: '.sliderrr__nav',

		speed: 5000,
		autoplay: true,
		autoplaySpeed: 0,
		centerMode: true,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		infinite: true,
		initialSlide: 1,
		arrows: false,
		buttons: false,
		responsive: [
		  {
			breakpoint: 1399,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 1199,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 992,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 991,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1
			}
		  }
		]
	});

	$('.about__marque-slider').slick({
		dots: false,
		infinite: true,
		arrows: false,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa-regular fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa-regular fa-angle-right"></i></button>',
		appendArrows: '.sliderrr__nav',

		speed: 50000,
		autoplay: true,
		autoplaySpeed: 0,
		centerMode: true,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		infinite: true,
		initialSlide: 1,
		arrows: false,
		buttons: false,
		responsive: [
		  {
			breakpoint: 1399,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 1199,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 992,
			settings: {
			  slidesToShow: 2
			}
		  },
		  {
			breakpoint: 991,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 1
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1
			}
		  }
		]
	});

	var slider = new Swiper('.slider__active', {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		pagination: {
			el: ".bid-pagination",
			clickable: true,
			renderBullet: function (index, className) {
			  return '<span class="' + className + '">' + '<button>'+(index + 1)+'</button>' + "</span>";
			},
		},
		navigation: {
			nextEl: ".slider-button-next",
			prevEl: ".slider-button-prev",
		},
		breakpoints: {
			'1200': {
				slidesPerView: 1,
			},
		},
	});

	var slider = new Swiper('.slider__active-3', {
		slidesPerView: 1,
		spaceBetween: 30,
		grabCursor: true,
        effect: "fade",
		loop: true,
		pagination: {
			el: ".slider-pagination-3",
			clickable: true,
			renderBullet: function (index, className) {
			  return '<span class="' + className + '">' + '<button>'+(index + 1)+'</button>' + "</span>";
			},
		},
		navigation: {
			nextEl: ".slider-button-next",
			prevEl: ".slider-button-prev",
		},
		breakpoints: {
			'1200': {
				slidesPerView: 1,
			},
		},
	});

	var postboxSlider = new Swiper('.postbox__slider', {
		slidesPerView: 1,
        spaceBetween: 0,
		loop: true,
		autoplay: {
		  delay: 3000,
		},
		// Navigation arrows
		navigation: {
			nextEl: ".postbox-slider-button-next",
			prevEl: ".postbox-slider-button-prev",
		},
		breakpoints: {  
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	////////////////////////////////////////////////////
	// 13. Masonary Js
	$('.grid').imagesLoaded(function () {
		// init Isotope
		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: '.grid-item',
			}
		});


		// filter items on button click
		$('.masonary-menu').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});

		//for menu active class
		$('.masonary-menu button').on('click', function (event) {
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');
			event.preventDefault();
		});

	});

	/* magnificPopup img view */
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	/* magnificPopup video view */
	$(".popup-video").magnificPopup({
		type: "iframe",
	});

	////////////////////////////////////////////////////
	// 14. Wow Js
	new WOW().init();

	////////////////////////////////////////////////////
	// 16. Cart Quantity Js
	$('.cart-minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	$('.cart-plus').click(function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});


	////////////////////////////////////////////////////
	// 17. Show Login Toggle Js
	$('#showlogin').on('click', function () {
		$('#checkout-login').slideToggle(900);
	});

	////////////////////////////////////////////////////
	// 18. Show Coupon Toggle Js
	$('#showcoupon').on('click', function () {
		$('#checkout_coupon').slideToggle(900);
	});

	////////////////////////////////////////////////////
	// 19. Create An Account Toggle Js
	$('#cbox').on('click', function () {
		$('#cbox_info').slideToggle(900);
	});

	////////////////////////////////////////////////////
	// 20. Shipping Box Toggle Js
	$('#ship-box').on('click', function () {
		$('#ship-box-info').slideToggle(1000);
	});

	////////////////////////////////////////////////////
	// 21. Counter Js
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});

	////////////////////////////////////////////////////
	// 22. Parallax Js
	if ($('.scene').length > 0) {
		$('.scene').parallax({
			scalarX: 10.0,
			scalarY: 15.0,
		});
	};

	////////////////////////////////////////////////////
	// 23. InHover Active Js
	$('.hover__active').on('mouseenter', function () {
		$(this).addClass('active').parent().siblings().find('.hover__active').removeClass('active');
	});

	$('[data-countdown]').each(function() {

        var $this = $(this),
            finalDate = $(this).data('countdown');

        $this.countdown(finalDate, function(event) {

            $this.html(event.strftime('<div class="cdown day"><span class="time-count">%-D</span> <p>Days</p></div> <div class="cdown hour"><span class="time-count">%-H</span> <p>Hrs</p></div> <div class="cdown minutes"><span class="time-count">%M</span> <p>Min</p></div> <div class="cdown second"> <div><span class="time-count">%S</span> <p>Sec</p></div>'));

        });

    });


	function importData() {
		let input = document.createElement('input');
		input.type = 'file';
		input.onchange = _ => {
		  // you can use this method to get file and perform respective operations
			let files =   Array.from(input.files);
			console.log(files);
		};
		input.click();
	};

	$(".cover-img-popup").change(function (){
		var fileName = $(this).val();
		if(fileName.length >0){
    $(this).parent().children('span').html(fileName);
		}
		else{
			$(this).parent().children('span').html("Choose file");

		}
	});
	//file input preview
	function readURL(input) {
		if (input.files && input.files[0]) {
				var reader = new FileReader();            
				reader.onload = function (e) {
						$('.tp-img-cover img').attr('src', e.target.result);
				}
				reader.readAsDataURL(input.files[0]);
		}
	}
	$(".cover-img-popup").change(function(){
			readURL(this);
	});

	$(".profile-img-popup").change(function (){
		var fileName = $(this).val();
		if(fileName.length >0){
    $(this).parent().children('span').html(fileName);
		}
		else{
			$(this).parent().children('span').html("Choose file");

		}
	});

	//file input preview
	function readURL2(input) {
		if (input.files && input.files[0]) {
				var reader = new FileReader();            
				reader.onload = function (e) {
						$('.tp-img-profile img').attr('src', e.target.result);
				}
				reader.readAsDataURL(input.files[0]);
		}
	}
	$(".profile-img-popup").change(function(){
			readURL2(this);
	});



	if ($('#nft-slider').length > 0) {

		var stepsSlider = document.getElementById('nft-slider');
		var input0 = document.getElementById('input-with-keypress-0');
		var input1 = document.getElementById('input-with-keypress-1');
		var inputs = [input0, input1];
	
		noUiSlider.create(stepsSlider, {
			start: [0, 4],
			connect: true,
			range: {
				'min': [0],
				'max': 10
			}
		});
	
		stepsSlider.noUiSlider.on('update', function (values, handle) {
			inputs[handle].value = values[handle];
		});
	}


})(jQuery);