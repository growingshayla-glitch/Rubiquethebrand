/* ==========================================================================
   Rubique Skeen Lab — script.js
   ========================================================================== */

/* ─────────────────────────────────────────────────────────────────────
   PRELOADER — always at the very top so it hides no matter what
   Using DOMContentLoaded (not window load) so it doesn't wait for images
   ───────────────────────────────────────────────────────────────────── */
function hidePreloader(){
  const p = document.getElementById("preloader");
  if(!p) return;
  p.classList.add("hidden");
  // After CSS transition finishes, fully remove from layout
  setTimeout(() => { p.style.display = "none"; }, 600);
}
document.addEventListener("DOMContentLoaded", () => setTimeout(hidePreloader, 500));
setTimeout(hidePreloader, 2500); // absolute safety net

/* ─────────────────────────────────────────────────────────────────────
   CONFIG — put your real keys here
   ───────────────────────────────────────────────────────────────────── */
const PAYSTACK_PUBLIC_KEY = "pk_live_9e6e268f0e308228b4cb0670a039df2153c31703";
const WHATSAPP_NUMBER     = "2348166947817";

/* ─────────────────────────────────────────────────────────────────────
   EMAILJS — contact form sends to your Gmail (rubique2026@gmail.com)
   ════════════════════════════════════════════════════════════════════
   HOW TO SET UP (takes about 5 minutes, it's FREE):
   1. Go to https://www.emailjs.com → Sign Up (use rubique2026@gmail.com)
   2. Click "Add New Service" → choose Gmail → Connect your Gmail account
      → Copy the Service ID shown (e.g. "service_abc1234")
   3. Click "Email Templates" → Create New Template
      Paste this in the template body:
        New message from: {{from_name}}
        Email: {{from_email}}
        Message: {{message}}
      Set Subject to: New Message from Rubique Skeen Lab Website
      → Click Save → Copy the Template ID (e.g. "template_xyz789")
   4. Click "Account" at top → copy your Public Key
   5. Replace the three values below with yours and save
   ═══════════════════════════════════════════════════════════════════ */
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc1234"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // from EmailJS Account page

