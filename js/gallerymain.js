
	
/* --------------------------------------------------
	Initialization
-------------------------------------------------- */

    // Initialize all functions when the document is ready.
	$(document).ready(function(){
		initGalleryPage();
		initResize();
		initScroller();
		initAnimation();
		initIsotope();
		initContactAjax();
	});

/* --------------------------------------------------
	Gallery page semantics and metadata
-------------------------------------------------- */

	function initGalleryPage () {
		var pages = {
			'kaifeng': ['开封', '记录我们在开封旅行时留下的照片与故事'],
			'xian': ['西安', '记录我们在西安旅行时留下的照片与故事'],
			'huashan': ['华山', '记录我们一起登华山时留下的照片与故事'],
			'yuntaishan': ['云台山', '记录我们在云台山旅行时留下的照片与故事'],
			'guizhou': ['贵州', '记录我们在贵州旅行时留下的照片与故事'],
			'nanyang': ['南阳', '记录我们在南阳旅行时留下的照片与故事'],
			'biyejinian': ['毕业纪念', '属于我们的毕业纪念照片'],
			'luoyang': ['洛阳', '记录我们在洛阳旅行时留下的照片与故事'],
			'luohe': ['漯河', '记录我们在漯河旅行时留下的照片与故事'],
			'qinghai': ['青海', '记录我们在青海旅行时留下的照片与故事'],
			'gansu': ['甘肃', '记录我们在甘肃旅行时留下的照片与故事'],
			'chengdu': ['成都', '记录我们在成都旅行时留下的照片与故事'],
			'beijing': ['北京', '记录我们在北京旅行时留下的照片与故事'],
			'yinchuan': ['银川', '记录我们在银川旅行时留下的照片与故事'],
			'xin': ['信', '写给彼此的信与共同回忆'],
			'menpiao': ['门票', '收藏我们一路上留下的门票与纪念'],
			'2021meishi': ['美食合集', '记录我们一起品尝过的美食']
		};
		var slug = (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '');
		var isLegacyFoodPage = /^202[2-7]meishi$/.test(slug);
		var page = pages[isLegacyFoodPage ? '2021meishi' : slug];
		if (!page) return;

		var canonicalSlug = isLegacyFoodPage ? '2021meishi' : slug;
		var canonicalUrl = 'https://www.zrldyn.com/gallery/' + canonicalSlug + '.html';
		document.title = page[0] + '相册｜赵荣力和段雅楠的PLOG';
		$('meta[name="description"]').attr('content', page[1]);
		setHeadLink('canonical', canonicalUrl);
		setHeadMeta('property', 'og:title', document.title);
		setHeadMeta('property', 'og:description', page[1]);
		setHeadMeta('property', 'og:type', 'website');
		setHeadMeta('property', 'og:url', canonicalUrl);
		var $nav = $('.isotopeFilters .filter').first();
		if ($nav.length && !$nav.find('a[href$="/gallery/"]').length) {
			$nav.prepend('<li><a class="btn btn-isoFilter" href="https://www.zrldyn.com/gallery/">相册首页</a></li>');
		}

		// The yearly food pages contain the same collection. Present one honest entry
		// while keeping the old URLs available for existing bookmarks.
		var $foodLinks = $('.isotopeFilters a[href*="meishi.html"]');
		if ($foodLinks.length) {
			$foodLinks.first().text('美食合集').attr('href', 'https://www.zrldyn.com/gallery/2021meishi.html');
			$foodLinks.slice(1).closest('li').remove();
		}

		var $logo = $('.logo img').first();
		$logo.removeAttr('loading').attr({'fetchpriority': 'high', 'alt': '我要和你一起看世界'});
		$('.isotopeSelector img').each(function (index) {
			var $image = $(this);
			if (!$image.attr('alt')) $image.attr('alt', page[0] + '照片 ' + (index + 1));
			if (index < 5) {
				$image.removeAttr('loading').attr('fetchpriority', index === 0 ? 'high' : 'auto');
			} else {
				$image.attr('loading', 'lazy').removeAttr('fetchpriority');
			}
		});
	}

	function setHeadLink (rel, href) {
		var $link = $('link[rel="' + rel + '"]');
		if (!$link.length) $link = $('<link>').attr('rel', rel).appendTo('head');
		$link.attr('href', href);
	}

	function setHeadMeta (attribute, name, content) {
		var selector = 'meta[' + attribute + '="' + name + '"]';
		var $meta = $(selector);
		if (!$meta.length) $meta = $('<meta>').attr(attribute, name).appendTo('head');
		$meta.attr('content', content);
	}

/* --------------------------------------------------
	Resize
-------------------------------------------------- */

	function initResize () {
		var header = $(".header-text");
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();
			if ($(".index-page").length > 0) {
				if (scroll >= 270) {
					header.addClass("remove");
				} else {
					header.removeClass("remove");
				}
			}else{
				if (scroll >= 120) {
					header.addClass("remove");
				} else {
					header.removeClass("remove");
				}
			}
		});
	}
	
	
/* --------------------------------------------------
	Scroll Nav
-------------------------------------------------- */

	function initScroller () {
		$('#scroll-page-content').localScroll({
           target:'#page-content'
        });
		$('#page-top').localScroll({
           target:'body'
        });
	}


