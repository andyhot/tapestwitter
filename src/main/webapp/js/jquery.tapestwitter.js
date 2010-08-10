Tapestry.Initializer.submitOnChange = function(args) {
	var elementId = args.elementId;
	var formId = args.formId;
	$('#' + elementId).change(function(event) {
		event.preventDefault();
		$('#' + formId).trigger('submit');               
        return false;
	});	
};
	
	

