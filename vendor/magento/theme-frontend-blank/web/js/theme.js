/**
 * Copyright © 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'jquery',
    'mage/smart-keyboard-handler',
    'mage/mage',
    'mage/ie-class-fixer',
    'domReady!'
], function ($, keyboardHandler) {
    'use strict';

    if ($('body').hasClass('checkout-cart-index')) {
        if ($('#co-shipping-method-form .fieldset.rates').length > 0 && $('#co-shipping-method-form .fieldset.rates :checked').length === 0) {
            $('#block-shipping').on('collapsiblecreate', function () {
                $('#block-shipping').collapsible('forceActivate');
            });
        }
    }

    $('.cart-summary').mage('sticky', {
        container: '#maincontent'
    });

    $('.panel.header > .header.links').clone().appendTo('#store\\.links');

    keyboardHandler.apply();
    
	$(".loader-other-page").show();
	$(".loader-other-page").hide();
	window.onbeforeunload = function(e) {	
		$(".loader-other-page").show();
		$("body").one('click', function(){
			$(".loader-other-page").hide();
		});
	}
	$(document).on('click', 'a', function(){
		var href = $(this).attr('href');
		if(typeof(href) != 'undefined' && href != '' && href != '#' && href != 'javascript:void(0);'){
			$(".loader-other-page").show();
			$("body").one('click', function(){
				$(".loader-other-page").hide();
			});
		}
	});
	
	$(document).on('click', '.loader-other-page', function(){
		$(".loader-other-page").hide();
	});
	
	$(document).on('click', '.cartpro-process', function(){
		$(".cartpro-process").removeClass('cartpro-show');
	});
	
	$(document).on('click', '.mfp-close', function(){
		console.log('close');
		$.magnificPopup.close();
	});
	
	$(document).on('click', '.action-edit-address', function(e){
		e.preventDefault();
		e.stopPropagation();
		window.location = '#shipping';
		window.location.reload();
	});

	
	window.loadSubCategoryFilter = function(){
		var currentCategory = $(".am_shopby_filter_items_attr_category_ids input[type=checkbox]:checked");
		var topCategoryName, subCategoryName;
		if($(currentCategory).closest('.items-children').length > 0){
			subCategoryName = $(currentCategory).closest('a').find('span.label').text();
			currentCategory = $(currentCategory).closest('.items-children').closest('li.item').find('a').first();
			topCategoryName = $(currentCategory).find('span.label').text();
		} else {
			topCategoryName = $(currentCategory).closest('a').find('span.label').text();
		}

		if(currentCategory.length == 0){
			$('.am_shopby_filter_items_attr_category_ids ol.items-children').remove();
			return;
		}
		
		$($(currentCategory).closest('.filter-options-item').clone()).insertAfter($(currentCategory).closest('.filter-options-item'));
		$($(".am_shopby_filter_items_attr_category_ids")[1]).find('form').html('');
		$(currentCategory).closest('li').find('.items-children li').each(function(){
			$($(".am_shopby_filter_items_attr_category_ids")[1]).find('form').append($(this).clone());
		});
		$($(".am_shopby_filter_items_attr_category_ids")[1]).closest('.filter-options-item').find('.filter-options-title').html('Subcategorie');
		$('.am_shopby_filter_items_attr_category_ids ol.items-children').remove();
		var currentCategory = $(".am_shopby_filter_items_attr_category_ids input[type=checkbox]:checked").closest('a');
		$(currentCategory).addClass('am_shopby_link_selected');

		$(".amasty-catalog-topnav .filter-options .filter-options-item").first().find(".filter-options-title").text(topCategoryName);
		if(subCategoryName != null){
			$(".amasty-catalog-topnav .filter-options .filter-options-item").first().next().find(".filter-options-title").text(subCategoryName);
		}
		$(".breadcrumbs ul.items li.category").remove();
		$(".breadcrumbs ul.items li.all-products").html('<a href="http://stores.intersteel.nl/categories-page">'+$(".breadcrumbs ul.items li.all-products").text()+'</a>');
		$(".breadcrumbs ul.items").append('<li class="item category"><strong>'+topCategoryName+'</strong></li>');
	}
	window.loadSubCategoryFilter();
	
	$(document).on('amscroll_refresh', function(){
		window.loadSubCategoryFilter();
	});
	
	$(document).on('mousedown', '.table-comparison button.tocart', function(){
		setTimeout(function(){
			window.location = '/checkout/cart';
		}, 1500);
	});
	
	$("a").each(function(index, item){
		if(!$("input#dealer_id").val() > 0){
			return;
		}
		var href = $(item).attr('href');
		if(href == null || href == '#' || href == 'javascript:history.go(-1);' || href.indexOf('dealer_id') > -1){
			return;
		}
		if(href.indexOf('?') > -1){
			href += '&siteName='+$("input#dealer_id").val();
		} else {
			href += '?siteName='+$("input#dealer_id").val();
		}
		$(item).attr('href', href);
	});
	
	$(".cms-index-index .circle").each(function(index, item){
		if(!$("input#dealer_id").val() > 0){
			return;
		}
		var onclick = $(item).attr('onclick');
		onclick = 'window.location = "/categories-page/?siteName='+$("input#dealer_id").val()+'"';
		$(item).attr('onclick', onclick);
	});

});