// Initialise EmailJS
if(typeof emailjs !== "undefined"){
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/* ─────────────────────────────────────────────────────────────────────
   PRODUCTS
   ════════════════════════════════════════════════════════════════════
   NORMAL PRODUCT:
   { id:"p1", name:"Product Name", price:3500, tag:"Bestseller",
     desc:"Short description", img:"filename.jpeg", soldOut:false },

   COMBO CARD (one photo, four items with different prices):
   { id:"combo1", type:"combo", tag:"Top Picks", img:"photo.jpeg",
     items:[
       { name:"Item A", price:700, soldOut:false },
       { name:"Item B", price:700, soldOut:true  },
     ]
   },
   ═══════════════════════════════════════════════════════════════════ */
const PRODUCTS = [
  {
    id:"p1", name:"Aloevera Gel",
    price:3000, tag:"Bestseller",
    desc:"Moisturises & soothes skin",
    img:"Aloevera.jpeg", soldOut:false
  },
  {
    id:"p2", name:"Tea Tree Toner",
    price:4000, tag:"Daily Essential",
    desc:"Gentle, sulfate-free formula",
    img:"Tttoner.jpeg", soldOut:false
  },
  {
    id:"p3", name:"Tea Tree Scrub",
    price:4000, tag:"Cult Favourite",
    desc:"Deep cleansing scrub",
    img:"Ttscrub.jpeg", soldOut:false
  },
  {
    id:"p4", name:"Biore UV Sunscreen (Big)",
    price:5000, tag:"Must-Have",
    desc:"Broad-spectrum, no white cast",
    img:"BioreUv.jpeg", soldOut:false
  },
  {
    id:"p5", name:"Simple Toner",
    price:6500, tag:"Hydration+",
    desc:"Lightweight daily toner",
    img:"Simoletoner.jpeg", soldOut:false
  },
  {
    id:"p6", name:"Simple Moisturizer",
    price:6500, tag:"Hydration+",
    desc:"24hr barrier-repair moisture",
    img:"Simplemoisteurizer.jpeg", soldOut:true
  },
  {
    id:"p7", name:"Cerave",
    price:6500, tag:"Hydration+",
    desc:"24hr barrier-repair moisture",
    img:"Ceraveproducts.jpeg", soldOut:true
  },
  {
    id:"p8", name:"Dove (Pack of 4)",
    price:3000, tag:"Value Pack",
    desc:"Nourishing body care",
    img:"Dove.jpeg", soldOut:true
  },
  {
    id:"p9", name:"Vaseline",
    price:6500, tag:"Hydration+",
    desc:"Deep moisture for dry skin",
    img:"Vaseline.jpeg", soldOut:true
  },
  {
    id:"p11", name:"Nivea",
    price:6500, tag:"Hydration+",
    desc:"Classic skincare range",
    img:"Niveaproducts.jpeg", soldOut:true
  },
  {
    id:"p12", name:"Roll On",
    price:1500, tag:"Fresh Daily",
    desc:"Long-lasting freshness",
    img:"Rollon.jpeg", soldOut:true
  },
  {
    id:"p14", name:"Armpit Spray",
    price:5000, tag:"Fresh Daily",
    desc:"All-day protection",
    img:"armpitspray.jpeg", soldOut:false
  },
  {
    id:"p13", name:"Simple Gel Wash",
    price:5000, tag:"Clear Skin",
    desc:"Targets blemishes gently",
    img:"Simplecleansers.jpeg", soldOut:true
  },
  {
    id:"p15", name:"Whitening Cream (Armpit)",
    price:3500, tag:"Brightening",
    desc:"Lightens dark underarms",
    img:"Whiteningcream.jpeg", soldOut:true
  },
  {
    id:"p16", name:"Dr Rashel",
    price:6500, tag:"Premium",
    desc:"Advanced skincare formula",
    img:"Drrashel.jpeg", soldOut:true
  },
  {
    id:"p17", name:"Dr Teals",
    price:6500, tag:"Self-care",
    desc:"Relaxing body treatment",
    img:"Drteals.jpeg", soldOut:true
  },
  {
    id:"p18", name:"Pei Mei Serum",
    price:3000, tag:"Glow Boost",
    desc:"Brightening serum",
    img:"Serums.jpeg", soldOut:true
  },
  {
    id:"p19", name:"Face Facts",
    price:6500, tag:"Clear Skin",
    desc:"Targeted face treatment",
    img:"Facefacts.jpeg", soldOut:true
  },
  {
    id:"p21", name:"Mini Fans",
    price:4000, tag:"Cool Tool",
    desc:"Portable cooling fan",
    img:"Minifans.jpeg", soldOut:true
  },
  /* ── COMBO CARD — one photo, four separate products ── */
  {
    id:"combo1", type:"combo",
    tag:"Lip Care",
    img:"Lipcare.jpeg",
    items:[
      { name:"Lip Balm",   price:700, soldOut:false },
      { name:"Lip Scrub",  price:700, soldOut:false },
      { name:"Lip Mask",   price:300, soldOut:false },
      { name:"Lip Brush",  price:700, soldOut:false }
    ]
  }
];

/* Virtual registry: combo sub-items registered at render time */
const VIRTUAL_PRODUCTS = {};

const CART_KEY = "rubique_cart";

/* ─────────────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────────────── */
function formatNaira(n){
  return "\u20A6" + Number(n).toLocaleString("en-NG");
}

function getProduct(id){
  return PRODUCTS.find(p => p.id === id) || VIRTUAL_PRODUCTS[id] || null;
}

function loadCart(){
  try{ const r = localStorage.getItem(CART_KEY); return r ? JSON.parse(r) : []; }
  catch(e){ return []; }
}
function saveCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); }

let cart = loadCart();

