// ========================================================
// KARTHI ATELIER - EXECUTIVE ADMIN DASHBOARD ENGINE
// ========================================================

// Default Sample Orders for immediate demonstration
const SAMPLE_ORDERS = [
  {
    id: "KAR-94021",
    date: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    customer: {
      name: "Alex Mercer",
      email: "alex.mercer@atelier.com",
      phone: "+1 (555) 234-5678",
      address: "42 Atelier Boulevard, Suite 10",
      city: "New York",
      zip: "10001"
    },
    paymentMethod: "CARD",
    items: [
      {
        id: "shirt-01",
        name: "Architect Poplin Classic Shirt",
        category: "shirts",
        price: 68,
        quantity: 2,
        size: "L",
        color: "Crisp White",
        image: "assets/images/category-shirts.jpg"
      }
    ],
    itemCount: 2,
    subtotal: 136,
    discount: 0,
    shipping: 0,
    total: 136,
    status: "Shipped"
  },
  {
    id: "KAR-81934",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    customer: {
      name: "Sarah Jenkins",
      email: "sarah.j@minimalist.co",
      phone: "+1 (555) 890-1234",
      address: "740 Scandinavian Way",
      city: "San Francisco",
      zip: "94107"
    },
    paymentMethod: "UPI",
    items: [
      {
        id: "tee-01",
        name: "Heavyweight Boxy Graphic Tee",
        category: "tshirts",
        price: 42,
        quantity: 2,
        size: "M",
        color: "Vintage Chalk",
        image: "assets/images/category-tshirts.jpg"
      }
    ],
    itemCount: 2,
    subtotal: 84,
    discount: 16.8,
    shipping: 0,
    total: 67.2,
    status: "Pending"
  },
  {
    id: "KAR-72810",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    customer: {
      name: "Liam Patel",
      email: "liam.patel@designstudio.org",
      phone: "+1 (555) 456-7890",
      address: "128 Bauhaus Lane",
      city: "Chicago",
      zip: "60601"
    },
    paymentMethod: "COD",
    items: [
      {
        id: "pant-01",
        name: "Double-Pleated Tailored Trouser",
        category: "pants",
        price: 84,
        quantity: 2,
        size: "32",
        color: "Charcoal Grey",
        image: "assets/images/category-pants.jpg"
      }
    ],
    itemCount: 2,
    subtotal: 168,
    discount: 0,
    shipping: 15,
    total: 183,
    status: "Delivered"
  }
];

// Admin State
let adminState = {
  products: [],
  orders: [],
  coupons: {},
  activeTab: 'products'
};

// ========================================================
// INITIALIZATION & AUTHENTICATION
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  initAdminData();
  checkAuthStatus();
  initLucideIcons();
});

function initLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function checkAuthStatus() {
  const isLoggedIn = sessionStorage.getItem('karthi_admin_logged_in') === 'true';
  const loginScreen = document.getElementById('login-screen');
  const adminApp = document.getElementById('admin-app');

  if (isLoggedIn) {
    loginScreen.classList.add('hidden');
    adminApp.classList.remove('hidden');
    loadDashboardData();
  } else {
    loginScreen.classList.remove('hidden');
    adminApp.classList.add('hidden');
  }
  initLucideIcons();
}

function fillDemoCredentials() {
  document.getElementById('admin-username').value = 'admin';
  document.getElementById('admin-password').value = 'karthi@2026';
}

function handleAdminLogin(event) {
  event.preventDefault();
  const u = document.getElementById('admin-username').value.trim();
  const p = document.getElementById('admin-password').value.trim();

  if (u === 'admin' && p === 'karthi@2026') {
    sessionStorage.setItem('karthi_admin_logged_in', 'true');
    showToast('Authenticated successfully. Welcome Admin!', 'success');
    checkAuthStatus();
  } else {
    showToast('Invalid credentials. Use admin / karthi@2026', 'error');
  }
}

function handleAdminLogout() {
  sessionStorage.removeItem('karthi_admin_logged_in');
  showToast('Logged out of Admin Console', 'info');
  checkAuthStatus();
}

