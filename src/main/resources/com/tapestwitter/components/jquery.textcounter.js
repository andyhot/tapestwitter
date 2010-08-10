// A class that implement the "Twitter-like" char's counter.
// @author Laurent Guerin
var TextCounter = function(textareaId, elementId, maxlength, warningLimit, warningStyle)
{
	// The textarea to inspect
	this.textarea = $('#' + textareaId)[0];
	// The target HTML element to update
	this.element = $('#' + elementId)[0];
	
	// Other params
	this.maxlength = maxlength;
	this.warningLimit = warningLimit;
	this.warningStyle = warningStyle;
	$(this.element).html(this.maxlength);			
	
	// Events
	$(this.textarea).keyup($.proxy(this, 'updateTextCounter'));			
	$(this.textarea).keydown($.proxy(this, 'updateTextCounter'));
};

TextCounter.prototype.updateTextCounter = function(e) {
	var currentCount = this.maxlength - this.textarea.value.length;
	var isLimit = false;
	if (this.warningLimit && currentCount <= this.warningLimit) {
			isLimit = true;
			$(this.element).addClass(this.warningStyle);
	}
	if (isLimit && currentCount >= this.warningLimit) {
		isLimit = false;
		$(this.element).removeClass(this.warningStyle);
	}
	$(this.element).html(currentCount);
};