/* --------------------------------------------------
	Animation
-------------------------------------------------- */

	function initAnimation () {
		new WOW().init();
	}

	
/* --------------------------------------------------
	Isotope
-------------------------------------------------- */

	function initIsotope () {
		var initial_items = 5;
		var next_items = 3;
		// init Isotope
		var $isotopeContainer = $('.isotopeContainer').isotope({
		  itemSelector: '.isotopeSelector',
		  layoutMode: 'masonry'
		});

		// Images do not have intrinsic dimensions in the legacy markup. Recalculate
		// the masonry grid whenever a lazy-loaded image obtains its real size.
		$isotopeContainer.find('img').each(function () {
			if (!this.complete) {
				$(this).one('load error', function () {
					$isotopeContainer.isotope('layout');
				});
			}
		});
		$(window).one('load', function () {
			$isotopeContainer.isotope('layout');
		});
		// filter functions
		var filterFns = {};
		
		// bind filter button click
		$('.isotopeFilters').on( 'click', 'button', function() {
		  var filterValue = $( this ).attr('data-filter');
		  // use filterFn if matches value
		  filterValue = filterFns[ filterValue ] || filterValue;
		  $isotopeContainer.isotope({ filter: filterValue });
		  
		  updateFilterCounts();
		});
		function updateFilterCounts() {
			// get filtered item elements
			var itemElems = $isotopeContainer.isotope('getFilteredItemElements');
			var count_items = $(itemElems).length;
			if (count_items > initial_items) {
				$('#isotopeShowMore').show();
			}
			else {
				$('#isotopeShowMore').hide();
			}
			if ($('.isotopeSelector').hasClass('gallery-hidden')) {
				$('.isotopeSelector').removeClass('gallery-hidden');
			}
			var index = 0;

			$(itemElems).each(function () {
				if (index >= initial_items) {
					$(this).addClass('gallery-hidden');
				}
				index++;
			});
			$isotopeContainer.isotope('layout');
		}
		
		
		// change active class on buttons
		$('.filter-container').each( function( i, filterContainer ) {
		  var $filterContainer = $( filterContainer );
		  $filterContainer.on( 'click', 'button', function() {
			$filterContainer.find('.active').removeClass('active');
			$( this ).addClass('active');
		  });
		});
		
		// function load more item
		function showNextItems(pagination) {
			var itemsMax = $('.gallery-hidden').length;
			var itemsCount = 0;
			$('.gallery-hidden').each(function () {
				if (itemsCount < pagination) {
					$(this).removeClass('gallery-hidden');
					itemsCount++;
				}
			});
			if (itemsCount >= itemsMax) {
				$('#isotopeShowMore').hide();
			}
			$isotopeContainer.isotope('layout');
		}
		// function that hides items when page is loaded
		function hideItems(pagination) {
			var itemsMax = $('.isotopeSelector').length;
			var itemsCount = 0;
			$('.isotopeSelector').each(function () {
				if (itemsCount >= pagination) {
					$(this).addClass('gallery-hidden');
				}
				itemsCount++;
			});
			if (itemsCount < itemsMax || initial_items >= itemsMax) {
				$('#isotopeShowMore').hide();
			}
			$isotopeContainer.isotope('layout');
		}
		$('#isotopeShowMore').on('click', function (e) {
			e.preventDefault();
			showNextItems(next_items);
		});
		hideItems(initial_items);
	}

	
/* --------------------------------------------------
	Ajax Contact Form
-------------------------------------------------- */

	function initContactAjax () {
		$("#submit_btn").click(function() { 
		   
			var proceed = true;
			//simple validation at client's end
			//loop through each field and we simply change border color to red for invalid fields		
			$("#contact_form input[required=true], #contact_form textarea[required=true]").each(function(){
				$(this).css('border-color',''); 
				if(!$.trim($(this).val())){ //if this field is empty 
					$(this).css('border-color','red'); //change border color to red   
					proceed = false; //set do not proceed flag
				}
				//check invalid email
				var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
				if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
					$(this).css('border-color','red'); //change border color to red   
					proceed = false; //set do not proceed flag				
				}	
			});
		   
			if(proceed) //everything looks good! proceed...
			{
				//get input field values data to be sent to server
				post_data = {
					'user_name'		: $('input[name=name]').val(), 
					'user_email'	: $('input[name=email]').val(), 
					<!-- 'country_code'	: $('input[name=phone1]').val(),  -->
					<!-- 'phone_number'	: $('input[name=phone2]').val(),  -->
					'subject'		: $('select[name=subject]').val(), 
					'msg'			: $('textarea[name=message]').val()
				};
				
				//Ajax post data to server
				$.post('contact.php', post_data, function(response){  
					if(response.type == 'error'){ //load json data from server and output message     
						output = '<div class="error">'+response.text+'</div>';
					}else{
						output = '<div class="success">'+response.text+'</div>';
						//reset values in all input fields
						$("#contact_form  input[required=true], #contact_form textarea[required=true]").val(''); 
						$("#contact_form #contact_body").slideUp(); //hide form after success
					}
					$("#contact_form #contact_results").hide().html(output).slideDown();
				}, 'json');
			}
		});
		
		//reset previously set border colors and hide all message on .keyup()
		$("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() { 
			$(this).css('border-color',''); 
			$("#result").slideUp();
		});
	}
