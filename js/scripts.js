var App = (function(){
	
	var QuoteMachine = {};
	
	function getData(contentElement, headingElement) {
		$.ajax({
			url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
			cache: false
		}).done(function(data) {
			contentElement.html(data[0].content);
			headingElement.html('<h1>' + data[0].title+ '</h1>');
			if((document.querySelector('.box-content').clientHeight + 1) > 105) {
				$('.box-top').css('minHeight', 200);
			}else{
				$('.box-top').css('minHeight', 100);
			}
			contentElement.css('marginTop', 0);
			headingElement.css('marginTop', 0);
		})
	}

	function init() {
		var boxContent = $('.box-content'),
			boxHeading = $('.box-heading');
		getData(boxContent, boxHeading);
		$('.but-next').on('click', function(e) {
			e.preventDefault();
			console.log('clicked');
			boxContent.css('marginTop', 100);
			boxHeading.css('marginTop', 100);
			getData(boxContent, boxHeading);
		});

		$('.but-tweet').on('click', function(e) {
			var tmpStr = '';
			if(boxContent.text().length > 100) {
				tmpStr = boxContent.text().substring(0,100) + '.... ' +  boxHeading.text();
			}
			window.location.href = 'https://twitter.com/intent/tweet?text=' + tmpStr;
		});
	}

	return {
		init: init
	}

}());

window.addEventListener('DOMContentLoaded', function() {
	App.init();
})