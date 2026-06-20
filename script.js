/* ==========================================================================
   Rubique Skin Lab — Site Script
   ========================================================================== */

/* ---------------------------------------------------------------------
   Preloader — registered first so it ALWAYS hides, even if an error
   occurs later in this file (e.g. a missing element on the page).
   --------------------------------------------------------------------- */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) setTimeout(() => preloader.classList.add("hidden"), 400);
});
// Safety net: force-hide after 3s no matter what, in case 'load' never fires as expected
setTimeout(() => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.classList.add("hidden");
}, 3000);

/* ---------------------------------------------------------------------
   ⚠️ CONFIG — replace these two values with your real details
   --------------------------------------------------------------------- */
const PAYSTACK_PUBLIC_KEY = "pk_test_4dda658bb82e04b88a76b52548dffe5fc851cb0a";
const WHATSAPP_NUMBER = "2348166947817"; // country code + number, no + or spaces

/* ---------------------------------------------------------------------
   Product catalogue
   --------------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "p1",
    name: "Glow Vitamin C Serum",
    price: 18500,
    tag: "Bestseller",
    desc: "Brightens & evens skin tone",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "p2",
    name: "Hydrating Face Cleanser",
    price: 9500,
    tag: "Daily Essential",
    desc: "Gentle, sulfate-free formula",
    img: "https://images.unsplash.com/photo-1556228852-80b6e2a5ea6e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "p3",
    name: "Radiance Glow Oil",
    price: 14000,
    tag: "Cult Favourite",
    desc: "Lightweight, fast-absorbing oil",
    img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "p4",
    name: "SPF 50 Sunscreen",
    price: 11000,
    tag: "Must-Have",
    desc: "Broad-spectrum, no white cast",
    img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "p5",
    name: "Deep Moisturizer Cream",
    price: 16500,
    tag: "Hydration+",
    desc: "24hr barrier-repair moisture",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "p6",
    name: "Acne Treatment Gel",
    price: 100,
    tag: "Clear Skin",
    desc: "Targets blemishes overnight",
    img: "https://images.unsplash.com/photo-1570194065650-d99fb4ee0e02?auto=format&fit=crop&w=500&q=80"
  }
];

const CART_KEY = "rubique_cart";

/* ---------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------- */
function formatNaira(amount){
  return "₦" + Number(amount).toLocaleString("en-NG");
}

function getProduct(id){
  return PRODUCTS.find(p => p.id === id);
}

function loadCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    return [];
  }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

let cart = loadCart();

/* ---------------------------------------------------------------------
   DOM references
   --------------------------------------------------------------------- */
const productGrid = document.getElementById("productGrid");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");
const cartFloatCountEl = document.getElementById("cartFloatCount");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const modalTotalEl = document.getElementById("modalTotal");
const toastEl = document.getElementById("toast");

/* ---------------------------------------------------------------------
   Render products
   --------------------------------------------------------------------- */
function renderProducts(){
  productGrid.innerHTML = PRODUCTS.map((p, i) => `
    <article class="product-card" style="animation-delay:${i * 0.07}s">
      <div class="product-img">
        <span class="product-tag">${p.tag}</span>
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-bottom">
          <span class="product-price">${formatNaira(p.price)}</span>
          <button class="add-cart-btn" data-id="${p.id}">
            <i class="fa-solid fa-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

/* ---------------------------------------------------------------------
   Cart logic
   --------------------------------------------------------------------- */
function addToCart(id, btn){
  const existing = cart.find(item => item.id === id);
  if(existing){
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart(cart);
  renderCart();

  if(btn){
    btn.classList.add("added");
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
    setTimeout(() => {
      btn.classList.remove("added");
      btn.innerHTML = original;
    }, 1200);
  }
  showToast("Added to your bag", "success");
}

function removeFromCart(id){
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

function changeQty(id, delta){
  const item = cart.find(i => i.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){
    removeFromCart(id);
  } else {
    saveCart(cart);
    renderCart();
  }
}

function getCartTotal(){
  return cart.reduce((sum, item) => {
    const p = getProduct(item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function getCartCount(){
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCart(){
  const count = getCartCount();
  cartCountEl.textContent = count;
  cartFloatCountEl.textContent = count;

  if(cart.length === 0){
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your bag is empty.<br>Add a product to get started.</p>
      </div>`;
  } else {
    cartItemsEl.innerHTML = cart.map(item => {
      const p = getProduct(item.id);
      if(!p) return "";
      return `
        <div class="cart-item" data-id="${p.id}">
          <img src="${p.img}" alt="${p.name}">
          <div class="cart-item-info">
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-price">${formatNaira(p.price)} × ${item.qty}</div>
            <div class="qty-control">
              <button class="qty-minus" data-id="${p.id}" aria-label="Decrease quantity">−</button>
              <span>${item.qty}</span>
              <button class="qty-plus" data-id="${p.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-id="${p.id}" aria-label="Remove item">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>`;
    }).join("");
  }

  const total = getCartTotal();
  cartTotalEl.textContent = formatNaira(total);
  modalTotalEl.textContent = formatNaira(total);
}

