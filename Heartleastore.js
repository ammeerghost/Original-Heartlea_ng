
 // JavaScript for Cart Functionality
 let cart = [];

 function addToCart(itemName, itemPrice) {
     cart.push({ name: itemName, price: itemPrice });
     updateCart();
 }

 function updateCart() {
     const cartItems = document.getElementById('cart-items');
     const cartCount = document.getElementById('cart-count');
     const cartTotal = document.getElementById('cart-total');

     cartItems.innerHTML = '';
     let total = 0;
     cart.forEach(item => {
         const li = document.createElement('li');
         li.textContent = `${item.name} - $${(item.price / 100).toFixed(2)}`;
         cartItems.appendChild(li);
         total += item.price;
     });

     cartCount.textContent = cart.length;
     cartTotal.textContent = (total / 100).toFixed(2);
 }

 // Paystack Payment Integration
 function payWithPaystack() {
     if (cart.length === 0) {
         alert('Your cart is empty!');
         return;
     }

     const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

     const handler = PaystackPop.setup({
         key: 'pk_test_84db19c15be3756c83d6d26ea0ec28f735447391', // Replace with your Paystack public key
         email: 'customer@example.com', // Replace with the customer's email
         amount: totalAmount, // Amount in kobo (multiply dollars by 100)
         currency: 'USD',
         callback: function (response) {
             // Payment was successful
             alert('Payment successful! Transaction reference: ' + response.reference);
             cart = []; // Clear the cart
             updateCart();
         },
         onClose: function () {
             alert('Transaction was not completed, window closed.');
         }
     });
     handler.openIframe();
 }