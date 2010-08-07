package com.tapestwitter.mixins;

import org.apache.tapestry5.ClientElement;
import org.apache.tapestry5.annotations.AfterRender;
import org.apache.tapestry5.annotations.InjectContainer;
import org.apache.tapestry5.annotations.MixinAfter;
import org.apache.tapestry5.ioc.annotations.Inject;
import org.apache.tapestry5.json.JSONArray;
import org.apache.tapestry5.json.JSONObject;
import org.apache.tapestry5.services.FormSupport;
import org.apache.tapestry5.services.javascript.JavaScriptSupport;

/**
* Submit the form on change event
* 
* @author karesti
* 
*/
@MixinAfter
public class SubmitFormOnChange
{

	@Inject
	private JavaScriptSupport javaScriptSupport;

	@Inject
	private FormSupport formSupport;

	@InjectContainer
	private ClientElement container;

	@AfterRender
	public void addSubmitOnChange()
	{
		JSONArray spec = new JSONArray();
		spec.put(container.getClientId());
		spec.put(formSupport.getClientId());
		
		JSONObject args = new JSONObject();
		args.put("args", spec);

		javaScriptSupport.addInitializerCall("submitOnChange", args);

	}

}