/* ---------------------------------------------------------------------
   Cart sidebar open / close
   --------------------------------------------------------------------- */
function openCart(){
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeCart(){
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("cartFloat").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

/* Delegate add-to-cart + qty + remove clicks */
productGrid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-cart-btn");
  if(btn) addToCart(btn.dataset.id, btn);
});

cartItemsEl.addEventListener("click", (e) => {
  const minus = e.target.closest(".qty-minus");
  const plus = e.target.closest(".qty-plus");
  const remove = e.target.closest(".cart-item-remove");
  if(minus) changeQty(minus.dataset.id, -1);
  if(plus) changeQty(plus.dataset.id, 1);
  if(remove) removeFromCart(remove.dataset.id);
});

/* ---------------------------------------------------------------------
   WhatsApp ordering
   --------------------------------------------------------------------- */
function buildWhatsappMessage(customerName, address){
  if(cart.length === 0) return "";
  let lines = [`Hello Rubique Skeen Lab, I want to place an order:`, "", "Products:"];
  cart.forEach(item => {
    const p = getProduct(item.id);
    if(p) lines.push(`- ${p.name} x${item.qty}`);
  });
  lines.push("");
  lines.push(`Total: ${formatNaira(getCartTotal())}`);
  if(customerName) lines.push(`Name: ${customerName}`);
  if(address) lines.push(`Delivery Address: ${address}`);
  return lines.join("\n");
}

document.getElementById("whatsappOrderBtn").addEventListener("click", () => {
  if(cart.length === 0){
    showToast("Your bag is empty", "error");
    return;
  }
  const message = buildWhatsappMessage();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});

/* General WhatsApp floating button + contact button -> open plain chat */
const whatsappFloat = document.getElementById("whatsappFloat");
whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Rubique Skeen Lab, I have a question about your prices.")}`;

document.getElementById("contactWhatsappBtn").addEventListener("click", () => {
  window.open(whatsappFloat.href, "_blank");
});

/* "Can't find a product" -> WhatsApp custom order button */
const customOrderBtn = document.getElementById("customOrderBtn");
if (customOrderBtn) {
  customOrderBtn.addEventListener("click", () => {
    const message = "Hello Rubique Skeen Lab, I'm looking for a product that isn't listed on your website. Here's my full order:\n\n- Product(s): \n- Quantity: \n\nName: \nDelivery Address: ";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
}

/* ---------------------------------------------------------------------
   Checkout modal + Paystack
   --------------------------------------------------------------------- */
const checkoutModal = document.getElementById("checkoutModal");
const checkoutForm = document.getElementById("checkoutForm");
const successModal = document.getElementById("successModal");

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if(cart.length === 0){
    showToast("Your bag is empty", "error");
    return;
  }
  modalTotalEl.textContent = formatNaira(getCartTotal());
  checkoutModal.classList.add("active");
});

document.getElementById("closeCheckoutModal").addEventListener("click", () => {
  checkoutModal.classList.remove("active");
});
checkoutModal.addEventListener("click", (e) => {
  if(e.target === checkoutModal) checkoutModal.classList.remove("active");
});

