jQuery(function($) {'use strict',

	//#main-slider
	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 8000
		});
	});
//file-upload
	$('#file').change(function(){
	     $('#subfile').val($(this).val());
	});
	$('#industries1').click(function(){
		location.href="../industries.html";
	});
	$('#industries').click(function(){
		location.href="industries.html";
	});
	$('#services').click(function(){
		location.href="services.html";
	});
	$('#services1').click(function(){
		location.href="../services.html";
	});
	
   $('#case-competition').click(function(){
		location.href="case-competition.html";
	});
  
	$('#case-competition1').click(function(){
		location.href="../case-competition.html";
	});

$(document).ready(function(){
   $('.modal').on('show.bs.modal', function () {
      if ($(document).height() > $(window).height()) {
        // no-scroll
        $('body').addClass("modal-open-noscroll");
      }
      else { 
        $('body').removeClass("modal-open-noscroll");
      }
    })
    $('.modal').on('hide.bs.modal', function () {
        $('body').removeClass("modal-open-noscroll");
    });
 

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */

});


	// accordian
	$('.accordion-toggle').on('click', function(){
		$(this).closest('.panel-group').children().each(function(){
		$(this).find('>.panel-heading').removeClass('active');
		 });

	 	$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	

	// portfolio filter
	$(window).load(function(){
		'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : '.portfolio-item',
			layoutMode : 'fitRows'
		});

		
  


		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),

			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
		});
	});


	//goto top
	$('.gototop').click(function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 500);
	});

	//Pretty Photo
	
});