/* ─────────────────────────────────────────────────────────────────────
   DOM REFERENCES
   ───────────────────────────────────────────────────────────────────── */
const productGrid      = document.getElementById("productGrid");
const cartItemsEl      = document.getElementById("cartItems");
const cartTotalEl      = document.getElementById("cartTotal");
const cartCountEl      = document.getElementById("cartCount");
const cartFloatCountEl = document.getElementById("cartFloatCount");
const cartSidebar      = document.getElementById("cartSidebar");
const cartOverlay      = document.getElementById("cartOverlay");
const modalTotalEl     = document.getElementById("modalTotal");
const toastEl          = document.getElementById("toast");

/* ─────────────────────────────────────────────────────────────────────
   RENDER ONE CARD (used by both full render and search)
   ───────────────────────────────────────────────────────────────────── */
function renderCard(p, i){
  const delay = `animation-delay:${Math.min(i,12) * 0.04}s`;

  /* COMBO CARD */
  if(p.type === "combo"){
    const rows = p.items.map((item, j) => {
      const vid = `${p.id}-${j}`;
      VIRTUAL_PRODUCTS[vid] = { id:vid, name:item.name, price:item.price, img:p.img };
      const btn = item.soldOut
        ? `<button class="add-cart-btn sold-btn" disabled>Sold Out</button>`
        : `<button class="add-cart-btn" data-id="${vid}"><i class="fa-solid fa-plus"></i> Add</button>`;
      return `<div class="combo-row">
        <div class="combo-row-info">
          <span class="combo-row-name">${item.name}</span>
          <span class="combo-row-price">${formatNaira(item.price)}</span>
        </div>${btn}
      </div>`;
    }).join("");
    return `<article class="product-card combo-card" style="${delay}">
      <div class="product-img">
        <span class="product-tag">${p.tag}</span>
        <img src="${p.img}" alt="${p.tag}" loading="lazy">
      </div>
      <div class="combo-body">${rows}</div>
    </article>`;
  }

  /* NORMAL CARD */
  const overlay = p.soldOut
    ? `<div class="soldout-overlay"><span>Sold Out</span></div>` : "";
  const price = p.soldOut
    ? `<span class="product-price struck">${formatNaira(p.price)}</span>`
    : `<span class="product-price">${formatNaira(p.price)}</span>`;
  const btn = p.soldOut
    ? `<button class="add-cart-btn sold-btn" disabled>Sold Out</button>`
    : `<button class="add-cart-btn" data-id="${p.id}"><i class="fa-solid fa-plus"></i> Add to Cart</button>`;

  return `<article class="product-card${p.soldOut?" is-soldout":""}" style="${delay}">
    <div class="product-img">
      <span class="product-tag">${p.tag}</span>
      ${overlay}
      <img src="${p.img}" alt="${p.name}" loading="lazy">
    </div>
    <div class="product-body">
      <h3 class="product-name">${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      <div class="product-bottom">${price}${btn}</div>
    </div>
  </article>`;
}

function renderProducts(list){
  const src = list || PRODUCTS;
  productGrid.innerHTML = src.map(renderCard).join("");
}

/* ─────────────────────────────────────────────────────────────────────
   SEARCH
   ───────────────────────────────────────────────────────────────────── */
const searchInput   = document.getElementById("productSearch");
const clearSearchBtn= document.getElementById("clearSearch");
const noResultsEl   = document.getElementById("noResults");
const searchTermEl  = document.getElementById("searchTerm");
const searchWaLink  = document.getElementById("searchWhatsapp");

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  clearSearchBtn.style.display = q ? "flex" : "none";

  if(!q){
    noResultsEl.style.display = "none";
    renderProducts();
    return;
  }

  const filtered = PRODUCTS.filter(p => {
    if(p.type === "combo") return p.items.some(it => it.name.toLowerCase().includes(q));
    return p.name.toLowerCase().includes(q) || (p.desc && p.desc.toLowerCase().includes(q));
  });

  if(filtered.length === 0){
    productGrid.innerHTML = "";
    noResultsEl.style.display = "block";
    searchTermEl.textContent = `"${searchInput.value.trim()}"`;
    const msg = `Hello Rubique Skeen Lab, I am looking for "${searchInput.value.trim()}". Do you have it? How much is it?`;
    searchWaLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  } else {
    noResultsEl.style.display = "none";
    renderProducts(filtered);
  }
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearSearchBtn.style.display = "none";
  noResultsEl.style.display = "none";
  renderProducts();
});

