const cartItemsDiv = document.querySelector('#cartItems');
let cartItems = JSON.parse(localStorage.getItem('cartItems'));

cartItems.forEach((item, index) => {
    let cartItemDiv = document.createElement('article');
    let cartItemName = document.createElement('h3');
    let cartItemPrice = document.createElement('p');
    let itemAmountInput = document.createElement('input');
    let deleteBtn = document.createElement('button');
    let itemAmount = 1; 

    itemAmountInput.setAttribute('type', 'number');
    itemAmountInput.value = itemAmount;
    cartItemName.textContent = item.name;
    cartItemPrice.textContent = `${item.price} kr.-`;
    itemAmountInput.textContent = itemAmount;
    deleteBtn.textContent = 'X';

    cartItemDiv.appendChild(cartItemName);
    cartItemDiv.appendChild(deleteBtn);
    cartItemDiv.appendChild(itemAmountInput);
    cartItemDiv.appendChild(cartItemPrice);
    cartItemsDiv.appendChild(cartItemDiv);

    itemAmountInput.oninput = e => {
        itemAmount = e.target.value;
        if (itemAmount > 0 && itemAmount < 100) {
            cartItemPrice.textContent = `${item.price * itemAmount} kr.-`;
        } else {
            itemAmount = 1;
            e.target.value = '';
        }
        cartItems[index].itemAmount = itemAmount;
        console.log(cartItems);
        cartItemPrice.textContent = `${item.price * itemAmount} kr.-`;
    }

    deleteBtn.onclick = e => {
        let obtainedName = e.target.parentNode.firstChild.innerHTML;
        cartItemsDiv.removeChild(cartItemDiv);
        
        cartItems.forEach((item, index) => {
            if (item.name === obtainedName) {
                cartItems.splice(index, 1);
            }
        });

        if (cartItems.length > 0) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } else {
            localStorage.removeItem('cartItems');
        }
        console.log(localStorage);
    }

});