import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/style.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const seedProducts = [
  { id: 'tee', name: 'Core Cotton Tee', category: 'T-Shirts', price: 899, oldPrice: 999, tag: '10% OFF', rating: 4.7, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85', colors: ['White', 'Black'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 'overshirt', name: 'Utility Overshirt', category: 'Overshirts', price: 1899, oldPrice: 2199, tag: '15% OFF', rating: 4.8, image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=85', colors: ['Black', 'Olive'], sizes: ['M', 'L', 'XL'] },
  { id: 'denim', name: 'Relaxed Denim', category: 'Denim', price: 2199, oldPrice: 2199, tag: 'New', rating: 4.6, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85', colors: ['Blue'], sizes: ['28', '30', '32', '34'] },
  { id: 'polo', name: 'Textured Knit Polo', category: 'T-Shirts', price: 1499, oldPrice: 1699, tag: '12% OFF', rating: 4.5, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=85', colors: ['Cream', 'Black'], sizes: ['S', 'M', 'L'] },
  { id: 'sneakers', name: 'Street Low Sneakers', category: 'Sneakers', price: 2799, oldPrice: 3499, tag: '20% OFF', rating: 4.9, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', colors: ['Red accent', 'White'], sizes: ['7', '8', '9', '10'] },
  { id: 'coord', name: 'Neutral Co-ord Set', category: 'Co-ords', price: 2499, oldPrice: 2499, tag: 'Limited', rating: 4.8, image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=85', colors: ['Stone'], sizes: ['S', 'M', 'L'] }
];
const money = (value) => `Rs. ${value.toLocaleString('en-IN')}`;

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, { headers: { 'Content-Type': 'application/json', ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}) }, ...options });
  if (!response.ok) throw new Error((await response.text()) || 'Request failed');
  return response.status === 204 ? null : response.json();
}

function Header({ page, setPage, cartCount, user, logout }) {
  return <nav className="site-nav">
    <button className="brand" onClick={() => setPage('shop')}>ICE<span>STORE</span></button>
    <button className={page === 'shop' ? 'active' : ''} onClick={() => setPage('shop')}>Shop</button>
    <button className={page === 'wishlist' ? 'active' : ''} onClick={() => setPage('wishlist')}>Wishlist</button>
    <button className={page === 'cart' ? 'active' : ''} onClick={() => setPage('cart')}>Cart ({cartCount})</button>
    <button className={page === 'orders' ? 'active' : ''} onClick={() => setPage('orders')}>Orders</button>
    {user?.role === 'ADMIN' && <button className={page === 'admin' ? 'active' : ''} onClick={() => setPage('admin')}>Admin</button>}
    {user ? <button onClick={logout}>Logout</button> : <button className={page === 'auth' ? 'active' : ''} onClick={() => setPage('auth')}>Login</button>}
  </nav>;
}

function ProductCard({ product, add, wishlisted, toggleWishlist }) {
  return <article className="product-card">
    <div className="product-image-wrap"><img src={product.image} alt={product.name} /><button className="heart" onClick={() => toggleWishlist(product.id)} aria-label="Toggle wishlist">{wishlisted ? '♥' : '♡'}</button></div>
    <div className="product-info"><div className="product-top"><h3>{product.name}</h3><span className="tag">{product.tag}</span></div><p className="muted">{product.category}</p><div className="price-row"><span className="price">{money(product.price)}</span><span className="rating">★ {product.rating}</span></div><button className="btn" onClick={() => add(product)}>Add to Cart</button></div>
  </article>;
}

function Shop({ products, add, wishlist, toggleWishlist }) {
  const [query, setQuery] = useState(''); const [category, setCategory] = useState('All'); const [sort, setSort] = useState('featured');
  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const visible = useMemo(() => products.filter((p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0), [products, category, query, sort]);
  return <>
    <section className="hero-grid"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85" alt="Model wearing minimal streetwear" /><div className="hero-copy"><span className="eyebrow">New season / 2026</span><h1>Everyday clothing with a sharper point of view.</h1><p>Clean fits, strong basics, and easy statement pieces for college, work, weekends, and everything in between.</p><div className="hero-actions"><a className="btn" href="#products">Shop Collection</a><button className="btn-secondary" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>Explore</button></div></div></section>
    <main className="page-shell"><div className="category-strip">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? 'selected' : ''}>{item}</button>)}</div><div className="section-title" id="products"><span className="eyebrow">Curated drops</span><h2>Minimal Fits</h2><p>Neutral pieces with one clean accent, built for repeat wear.</p></div><div className="shop-tools"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." aria-label="Search products" /><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div><section className="products-grid">{visible.map((product) => <ProductCard key={product.id} product={product} add={add} wishlisted={wishlist.includes(product.id)} toggleWishlist={toggleWishlist} />)}</section>{!visible.length && <div className="empty-state">No products match your search.</div>}</main>
  </>;
}