/* ─────────────────────────────────────────────────────────────────────
   CART LOGIC
   ───────────────────────────────────────────────────────────────────── */
function addToCart(id, btn){
  const product = getProduct(id);
  if(!product){ showToast("Product not found","error"); return; }

  const existing = cart.find(i => i.id === id);
  if(existing){ existing.qty += 1; }
  else { cart.push({ id, qty:1 }); }
  saveCart(cart);
  renderCart();

  if(btn){
    btn.classList.add("added");
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
    setTimeout(() => { btn.classList.remove("added"); btn.innerHTML = orig; }, 1200);
  }
  showToast(`${product.name} added to bag`, "success");
}

function removeFromCart(id){
  cart = cart.filter(i => i.id !== id);
  saveCart(cart); renderCart();
}

function changeQty(id, delta){
  const item = cart.find(i => i.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){ removeFromCart(id); }
  else { saveCart(cart); renderCart(); }
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
    cartItemsEl.innerHTML = `<div class="cart-empty">
      <i class="fa-solid fa-bag-shopping"></i>
      <p>Your bag is empty.<br>Add a product to get started.</p>
    </div>`;
  } else {
    cartItemsEl.innerHTML = cart.map(item => {
      const p = getProduct(item.id);
      if(!p) return "";
      return `<div class="cart-item" data-id="${p.id}">
        <img src="${p.img}" alt="${p.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${formatNaira(p.price)} x ${item.qty}</div>
          <div class="qty-control">
            <button class="qty-minus" data-id="${p.id}" aria-label="Decrease">-</button>
            <span>${item.qty}</span>
            <button class="qty-plus" data-id="${p.id}" aria-label="Increase">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-id="${p.id}" aria-label="Remove">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>`;
    }).join("");
  }

  const total = getCartTotal();
  cartTotalEl.textContent = formatNaira(total);
  modalTotalEl.textContent = formatNaira(total);
}

/* ─────────────────────────────────────────────────────────────────────
   CART OPEN / CLOSE
   ───────────────────────────────────────────────────────────────────── */
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

productGrid.addEventListener("click", e => {
  const btn = e.target.closest(".add-cart-btn");
  if(btn && !btn.disabled) addToCart(btn.dataset.id, btn);
});

cartItemsEl.addEventListener("click", e => {
  const minus  = e.target.closest(".qty-minus");
  const plus   = e.target.closest(".qty-plus");
  const remove = e.target.closest(".cart-item-remove");
  if(minus)  changeQty(minus.dataset.id, -1);
  if(plus)   changeQty(plus.dataset.id,   1);
  if(remove) removeFromCart(remove.dataset.id);
});

/* ─────────────────────────────────────────────────────────────────────
   WHATSAPP
   ───────────────────────────────────────────────────────────────────── */
function buildOrderMessage(){
  let lines = ["Hello Rubique Skeen Lab, I want to place an order:", "", "Products:"];
  cart.forEach(item => {
    const p = getProduct(item.id);
    if(p) lines.push(`- ${p.name} x${item.qty} = ${formatNaira(p.price * item.qty)}`);
  });
  lines.push("", `Total: ${formatNaira(getCartTotal())}`, "Name: ", "Delivery Address: ");
  return lines.join("\n");
}

document.getElementById("whatsappOrderBtn").addEventListener("click", () => {
  if(cart.length === 0){ showToast("Your bag is empty","error"); return; }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage())}`, "_blank");
});

const whatsappFloat = document.getElementById("whatsappFloat");
whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Rubique Skeen Lab, I have a question about your products.")}`;

