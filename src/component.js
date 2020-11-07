import {version, tixpireUrl} from '../package.json'

const style = 'https://cdn.jsdelivr.net/gh/tixpire/tixpire-plugin@' + version + "/src/style.css"

//https://payments.pabbly.com/subscribe/5e9cc88423bccc02d4c6ba46/Udemy%20AWS%20Certified%20Solutions%20Architect%20-%20Associate%202020%20Standard%20Plan


/*
    var CloseChild = () => {
        try {
        window.opener.postMessage("CLOSEPOPUP", "*");
        }
        catch {
            alert("No parent");
        }
    }
*/

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
  
   get url() {
    return this.getAttribute('url');
  }

  set url(val) {
    // Reflect the value of the disabled property as an HTML attribute.
    if (val) {
      this.setAttribute('url', val);
    } else {
      this.removeAttribute('url');
    }
  }
  
   get product() {
    return this.getAttribute('product');
  }
  
  // A getter/setter for a disabled property.
  get onSuccess() {
    return this.getAttribute('onSuccess');
  }

  get onCancel() {
    return this.getAttribute('onCancel');
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
		window.open(tixpireUrl + this.product, '_blank',"height=500,width=500"); 
    });
	
	window.addEventListener("message", (event) => {
		switch(event.data) {
			case "SUCCESS":
				if(this.onSuccess != nil) {
					this.onSuccess();
				}
				else {
					console.log("Success!");
				}
			break;
			
			case "CANCEL":
				if(this.onCancel != nil) {
					this.onCancel();
				}
				else {
					console.log("Cancel!");
				}
			break;
		}
	}, false);
	
	function checkSize() {
		let val = this.parentElement.offsetWidth;
		
		if(val < 160)
			this.childNodes[0].childNodes[0].classList = "small"
		else
			this.childNodes[0].childNodes[0].removeAttribute("class");
	}
	
	window.addEventListener('resize', checkSize.bind(this));
	
	this.addEventListener('resize', checkSize.bind(this));
	
	window.onload = () => {
		checkSize.bind(this)();
	}
	
	this.setAttribute('class', 'tixpire_button')
	this.innerHTML = "<button aria-label='Go Now, Pay Later, Tixpire'><div><span>Go Now, Pay Later</span><em></em></div></button>"
	var head = document.getElementsByTagName('HEAD')[0];  
	var link = document.createElement('link'); 
	link.rel = 'stylesheet';  
	link.type = 'text/css'; 
	link.href = '../src/style.css'

	head.appendChild(link); 
  }
}

window.customElements.define('tixpire-pay', Tixpire);