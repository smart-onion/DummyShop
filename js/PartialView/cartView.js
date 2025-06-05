import { cart } from '../Utilities/cart.js';
import {getProductById} from "../Utilities/dummyjson.js";

export async function showCartView() {
  // Remove existing modal if any
  // let existingModal = document.getElementById('cartModal');
  // if (existingModal) existingModal.remove();

  // Create modal
  const modal = document.createElement('div');
  modal.id = 'cartModal';

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.classList.add("cart-content");
  modal.appendChild(modalContent);

  // Create close button
  const closeBtn = document.createElement('span');
  closeBtn.textContent = '×';
  closeBtn.style.cssText = `
    position: absolute; top: 10px; right: 15px; font-size: 24px;
    cursor: pointer; color: #333;
  `;
  closeBtn.addEventListener('click', () => modal.remove());
  modalContent.appendChild(closeBtn);

  // Create title
  const title = document.createElement('h2');
  title.textContent = 'Your Cart';
  modalContent.appendChild(title);

  // Create items container
  const cartItemsDiv = document.createElement('div');
  cartItemsDiv.id = 'cartItems';
  modalContent.appendChild(cartItemsDiv);

  // Fetch and display cart items
  const items = cart.getItems();
  if (items.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    for (const item of items) {
      try {
        const productData = await getProductById(item.id);
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
          <div style="flex: 1;">
            <h3 style="margin: 0 0 5px;">${productData.title}</h3>
            <p style="margin: 0;">Quantity: ${item.quantity}</p>
            <p style="margin: 0;">Price: ${(productData.price * item.quantity).toFixed(2)}$</p>
          </div>
          <div>
            <button data-id="${item.id}" style="
              background-color: #f39c12; color: white; padding: 5px 10px;
              border: none; border-radius: 4px; cursor: pointer;
            ">Remove One</button>
          </div>
        `;
        cartItemsDiv.appendChild(itemDiv);
      } catch (error) {
        console.error(`Failed to load product ${item.id}:`, error);
      }
    }
  }

  // Create action buttons
  const actionsDiv = document.createElement('div');
  actionsDiv.style.cssText = 'display: flex; justify-content: space-between;';
  modalContent.appendChild(actionsDiv);

  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear Cart';
  clearBtn.addEventListener('click', async () => {
    cart.removeAll();
    await showCartView();
  });
  actionsDiv.appendChild(clearBtn);

  const orderBtn = document.createElement('button');
  orderBtn.textContent = 'Order';
  orderBtn.addEventListener('click', async () => {
    if (cart.getItems().length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Order placed!');
    cart.removeAll();
    await showCartView();
  });
  actionsDiv.appendChild(orderBtn);

  // Add click listener for modal background close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  // Add click listener for remove one buttons
  cartItemsDiv.addEventListener('click', async (e) => {
    const removeOneBtn = e.target.closest('button[data-id]');
    if (removeOneBtn) {
      const productId = removeOneBtn.dataset.id;
      cart.removeOne(productId);
      await showCartView();
    }
  });
  // Remove existing modal if any
  let existingModal = document.getElementById('cartModal');
  if (existingModal) existingModal.remove();
  document.body.prepend(modal);
}