document.getElementById("contactWhatsappBtn").addEventListener("click", () => {
  window.open(whatsappFloat.href, "_blank");
});

const customOrderBtn = document.getElementById("customOrderBtn");
if(customOrderBtn){
  customOrderBtn.addEventListener("click", () => {
    const msg = "Hello Rubique Skeen Lab, I am looking for a product that is not listed on your website. Here is my full order:\n\n- Product(s): \n- Quantity: \n\nName: \nDelivery Address: ";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  });
}

/* ─────────────────────────────────────────────────────────────────────
   CHECKOUT + PAYSTACK
   ───────────────────────────────────────────────────────────────────── */
const checkoutModal = document.getElementById("checkoutModal");
const checkoutForm  = document.getElementById("checkoutForm");
const successModal  = document.getElementById("successModal");

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if(cart.length === 0){ showToast("Your bag is empty","error"); return; }
  modalTotalEl.textContent = formatNaira(getCartTotal());
  checkoutModal.classList.add("active");
});

document.getElementById("closeCheckoutModal").addEventListener("click", () =>
  checkoutModal.classList.remove("active"));
checkoutModal.addEventListener("click", e => {
  if(e.target === checkoutModal) checkoutModal.classList.remove("active");
});

function validateCheckout(){
  let valid = true;
  [
    { id:"chkName",    errId:"chkNameError",    test:v => v.trim().length >= 2,                              msg:"Please enter your full name." },
    { id:"chkEmail",   errId:"chkEmailError",   test:v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),      msg:"Please enter a valid email." },
    { id:"chkPhone",   errId:"chkPhoneError",   test:v => /^[0-9+\s-]{10,15}$/.test(v.trim()),             msg:"Please enter a valid phone number." },
    { id:"chkAddress", errId:"chkAddressError", test:v => v.trim().length >= 6,                              msg:"Please enter your delivery address." }
  ].forEach(f => {
    const el = document.getElementById(f.id);
    const gr = el.closest(".form-group");
    const er = document.getElementById(f.errId);
    if(!f.test(el.value)){ gr.classList.add("invalid"); er.textContent = f.msg; valid = false; }
    else { gr.classList.remove("invalid"); er.textContent = ""; }
  });
  return valid;
}

checkoutForm.addEventListener("submit", e => {
  e.preventDefault();
  if(!validateCheckout()) return;
  if(cart.length === 0){ showToast("Your bag is empty","error"); return; }

  const name    = document.getElementById("chkName").value.trim();
  const email   = document.getElementById("chkEmail").value.trim();
  const phone   = document.getElementById("chkPhone").value.trim();
  const address = document.getElementById("chkAddress").value.trim();
  const total   = getCartTotal();
  const payBtn  = document.getElementById("payNowBtn");

  payBtn.disabled = true;
  payBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

  if(typeof PaystackPop === "undefined" || !PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY.includes("REPLACE")){
    payBtn.disabled = false;
    payBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Pay Now';
    showToast("Payment not configured. Contact us on WhatsApp.", "error");
    return;
  }

  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email, amount: total * 100, currency: "NGN",
    ref: "RSL-" + Date.now(),
    metadata:{
      custom_fields:[
        { display_name:"Customer Name",    variable_name:"customer_name", value:name },
        { display_name:"Phone",            variable_name:"phone",         value:phone },
        { display_name:"Delivery Address", variable_name:"address",       value:address }
      ]
    },
    callback: resp => handlePaymentSuccess(resp, name, total),
    onClose: () => {
      payBtn.disabled = false;
      payBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Pay Now';
      showToast("Payment window closed","error");
    }
  });
  handler.openIframe();
});

/* Temporary store for payment info until delivery is confirmed */
let pendingOrder = null;

