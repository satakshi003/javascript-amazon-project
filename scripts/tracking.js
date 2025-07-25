import { getProduct, loadProductsFetch } from '../data/products.js';
import {getOrder} from '../data/orders.js';
import { setupSearchBar } from './search.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage() {
  await loadProductsFetch();

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

/*const order = getOrder(orderId);
const product = getProduct(productId);
*/

if (!orderId || !productId) {
  console.error('Missing orderId or productId in URL.');
  return;
}

const order = getOrder(orderId);
if (!order) {
  console.error(`No order found for id: ${orderId}`);
  return;
}

const product = getProduct(productId);
if (!product) {
  console.error(`No product found for id: ${productId}`);
  return;
}
let productDetails;
order.products.forEach((details) => {
  if (details.productId === product.id) {
    productDetails = details;
    }
});
if (!productDetails) {
  console.error(`No product details found for productId: ${product.id}`);
  return;
}

const today = dayjs();
const orderTime = dayjs(order.orderTime);
const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
const percentProgress = ((today - orderTime) / (deliveryTime- orderTime)) * 100;


let trackingHTML = `
 <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
         ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src= "${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label 
          ${(percentProgress>= 50 && percentProgress<100)?'current-status' : ''
          }">
            Shipped
          </div>
          <div class="progress-label
          ${percentProgress>=100?"current-status" : ''
          }">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: 0%;">
          </div>
        </div>

`;
document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

const progressBar = document.querySelector('.progress-bar');

progressBar.offsetWidth;

progressBar.style.width = `${percentProgress}%`;

requestAnimationFrame(() => {
  document.querySelector('.progress-bar').style.width = `${percentProgress}%`;
});
}

loadPage().then(() => {
  setupSearchBar();
});