// ========================================================
// DATA SYNCHRONIZATION WITH LOCAL STORAGE
// ========================================================
function initAdminData() {
  // 1. Sync Products
  const savedProducts = localStorage.getItem('karthi_products');
  if (savedProducts) {
    try {
      adminState.products = JSON.parse(savedProducts);
    } catch (e) {
      adminState.products = typeof DEFAULT_PRODUCTS !== 'undefined' ? DEFAULT_PRODUCTS : PRODUCTS;
    }
  } else {
    adminState.products = typeof DEFAULT_PRODUCTS !== 'undefined' ? DEFAULT_PRODUCTS : (typeof PRODUCTS !== 'undefined' ? PRODUCTS : []);
    localStorage.setItem('karthi_products', JSON.stringify(adminState.products));
  }

  // 2. Sync Orders
  const savedOrders = localStorage.getItem('karthi_orders');
  if (savedOrders) {
    try {
      adminState.orders = JSON.parse(savedOrders);
    } catch (e) {
      adminState.orders = SAMPLE_ORDERS;
    }
  } else {
    adminState.orders = SAMPLE_ORDERS;
    localStorage.setItem('karthi_orders', JSON.stringify(SAMPLE_ORDERS));
  }

  // 3. Sync Coupons
  const savedCoupons = localStorage.getItem('karthi_coupons');
  if (savedCoupons) {
    try {
      adminState.coupons = JSON.parse(savedCoupons);
    } catch (e) {
      adminState.coupons = getActiveCoupons();
    }
  } else {
    adminState.coupons = typeof getActiveCoupons === 'function' ? getActiveCoupons() : {
      "KARTHI20": { discount: 0.20, label: "20% Karthi Atelier Discount" },
      "WELCOME10": { discount: 0.10, label: "10% Welcome Discount" },
      "GRAVITY20": { discount: 0.20, label: "20% Drop Discount" },
      "FREESHIP": { discount: 0.00, freeShipping: true, label: "Free Express Shipping" }
    };
    localStorage.setItem('karthi_coupons', JSON.stringify(adminState.coupons));
  }
}

function saveProductsToStorage() {
  localStorage.setItem('karthi_products', JSON.stringify(adminState.products));
}

function saveOrdersToStorage() {
  localStorage.setItem('karthi_orders', JSON.stringify(adminState.orders));
}

function saveCouponsToStorage() {
  localStorage.setItem('karthi_coupons', JSON.stringify(adminState.coupons));
}

function loadDashboardData() {
  initAdminData();
  renderKPIs();
  renderProductsTable();
  renderOrdersTable();
  renderCouponsTable();
  renderAnalytics();
  initLucideIcons();
}

// ========================================================
// TAB SWITCHING
// ========================================================
function switchTab(tabName) {
  adminState.activeTab = tabName;
  const tabs = ['products', 'orders', 'coupons', 'analytics'];

  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const content = document.getElementById(`tab-content-${t}`);
    
    if (t === tabName) {
      btn.className = "admin-tab-btn pb-3 px-1 text-xs font-bold uppercase tracking-wider text-zinc-950 border-b-2 border-zinc-950 flex items-center gap-2";
      content.classList.remove('hidden');
    } else {
      btn.className = "admin-tab-btn pb-3 px-1 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-800 border-b-2 border-transparent flex items-center gap-2";
      content.classList.add('hidden');
    }
  });

  initLucideIcons();
}

