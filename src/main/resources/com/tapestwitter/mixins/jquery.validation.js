var validationTimerId = null;

var Validation = function(id, link, config) {	
	var configuration = $.parseJSON(config);
	this.element = $('#' + id)[0];
    this.link = link;
    this.timer = new Number(configuration.timer);
    this.currentValue = $(this.element).val();
    this.validationEvent = configuration.validateEvent;
    this.etat = configuration.etat;

    $(this.element).bind(this.validationEvent, $.proxy(this, "validate") );
    $(this.element).focus( $.proxy(this, "onFocus") );
    $(this.element).blur( $.proxy(this, "onBlur") );
    
    if(this.etat != "INFO"){
    	this.init();
    }
  };
  
Validation.prototype.init = function(){
	  var blockName = (this.element.id||'') + "_error";
	  if(this.etat == 'OK'){
		  blockName = (this.element.id||'') + "_good";
	  }
	  $('#' + blockName).addClass('show');
};

Validation.prototype.validate = function() {
	var val = $(this.element).val();
	var id = this.element.id;
	  if(val== "" || (this.currentValue != val)){
		  
		  if( this.validationEvent == 'keyup'){
			  $('#' + id + "_info_message").addClass("hide");
			  $('#' + id + "_avail_check_indicator").removeClass("hide");
			  $('#' + id + "_info").addClass('show');			  			  
		  } else {
			  $('#' + id + "_info").removeClass('show');
		  }
		  	 
		  $('#' + id + "_good").removeClass('show');
		  $('#' + id + "_error").removeClass('show');
		  	 
		  if (validationTimerId != null){
			  window.clearTimeout( validationTimerId );
		  }
		  validationTimerId = setTimeout($.proxy(this, "sendRequest"), this.timer);
		  this.currentValue =  $(this.element).val();
	  }	  
};

Validation.prototype.onBlur = function(){
	  $('#' + this.element.id + "_info").removeClass('show');
};

Validation.prototype.onFocus = function(){
	var id = this.element.id;
	  if(! ($('#' + id + "_good").hasClass('show') || $('#' + id + "_error").hasClass('show'))) {		 
		  $('#' + id + "_info_message").removeClass("hide");
		  $('#' + id + "_avail_check_indicator").addClass("hide");
		  $('#' + id + "_info").addClass('show');
	  }
};

Validation.prototype.sendRequest = function() {
	$.get(this.link, {"value" : $(this.element).val(), "clientId" : this.element.id},
			function(response){
		  var json = response;
		  var id = (json.clientId||'');
		  var blockName = id + "_info";;
		  $('#' + blockName).removeClass('show');
		  
		  if (json.result == 'OK'){
			  blockName = id + "_good";
						  
		  }else{
			  blockName = id + "_error";
			  $('#' + blockName).html(json.message);
		  }
		  $('#' + json.clientId + "_info").removeClass('show');
		  $('#' + blockName).addClass('show');
	    });
};