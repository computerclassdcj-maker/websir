let cart = JSON.parse(localStorage.getItem("cart")) || [];

function login() {
    let u = username.value;
    let p = password.value;
    if (u && p) {
        window.location.href = "index.html";
    } else {
        alert("Enter login details");
    }
}

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
}

function loadCart() {
    let list = document.getElementById("cartItems");
    let total = 0;
    if (!list) return 0;

    list.innerHTML = "";
    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item.name + " - ₹" + item.price;
        list.appendChild(li);
        total += item.price;
    });
    document.getElementById("total").textContent = total;
    return total;
}

function payWithRazorpay() {
    let amount = loadCart() * 100;

    let options = {
        key: "rzp_test_xxxxxxxxxx", // YOUR KEY
        amount: amount,
        currency: "INR",
        name: "MyStore",
        description: "Order Payment",
        handler: function (response) {
            alert("Payment Successful ✔\nID: " + response.razorpay_payment_id);
            localStorage.removeItem("cart");
            window.location.href = "index.html";
        }
    };

    let rzp = new Razorpay(options);
    rzp.open();
}

loadCart();