// ========================================================
// KPI METRICS
// ========================================================
function renderKPIs() {
  // Revenue
  const totalRev = adminState.orders.reduce((sum, ord) => sum + (Number(ord.total) || 0), 0);
  const revEl = document.getElementById('kpi-revenue');
  if (revEl) revEl.textContent = `$${totalRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Orders & Pending
  const ordersCount = adminState.orders.length;
  const pendingCount = adminState.orders.filter(o => (o.status || 'Pending').toLowerCase() === 'pending').length;
  const ordEl = document.getElementById('kpi-orders');
  const pendEl = document.getElementById('kpi-pending-orders');
  if (ordEl) ordEl.textContent = ordersCount;
  if (pendEl) {
    pendEl.innerHTML = `<i data-lucide="clock" class="w-3 h-3"></i><span>${pendingCount} orders pending fulfillment</span>`;
  }

  // Products
  const prodCount = adminState.products.length;
  const lowStockCount = adminState.products.filter(p => Number(p.stock) <= 3).length;
  const prodEl = document.getElementById('kpi-products');
  const lowStockEl = document.getElementById('kpi-low-stock');
  if (prodEl) prodEl.textContent = prodCount;
  if (lowStockEl) {
    lowStockEl.innerHTML = lowStockCount > 0 
      ? `<span class="text-amber-600 flex items-center gap-1"><i data-lucide="alert-triangle" class="w-3 h-3"></i> ${lowStockCount} items have low stock (&le; 3)</span>`
      : `<span class="text-zinc-500 flex items-center gap-1"><i data-lucide="check-circle" class="w-3 h-3 text-emerald-600"></i> Stock levels healthy</span>`;
  }

  // Coupons
  const couponCount = Object.keys(adminState.coupons).length;
  const coupEl = document.getElementById('kpi-coupons');
  if (coupEl) coupEl.textContent = couponCount;

  // Tab Badge counts
  const tabProdCount = document.getElementById('tab-count-products');
  const tabOrdCount = document.getElementById('tab-count-orders');
  if (tabProdCount) tabProdCount.textContent = prodCount;
  if (tabOrdCount) tabOrdCount.textContent = pendingCount;
}

// ========================================================
// PRODUCTS MANAGEMENT
// ========================================================
function renderProductsTable(filteredList = null) {
  const tableBody = document.getElementById('admin-products-table-body');
  if (!tableBody) return;

  const items = filteredList || adminState.products;
  const countLabel = document.getElementById('product-count-label');
  if (countLabel) countLabel.textContent = `Showing ${items.length} of ${adminState.products.length} items`;

  if (items.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-12 text-zinc-400">
          <i data-lucide="package-search" class="w-8 h-8 mx-auto mb-2 text-zinc-300"></i>
          <p class="font-medium text-xs text-zinc-600">No products match your search or filter</p>
        </td>
      </tr>
    `;
    initLucideIcons();
    return;
  }

  tableBody.innerHTML = items.map(p => {
    const primaryImg = (p.images && p.images[0]) || 'assets/images/category-shirts.jpg';
    const isLow = Number(p.stock) <= 3 && Number(p.stock) > 0;
    const isOut = Number(p.stock) === 0;

    let stockBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">In Stock (${p.stock})</span>`;
    if (isLow) {
      stockBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Low Stock (${p.stock})</span>`;
    } else if (isOut) {
      stockBadge = `<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">Out of Stock (0)</span>`;
    }

    const catBadge = {
      shirts: '<span class="px-2 py-0.5 rounded-lg bg-zinc-100 text-zinc-800 text-[10px] font-bold uppercase tracking-wider">Shirts</span>',
      tshirts: '<span class="px-2 py-0.5 rounded-lg bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider">T-Shirts</span>',
      pants: '<span class="px-2 py-0.5 rounded-lg bg-zinc-200 text-zinc-900 text-[10px] font-bold uppercase tracking-wider">Pants</span>'
    }[p.category] || `<span class="px-2 py-0.5 rounded-lg bg-zinc-100 text-zinc-800 text-[10px] font-bold uppercase">${p.category}</span>`;

    return `
      <tr class="hover:bg-zinc-50/70 transition group">
        <td class="py-3 px-4">
          <div class="flex items-center gap-3">
            <img src="${primaryImg}" alt="${p.name}" class="w-11 h-11 rounded-xl object-cover border border-zinc-200 shadow-sm flex-shrink-0">
            <div>
              <span class="font-bold text-zinc-950 block text-xs group-hover:text-red-600 transition">${p.name}</span>
              <div class="font-mono text-[10px] text-zinc-400 mt-0.5">ID: ${p.id} &nbsp;|&nbsp; ${p.fit || 'Regular'} Fit</div>
            </div>
          </div>
        </td>
        <td class="py-3 px-4">${catBadge}</td>
        <td class="py-3 px-4">
          <div class="font-mono font-bold text-zinc-950 text-xs">$${Number(p.price).toFixed(2)}</div>
          ${p.originalPrice ? `<div class="text-[10px] font-mono text-zinc-400 line-through">$${Number(p.originalPrice).toFixed(2)}</div>` : ''}
        </td>
        <td class="py-3 px-4">${stockBadge}</td>
        <td class="py-3 px-4">
          <div class="flex items-center gap-1 text-zinc-900 font-bold text-[11px]">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
            <span>${p.rating || 4.9}</span>
            <span class="text-zinc-400 font-normal text-[10px]">(${p.reviewsCount || 40})</span>
          </div>
        </td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openEditProductModal('${p.id}')" class="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 transition" title="Edit Product">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="confirmDeleteProduct('${p.id}')" class="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete Product">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  initLucideIcons();
}

function filterAdminProducts() {
  const query = (document.getElementById('admin-product-search')?.value || '').toLowerCase().trim();
  const cat = document.getElementById('admin-category-filter')?.value || 'all';

  const filtered = adminState.products.filter(p => {
    const matchCat = cat === 'all' || p.category === cat;
    const matchQuery = !query || 
      p.name.toLowerCase().includes(query) || 
      p.id.toLowerCase().includes(query) ||
      (p.fabric && p.fabric.toLowerCase().includes(query));
    return matchCat && matchQuery;
  });

  renderProductsTable(filtered);
}

// ========================================================
// IMAGE UPLOADER & PREVIEW CONTROLLER (DEVICE & URL)
// ========================================================
function processUploadedImage(file, callback) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('Please select a valid image file (JPG, PNG, WEBP)', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      // Resize to max 900px for high definition and fast localStorage performance
      const canvas = document.createElement('canvas');
      const maxDim = 900;
      let w = img.width;
      let h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      callback(dataUrl);
    };
    img.onerror = function() {
      showToast('Error processing image file', 'error');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function onFileSelected(event, index) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  processUploadedImage(file, (dataUrl) => {
    setImageValueAndPreview(index, dataUrl, true);
    showToast(`Photo ${index === 1 ? 'Primary' : 'Secondary'} loaded from device!`, 'success');
  });
}

function onUrlInput(index) {
  const input = document.getElementById(`edit-image-${index}`);
  const val = input ? input.value.trim() : '';
  if (val) {
    setImageValueAndPreview(index, val, false);
  } else {
    clearImage(index);
  }
}

function setImageValueAndPreview(index, srcUrl, updateInput = true) {
  const input = document.getElementById(`edit-image-${index}`);
  const previewBox = document.getElementById(`preview-box-${index}`);
  const previewImg = document.getElementById(`preview-img-${index}`);
  const uploadPrompt = document.getElementById(`upload-prompt-${index}`);

  if (updateInput && input) {
    input.value = srcUrl;
  }

  if (previewImg) previewImg.src = srcUrl;
  if (previewBox) {
    previewBox.classList.remove('hidden');
    previewBox.classList.add('flex');
  }
  if (uploadPrompt) uploadPrompt.classList.add('hidden');
  initLucideIcons();
}

function clearImage(index) {
  const input = document.getElementById(`edit-image-${index}`);
  const fileInput = document.getElementById(`file-input-image-${index}`);
  const previewBox = document.getElementById(`preview-box-${index}`);
  const previewImg = document.getElementById(`preview-img-${index}`);
  const uploadPrompt = document.getElementById(`upload-prompt-${index}`);

  if (input) input.value = '';
  if (fileInput) fileInput.value = '';
  if (previewImg) previewImg.src = '';
  if (previewBox) {
    previewBox.classList.add('hidden');
    previewBox.classList.remove('flex');
  }
  if (uploadPrompt) uploadPrompt.classList.remove('hidden');
  initLucideIcons();
}

function openAddProductModal() {
  document.getElementById('product-modal-badge').textContent = 'Catalog Management';
  document.getElementById('product-modal-title').textContent = 'Add New Product';
  document.getElementById('edit-product-id').value = '';
  document.getElementById('edit-name').value = '';
  document.getElementById('edit-category').value = 'shirts';
  document.getElementById('edit-price').value = '';
  document.getElementById('edit-orig-price').value = '';
  document.getElementById('edit-stock').value = '15';
  document.getElementById('edit-fabric').value = '100% Long-Staple Egyptian Cotton';
  document.getElementById('edit-fit').value = 'Regular';
  document.getElementById('edit-description').value = '';

  // Clear previews and file inputs
  clearImage(1);
  clearImage(2);

  const modal = document.getElementById('product-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  initLucideIcons();
}

function openEditProductModal(id) {
  const p = adminState.products.find(item => item.id === id);
  if (!p) return;

  document.getElementById('product-modal-badge').textContent = `Editing SKU: ${p.id}`;
  document.getElementById('product-modal-title').textContent = 'Edit Product Details';
  document.getElementById('edit-product-id').value = p.id;
  document.getElementById('edit-name').value = p.name || '';
  document.getElementById('edit-category').value = p.category || 'shirts';
  document.getElementById('edit-price').value = p.price || '';
  document.getElementById('edit-orig-price').value = p.originalPrice || '';
  document.getElementById('edit-stock').value = p.stock || 0;
  document.getElementById('edit-fabric').value = p.fabric || '';
  document.getElementById('edit-fit').value = p.fit || 'Regular';
  document.getElementById('edit-description').value = p.description || '';

  // Set images & previews
  const img1 = (p.images && p.images[0]) || '';
  const img2 = (p.images && p.images[1]) || '';

  if (img1) {
    setImageValueAndPreview(1, img1, true);
  } else {
    clearImage(1);
  }

  if (img2) {
    setImageValueAndPreview(2, img2, true);
  } else {
    clearImage(2);
  }

  const modal = document.getElementById('product-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  initLucideIcons();
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function handleSaveProduct(event) {
  event.preventDefault();
  const id = document.getElementById('edit-product-id').value;
  const name = document.getElementById('edit-name').value.trim();
  const category = document.getElementById('edit-category').value;
  const price = parseFloat(document.getElementById('edit-price').value);
  const origPrice = parseFloat(document.getElementById('edit-orig-price').value) || null;
  const stock = parseInt(document.getElementById('edit-stock').value, 10);
  const fabric = document.getElementById('edit-fabric').value.trim();
  const fit = document.getElementById('edit-fit').value;
  const img1 = document.getElementById('edit-image-1').value.trim();
  const img2 = document.getElementById('edit-image-2').value.trim();
  const description = document.getElementById('edit-description').value.trim();

  if (!img1) {
    showToast('Please select or upload a Primary Image for the product', 'error');
    return;
  }

  const images = [img1];
  if (img2) images.push(img2);

  if (id) {
    // Update existing product
    const index = adminState.products.findIndex(p => p.id === id);
    if (index !== -1) {
      adminState.products[index] = {
        ...adminState.products[index],
        name,
        category,
        price,
        originalPrice: origPrice,
        stock,
        fabric,
        fit,
        images,
        description
      };
      showToast(`Updated product "${name}"`, 'success');
    }
  } else {
    // Create new product
    const newId = `${category.slice(0, 4)}-${Date.now().toString().slice(-4)}`;
    const newProduct = {
      id: newId,
      name,
      category,
      price,
      originalPrice: origPrice,
      discount: origPrice ? Math.round(((origPrice - price) / origPrice) * 100) : 0,
      rating: 5.0,
      reviewsCount: 1,
      badge: "NEW ARRIVAL",
      isSale: origPrice && origPrice > price,
      isNew: true,
      fabric: fabric || "100% Cotton",
      fit: fit || "Regular",
      stock,
      stockStatus: stock > 3 ? "in_stock" : (stock > 0 ? "only_2_left" : "out_of_stock"),
      colors: [
        { name: "Default", hex: "#18181B" }
      ],
      sizes: category === 'pants' ? ["28", "30", "32", "34", "36"] : ["S", "M", "L", "XL", "XXL"],
      images,
      description: description || "Contemporary luxury apparel engineered with architectural precision.",
      features: [
        fabric || "100% natural fibers",
        "Tailored silhouette for fluid motion",
        "Pre-shrunk for enduring fit"
      ],
      careInstructions: "Machine wash cold on gentle cycle. Hang dry.",
      measurements: {
        inches: {
          S: { chest: "38", length: "29", shoulder: "17.5", sleeve: "33.5" },
          M: { chest: "41", length: "29.5", shoulder: "18.25", sleeve: "34.5" },
          L: { chest: "44", length: "30", shoulder: "19", sleeve: "35.5" },
          XL: { chest: "47", length: "30.5", shoulder: "19.75", sleeve: "36.5" },
          XXL: { chest: "50", length: "31", shoulder: "20.5", sleeve: "37" }
        },
        cm: {
          S: { chest: "96.5", length: "73.5", shoulder: "44.5", sleeve: "85" },
          M: { chest: "104", length: "75", shoulder: "46.3", sleeve: "87.5" },
          L: { chest: "111.8", length: "76.2", shoulder: "48.2", sleeve: "90" },
          XL: { chest: "119.4", length: "77.5", shoulder: "50.2", sleeve: "92.7" },
          XXL: { chest: "127", length: "78.7", shoulder: "52", sleeve: "94" }
        }
      }
    };
    adminState.products.unshift(newProduct);
    showToast(`Added new product "${name}"`, 'success');
  }

  saveProductsToStorage();
  closeProductModal();
  renderProductsTable();
  renderKPIs();
}

function confirmDeleteProduct(id) {
  const p = adminState.products.find(item => item.id === id);
  if (!p) return;

  if (confirm(`Are you sure you want to delete "${p.name}" from the store catalog?`)) {
    adminState.products = adminState.products.filter(item => item.id !== id);
    saveProductsToStorage();
    renderProductsTable();
    renderKPIs();
    showToast(`Deleted product "${p.name}"`, 'info');
  }
}

function confirmResetCatalog() {
  if (confirm("Reset store catalog back to the 12 default KARTHI Atelier products?")) {
    adminState.products = typeof DEFAULT_PRODUCTS !== 'undefined' ? DEFAULT_PRODUCTS : PRODUCTS;
    saveProductsToStorage();
    renderProductsTable();
    renderKPIs();
    showToast("Catalog restored to factory defaults", 'success');
  }
}

// ========================================================
// ORDERS MANAGEMENT
// ========================================================
function renderOrdersTable(filteredList = null) {
  const tableBody = document.getElementById('admin-orders-table-body');
  if (!tableBody) return;

  const orders = filteredList || adminState.orders;

  if (orders.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-12 text-zinc-400">
          <i data-lucide="shopping-bag" class="w-8 h-8 mx-auto mb-2 text-zinc-300"></i>
          <p class="font-medium text-xs text-zinc-600">No orders found</p>
        </td>
      </tr>
    `;
    initLucideIcons();
    return;
  }

  tableBody.innerHTML = orders.map(ord => {
    const dateFormatted = new Date(ord.date || Date.now()).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const cust = ord.customer || { name: 'Customer', email: 'guest@atelier.com', city: 'City' };
    const itemsPreview = (ord.items || []).map(i => `${i.quantity}x ${i.name} (${i.size || 'M'})`).join(', ');

    const status = ord.status || 'Pending';
    const statusClasses = {
      'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
      'Processing': 'bg-blue-50 text-blue-700 border-blue-200',
      'Shipped': 'bg-purple-50 text-purple-700 border-purple-200',
      'Delivered': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Cancelled': 'bg-red-50 text-red-700 border-red-200'
    }[status] || 'bg-zinc-100 text-zinc-800 border-zinc-200';

    return `
      <tr class="hover:bg-zinc-50/70 transition">
        <td class="py-3 px-4">
          <span class="font-mono font-bold text-xs text-zinc-950 block">${ord.id}</span>
          <span class="text-[10px] text-zinc-400">${dateFormatted}</span>
        </td>
        <td class="py-3 px-4">
          <div class="font-bold text-zinc-900 text-xs">${cust.name}</div>
          <div class="text-[10px] text-zinc-500">${cust.email} &bull; ${cust.city || ''}</div>
        </td>
        <td class="py-3 px-4">
          <span class="text-zinc-700 text-xs font-medium line-clamp-1 max-w-xs" title="${itemsPreview}">${itemsPreview || '1 item'}</span>
          <span class="text-[10px] text-zinc-400 font-mono">${ord.itemCount || (ord.items?.length || 1)} items</span>
        </td>
        <td class="py-3 px-4">
          <div class="font-mono font-bold text-zinc-950 text-xs">$${Number(ord.total).toFixed(2)}</div>
          <span class="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-zinc-100 text-zinc-700">${ord.paymentMethod || 'CARD'}</span>
        </td>
        <td class="py-3 px-4">
          <select onchange="updateOrderStatus('${ord.id}', this.value)" class="text-xs font-bold px-2 py-1 rounded-lg border ${statusClasses} focus:outline-none cursor-pointer">
            <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Processing" ${status === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Shipped" ${status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Delivered" ${status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openOrderModal('${ord.id}')" class="px-2 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[11px] font-bold transition flex items-center gap-1">
              <i data-lucide="eye" class="w-3 h-3"></i>
              <span>Slip</span>
            </button>
            <button onclick="deleteOrder('${ord.id}')" class="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition" title="Delete Order">
              <i data-lucide="trash" class="w-3 h-3"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  initLucideIcons();
}

function filterAdminOrders() {
  const query = (document.getElementById('admin-order-search')?.value || '').toLowerCase().trim();
  const statusFilter = document.getElementById('admin-order-status-filter')?.value || 'all';

  const filtered = adminState.orders.filter(ord => {
    const matchStatus = statusFilter === 'all' || (ord.status || 'Pending') === statusFilter;
    const cust = ord.customer || {};
    const matchQuery = !query ||
      ord.id.toLowerCase().includes(query) ||
      (cust.name && cust.name.toLowerCase().includes(query)) ||
      (cust.email && cust.email.toLowerCase().includes(query));
    return matchStatus && matchQuery;
  });

  renderOrdersTable(filtered);
}

function updateOrderStatus(orderId, newStatus) {
  const ord = adminState.orders.find(o => o.id === orderId);
  if (!ord) return;

  ord.status = newStatus;
  saveOrdersToStorage();
  renderKPIs();
  renderOrdersTable();
  showToast(`Order ${orderId} marked as ${newStatus}`, 'success');
}

function openOrderModal(orderId) {
  const ord = adminState.orders.find(o => o.id === orderId);
  if (!ord) return;

  document.getElementById('modal-order-id').textContent = ord.id;
  document.getElementById('modal-order-badge').textContent = ord.status || 'Pending';
  document.getElementById('modal-order-date').textContent = `Placed on ${new Date(ord.date || Date.now()).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`;

  const cust = ord.customer || {};
  document.getElementById('modal-cust-name').textContent = cust.name || 'Guest User';
  document.getElementById('modal-cust-email').textContent = cust.email || 'N/A';
  document.getElementById('modal-cust-phone').textContent = cust.phone || 'N/A';
  document.getElementById('modal-payment-mode').textContent = ord.paymentMethod || 'CARD';
  document.getElementById('modal-cust-address').textContent = `${cust.address || ''}, ${cust.city || ''} ${cust.zip || ''}`;

  const itemsContainer = document.getElementById('modal-order-items');
  if (itemsContainer) {
    itemsContainer.innerHTML = (ord.items || []).map(item => `
      <div class="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
        <div class="flex items-center gap-2.5">
          <img src="${item.image || 'assets/images/category-shirts.jpg'}" class="w-9 h-9 rounded-lg object-cover border border-zinc-200 flex-shrink-0">
          <div>
            <span class="font-bold text-zinc-950 block">${item.name}</span>
            <div class="text-[10px] text-zinc-500">Size: ${item.size || 'M'} &bull; Color: ${item.color || 'Standard'} &bull; Qty: ${item.quantity}</div>
          </div>
        </div>
        <div class="font-mono font-bold text-zinc-950 text-xs">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    `).join('');
  }

  document.getElementById('modal-subtotal').textContent = `$${Number(ord.subtotal || ord.total).toFixed(2)}`;
  document.getElementById('modal-discount').textContent = ord.discount ? `-$${Number(ord.discount).toFixed(2)}` : '$0.00';
  document.getElementById('modal-shipping').textContent = ord.shipping ? `$${Number(ord.shipping).toFixed(2)}` : 'FREE';
  document.getElementById('modal-total').textContent = `$${Number(ord.total).toFixed(2)}`;

  const modal = document.getElementById('order-details-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  initLucideIcons();
}

function closeOrderModal() {
  const modal = document.getElementById('order-details-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function deleteOrder(orderId) {
  if (confirm(`Are you sure you want to delete order ${orderId}?`)) {
    adminState.orders = adminState.orders.filter(o => o.id !== orderId);
    saveOrdersToStorage();
    renderOrdersTable();
    renderKPIs();
    showToast(`Order ${orderId} deleted`, 'info');
  }
}

function seedSampleOrders() {
  adminState.orders = [...SAMPLE_ORDERS, ...adminState.orders];
  saveOrdersToStorage();
  renderOrdersTable();
  renderKPIs();
  showToast("Added 3 demo orders to table", 'success');
}

function clearAllOrders() {
  if (confirm("Are you sure you want to clear all orders? This cannot be undone.")) {
    adminState.orders = [];
    saveOrdersToStorage();
    renderOrdersTable();
    renderKPIs();
    showToast("All orders cleared", 'info');
  }
}

// ========================================================
// PROMO COUPONS MANAGEMENT
// ========================================================
function renderCouponsTable() {
  const tableBody = document.getElementById('admin-coupons-table-body');
  if (!tableBody) return;

  const codes = Object.keys(adminState.coupons);

  if (codes.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center py-6 text-zinc-400 text-xs">No active promo codes found</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = codes.map(code => {
    const c = adminState.coupons[code];
    const discountText = c.freeShipping 
      ? "FREE SHIP" 
      : `${Math.round((c.discount || 0) * 100)}% OFF`;

    return `
      <tr class="hover:bg-zinc-50/70 transition">
        <td class="py-2.5 px-3">
          <span class="font-mono font-extrabold text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">${code}</span>
        </td>
        <td class="py-2.5 px-3 font-bold text-xs text-zinc-950 font-mono">${discountText}</td>
        <td class="py-2.5 px-3 text-zinc-600 text-xs">${c.label || ''}</td>
        <td class="py-2.5 px-3 text-right">
          <button onclick="deleteCoupon('${code}')" class="p-1 rounded-lg hover:bg-red-50 text-zinc-400 hover:text-red-600 transition" title="Delete Coupon">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  initLucideIcons();
}

function handleCreateCoupon(event) {
  event.preventDefault();
  const code = document.getElementById('coupon-code-input').value.toUpperCase().trim();
  const discountPct = parseFloat(document.getElementById('coupon-discount-input').value);
  const label = document.getElementById('coupon-label-input').value.trim();
  const isFreeShip = document.getElementById('coupon-freeship-input').checked;

  if (!code) return;

  adminState.coupons[code] = {
    discount: discountPct / 100,
    freeShipping: isFreeShip,
    label: label || `${discountPct}% Discount`
  };

  saveCouponsToStorage();
  renderCouponsTable();
  renderKPIs();
  document.getElementById('create-coupon-form').reset();
  showToast(`Promo Code ${code} created successfully!`, 'success');
}

function deleteCoupon(code) {
  if (confirm(`Remove coupon code ${code}?`)) {
    delete adminState.coupons[code];
    saveCouponsToStorage();
    renderCouponsTable();
    renderKPIs();
    showToast(`Removed promo code ${code}`, 'info');
  }
}

function resetDefaultCoupons() {
  adminState.coupons = {
    "KARTHI20": { discount: 0.20, label: "20% Karthi Atelier Discount" },
    "WELCOME10": { discount: 0.10, label: "10% Welcome Discount" },
    "GRAVITY20": { discount: 0.20, label: "20% Drop Discount" },
    "FREESHIP": { discount: 0.00, freeShipping: true, label: "Free Express Shipping" }
  };
  saveCouponsToStorage();
  renderCouponsTable();
  renderKPIs();
  showToast("Coupons reset to factory defaults", 'success');
}

// ========================================================
// ANALYTICS & EXPORT
// ========================================================
function renderAnalytics() {
  const shirtsCount = adminState.products.filter(p => p.category === 'shirts').length;
  const tshirtsCount = adminState.products.filter(p => p.category === 'tshirts').length;
  const pantsCount = adminState.products.filter(p => p.category === 'pants').length;
  const total = Math.max(adminState.products.length, 1);

  const shirtsPct = Math.round((shirtsCount / total) * 100);
  const tshirtsPct = Math.round((tshirtsCount / total) * 100);
  const pantsPct = Math.round((pantsCount / total) * 100);

  const sLabel = document.getElementById('stat-shirts-percent');
  const sBar = document.getElementById('stat-shirts-bar');
  if (sLabel) sLabel.textContent = `${shirtsPct}% (${shirtsCount} items)`;
  if (sBar) sBar.style.width = `${shirtsPct}%`;

  const tLabel = document.getElementById('stat-tshirts-percent');
  const tBar = document.getElementById('stat-tshirts-bar');
  if (tLabel) tLabel.textContent = `${tshirtsPct}% (${tshirtsCount} items)`;
  if (tBar) tBar.style.width = `${tshirtsPct}%`;

  const pLabel = document.getElementById('stat-pants-percent');
  const pBar = document.getElementById('stat-pants-bar');
  if (pLabel) pLabel.textContent = `${pantsPct}% (${pantsCount} items)`;
  if (pBar) pBar.style.width = `${pantsPct}%`;
}

function exportOrdersJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(adminState.orders, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `karthi_orders_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Orders exported successfully as JSON", 'success');
}

function exportProductsJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(adminState.products, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `karthi_catalog_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Product catalog exported successfully as JSON", 'success');
}

// ========================================================
// TOAST NOTIFICATIONS
// ========================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const iconMap = {
    success: 'check-circle',
    error: 'alert-circle',
    info: 'info'
  };
  const colorMap = {
    success: 'border-emerald-200 text-emerald-800 bg-white',
    error: 'border-red-200 text-red-800 bg-white',
    info: 'border-zinc-200 text-zinc-900 bg-white'
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl text-xs font-semibold pointer-events-auto transform transition-all duration-300 translate-y-4 opacity-0 ${colorMap[type] || colorMap.info}`;
  toast.innerHTML = `
    <i data-lucide="${iconMap[type] || 'info'}" class="w-4 h-4 flex-shrink-0 ${type === 'success' ? 'text-emerald-600' : (type === 'error' ? 'text-red-600' : 'text-zinc-700')}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  initLucideIcons();

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
