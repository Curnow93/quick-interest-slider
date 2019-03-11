$ = jQuery;

var fx = {'lines':$('#currencies tbody tr').length,'addLine':function(t) {
	this.lines++;
	
	var newLine = $(qis_template.raw);
	newLine.find('.input-symbol').attr({'name':'currency_array['+this.lines+'][symbol]','value':''});
	newLine.find('.input-iso').attr({'name':'currency_array['+this.lines+'][iso]','value':''});
	newLine.find('.input-name').attr({'name':'currency_array['+this.lines+'][name]','value':''});

	$('#currencies tbody').append(newLine);
	newLine.find('.fx_remove_line').click(qis_remove_line);
	
},removeLine:function(t) {
	$(t).closest('tr').remove();
}};

jQuery(document).ready(function($){
    var custom_uploader;
    $('#qis_upload_background_image').click(function(e) {
        e.preventDefault();
        if (custom_uploader) {custom_uploader.open();return;}
        custom_uploader = wp.media.frames.file_frame = wp.media({
            title: 'Background Image',button: {text: 'Insert Image'},multiple: false});
        custom_uploader.on('select', function() {
            attachment = custom_uploader.state().get('selection').first().toJSON();
            $('#qis_background_image').val(attachment.url);
        });
        custom_uploader.open();
    });
    
    $('.qis-color').wpColorPicker();
	
	$selector = $('#chkCurrency,#chkFX');
	$selector.change(function() {
		if ($selector.is(':checked')) $("#showCurrencies").show("slow");
		else {
			$("#showCurrencies").hide("slow");
		}
	});
	
	$('.fx_remove_line').click(qis_remove_line);
	
	$('.fx_new_line').click(function() {
		fx.addLine(this);
	});
	
	/*
		Some Javascript for the checkboxes
	*/
	$('input[name=interestdisplay]').change(function() { });
	$('.qis-interest-input').click(function(e) { 
		var t = $(this);
		window.setTimeout(function() {
			t.parent('li').click();
		},10);
		e.stopPropagation();
		e.preventDefault();
		return false; 
	});
	$('.qisinterest li').click(function() {
		
		var t = $(this), r = t.find('input[type=checkbox]'), v = t.find('input[type=radio]').attr('value');
		if (r.is(':checked')) {
			// Uncheck everything
			t.find('input').attr('checked',false);
			$('#qis-interest-div').hide();
			$('.qis-interest').hide();
			t.removeClass('selected');
			return false;
		}
		
		qis_do_standard(t,r,v);
	});
	
	// Add default behavior for selected checkbox
	if ($('.qis-interest-input:checked').size()) {
		var r = $('.qis-interest-input:checked');
		var t = r.parent('li');
		var v = t.find('input[type=radio]').attr('value');
		qis_do_standard(t,r,v);
	}
});
function qis_do_standard(t,r,v) {
	$('#qis-interest-div').show();
	$('.qis-interest').hide();
	$('#qis-interest-'+v).show();
	$('.qis-interest-input').attr('checked',false);
	r.attr('checked',true);
	
	t.parent().find('li').removeClass('selected');
	t.addClass('selected');
}
function qis_remove_line() {
	fx.removeLine(this);
}