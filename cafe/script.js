/* =========================================
   VELVET BREW CAFÉ
   MAIN JAVASCRIPT
========================================= */


/* LOADER */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 700);
});


/* NAVBAR */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


/* MOBILE MENU */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
});


/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});


/* MENU FILTER */

const filterButtons = document.querySelectorAll(".filter");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    menuCards.forEach(card => {

      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden");

        setTimeout(() => {
          card.style.opacity = "1";
        }, 20);

      } else {
        card.classList.add("hidden");
      }

    });

  });

});


/* CART */

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = [];


function openCart() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
  document.body.classList.add("no-scroll");
}


function closeCartDrawer() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}


cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);


document.querySelectorAll(".add-btn").forEach(button => {

  button.addEventListener("click", () => {

    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        name,
        price,
        quantity: 1
      });
    }

    updateCart();

    showToast(`${name} added to your order`);

  });

});


function updateCart() {

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {

    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <span>☕</span>
        <p>Your cart is empty.</p>
        <small>Add something delicious from our menu.</small>
      </div>
    `;

    cartCount.textContent = "0";
    cartTotal.textContent = "₹0";

    return;
  }


  let total = 0;
  let count = 0;


  cart.forEach((item, index) => {

    total += item.price * item.quantity;
    count += item.quantity;

    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <p>₹${item.price} × ${item.quantity}</p>
      </div>

      <div class="cart-controls">
        <button onclick="changeQuantity(${index}, -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${index}, 1)">+</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);

  });


  cartCount.textContent = count;
  cartTotal.textContent = `₹${total}`;
}


function changeQuantity(index, amount) {

  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();

}


/* CHECKOUT */

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {

  if (cart.length === 0) {
    showToast("Your cart is empty");
    return;
  }

  showToast("Order request received!");

  setTimeout(() => {
    cart = [];
    updateCart();
    closeCartDrawer();
  }, 1000);

});


/* TOAST */

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

let toastTimer;

function showToast(message) {

  toastText.textContent = message;

  toast.classList.add("active");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("active");
  }, 2600);

}


/* TESTIMONIAL SLIDER */

const reviews = [
  {
    text: "“One of the most beautiful cafés I've visited in Delhi. The coffee is exceptional and the atmosphere is perfect.”",
    name: "Aarav Mehta",
    role: "Regular Guest"
  },

  {
    text: "“The perfect place to work, relax and enjoy genuinely good coffee. The staff is incredibly warm.”",
    name: "Riya Sharma",
    role: "Creative Professional"
  },

  {
    text: "“Their desserts are amazing and the interior feels like a little escape from the city.”",
    name: "Kabir Singh",
    role: "Weekend Guest"
  },

  {
    text: "“Beautiful atmosphere, smooth coffee and excellent service. Definitely one of my favourite cafés.”",
    name: "Ananya Kapoor",
    role: "Coffee Lover"
  }
];


let reviewIndex = 0;

const reviewText = document.getElementById("reviewText");
const reviewName = document.getElementById("reviewName");
const reviewRole = document.getElementById("reviewRole");


function showReview(index) {

  const review = reviews[index];

  reviewText.style.opacity = "0";
  reviewName.style.opacity = "0";
  reviewRole.style.opacity = "0";

  setTimeout(() => {

    reviewText.textContent = review.text;
    reviewName.textContent = review.name;
    reviewRole.textContent = review.role;

    reviewText.style.opacity = "1";
    reviewName.style.opacity = "1";
    reviewRole.style.opacity = "1";

  }, 200);

}


document.getElementById("nextReview").addEventListener("click", () => {

  reviewIndex++;

  if (reviewIndex >= reviews.length) {
    reviewIndex = 0;
  }

  showReview(reviewIndex);

});


document.getElementById("prevReview").addEventListener("click", () => {

  reviewIndex--;

  if (reviewIndex < 0) {
    reviewIndex = reviews.length - 1;
  }

  showReview(reviewIndex);

});


/* AUTO REVIEW */

setInterval(() => {

  reviewIndex++;

  if (reviewIndex >= reviews.length) {
    reviewIndex = 0;
  }

  showReview(reviewIndex);

}, 7000);


/* RESERVATION FORM */

const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");

reservationForm.addEventListener("submit", event => {

  event.preventDefault();

  const name = document.getElementById("guestName").value;
  const guests = document.getElementById("guests").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!name || !date || !time) {
    formMessage.textContent = "Please fill in all required fields.";
    return;
  }

  formMessage.textContent =
    `Thanks ${name}! Your request for ${guests} on ${date} at ${time} has been received.`;

  reservationForm.reset();

});


/* NEWSLETTER */

const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", event => {

  event.preventDefault();

  const email = newsletterForm.querySelector("input").value;

  if (!email) return;

  showToast("Welcome to the Velvet Brew community!");

  newsletterForm.reset();

});


/* PARALLAX EFFECT */

window.addEventListener("scroll", () => {

  const heroBg = document.querySelector(".hero-bg");

  if (!heroBg) return;

  const scroll = window.scrollY;

  if (scroll < window.innerHeight) {
    heroBg.style.transform =
      `translateY(${scroll * 0.15}px) scale(1.03)`;
  }

});


/* SET MINIMUM RESERVATION DATE */

const dateInput = document.getElementById("date");

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;


/* KEYBOARD ESCAPE */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeCartDrawer();

    navLinks.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

});


/* BUTTON RIPPLE EFFECT */

document.querySelectorAll(".btn, .add-btn, .filter").forEach(button => {

  button.addEventListener("click", () => {

    button.style.transform = "scale(.97)";

    setTimeout(() => {
      button.style.transform = "";
    }, 120);

  });

});


/* INITIAL CART */

updateCart();