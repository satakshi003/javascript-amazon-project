import { renderOrderSummary } from "./checkout/orderSummary.js";

import { renderPaymentSummary } from "./checkout/paymentSummary.js";

import { loadProducts, loadProductsFetch } from "../data/products.js";

import { loadCart, loadCartFetch } from "../data/cart.js";

import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
//import '../data/cart-class.js ';
//import '../data/backend-practice.js';

async function loadPage() {
  try{

    await loadProductsFetch();
    await loadCartFetch();

    await Promise.all([
      loadProductsFetch(),
      loadCartFetch(),
    ]);

  //  throw 'error1';
 // await loadProductsFetch();

    /*
  const value =  await new Promise((resolve, reject) => {
    //  throw 'error2';
      loadCart(() => {
       // reject('error3');
      resolve('value3');
      });
    });
    */
  // await loadCartFetch();

  }  catch (error){
    console.log('Unexpected error. Please try again later.');
  }
 

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

renderCheckoutHeader();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() =>
  {
    resolve('cheppdduu');
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
})
  */

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });

});
*/
