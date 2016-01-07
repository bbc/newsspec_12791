define(function () {
	return '<div class="share ns__share-dropdown">' +
                '<button class="share__button">' +
					'<div class="share__png_icon"></div>' +
					'<p><%=header %></p>' +
				'</button>' +
		  	  	'<span class="share__overlay">' +
			  	  	'<p><%= header %></p>' +
			  	  	'<ul>' +
			  	  		'<% for ( var i = 0; i < networks.length; i++ ) { %>' +
			  	  			'<li class="share__tool share__tool--<%=networks[i].target %>"><a id="<%=networks[i].target %>__share-button" href="#" target="_blank" data-window-width="626" data-window-height="236" data-network="<%=networks[i].target %>" class="s-b-p-a istats-notrack"> <span> <i aria-hidden="true" class="gelicon gelicon--<%=networks[i].target %>"></i></span><%=networks[i].target.charAt(0).toUpperCase() + networks[i].target.slice(1) %></a></li>' +
			  	  		'<% } %>' +
			  	  	'</ul>' +
			  	  	'<a href="#" class="share__overlay-close"></a>' +
			  	 '</span>' +
		  	 '</div>';
});