function Cart({ cart, updateQuantity, remove, checkout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); const discount = subtotal > 3000 ? 300 : 0;
  return <main className="page-shell"><div className="section-title"><span className="eyebrow">Shopping bag</span><h1>Your selected fits</h1><p>Review sizes, quantities, and totals before checkout.</p></div>{!cart.length ? <div className="empty-state"><h2>Your bag is empty</h2><p>Add something sharp from the collection.</p></div> : <section className="cart-layout"><div className="cart-list">{cart.map((item) => <article className="cart-item" key={`${item.id}-${item.size}-${item.color}`}><img src={item.image} alt={item.name} /><div><h3>{item.name}</h3><p>{item.color}, size {item.size}</p><div className="quantity"><button onClick={() => updateQuantity(item, -1)}>-</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item, 1)}>+</button></div><button className="text-button" onClick={() => remove(item)}>Remove</button></div><strong>{money(item.price * item.quantity)}</strong></article>)}</div><aside className="summary-card"><h2>Order Summary</h2><div className="summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div className="summary-line"><span>Discount</span><strong>- {money(discount)}</strong></div><div className="summary-line"><span>Delivery</span><strong>{subtotal > 1999 ? 'Free' : money(99)}</strong></div><div className="cart-total"><span>Total</span><span>{money(subtotal - discount + (subtotal > 1999 ? 0 : 99))}</span></div><button className="btn" onClick={checkout}>Proceed to Checkout</button></aside></section>}</main>;
}

function Auth({ onLogin, setPage }) {
  const [register, setRegister] = useState(false); const [form, setForm] = useState({ name: '', email: '', password: '' }); const [error, setError] = useState('');
  const submit = async (e) => { e.preventDefault(); setError(''); try { const result = await request(register ? '/auth/register' : '/auth/login', { method: 'POST', body: JSON.stringify(form) }); onLogin(result); setPage('shop'); } catch { setError('Unable to authenticate. Check your details or start the backend.'); } };
  return <main className="page-shell auth-shell"><div className="form-card"><span className="eyebrow">Member access</span><h1>{register ? 'Create your account' : 'Welcome back'}</h1>{error && <div className="error">{error}</div>}<form onSubmit={submit}>{register && <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>}<label>Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>Password<input required minLength="6" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label><button className="btn">{register ? 'Create account' : 'Login'}</button></form><button className="text-button" onClick={() => setRegister(!register)}>{register ? 'Already a member? Login' : 'New here? Create an account'}</button></div></main>;
}

function App() {
  const [page, setPage] = useState('shop'); const [products, setProducts] = useState(seedProducts); const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('icestore-cart') || '[]')); const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('icestore-wishlist') || '[]')); const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('icestore-user') || 'null')); const [notice, setNotice] = useState('');
  useEffect(() => { request('/products').then(setProducts).catch(() => {}); }, []);
  useEffect(() => localStorage.setItem('icestore-cart', JSON.stringify(cart)), [cart]); useEffect(() => localStorage.setItem('icestore-wishlist', JSON.stringify(wishlist)), [wishlist]); useEffect(() => { if (user) localStorage.setItem('icestore-user', JSON.stringify(user)); else localStorage.removeItem('icestore-user'); }, [user]);
  const add = (product) => { setCart((items) => { const found = items.find((item) => item.id === product.id); return found ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, size: product.sizes?.[1] || 'M', color: product.colors?.[0] || 'Black', quantity: 1 }]; }); setNotice(`${product.name} added to bag`); setTimeout(() => setNotice(''), 2200); };
  const updateQuantity = (item, delta) => setCart((items) => items.map((x) => x.id === item.id ? { ...x, quantity: Math.max(1, x.quantity + delta) } : x)); const remove = (item) => setCart((items) => items.filter((x) => x.id !== item.id)); const toggleWishlist = (id) => setWishlist((items) => items.includes(id) ? items.filter((x) => x !== id) : [...items, id]); const logout = () => { setUser(null); setPage('shop'); };
  const checkout = () => { if (!user) setPage('auth'); else { setPage('orders'); setNotice('Checkout is ready — connect Razorpay keys in the API environment to accept payment.'); setTimeout(() => setNotice(''), 4000); } };
  const filteredWishlist = products.filter((p) => wishlist.includes(p.id));
  return <><Header page={page} setPage={setPage} cartCount={cart.reduce((sum, x) => sum + x.quantity, 0)} user={user} logout={logout} />{page === 'shop' && <Shop products={products} add={add} wishlist={wishlist} toggleWishlist={toggleWishlist} />}{page === 'cart' && <Cart cart={cart} updateQuantity={updateQuantity} remove={remove} checkout={checkout} />}{page === 'wishlist' && <main className="page-shell"><div className="section-title"><span className="eyebrow">Saved for later</span><h1>Your wishlist</h1></div><section className="products-grid">{filteredWishlist.map((p) => <ProductCard key={p.id} product={p} add={add} wishlisted toggleWishlist={toggleWishlist} />)}</section>{!filteredWishlist.length && <div className="empty-state">Your wishlist is waiting for its first favourite.</div>}</main>}{page === 'auth' && <Auth onLogin={setUser} setPage={setPage} />}{page === 'orders' && <main className="page-shell"><div className="section-title"><span className="eyebrow">Account</span><h1>Orders & tracking</h1><p>{user ? 'Your order history will appear here after checkout.' : 'Login to view your orders.'}</p></div><div className="empty-state">{user ? 'No orders yet. Your next favourite fit is one click away.' : <button className="btn" onClick={() => setPage('auth')}>Login to continue</button>}</div></main>}{page === 'admin' && <main className="page-shell"><div className="section-title"><span className="eyebrow">Admin</span><h1>Store dashboard</h1></div><div className="badges-grid"><div className="badge-card"><span className="badge-icon">06</span><strong>Active products</strong></div><div className="badge-card"><span className="badge-icon">{cart.length}</span><strong>Open carts</strong></div><div className="badge-card"><span className="badge-icon">0</span><strong>Pending orders</strong></div></div></main>}{notice && <div className="toast">{notice}</div>}</>;
}

createRoot(document.getElementById('root')).render(<App />);
