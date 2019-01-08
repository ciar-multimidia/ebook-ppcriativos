jQuery(document).ready(function($) {
	var $minicurriculos = $('.minicurriculos ul li');
	if ($minicurriculos.length > 1) $minicurriculos.find('h5').on('click', function(event) {
		$minicurriculos.not($(this).parent()).removeClass('aberto').find('p').not($(this).parent().find('p')).slideUp(300);
		$(this).parent().toggleClass('aberto').find('p').slideToggle(300);
	});


	var $header = $('#principal');
	var $btLerArtigo = $header.find('button.ler-artigo');
	var $main = $('main');

	var $headerfixo = $header.clone();

	$headerfixo.removeAttr('id').addClass('fixo').insertAfter($header);

	$btLerArtigo.on('click', function(event) {
		var tempoBase = 1000;
		var tempomaximo = 1500;
		var tempo = (Math.abs($header.outerHeight() - $('html').scrollTop()) / $header.outerHeight())*tempoBase;
		if (tempo > tempomaximo) tempo = tempomaximo;
		$('html').animate({'scrollTop': $header.outerHeight()}, tempo);
	});






	var btNotas = $('.bt-nota-rodape');
	var notasRodape = $('#notas-de-rodape');

	var notaAtual = 0;

	notasRodape.find('button.fechar').on('click', function(event) {
		notasRodape.removeClass('visivel animation').children('div').removeClass('atual');
		notaAtual = 0;
		btNotas.removeClass('ativo');

		
	});

	btNotas.on('click', function(event) {
		var indexNotaClicada = parseInt($(this).attr('data-nota'));
		var btClicado = $(this);
		var notaClicada = notasRodape.children('div[data-nota]').filter('[data-nota="'+indexNotaClicada+'"]');
		notasRodape.removeClass('visivel animation parabaixo').children('div').removeClass('atual');
		btNotas.removeClass('ativo');

		if (indexNotaClicada === notaAtual) {
			notaAtual = 0;
		} else{
			notasRodape.addClass('visivel');
			notaClicada.addClass('atual');
			var topNota = btClicado.position().top - notasRodape.height();
			if (topNota < 0) {
				notasRodape.addClass('parabaixo');
				topNota = btClicado.position().top + btClicado.outerHeight();
			};
			var leftNota = btClicado.position().left + btClicado.width()/2 - notasRodape.width()/2;
			if (leftNota < 0) {
				leftNota = 0
			} else if (leftNota + notasRodape.width() > $('main').width()) {
				leftNota = $('main').width() - notasRodape.width();
			}
			notasRodape
			.css({
				'top': topNota,
				'left': leftNota
			})
			.addClass('animation');
			btClicado.addClass('ativo');

			notaAtual = indexNotaClicada;
		}
	});
});