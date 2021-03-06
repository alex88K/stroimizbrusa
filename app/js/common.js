$(function() {

	$(".read-more").on("click", function() {
		$(this).toggleClass("opened").siblings(".feedbacks-text").toggleClass("opened");
		
		if ($(this).hasClass("opened")) {
			$(this).html("Скрыть" + "<svg class='arrow-i'><use xlink:href='#nav-arrow'></use></svg>");
		} else {
			$(this).html("Читать полностью" + "<svg class='arrow-i'><use xlink:href='#nav-arrow'></use></svg>");
		}
	});

	// Fancybox

	$("[data-fancybox]").fancybox();

	
	// Mask

	$("input[name='phone']").mask("+7 (999) 999-9999");


	// NAV

	$(".navbar-toggler").on("click", function() {
		$(".navbar-toggler, .navbar").toggleClass("active");
		$("body").toggleClass("nav-opened");
	});

	$(".navbar .close-btn").on("click", function() {
		$(".navbar-toggler, .navbar").removeClass("active");
		$("body").removeClass("nav-opened");
		$(".navbar-collapse").removeClass("show");
	});


	// Sliders

	$(".promo-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinity: true,
		arrows: false,
		dots: true,
		fade: true
	});

	$(".partners-slider").slick({
		variableWidth: true,
		autoplay: true,
  		autoplaySpeed: 5000,
		infinity: true,
		arrows: false,
		dots: false,
		responsive: [{
			breakpoint: 1200,
			settings: {
				variableWidth: false,
				slidesToShow: 5
			},
			breakpoint: 320,
			settings: {
				slidesToShow: 5,
				adaptiveHeight: true
			}
		}]
	});

	$(".partners-slide img").on("mouseover", function() {
		var src = $(this).attr('src');
		var newSrc = src.replace(/\.png/, '_h.png');
		$(this).attr('src', newSrc);
	});

	$(".partners-slide img").on("mouseout", function() {
		var src = $(this).attr('src');
		var newSrc = src.replace(/_h\.png/, '.png');
		$(this).attr('src', newSrc);
	});


	$('.product-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		fade: true,
		asNavFor: '.product-slider-nav'
	});

	$('.product-slider-nav').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		vertical: true,
		asNavFor: '.product-slider',
		nextArrow: '<button type="button" class="slick-next"><svg class="arrow-i arrow-next-i"><use xlink:href="#nav-arrow"></use></svg></button>',
		prevArrow: '<button type="button" class="slick-prev"><svg class="arrow-i arrow-prev-i"><use xlink:href="#nav-arrow"></use></svg></button>',
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		arrows: true,
		responsive: [
		{
			breakpoint: 576,
			settings: {
				vertical: false,
			}
		}]
	});


/*--Search form-----------------------*/

	$('.search-btn').on('click', function(e) {
		e.stopPropagation();
		$('.search-wrap').toggleClass('in-active')
			.find('.search-form .search-input').focus();
	});

	$(document).on('mouseup', function(e) {
		var search_pc = $('.nav .search-wrap');

		if ( !search_pc.is(e.target) && search_pc.has(e.target).length === 0 ) {
			search_pc.removeClass('in-active');
		}
	});

	$(document).on('click', function() {
		if (!$(event.target).closest('.search-wrap').length) {
			if ($(".search-wrap").is(":visible")) {
				$('.search-wrap').removeClass("in-active");
			}
		}
	})

});


/*--AJAX Form submit--------------------*/

$(document).on('af_complete', function(event,response) {
	var form_id = response.form.parents('.modal').attr('id');
	if (response.success) {
		$('#'+form_id).modal('hide');
		$('#success-modal').modal('show');
	}
});


// load SVG-Sprite to LocalStorage

;( function( window, document ) {
	'use strict';

	var file     = 'img/sprite.svg',
	revision = 2;

	if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
		return true;

	var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
	request,
	data,
	insertIT = function()
	{
		document.body.insertAdjacentHTML( 'afterbegin', data );
	},
	insert = function()
	{
		if( document.body ) insertIT();
		else document.addEventListener( 'DOMContentLoaded', insertIT );
	};

	if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
	{
		data = localStorage.getItem( 'inlineSVGdata' );
		if( data )
		{
			insert();
			return true;
		}
	}

	try
	{
		request = new XMLHttpRequest();
		request.open( 'GET', file, true );
		request.onload = function()
		{
			if( request.status >= 200 && request.status < 400 )
			{
				data = request.responseText;
				insert();
				if( isLocalStorage )
				{
					localStorage.setItem( 'inlineSVGdata',  data );
					localStorage.setItem( 'inlineSVGrev',   revision );
				}
			}
		}
		request.send();
	}
	catch( e ){}

}( window, document ) );