function handlePaymentSuccess(resp, name, total){
  checkoutModal.classList.remove("active");
  closeCart();
  checkoutForm.reset();

  const payBtn = document.getElementById("payNowBtn");
  payBtn.disabled = false;
  payBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Pay Now';

  /* Save order details for after delivery choice */
  pendingOrder = {
    reference:  resp.reference,
    name:       name,
    email:      document.getElementById("chkEmail").value || "",
    phone:      document.getElementById("chkPhone").value || "",
    total:      total,
    items:      cart.map(item => {
                  const p = getProduct(item.id);
                  return p ? { name:p.name, qty:item.qty, price:p.price } : null;
                }).filter(Boolean),
    date:       new Date().toLocaleString("en-NG", {
                  dateStyle:"long", timeStyle:"short"
                })
  };

  /* Clear cart */
  cart = []; saveCart(cart); renderCart();

  /* Show delivery modal next */
  document.getElementById("deliveryModal").classList.add("active");
}

/* ─────────────────────────────────────────────────────────────────────
   DELIVERY MODAL LOGIC
   ───────────────────────────────────────────────────────────────────── */
const deliveryModal = document.getElementById("deliveryModal");

/* Tab switching */
document.querySelectorAll(".dtab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".dtab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".dtab-content").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab + "Tab").classList.add("active");
    /* Clear errors when switching */
    document.getElementById("pickupError").textContent = "";
    document.getElementById("homeAddressError").textContent = "";
  });
});

document.getElementById("confirmDeliveryBtn").addEventListener("click", () => {
  const activeTab = document.querySelector(".dtab.active").dataset.tab;
  let deliveryInfo = "";
  let deliveryType = "";
  let valid = true;

  if(activeTab === "pickup"){
    const selected = document.querySelector('input[name="pickupLocation"]:checked');
    if(!selected){
      document.getElementById("pickupError").textContent = "Please select a pickup location.";
      valid = false;
    } else {
      document.getElementById("pickupError").textContent = "";
      deliveryType = "Pickup";
      deliveryInfo = selected.value;
    }
  } else {
    const addr = document.getElementById("homeDeliveryAddress").value.trim();
    if(addr.length < 10){
      document.getElementById("homeAddressError").textContent = "Please enter your full delivery address.";
      valid = false;
    } else {
      document.getElementById("homeAddressError").textContent = "";
      deliveryType = "Home Delivery";
      deliveryInfo = addr;
    }
  }

  if(!valid || !pendingOrder) return;

  /* Attach delivery info to pending order */
  pendingOrder.deliveryType = deliveryType;
  pendingOrder.deliveryInfo = deliveryInfo;

  /* Send email to rubique2026@gmail.com */
  sendOrderEmail(pendingOrder);

  /* Close delivery modal, show receipt */
  deliveryModal.classList.remove("active");
  showReceipt(pendingOrder);
});

/* Close delivery modal by clicking outside */
deliveryModal.addEventListener("click", e => {
  if(e.target === deliveryModal) deliveryModal.classList.remove("active");
});

/* ─────────────────────────────────────────────────────────────────────
   SEND ORDER EMAIL (delivery details to rubique2026@gmail.com)
   ───────────────────────────────────────────────────────────────────── */
function sendOrderEmail(order){
  if(EMAILJS_SERVICE_ID.includes("YOUR") || typeof emailjs === "undefined") return;

  const itemLines = order.items.map(i =>
    `${i.name} x${i.qty} = ${formatNaira(i.price * i.qty)}`
  ).join("\n");

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:     order.name,
    from_email:    order.email,
    message:
      `NEW ORDER — ${order.date}\n` +
      `Reference: ${order.reference}\n\n` +
      `CUSTOMER:\nName: ${order.name}\nEmail: ${order.email}\nPhone: ${order.phone}\n\n` +
      `ITEMS:\n${itemLines}\n\nTOTAL PAID: ${formatNaira(order.total)}\n\n` +
      `DELIVERY METHOD: ${order.deliveryType}\n` +
      `${order.deliveryType === "Pickup" ? "Pickup Location" : "Delivery Address"}: ${order.deliveryInfo}\n\n` +
      `NOTE: Delivery fee not included. Customer pays rider/waybill directly.`
  }).catch(() => {}); /* Silent fail — receipt still shows */
}

