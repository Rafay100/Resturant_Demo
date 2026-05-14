// ===== 1. MENU DATA =====
const menuItems = [
    {id:1, name:'Chicken Karahi', cat:'karahi', price:1450, badge:'Chef Special', img:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600&auto=format&fit=crop', desc:'Rich & spicy traditional karahi with fresh tomatoes.'},
    {id:2, name:'Mutton Karahi', cat:'karahi', price:2200, badge:'spicy', img:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop', desc:'Tender mutton in authentic masala — a true classic.'},
    {id:3, name:'Butter Chicken', cat:'karahi', price:1550, badge:'Popular', img:'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=600&auto=format&fit=crop', desc:'Creamy tomato-butter sauce with juicy chicken.'},
    {id:4, name:'BBQ Platter', cat:'bbq', price:2400, badge:'Best Seller', img:'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop', desc:'Assorted kababs, tikka & boti — smoky perfection.'},
    {id:5, name:'Seekh Kabab', cat:'bbq', price:950, badge:'', img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop', desc:'Minced meat seasoned with special Darbar spices.'},
    {id:6, name:'Chicken Biryani', cat:'rice', price:450, badge:'Hot', img:'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=600&auto=format&fit=crop', desc:'Fragrant basmati rice with spicy marinated chicken.'},
    {id:7, name:'Zinger Burger', cat:'burger', price:550, badge:'Crispy', img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop', desc:'Extra crunchy chicken fillet with secret sauce.'},
    {id:8, name:'Mint Margarita', cat:'drinks', price:250, badge:'', img:'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop', desc:'Refreshing mint and lime chiller.'}
];

let cart = [];
let orders = [];

// ===== 2. RENDER MENU ITEMS =====
function renderMenu(filter = 'all') {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    const filteredItems = filter === 'all' ? menuItems : menuItems.filter(item => item.cat === filter);

    filteredItems.forEach(item => {
        const badgeHTML = item.badge ? `<div class="menu-card-badge ${item.badge === 'spicy' ? 'spicy' : ''}">${item.badge}</div>` : '';
        
        menuGrid.innerHTML += `
            <div class="menu-card">
                ${badgeHTML}
                <img src="${item.img}" alt="${item.name}">
                <div class="menu-card-body">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <div class="menu-card-footer">
                        <div class="price"><span>Rs</span> ${item.price}</div>
                        <button class="add-btn" onclick="addToCart(${item.id})">+</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// ===== 3. CART FUNCTIONS =====
function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    const inCart = cart.find(i => i.id === id);

    if (inCart) {
        inCart.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    
    updateCartUI();
    showToast(`${item.name} added to cart!`);
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.innerText = cart.reduce((acc, item) => acc + item.qty, 0);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty"><div class="icon">🛒</div><p>Your cart is empty</p></div>';
        cartFooter.style.display = 'none';
    } else {
        cartFooter.style.display = 'block';
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.qty;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">Rs ${item.price}</div>
                        <div class="cart-item-controls">
                            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                            <span class="qty-num">${item.qty}</span>
                            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            `;
        });
        cartTotal.innerText = `Rs ${total}`;
    }
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty < 1) removeFromCart(id);
        else updateCartUI();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// ===== 4. UI TOGGLES =====
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('open');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== 5. INITIALIZE =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderMenu(btn.dataset.filter);
    });
});

// Website load hote hi menu dikhayen
window.onload = () => {
    renderMenu();
    updateCartUI();
};