var Tixpire = (function () {
  'use strict';

  const version = "0.0.2";
  const tixpireUrl = "https://services.tixpire.com/checkout";

  const style = 'https://cdn.jsdelivr.net/gh/tixpire/tixpire-plugin@' + version + "/src/style.css";
  var currentUrl = window.location.href.split("://")[1];

  function post(params, method='post') {
    const form = document.createElement('form');
    form.method = method;
    form.action = tixpireUrl;
    form.target = "tixpire_popup";
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];
        form.appendChild(hiddenField);
      }
    }
    form.onsubmit=`window.open('about:blank', "tixpire_popup","height=500,width=500");`;
    document.body.appendChild(form);
    form.submit();
    
  }

  function Tixpire (selector, getCart,requiredURL = null, styleObj = null) {
    // Setup a click listener on <app-drawer> itself.
      //this.addEventListener('click', );
  	const onClick = () => {
  		//window.open(tixpireUrl, '_blank',"height=500,width=500"); 
  		post({cart: getCart()});
      };
  	
  	const init = () => {
  		//setAttribute('class', 'tixpire_button')
  		console.log("I happen");
  		let parent = document.querySelector(selector);
  		let html = parent.innerHTML;
  		parent.innerHTML += "<button id='tixpire' aria-label='Go Now, Pay Later, Tixpire'><div><span>Go Now, Pay Later</span><em></em></div></button>";
  		console.log(parent);
  		var head = document.getElementsByTagName('HEAD')[0];  
  		var link = document.createElement('link'); 
  		link.rel = 'stylesheet';  
  		link.type = 'text/css'; 
  		link.href = style;//'../src/style.css'
  		head.appendChild(link); 
  		let childButton = document.querySelector('#tixpire');
  		childButton.onclick = onClick;
  		Object.assign(childButton.style,styleObj);
  	};

  	if(requiredURL != null && requiredURL != currentUrl)
  			return;
  	
  	if(document.readyState === "complete" || document.readyState === "interactive")
  	{
  		init();
  	}
  	else {
  		window.onload = init;
  	}
  }

  return Tixpire;

}());