/* ─────────────────────────────────────────────────────────────────────
   RECEIPT
   ───────────────────────────────────────────────────────────────────── */
const receiptModal = document.getElementById("receiptModal");

function showReceipt(order){
  const itemRows = order.items.map(i => `
    <div class="receipt-row">
      <span>${i.name} x${i.qty}</span>
      <span>${formatNaira(i.price * i.qty)}</span>
    </div>`).join("");

  const deliveryLabel = order.deliveryType === "Pickup"
    ? `Pickup at: ${order.deliveryInfo}`
    : `Home delivery to: ${order.deliveryInfo}`;

  document.getElementById("receiptContent").innerHTML = `
    <div class="receipt-header">
      <div class="receipt-logo">Rubique <span>Skeen Lab</span></div>
      <p>Official Order Receipt</p>
      <p>${order.date}</p>
    </div>

    <div class="receipt-section">
      <h5>Customer</h5>
      <div class="receipt-row"><span>Name</span><span>${order.name}</span></div>
      <div class="receipt-row"><span>Phone</span><span>${order.phone}</span></div>
      <div class="receipt-row"><span>Reference</span><span>${order.reference}</span></div>
    </div>

    <div class="receipt-section">
      <h5>Items Purchased</h5>
      ${itemRows}
      <div class="receipt-total">
        <span>Total Paid</span>
        <span>${formatNaira(order.total)}</span>
      </div>
    </div>

    <div class="receipt-section">
      <h5>Delivery</h5>
      <div class="receipt-row"><span>Method</span><span>${order.deliveryType}</span></div>
      <div class="receipt-row"><span>Details</span><span>${order.deliveryInfo}</span></div>
      <div class="receipt-delivery-note">
        ⚠️ Delivery fee is <strong>NOT</strong> included in your payment.
        You paid only for your products. Please pay the rider or waybill vehicle directly by yourself.
      </div>
    </div>

    <div class="receipt-footer">
      Thank you for shopping with Rubique Skeen Lab! 💕<br>
      Send your RSL code to our WhatsApp after payment.
    </div>`;

  receiptModal.classList.add("active");
}

/* Send receipt to WhatsApp */
document.getElementById("sendReceiptWhatsapp").addEventListener("click", () => {
  if(!pendingOrder) return;
  const o = pendingOrder;
  const itemLines = o.items.map(i =>
    `• ${i.name} x${i.qty} — ${formatNaira(i.price * i.qty)}`
  ).join("\n");

  const deliveryLine = o.deliveryType === "Pickup"
    ? `Pickup at: ${o.deliveryInfo}`
    : `Home delivery to: ${o.deliveryInfo}`;

  const msg =
    `🧴 *RUBIQUE SKEEN LAB*\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `📄 *ORDER RECEIPT*\n` +
    `Date: ${o.date}\n` +
    `Ref: ${o.reference}\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `*ITEMS:*\n${itemLines}\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `*TOTAL PAID: ${formatNaira(o.total)}*\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `Customer: ${o.name}\n` +
    `Phone: ${o.phone}\n` +
    `Delivery: ${deliveryLine}\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `⚠️ NOTE: Delivery fee NOT included. You pay the rider/waybill directly.\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `Thank you for shopping with Rubique Skeen Lab! 💕`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
});

/* Print receipt */
document.getElementById("printReceipt").addEventListener("click", () => {
  window.print();
});

/* Close receipt */
document.getElementById("closeReceipt").addEventListener("click", () => {
  receiptModal.classList.remove("active");
  pendingOrder = null;
});
receiptModal.addEventListener("click", e => {
  if(e.target === receiptModal){
    receiptModal.classList.remove("active");
    pendingOrder = null;
  }
});

document.getElementById("closeSuccessModal").addEventListener("click", () =>
  successModal.classList.remove("active"));