function validateCheckoutForm(){
  let valid = true;
  const name = document.getElementById("chkName");
  const email = document.getElementById("chkEmail");
  const phone = document.getElementById("chkPhone");
  const address = document.getElementById("chkAddress");

  const fields = [
    { el: name, errId: "chkNameError", test: v => v.trim().length >= 2, msg: "Please enter your full name." },
    { el: email, errId: "chkEmailError", test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: "Please enter a valid email address." },
    { el: phone, errId: "chkPhoneError", test: v => /^[0-9+\s-]{10,15}$/.test(v.trim()), msg: "Please enter a valid phone number." },
    { el: address, errId: "chkAddressError", test: v => v.trim().length >= 6, msg: "Please enter your delivery address." }
  ];

  fields.forEach(f => {
    const group = f.el.closest(".form-group");
    const errorEl = document.getElementById(f.errId);
    if(!f.test(f.el.value)){
      group.classList.add("invalid");
      errorEl.textContent = f.msg;
      valid = false;
    } else {
      group.classList.remove("invalid");
      errorEl.textContent = "";
    }
  });

  return valid;
}

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if(!validateCheckoutForm()) return;
  if(cart.length === 0){
    showToast("Your bag is empty", "error");
    return;
  }

  const name = document.getElementById("chkName").value.trim();
  const email = document.getElementById("chkEmail").value.trim();
  const phone = document.getElementById("chkPhone").value.trim();
  const address = document.getElementById("chkAddress").value.trim();
  const total = getCartTotal();

  const payBtn = document.getElementById("payNowBtn");
  payBtn.disabled = true;
  payBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing…';

  if(typeof PaystackPop === "undefined" || PAYSTACK_PUBLIC_KEY.includes("REPLACE")){
    payBtn.disabled = false;
    payBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Pay Now';
    showToast("Payment isn't configured yet. Add your Paystack key in script.js.", "error");
    return;
  }

  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: total * 100, // kobo
    currency: "NGN",
    ref: "RSL-" + Date.now(),
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", variable_name: "customer_name", value: name },
        { display_name: "Phone", variable_name: "phone", value: phone },
        { display_name: "Delivery Address", variable_name: "address", value: address }
      ]
    },
    callback: function(response){
      handlePaymentSuccess(response, name, total);
    },
    onClose: function(){
      payBtn.disabled = false;
      payBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Pay Now';
      showToast("Payment window closed", "error");
    }
  });

  handler.openIframe();
});

function handlePaymentSuccess(response, name, total){
  checkoutModal.classList.remove("active");
  closeCart();
  checkoutForm.reset();

  document.getElementById("successMessage").textContent =
    `Thanks${name ? ", " + name : ""}! Your payment of ${formatNaira(total)} was successful.\nReference: ${response.reference}\nWe'll begin processing your order right away.`;
  successModal.classList.add("active");

  cart = [];
  saveCart(cart);
  renderCart();

  const payBtn = document.getElementById("payNowBtn");
  payBtn.disabled = false;
  payBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Pay Now';
}

document.getElementById("closeSuccessModal").addEventListener("click", () => {
  successModal.classList.remove("active");
});
successModal.addEventListener("click", (e) => {
  if(e.target === successModal) successModal.classList.remove("active");
});

/* ---------------------------------------------------------------------
   Contact form validation
   --------------------------------------------------------------------- */
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById("cName");
  const email = document.getElementById("cEmail");
  const message = document.getElementById("cMessage");

  const checks = [
    { el: name, errId: "cNameError", test: v => v.trim().length >= 2, msg: "Please enter your name." },
    { el: email, errId: "cEmailError", test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: "Please enter a valid email." },
    { el: message, errId: "cMessageError", test: v => v.trim().length >= 10, msg: "Message should be at least 10 characters." }
  ];

  checks.forEach(c => {
    const group = c.el.closest(".form-group");
    const errorEl = document.getElementById(c.errId);
    if(!c.test(c.el.value)){
      group.classList.add("invalid");
      errorEl.textContent = c.msg;
      valid = false;
    } else {
      group.classList.remove("invalid");
      errorEl.textContent = "";
    }
  });

  if(!valid) return;

  showToast("Message sent! We'll get back to you soon.", "success");
  contactForm.reset();
});

/* ---------------------------------------------------------------------
   Toast notifications
   --------------------------------------------------------------------- */
let toastTimer;
function showToast(message, type = "success"){
  clearTimeout(toastTimer);
  const icon = type === "success" ? "fa-circle-check" : "fa-circle-exclamation";
  toastEl.innerHTML = `<i class="fa-solid ${icon}"></i> ${message}`;
  toastEl.classList.add("active");
  toastTimer = setTimeout(() => toastEl.classList.remove("active"), 3200);
}

/* ---------------------------------------------------------------------
   Mobile menu
   --------------------------------------------------------------------- */
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

navLinks.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = menuToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

/* ---------------------------------------------------------------------
   Scroll-to-top button
   --------------------------------------------------------------------- */
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if(window.scrollY > 400){
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------------------------------------------------------------------
   Scroll reveal animations
   --------------------------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ---------------------------------------------------------------------
   Init
   --------------------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
