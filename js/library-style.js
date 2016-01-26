NodeList.prototype.forEach = Array.prototype.forEach; 
HTMLCollection.prototype.forEach = Array.prototype.forEach;

document.addEventListener('DOMContentLoaded', function(e) {
	
	/** @auth Matheus, João, Fernando
	 * MOSTRAR E ESCONDER MODAL AO CLICAR UMA OU DUAS VEZES NOS SELETORES ABAIXO
	 */
	document.querySelectorAll('[data-toggle=modal], div.alpha').forEach(function($e, i, n) {
		$e.ondblclick = function(event) {
			return openBox($e);
		};			
		$e.onclick = function(event) {
			if ($e.nodeName.toLowerCase() == 'input')
				return true;
			return openBox($e);
		}
	});
	
});

jQuery(document).ready(function () {
	
	/** @auth Matheus
	 * UPPER CASE NO SISTEMA
	 */
//	jQuery('input, textarea, select').css('text-transform', 'uppercase');
//	jQuery('input, textarea, select').keyup(function(event) {
	jQuery('select').css('text-transform', 'uppercase');
	jQuery('select').keyup(function(event) {
		this.value = this.value.toUpperCase();
		return event.preventDefault();
	});
	
	/** @auth Matheus
	 * ADICIONAR MODAL EM TODAS AS PAGINAS
	 */
	jQuery('body').append('<div class="alpha"><div class="modal"><iframe></iframe></div></div>');
	
	/** @auth Matheus
	 * ESCONDER ELEMENTOS DEPOIS DE 2 SEGUNDOS
	 */
	if (!jQuery('.time-out').is(':empty')) {
		setTimeout(function () {
           jQuery('.time-out').toggle(); 
        }, 2000);
    }
	
	/** @auth Matheus
	 *  INICIO TABS
	 */
	jQuery('li.active a').each(function() {
		var idActive = $(this).attr('href').replace('#', '');
		jQuery('div#' + idActive).fadeIn();
	})
	
	jQuery('ul[class^=tab] a').click(function(e) {
        e.preventDefault();
        if ($(this).closest('li').attr('class') == 'active'){
        	return;
        } else {             
          jQuery('.tab-group').find('[id^=content]').attr({'aria-expanded' : 'false', 'aria-hidden' : 'true'}).hide();
          jQuery('ul[class^=tab] li').removeAttr('class').attr('aria-selected', 'false');
          $(this).parent().addClass('active').attr('aria-selected', 'true');
          jQuery('#content-' + $(this).attr('id')).attr({'aria-expanded' : 'true', 'aria-hidden' : 'false'}).fadeIn();
        }
    });
	/**
	 * FIM TABS
	 */
	
	/** @auth Matheus
	 * SETANDO LI ATIVO DE ACORDO COM URL
	 */
//	jQuery('li[id=' + getFinal() + ']').addClass('active');
	
	
	/** @auth Matheus
	 * REALIZANDO SLIDE NO MENU
	 */
	jQuery('[data-slide=true]').click(function() {
		if (jQuery(this).find('span').hasClass('icon-circle-arrow-down')) {
			jQuery(this).find('span').removeClass('icon-circle-arrow-down').addClass('icon-circle-arrow-up');
			jQuery(jQuery(this).attr('href')).slideDown(500);
		} else {
			jQuery(this).find('span').removeClass('icon-circle-arrow-up').addClass('icon-circle-arrow-down');
			jQuery(jQuery(this).attr('href')).slideUp(500);
		}
	})
	
	/** @auth Matheus
	 * DESABILITANDO CLICK EM ELEMENTO DISABLED
	 */
	jQuery('[disabled]').click(function() {
		
	});
	
});

/** @auth Matheus e Fernando
 * ABRIR E FECHAR OPENBOX
 */
function openBox($obj) {
	if (($obj.href || $obj.formAction) != undefined)
		jQuery('iframe').attr('src', ($obj.href || $obj.formAction));
	if ($obj.nodeName.toLowerCase() == 'div') {
		jQuery('div.alpha').fadeOut(300);
		jQuery('div.modal').fadeOut(300);
	} else {
		jQuery('div.alpha').fadeIn(300);
		jQuery('div.modal').fadeIn(300);
	}
	return false;
}

/** @auth Matheus
 * MOSTRAR OU ESCONDER ELEMENTO INFORMADO NOS PARAETROS
 */
function toggleElement(element, parametro) {
	jQuery(element + '[data-toggle=' + parametro + ']').fadeToggle("slow");
}

/** @auth Matheus
 * IDENTIFICAR URL PARA ATIVAR LI
 */
function identityUrl() {
	return window.location.href;
}
function getFinal() {
	var url = identityUrl();
	return url.substring(url.lastIndexOf('/') + 1);
}