successModal.addEventListener("click", e => {
  if(e.target === successModal) successModal.classList.remove("active");
});

/* ─────────────────────────────────────────────────────────────────────
   CONTACT FORM (sends email via EmailJS to rubique2026@gmail.com)
   ───────────────────────────────────────────────────────────────────── */
const contactForm      = document.getElementById("contactForm");
const contactSubmitBtn = document.getElementById("contactSubmitBtn");

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  let valid = true;

  const name    = document.getElementById("cName");
  const email   = document.getElementById("cEmail");
  const message = document.getElementById("cMessage");

  [
    { el:name,    errId:"cNameError",    test:v => v.trim().length >= 2,                        msg:"Please enter your name." },
    { el:email,   errId:"cEmailError",   test:v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg:"Please enter a valid email." },
    { el:message, errId:"cMessageError", test:v => v.trim().length >= 10,                       msg:"Message must be at least 10 characters." }
  ].forEach(c => {
    const gr = c.el.closest(".form-group");
    const er = document.getElementById(c.errId);
    if(!c.test(c.el.value)){ gr.classList.add("invalid"); er.textContent = c.msg; valid = false; }
    else { gr.classList.remove("invalid"); er.textContent = ""; }
  });

  if(!valid) return;

  /* Check if EmailJS is configured */
  if(EMAILJS_SERVICE_ID.includes("YOUR") || typeof emailjs === "undefined"){
    /* EmailJS not yet set up — fallback: open email client */
    const subject = encodeURIComponent("New Message from Rubique Website");
    const body    = encodeURIComponent(`From: ${name.value.trim()}\nEmail: ${email.value.trim()}\n\nMessage:\n${message.value.trim()}`);
    window.location.href = `mailto:rubique2026@gmail.com?subject=${subject}&body=${body}`;
    showToast("Opening your email app to send the message", "success");
    contactForm.reset();
    return;
  }

  /* Send via EmailJS */
  contactSubmitBtn.disabled = true;
  contactSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  name.value.trim(),
    from_email: email.value.trim(),
    message:    message.value.trim()
  }).then(() => {
    showToast("Message sent! We will get back to you soon.", "success");
    contactForm.reset();
  }).catch(() => {
    showToast("Could not send. Please contact us on WhatsApp.", "error");
  }).finally(() => {
    contactSubmitBtn.disabled = false;
    contactSubmitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
  });
});

/* ─────────────────────────────────────────────────────────────────────
   TOAST
   ───────────────────────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg, type = "success"){
  clearTimeout(toastTimer);
  const icon = type === "success" ? "fa-circle-check" : "fa-circle-exclamation";
  const cls  = type === "success" ? "" : " error";
  toastEl.innerHTML = `<i class="fa-solid ${icon}${cls}"></i> ${msg}`;
  toastEl.classList.add("active");
  toastTimer = setTimeout(() => toastEl.classList.remove("active"), 3400);
}

/* ─────────────────────────────────────────────────────────────────────
   MOBILE MENU
   ───────────────────────────────────────────────────────────────────── */
const navLinks   = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const ico = menuToggle.querySelector("i");
  ico.classList.toggle("fa-bars");
  ico.classList.toggle("fa-xmark");
});
navLinks.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const ico = menuToggle.querySelector("i");
    ico.classList.add("fa-bars");
    ico.classList.remove("fa-xmark");
  });
});

/* ─────────────────────────────────────────────────────────────────────
   SCROLL TO TOP
   ───────────────────────────────────────────────────────────────────── */
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
});
scrollTopBtn.addEventListener("click", () =>
  window.scrollTo({ top:0, behavior:"smooth" }));

/* ─────────────────────────────────────────────────────────────────────
   SCROLL REVEAL
   ───────────────────────────────────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if(en.isIntersecting){ en.target.classList.add("visible"); revealObs.unobserve(en.target); }
  });
}, { threshold:0.1 });
document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

/* ─────────────────────────────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────────────────────────────── */
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
