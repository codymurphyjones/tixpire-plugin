(function () {
  'use strict';

  var version = "0.0.1";

  console.log(version);
  const style = 'https://cdn.jsdelivr.net/gh/tixpire/tixpire-plugin@' + version + "/src/style.css";
  console.log(style);

  //https://payments.pabbly.com/subscribe/5e9cc88423bccc02d4c6ba46/Udemy%20AWS%20Certified%20Solutions%20Architect%20-%20Associate%202020%20Standard%20Plan

  class Tixpire extends HTMLElement {

    // A getter/setter for a disabled property.
    get disabled() {
      return this.hasAttribute('disabled');
    }

    set disabled(val) {
      // Reflect the value of the disabled property as an HTML attribute.
      if (val) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
    }
    
     get product() {
      return this.getAttribute('product');
    }

    set product(val) {
      // Reflect the value of the disabled property as an HTML attribute.
      if (val) {
        this.setAttribute('product', '');
      } else {
        this.removeAttribute('product');
      }
    }

    // Can define constructor arguments if you wish.
    constructor() {
      // If you define a constructor, always call super() first!
      // This is specific to CE and required by the spec.
      super();
      // Setup a click listener on <app-drawer> itself.
      this.addEventListener('click', e => {
  		if(this.disabled)
  			return;
  		window.open('https://tixpire-admin-panel.herokuapp.com/landing/' + this.product, '_blank',"height=500,width=500"); 
      });
  	
  	function checkSize() {
  		console.log(this);
  		let val = this.parentElement.offsetWidth;
  		
  		
  		if(val < 160)
  			this.childNodes[0].childNodes[0].classList = "small";
  		else
  			this.childNodes[0].childNodes[0].removeAttribute("class");
  	}
  	
  	window.addEventListener('resize', checkSize.bind(this));
  	
  	this.addEventListener('resize', checkSize.bind(this));
  	
  	window.onload = () => {
  		checkSize.bind(this)();
  	};
  	
  	this.setAttribute('class', 'tixpire_button');
  	this.innerHTML = "<button aria-label='Go Now, Pay Later, Tixpire'><div><span>Go Now, Pay Later</span><em></em></div></button>";
  	var head = document.getElementsByTagName('HEAD')[0];  
  	var link = document.createElement('link'); 
  	link.rel = 'stylesheet';  
  	link.type = 'text/css'; 
  	link.href = style;
  	//link.href = './style.css'

  	head.appendChild(link); 
    }
  }

  window.customElements.define('tixpire-api', Tixpire);

}());
