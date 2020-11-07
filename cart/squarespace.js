function getSquareSpaceCart() {
	let cartCollection = [];
	let cartData = document.querySelectorAll('#sqs-cart-container > div > div.CartTable-cartContainer-5Lix3.cart-container > div.CartTableRow-cartItemList-qrq0l')
	cartData.forEach((obj) => {
		console.log(obj.querySelector('.item-desc'));
		//Item name
		let name = obj.querySelector('.item-desc > div > a').innerHTML
	
		//Variant Details
		let variants = obj.querySelectorAll('.item-desc > div.variant-info > div.variant')
		let variantDesc = " - ";
		variants.forEach((variant) => {
			variantDesc += variant.innerText + ";"
		});
		name = name + variantDesc
		console.log(name);
	
		let quantity = parseInt(obj.querySelector('.item-quantity > input').value)
		console.log(quantity);
	
		let price = parseFloat(obj.querySelector('.item-price').innerText.replace("$","")) / quantity
		console.log(price);
		cartCollection.push({"name": name, "price": price, "quantity": quantity, "id": 1000});
});
  
  return JSON.stringify(cartCollection);
}