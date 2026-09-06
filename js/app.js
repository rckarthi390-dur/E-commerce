// =====================================================
// KARTHI ATELIER - APPLICATION CONTROLLER & STATE MANAGER
// WHITE MINIMALIST LUXURY DESIGN
// =====================================================

// Global Application State
const STATE = {
  cart: JSON.parse(localStorage.getItem('karthi_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('karthi_wishlist')) || [],
  currency: localStorage.getItem('karthi_currency') || 'USD',
  appliedCoupon: JSON.parse(localStorage.getItem('karthi_coupon')) || null,
  viewMode: 'grid',
  sizeGuideUnit: 'inches',
  currentPDPProduct: null,
  selectedPDPSize: null,
  selectedPDPColor: null,
  filters: {
    category: 'all',
    maxPrice: 100,
    sizes: [],
    fits: [],
    saleOnly: false,
    inStockOnly: false,
    searchQuery: ''
  },
  sort: 'featured'
};

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  setupEventListeners();
  updateCurrencyDisplay();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
});

// Re-initialize Lucide Icons safely
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Global Currency Switcher
  const currencySelector = document.getElementById('currency-selector');
  if (currencySelector) {
    currencySelector.value = STATE.currency;
    currencySelector.addEventListener('change', (e) => {
      STATE.currency = e.target.value;
      localStorage.setItem('karthi_currency', STATE.currency);
      renderProducts();
      updateCartUI();
      if (STATE.currentPDPProduct) {
        openProductDetailModal(STATE.currentPDPProduct.id);
      }
      showToast(`Currency changed to ${CURRENCIES[STATE.currency].label}`, 'info');
    });
  }

  // Desktop Search
  const searchInput = document.getElementById('global-search-input');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const searchDropdown = document.getElementById('search-results-dropdown');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      STATE.filters.searchQuery = query;
      if (query.length > 0) {
        searchClearBtn.classList.remove('hidden');
        renderSearchDropdown(query, searchDropdown);
      } else {
        searchClearBtn.classList.add('hidden');
        searchDropdown.classList.add('hidden');
      }
      renderProducts();
    });

    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      STATE.filters.searchQuery = '';
      searchClearBtn.classList.add('hidden');
      searchDropdown.classList.add('hidden');
      renderProducts();
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.add('hidden');
      }
    });
  }

  // Mobile Search
  const mobileSearchToggle = document.getElementById('mobile-search-toggle');
  const mobileSearchBar = document.getElementById('mobile-search-bar');
  const mobileSearchInput = document.getElementById('mobile-search-input');
  const mobileSearchDropdown = document.getElementById('mobile-search-results-dropdown');

  if (mobileSearchToggle && mobileSearchBar) {
    mobileSearchToggle.addEventListener('click', () => {
      mobileSearchBar.classList.toggle('hidden');
      if (!mobileSearchBar.classList.contains('hidden')) {
        mobileSearchInput.focus();
      }
    });
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      STATE.filters.searchQuery = query;
      if (query.length > 0) {
        renderSearchDropdown(query, mobileSearchDropdown);
      } else {
        mobileSearchDropdown.classList.add('hidden');
      }
      renderProducts();
    });
  }

  // Drawer Triggers
  document.getElementById('cart-btn')?.addEventListener('click', openCartDrawer);
  document.getElementById('close-cart-btn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-drawer')?.addEventListener('click', (e) => {
    if (e.target.id === 'cart-drawer') closeCartDrawer();
  });

  document.getElementById('wishlist-btn')?.addEventListener('click', openWishlistDrawer);
  document.getElementById('close-wishlist-btn')?.addEventListener('click', closeWishlistDrawer);
  document.getElementById('wishlist-drawer')?.addEventListener('click', (e) => {
    if (e.target.id === 'wishlist-drawer') closeWishlistDrawer();
  });

  document.getElementById('mobile-menu-btn')?.addEventListener('click', openMobileNav);
  document.getElementById('close-mobile-menu')?.addEventListener('click', closeMobileNav);

  document.getElementById('mobile-filter-btn')?.addEventListener('click', openMobileFilterDrawer);
  document.getElementById('close-mobile-filter')?.addEventListener('click', closeMobileFilterDrawer);
  document.getElementById('mobile-filter-drawer')?.addEventListener('click', (e) => {
    if (e.target.id === 'mobile-filter-drawer') closeMobileFilterDrawer();
  });

  // Sort Selector
  document.getElementById('sort-selector')?.addEventListener('change', (e) => {
    STATE.sort = e.target.value;
    renderProducts();
  });

  // View Switchers
  document.getElementById('view-grid-btn')?.addEventListener('click', () => {
    STATE.viewMode = 'grid';
    document.getElementById('view-grid-btn').classList.add('bg-zinc-950', 'text-white');
    document.getElementById('view-grid-btn').classList.remove('text-zinc-500');
    document.getElementById('view-list-btn').classList.remove('bg-zinc-950', 'text-white');
    document.getElementById('view-list-btn').classList.add('text-zinc-500');
    renderProducts();
  });

  document.getElementById('view-list-btn')?.addEventListener('click', () => {
    STATE.viewMode = 'list';
    document.getElementById('view-list-btn').classList.add('bg-zinc-950', 'text-white');
    document.getElementById('view-list-btn').classList.remove('text-zinc-500');
    document.getElementById('view-grid-btn').classList.remove('bg-zinc-950', 'text-white');
    document.getElementById('view-grid-btn').classList.add('text-zinc-500');
    renderProducts();
  });
}

// Price and Currency Formatter
function formatPrice(amountInUSD) {
  const curr = CURRENCIES[STATE.currency] || CURRENCIES.USD;
  const converted = amountInUSD * curr.rate;
  return `${curr.symbol}${converted.toFixed(2)}`;
}

function updateCurrencyDisplay() {
  const selector = document.getElementById('currency-selector');
  if (selector) selector.value = STATE.currency;
}

// =====================================================
// PRODUCT FILTERING, SORTING & RENDERING (WHITE ATELIER)
// =====================================================

function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    // Category filter
    if (STATE.filters.category !== 'all' && p.category !== STATE.filters.category) {
      return false;
    }

    // Price filter
    if (p.price > STATE.filters.maxPrice) {
      return false;
    }

    // Size filter
    if (STATE.filters.sizes.length > 0) {
      const hasSize = STATE.filters.sizes.some(s => p.sizes.includes(s));
      if (!hasSize) return false;
    }

    // Fit filter
    if (STATE.filters.fits.length > 0) {
      if (!STATE.filters.fits.includes(p.fit)) return false;
    }

    // Sale only
    if (STATE.filters.saleOnly && !p.isSale) {
      return false;
    }

    // In-stock only
    if (STATE.filters.inStockOnly && p.stock <= 0) {
      return false;
    }

    // Search query
    if (STATE.filters.searchQuery) {
      const q = STATE.filters.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchFabric = p.fabric.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchCategory && !matchFabric && !matchDesc) return false;
    }

    return true;
  }).sort((a, b) => {
    if (STATE.sort === 'price-low') return a.price - b.price;
    if (STATE.sort === 'price-high') return b.price - a.price;
    if (STATE.sort === 'rating') return b.rating - a.rating;
    if (STATE.sort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    if (STATE.sort === 'discount') return (b.discount || 0) - (a.discount || 0);
    return 0; // featured
  });
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const emptyState = document.getElementById('empty-state');
  const countLabel = document.getElementById('product-count-label');
  const filtered = getFilteredProducts();

  if (countLabel) {
    countLabel.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} contemporary apparel pieces`;
  }

  renderActiveFilterChips();

  if (filtered.length === 0) {
    grid.innerHTML = '';
    grid.classList.add('hidden');
    emptyState.classList.remove('hidden');
    emptyState.classList.add('flex');
    initLucideIcons();
    return;
  }

  grid.classList.remove('hidden');
  emptyState.classList.add('hidden');
  emptyState.classList.remove('flex');

  if (STATE.viewMode === 'list') {
    grid.className = 'flex flex-col gap-4';
    grid.innerHTML = filtered.map(p => createProductListCardHTML(p)).join('');
  } else {
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6';
    grid.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');
  }

  initLucideIcons();
}

function createProductCardHTML(product) {
  const isWishlisted = STATE.wishlist.includes(product.id);
  const primaryImg = product.images[0] || product.images[1];
  const secondaryImg = product.images[1] || product.images[0];

  return `
    <div class="product-card white-card rounded-3xl overflow-hidden group flex flex-col justify-between" data-id="${product.id}">
      
      <!-- Top Image Area -->
      <div class="relative aspect-[4/5] bg-zinc-100 overflow-hidden cursor-pointer" onclick="openProductDetailModal('${product.id}')">
        
        <!-- Primary & Secondary Hover Images -->
        <img 
          src="${primaryImg}" 
          alt="${product.name}" 
          class="img-primary absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.98]"
          loading="lazy"
        >
        <img 
          src="${secondaryImg}" 
          alt="${product.name} alternate view" 
          class="img-secondary absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.98]"
          loading="lazy"
        >

        <!-- Top Badges -->
        <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          ${product.badge ? `
            <span class="px-2.5 py-1 rounded-md text-[10px] font-black tracking-wider uppercase bg-zinc-950 text-white shadow-sm">
              ${product.badge}
            </span>
          ` : ''}
          ${product.discount ? `
            <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-tight bg-red-600 text-white shadow-sm">
              -${product.discount}% OFF
            </span>
          ` : ''}
        </div>

        <!-- Wishlist Button Toggle -->
        <button 
          onclick="event.stopPropagation(); toggleWishlist('${product.id}')" 
          class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-sm"
          aria-label="Add to wishlist"
        >
          <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'text-red-600 fill-red-600' : ''}"></i>
        </button>

        <!-- Quick View Overlay Button on Hover -->
        <div class="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onclick="event.stopPropagation(); openProductDetailModal('${product.id}')"
            class="w-full py-2.5 bg-zinc-950/90 hover:bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl backdrop-blur-md shadow-md transition flex items-center justify-center gap-1.5"
          >
            <i data-lucide="eye" class="w-3.5 h-3.5"></i> Quick View & Size Guide
          </button>
        </div>

      </div>

      <!-- Card Details Area -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <!-- Fabric & Fit Tags -->
          <div class="flex items-center justify-between gap-2 text-[11px] mb-1.5">
            <span class="truncate font-semibold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">${product.fabric}</span>
            <span class="text-zinc-500 font-medium">${product.fit} Fit</span>
          </div>

          <!-- Product Title -->
          <h3 
            onclick="openProductDetailModal('${product.id}')" 
            class="text-sm font-bold text-zinc-950 group-hover:text-red-600 transition cursor-pointer line-clamp-1"
          >
            ${product.name}
          </h3>

          <!-- Rating and Reviews -->
          <div class="flex items-center gap-1.5 mt-1.5 text-xs">
            <div class="flex text-amber-500">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-500"></i>
            </div>
            <span class="font-bold text-zinc-900 text-xs">${product.rating}</span>
            <span class="text-zinc-400 text-[11px] font-medium">(${product.reviewsCount})</span>
          </div>
        </div>

        <!-- Color Swatch Dots & Price & Add Actions -->
        <div class="pt-4 mt-3 border-t border-zinc-100 space-y-3">
          
          <div class="flex items-center justify-between">
            <!-- Price Display -->
            <div class="flex items-baseline gap-2">
              <span class="text-lg font-black text-zinc-950 font-mono">${formatPrice(product.price)}</span>
              ${product.originalPrice ? `
                <span class="text-xs text-zinc-400 line-through font-mono font-medium">${formatPrice(product.originalPrice)}</span>
              ` : ''}
            </div>

            <!-- Color Variants Indicator -->
            <div class="flex items-center gap-1.5">
              ${product.colors.slice(0, 3).map(c => `
                <span 
                  class="w-3.5 h-3.5 rounded-full border border-zinc-300 shadow-xs" 
                  style="background-color: ${c.hex};" 
                  title="${c.name}"
                ></span>
              `).join('')}
              ${product.colors.length > 3 ? `<span class="text-[10px] text-zinc-400 font-bold">+${product.colors.length - 3}</span>` : ''}
            </div>
          </div>

          <!-- Quick Add Size Button -->
          <div class="relative">
            <button 
              onclick="toggleQuickAddSizeSelector('${product.id}')"
              class="w-full py-2.5 bg-zinc-100 hover:bg-zinc-950 hover:text-white text-zinc-900 text-xs font-bold rounded-xl border border-zinc-200 transition flex items-center justify-center gap-2"
            >
              <i data-lucide="plus" class="w-3.5 h-3.5 text-red-600"></i> Quick Add to Bag
            </button>

            <!-- Inline Quick Add Size Selector Popover -->
            <div id="quick-add-${product.id}" class="hidden absolute left-0 right-0 bottom-full mb-2 bg-white border border-zinc-200 rounded-2xl p-3 shadow-xl z-20">
              <div class="flex justify-between items-center mb-2">
                <span class="text-[11px] font-bold text-zinc-800">Select Size:</span>
                <button onclick="toggleQuickAddSizeSelector('${product.id}')" class="text-zinc-400 hover:text-zinc-900 p-0.5">
                  <i data-lucide="x" class="w-3 h-3"></i>
                </button>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${product.sizes.map(s => `
                  <button 
                    onclick="quickAddToCart('${product.id}', '${s}')" 
                    class="px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-950 text-zinc-900 hover:text-white text-xs font-bold transition border border-zinc-200"
                  >
                    ${s}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}

function createProductListCardHTML(product) {
  const isWishlisted = STATE.wishlist.includes(product.id);
  const primaryImg = product.images[0] || product.images[1];

  return `
    <div class="white-card rounded-3xl p-4 flex flex-col sm:flex-row items-center gap-6">
      <div class="relative w-36 h-44 rounded-2xl overflow-hidden bg-zinc-100 flex-shrink-0 cursor-pointer" onclick="openProductDetailModal('${product.id}')">
        <img src="${primaryImg}" alt="${product.name}" class="w-full h-full object-cover">
        ${product.badge ? `<span class="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold bg-zinc-950 text-white rounded">${product.badge}</span>` : ''}
      </div>
      
      <div class="flex-1 space-y-2 text-center sm:text-left">
        <div class="flex items-center gap-2 justify-center sm:justify-start">
          <span class="text-xs bg-zinc-100 text-zinc-700 font-semibold px-2 py-0.5 rounded border border-zinc-200">${product.fabric}</span>
          <span class="text-xs text-zinc-500 font-medium">${product.fit} Fit</span>
        </div>
        <h3 onclick="openProductDetailModal('${product.id}')" class="text-lg font-bold text-zinc-950 hover:text-red-600 transition cursor-pointer">${product.name}</h3>
        <p class="text-xs text-zinc-500 line-clamp-2">${product.description}</p>
        <div class="flex items-center gap-2 justify-center sm:justify-start">
          <span class="text-xl font-black text-zinc-950 font-mono">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="text-xs text-zinc-400 line-through font-mono font-medium">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
      </div>

      <div class="flex sm:flex-col gap-2 w-full sm:w-auto">
        <button onclick="openProductDetailModal('${product.id}')" class="flex-1 sm:flex-none px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition shadow-sm">
          View Details
        </button>
        <button onclick="toggleWishlist('${product.id}')" class="p-2.5 bg-zinc-100 border border-zinc-200 hover:text-red-600 text-zinc-600 rounded-xl transition">
          <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'text-red-600 fill-red-600' : ''}"></i>
        </button>
      </div>
    </div>
  `;
}

// Quick Add Popover Toggle
function toggleQuickAddSizeSelector(productId) {
  const el = document.getElementById(`quick-add-${productId}`);
  if (el) {
    el.classList.toggle('hidden');
    initLucideIcons();
  }
}

function quickAddToCart(productId, size) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const defaultColor = product.colors[0]?.name || 'Standard';
  addToCart(productId, size, defaultColor, 1);
  
  // Close the quick add popover
  const el = document.getElementById(`quick-add-${productId}`);
  if (el) el.classList.add('hidden');
}

// Render Search Autocomplete Dropdown (Light)
function renderSearchDropdown(query, containerEl) {
  const matches = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query) ||
    p.fabric.toLowerCase().includes(query)
  ).slice(0, 5);

  if (matches.length === 0) {
    containerEl.innerHTML = `
      <div class="p-4 text-center text-xs text-zinc-400 font-medium">
        No matching garments found for "${query}"
      </div>
    `;
    containerEl.classList.remove('hidden');
    return;
  }

  containerEl.innerHTML = `
    <div class="p-2 text-[10px] font-bold uppercase text-zinc-400 border-b border-zinc-100">
      Quick Results (${matches.length})
    </div>
    <div class="space-y-1 mt-1">
      ${matches.map(p => `
        <div onclick="openProductDetailModal('${p.id}'); document.getElementById('search-results-dropdown').classList.add('hidden');" class="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-100 cursor-pointer transition">
          <img src="${p.images[0]}" alt="${p.name}" class="w-10 h-12 object-cover rounded-lg bg-zinc-100">
          <div class="flex-1">
            <h4 class="text-xs font-bold text-zinc-950">${p.name}</h4>
            <span class="text-[10px] text-zinc-500 capitalize">${p.category} • ${p.fabric}</span>
          </div>
          <span class="text-xs font-bold font-mono text-zinc-950">${formatPrice(p.price)}</span>
        </div>
      `).join('')}
    </div>
  `;
  containerEl.classList.remove('hidden');
}

// Active Filter Chips
function renderActiveFilterChips() {
  const chipsBar = document.getElementById('active-filter-chips');
  const chipsContainer = document.getElementById('chips-container');
  const countBadge = document.getElementById('active-filter-count-badge');
  if (!chipsBar || !chipsContainer) return;

  const chips = [];

  if (STATE.filters.category !== 'all') {
    chips.push({
      label: `Category: ${STATE.filters.category.toUpperCase()}`,
      action: () => filterByCategory('all')
    });
  }

  if (STATE.filters.maxPrice < 100) {
    chips.push({
      label: `Max Price: $${STATE.filters.maxPrice}`,
      action: () => {
        STATE.filters.maxPrice = 100;
        document.getElementById('price-range-slider').value = 100;
        document.getElementById('price-slider-label').textContent = '$100';
        handleFilterChange();
      }
    });
  }

  STATE.filters.sizes.forEach(s => {
    chips.push({
      label: `Size: ${s}`,
      action: () => toggleSizeFilter(s)
    });
  });

  STATE.filters.fits.forEach(f => {
    chips.push({
      label: `Fit: ${f}`,
      action: () => toggleFitFilter(f)
    });
  });

  if (STATE.filters.saleOnly) {
    chips.push({
      label: `Sale Only`,
      action: () => {
        STATE.filters.saleOnly = false;
        const toggle = document.getElementById('sale-only-toggle');
        if (toggle) toggle.checked = false;
        handleFilterChange();
      }
    });
  }

  if (STATE.filters.inStockOnly) {
    chips.push({
      label: `In Stock Only`,
      action: () => {
        STATE.filters.inStockOnly = false;
        const toggle = document.getElementById('instock-only-toggle');
        if (toggle) toggle.checked = false;
        handleFilterChange();
      }
    });
  }

  if (countBadge) {
    if (chips.length > 0) {
      countBadge.textContent = chips.length;
      countBadge.classList.remove('hidden');
    } else {
      countBadge.classList.add('hidden');
    }
  }

  if (chips.length === 0) {
    chipsBar.classList.add('hidden');
    chipsBar.classList.remove('flex');
    return;
  }

  chipsBar.classList.remove('hidden');
  chipsBar.classList.add('flex');

  chipsContainer.innerHTML = chips.map((chip, idx) => `
    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-zinc-200 text-xs font-bold text-zinc-800 shadow-xs">
      ${chip.label}
      <button onclick="removeFilterChip(${idx})" class="text-zinc-400 hover:text-zinc-950 ml-1">
        <i data-lucide="x" class="w-3 h-3"></i>
      </button>
    </span>
  `).join('');

  window._activeChipActions = chips.map(c => c.action);
  initLucideIcons();
}

function removeFilterChip(index) {
  if (window._activeChipActions && window._activeChipActions[index]) {
    window._activeChipActions[index]();
  }
}

// Filter Actions
function filterByCategory(cat) {
  STATE.filters.category = cat;
  
  // Update desktop nav pills
  document.querySelectorAll('.nav-link').forEach(btn => {
    if (btn.dataset.category === cat) {
      btn.classList.add('active', 'text-zinc-950', 'bg-zinc-100');
      btn.classList.remove('text-zinc-600');
    } else {
      btn.classList.remove('active', 'text-zinc-950', 'bg-zinc-100');
      btn.classList.add('text-zinc-600');
    }
  });

  // Update sidebar radio
  const radio = document.querySelector(`input[name="filter-category"][value="${cat}"]`);
  if (radio) radio.checked = true;

  renderProducts();
}

function filterBySale() {
  STATE.filters.saleOnly = true;
  const toggle = document.getElementById('sale-only-toggle');
  if (toggle) toggle.checked = true;
  renderProducts();
}

function handlePriceSliderInput(val) {
  STATE.filters.maxPrice = Number(val);
  const label1 = document.getElementById('price-slider-label');
  const label2 = document.getElementById('mobile-price-slider-label');
  if (label1) label1.textContent = `$${val}`;
  if (label2) label2.textContent = `$${val}`;
  renderProducts();
}

function toggleSizeFilter(size) {
  const index = STATE.filters.sizes.indexOf(size);
  if (index > -1) {
    STATE.filters.sizes.splice(index, 1);
  } else {
    STATE.filters.sizes.push(size);
  }

  document.querySelectorAll(`.size-filter-btn[data-size="${size}"]`).forEach(btn => {
    btn.classList.toggle('active');
  });

  renderProducts();
}

function toggleFitFilter(fit) {
  const index = STATE.filters.fits.indexOf(fit);
  if (index > -1) {
    STATE.filters.fits.splice(index, 1);
  } else {
    STATE.filters.fits.push(fit);
  }

  document.querySelectorAll(`.fit-filter-btn[data-fit="${fit}"]`).forEach(btn => {
    btn.classList.toggle('border-zinc-950');
    btn.classList.toggle('bg-zinc-950');
    btn.classList.toggle('text-white');
  });

  renderProducts();
}

function handleFilterChange() {
  const saleToggle = document.getElementById('sale-only-toggle');
  const inStockToggle = document.getElementById('instock-only-toggle');
  const categoryRadio = document.querySelector('input[name="filter-category"]:checked');

  if (saleToggle) STATE.filters.saleOnly = saleToggle.checked;
  if (inStockToggle) STATE.filters.inStockOnly = inStockToggle.checked;
  if (categoryRadio) STATE.filters.category = categoryRadio.value;

  renderProducts();
}

function setMobileCategory(cat) {
  STATE.filters.category = cat;
  document.querySelectorAll('.mobile-cat-btn').forEach(btn => {
    if (btn.dataset.val === cat) {
      btn.classList.add('border-zinc-950', 'bg-zinc-950', 'text-white');
    } else {
      btn.classList.remove('border-zinc-950', 'bg-zinc-950', 'text-white');
    }
  });
  renderProducts();
}

function resetAllFilters() {
  STATE.filters = {
    category: 'all',
    maxPrice: 100,
    sizes: [],
    fits: [],
    saleOnly: false,
    inStockOnly: false,
    searchQuery: ''
  };

  const slider = document.getElementById('price-range-slider');
  if (slider) slider.value = 100;
  const sliderLabel = document.getElementById('price-slider-label');
  if (sliderLabel) sliderLabel.textContent = '$100';

  const catRadio = document.querySelector('input[name="filter-category"][value="all"]');
  if (catRadio) catRadio.checked = true;

  const saleToggle = document.getElementById('sale-only-toggle');
  if (saleToggle) saleToggle.checked = false;

  const inStockToggle = document.getElementById('instock-only-toggle');
  if (inStockToggle) inStockToggle.checked = false;

  document.querySelectorAll('.size-filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.fit-filter-btn').forEach(b => {
    b.classList.remove('border-zinc-950', 'bg-zinc-950', 'text-white');
  });

  document.querySelectorAll('.nav-link').forEach(btn => {
    if (btn.dataset.category === 'all') {
      btn.classList.add('active', 'text-zinc-950', 'bg-zinc-100');
    } else {
      btn.classList.remove('active', 'text-zinc-950', 'bg-zinc-100');
    }
  });

  renderProducts();
  showToast('All filters have been reset', 'info');
}

function scrollToCatalog() {
  const section = document.getElementById('catalog-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// =====================================================
// PRODUCT DETAIL MODAL (PDP - WHITE LUXURY)
// =====================================================

function openProductDetailModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  STATE.currentPDPProduct = product;
  STATE.selectedPDPSize = product.sizes[0];
  STATE.selectedPDPColor = product.colors[0]?.name || 'Standard';

  const container = document.getElementById('pdp-content-container');
  const modal = document.getElementById('pdp-modal');

  container.innerHTML = `
    <!-- Gallery Left Column -->
    <div class="space-y-4">
      <!-- Main Featured Image -->
      <div class="relative aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200 group">
        <img 
          id="pdp-main-image" 
          src="${product.images[0]}" 
          alt="${product.name}" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        >
        ${product.badge ? `
          <span class="absolute top-4 left-4 px-3 py-1 bg-zinc-950 text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-sm">
            ${product.badge}
          </span>
        ` : ''}
      </div>

      <!-- Thumbnail Switcher -->
      <div class="flex gap-3 overflow-x-auto pb-2">
        ${product.images.map((img, idx) => `
          <button 
            onclick="switchPDPMainImage('${img}', this)" 
            class="pdp-thumb-btn w-20 h-24 rounded-2xl overflow-hidden border-2 ${idx === 0 ? 'border-zinc-950 ring-2 ring-zinc-950/20' : 'border-zinc-200'} flex-shrink-0 transition bg-zinc-100"
          >
            <img src="${img}" alt="Thumbnail ${idx + 1}" class="w-full h-full object-cover">
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Product Info Right Column -->
    <div class="flex flex-col justify-between space-y-6">
      <div class="space-y-4">
        
        <!-- Breadcrumb & Stock Status -->
        <div class="flex items-center justify-between text-xs">
          <span class="text-zinc-500 uppercase tracking-wider font-bold capitalize">
            Karthi Atelier / ${product.category}
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${
            product.stockStatus === 'only_2_left' 
              ? 'bg-amber-50 text-amber-700 border border-amber-200' 
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          } font-bold text-[11px]">
            <span class="w-1.5 h-1.5 rounded-full ${product.stockStatus === 'only_2_left' ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse"></span>
            ${product.stockStatus === 'only_2_left' ? 'Only 2 Left in Stock!' : 'In Stock & Ready to Ship'}
          </span>
        </div>

        <!-- Title -->
        <h2 class="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight leading-tight">
          ${product.name}
        </h2>

        <!-- Rating & Reviews -->
        <div class="flex items-center gap-2 text-xs">
          <div class="flex text-amber-500">
            ${Array(5).fill(0).map(() => `<i data-lucide="star" class="w-4 h-4 fill-amber-500"></i>`).join('')}
          </div>
          <span class="font-bold text-zinc-950">${product.rating} / 5.0</span>
          <span class="text-zinc-400 font-medium">(${product.reviewsCount} verified reviews)</span>
        </div>

        <!-- Price Display -->
        <div class="flex items-baseline gap-3 pt-2">
          <span class="text-3xl font-black text-zinc-950 font-mono">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `
            <span class="text-lg text-zinc-400 line-through font-mono">${formatPrice(product.originalPrice)}</span>
            <span class="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">Save ${product.discount}%</span>
          ` : ''}
        </div>

        <!-- Description -->
        <p class="text-xs sm:text-sm text-zinc-600 leading-relaxed pt-1">
          ${product.description}
        </p>

        <!-- Color Selector -->
        <div class="space-y-2 pt-2 border-t border-zinc-100">
          <div class="flex justify-between items-center text-xs">
            <span class="text-zinc-500 font-medium">Selected Color: <strong id="pdp-selected-color-name" class="text-zinc-950 font-bold">${product.colors[0]?.name}</strong></span>
          </div>
          <div class="flex items-center gap-3">
            ${product.colors.map((c, idx) => `
              <button 
                onclick="selectPDPColor('${c.name}', this)" 
                class="color-swatch w-8 h-8 rounded-full border border-zinc-300 transition ${idx === 0 ? 'active' : ''}" 
                style="background-color: ${c.hex};" 
                title="${c.name}"
              ></button>
            `).join('')}
          </div>
        </div>

        <!-- Size Selector & Interactive Guide Trigger -->
        <div class="space-y-2 pt-2 border-t border-zinc-100">
          <div class="flex justify-between items-center text-xs">
            <span class="text-zinc-500 font-medium">Select Size:</span>
            <button onclick="openSizeGuideModal('${product.id}')" class="text-red-600 hover:text-red-700 font-bold flex items-center gap-1 transition">
              <i data-lucide="ruler" class="w-3.5 h-3.5"></i> Interactive Size Guide
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            ${product.sizes.map((s, idx) => `
              <button 
                onclick="selectPDPSize('${s}', this)" 
                class="size-btn px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-100 text-xs font-bold text-zinc-900 hover:border-zinc-400 transition ${idx === 0 ? 'active' : ''}"
              >
                ${s}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Quantity Stepper -->
        <div class="flex items-center gap-4 pt-2 border-t border-zinc-100">
          <span class="text-xs text-zinc-500 font-medium">Quantity:</span>
          <div class="flex items-center border border-zinc-200 rounded-xl bg-zinc-100">
            <button onclick="adjustPDPQty(-1)" class="p-2.5 text-zinc-500 hover:text-zinc-950 transition">
              <i data-lucide="minus" class="w-3.5 h-3.5"></i>
            </button>
            <span id="pdp-qty-display" class="px-4 text-xs font-bold font-mono text-zinc-950">1</span>
            <button onclick="adjustPDPQty(1)" class="p-2.5 text-zinc-500 hover:text-zinc-950 transition">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

      </div>

      <!-- Action Buttons -->
      <div class="pt-4 space-y-3">
        <button 
          id="pdp-add-to-cart-btn"
          onclick="handlePDPAddToCart()" 
          class="w-full py-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2"
        >
          <i data-lucide="shopping-bag" class="w-4 h-4"></i>
          <span>Add to Shopping Bag</span>
        </button>

        <button 
          onclick="handlePDPBuyNow()"
          class="w-full py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider border border-zinc-300 transition"
        >
          Instant Checkout
        </button>
      </div>

    </div>
  `;

  modal.classList.add('active');
  initLucideIcons();
}

function closePDPModal() {
  const modal = document.getElementById('pdp-modal');
  if (modal) modal.classList.remove('active');
}

function switchPDPMainImage(src, btnEl) {
  const mainImg = document.getElementById('pdp-main-image');
  if (mainImg) mainImg.src = src;

  document.querySelectorAll('.pdp-thumb-btn').forEach(b => {
    b.classList.remove('border-zinc-950', 'ring-2', 'ring-zinc-950/20');
    b.classList.add('border-zinc-200');
  });

  btnEl.classList.remove('border-zinc-200');
  btnEl.classList.add('border-zinc-950', 'ring-2', 'ring-zinc-950/20');
}

function selectPDPColor(colorName, btnEl) {
  STATE.selectedPDPColor = colorName;
  const label = document.getElementById('pdp-selected-color-name');
  if (label) label.textContent = colorName;

  document.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
}

function selectPDPSize(size, btnEl) {
  STATE.selectedPDPSize = size;
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
}

let pdpQty = 1;
function adjustPDPQty(delta) {
  pdpQty = Math.max(1, Math.min(10, pdpQty + delta));
  const el = document.getElementById('pdp-qty-display');
  if (el) el.textContent = pdpQty;
}

function handlePDPAddToCart() {
  if (!STATE.currentPDPProduct || !STATE.selectedPDPSize) return;

  const btn = document.getElementById('pdp-add-to-cart-btn');
  if (btn) {
    btn.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i> Added to Bag!`;
    setTimeout(() => {
      btn.innerHTML = `<i data-lucide="shopping-bag" class="w-4 h-4"></i> <span>Add to Shopping Bag</span>`;
      initLucideIcons();
    }, 1200);
  }

  addToCart(STATE.currentPDPProduct.id, STATE.selectedPDPSize, STATE.selectedPDPColor, pdpQty);
  pdpQty = 1;
  initLucideIcons();
}

function handlePDPBuyNow() {
  handlePDPAddToCart();
  closePDPModal();
  openCheckoutModal();
}

// =====================================================
// INTERACTIVE SIZE GUIDE & MEASUREMENT CHART
// =====================================================

function openSizeGuideModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const modal = document.getElementById('size-guide-modal');
  renderSizeGuideTable(product);
  modal.classList.add('active');
  initLucideIcons();
}

function closeSizeGuideModal() {
  const modal = document.getElementById('size-guide-modal');
  if (modal) modal.classList.remove('active');
}

function switchSizeGuideUnit(unit) {
  STATE.sizeGuideUnit = unit;
  const inchesBtn = document.getElementById('unit-inches-btn');
  const cmBtn = document.getElementById('unit-cm-btn');

  if (unit === 'inches') {
    inchesBtn.classList.add('bg-white', 'text-zinc-950', 'shadow');
    inchesBtn.classList.remove('text-zinc-500');
    cmBtn.classList.remove('bg-white', 'text-zinc-950', 'shadow');
    cmBtn.classList.add('text-zinc-500');
  } else {
    cmBtn.classList.add('bg-white', 'text-zinc-950', 'shadow');
    cmBtn.classList.remove('text-zinc-500');
    inchesBtn.classList.remove('bg-white', 'text-zinc-950', 'shadow');
    inchesBtn.classList.add('text-zinc-500');
  }

  const currentProduct = STATE.currentPDPProduct || PRODUCTS[0];
  renderSizeGuideTable(currentProduct);
}

function renderSizeGuideTable(product) {
  const container = document.getElementById('size-guide-table-container');
  const unit = STATE.sizeGuideUnit;
  const measurements = product.measurements?.[unit];

  if (!measurements) return;

  const isPants = product.category === 'pants';
  const sizeKeys = Object.keys(measurements);

  if (isPants) {
    container.innerHTML = `
      <table class="size-table w-full text-left">
        <thead>
          <tr>
            <th>Waist Size</th>
            <th>Waist (${unit})</th>
            <th>Hip (${unit})</th>
            <th>Rise (${unit})</th>
            <th>Inseam (${unit})</th>
            <th>Leg Opening (${unit})</th>
          </tr>
        </thead>
        <tbody>
          ${sizeKeys.map(size => {
            const data = measurements[size];
            return `
              <tr>
                <td class="font-bold font-mono text-zinc-950">${size}</td>
                <td class="font-mono text-zinc-700">${data.waist}</td>
                <td class="font-mono text-zinc-700">${data.hip}</td>
                <td class="font-mono text-zinc-700">${data.rise}</td>
                <td class="font-mono text-zinc-700">${data.inseam}</td>
                <td class="font-mono text-zinc-700">${data.legOpening}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  } else {
    container.innerHTML = `
      <table class="size-table w-full text-left">
        <thead>
          <tr>
            <th>Alpha Size</th>
            <th>Chest (${unit})</th>
            <th>Length (${unit})</th>
            <th>Shoulder (${unit})</th>
            <th>Sleeve (${unit})</th>
          </tr>
        </thead>
        <tbody>
          ${sizeKeys.map(size => {
            const data = measurements[size];
            return `
              <tr>
                <td class="font-bold font-mono text-zinc-950">${size}</td>
                <td class="font-mono text-zinc-700">${data.chest}</td>
                <td class="font-mono text-zinc-700">${data.length}</td>
                <td class="font-mono text-zinc-700">${data.shoulder}</td>
                <td class="font-mono text-zinc-700">${data.sleeve}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;
  }
}

// =====================================================
// SHOPPING CART SYSTEM & STATE
// =====================================================

function addToCart(productId, size, color, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = STATE.cart.findIndex(
    item => item.productId === productId && item.size === size && item.color === color
  );

  if (existingIndex > -1) {
    STATE.cart[existingIndex].quantity += quantity;
  } else {
    STATE.cart.push({
      id: `${productId}-${size}-${color}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      size: size,
      color: color,
      image: product.images[0],
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added ${quantity}x "${product.name}" (${size}) to your bag!`, 'success');
}

function updateCartItemQty(cartItemId, delta) {
  const item = STATE.cart.find(i => i.id === cartItemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(cartItemId);
    return;
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(cartItemId) {
  STATE.cart = STATE.cart.filter(i => i.id !== cartItemId);
  saveCart();
  updateCartUI();
  showToast('Item removed from shopping bag', 'info');
}

function saveCart() {
  localStorage.setItem('karthi_cart', JSON.stringify(STATE.cart));
}

function updateCartUI() {
  const totalItems = STATE.cart.reduce((sum, i) => sum + i.quantity, 0);
  const rawSubtotal = STATE.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  // Update Header Badges
  const cartBadge = document.getElementById('cart-badge');
  const cartHeaderTotal = document.getElementById('header-cart-total');
  const cartDrawerCount = document.getElementById('cart-drawer-count');

  if (cartBadge) cartBadge.textContent = totalItems;
  if (cartHeaderTotal) cartHeaderTotal.textContent = formatPrice(rawSubtotal);
  if (cartDrawerCount) cartDrawerCount.textContent = `${totalItems} items`;

  // Free Shipping Threshold ($100)
  const freeShipThreshold = 100;
  const freeShipBar = document.getElementById('free-shipping-bar');
  const freeShipMsg = document.getElementById('free-shipping-msg');
  const freeShipPercent = document.getElementById('free-shipping-percent');

  if (rawSubtotal >= freeShipThreshold || (STATE.appliedCoupon && STATE.appliedCoupon.freeShipping)) {
    if (freeShipBar) freeShipBar.style.width = '100%';
    if (freeShipMsg) freeShipMsg.innerHTML = '<span class="text-emerald-700 font-bold">✓ Free Express Shipping Unlocked!</span>';
    if (freeShipPercent) freeShipPercent.textContent = '100%';
  } else {
    const diff = freeShipThreshold - rawSubtotal;
    const pct = Math.min(100, Math.round((rawSubtotal / freeShipThreshold) * 100));
    if (freeShipBar) freeShipBar.style.width = `${pct}%`;
    if (freeShipMsg) freeShipMsg.textContent = `Add ${formatPrice(diff)} for Free Express Shipping`;
    if (freeShipPercent) freeShipPercent.textContent = `${pct}%`;
  }

  // Render Cart Item List
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (STATE.cart.length === 0) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center text-center h-full py-16 text-zinc-400">
        <i data-lucide="shopping-bag" class="w-12 h-12 mb-3 stroke-1 text-zinc-300"></i>
        <h4 class="text-base font-bold text-zinc-950 mb-1">Your bag is currently empty</h4>
        <p class="text-xs text-zinc-500 max-w-xs mb-6 font-medium">Discover our newest shirts, heavyweight tees, and pleated trousers.</p>
        <button onclick="closeCartDrawer(); scrollToCatalog();" class="px-6 py-2.5 bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition shadow">
          Explore Collection
        </button>
      </div>
    `;
  } else {
    container.innerHTML = STATE.cart.map(item => `
      <div class="flex items-center gap-4 bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover rounded-xl bg-zinc-100 flex-shrink-0">
        
        <div class="flex-1 min-w-0 space-y-1">
          <h4 class="text-xs font-bold text-zinc-950 truncate">${item.name}</h4>
          <div class="text-[11px] text-zinc-500 font-medium flex gap-2">
            <span>Size: <strong class="text-zinc-800">${item.size}</strong></span>
            <span>•</span>
            <span class="truncate">${item.color}</span>
          </div>
          <div class="font-bold text-zinc-950 text-xs font-mono">${formatPrice(item.price)}</div>
        </div>

        <div class="flex flex-col items-end gap-2">
          <button onclick="removeFromCart('${item.id}')" class="text-zinc-400 hover:text-red-600 p-1">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
          
          <div class="flex items-center border border-zinc-300 rounded-lg bg-white">
            <button onclick="updateCartItemQty('${item.id}', -1)" class="p-1 text-zinc-500 hover:text-zinc-950">
              <i data-lucide="minus" class="w-3 h-3"></i>
            </button>
            <span class="px-2 text-xs font-bold font-mono text-zinc-950">${item.quantity}</span>
            <button onclick="updateCartItemQty('${item.id}', 1)" class="p-1 text-zinc-500 hover:text-zinc-950">
              <i data-lucide="plus" class="w-3 h-3"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Calculate Order Totals
  let discountAmount = 0;
  if (STATE.appliedCoupon && STATE.appliedCoupon.discount) {
    discountAmount = rawSubtotal * STATE.appliedCoupon.discount;
  }

  const shippingCost = (rawSubtotal >= freeShipThreshold || (STATE.appliedCoupon && STATE.appliedCoupon.freeShipping) || rawSubtotal === 0) ? 0 : 15;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + (rawSubtotal > 0 ? shippingCost : 0));

  const subtotalEl = document.getElementById('cart-subtotal');
  const discountRowEl = document.getElementById('cart-discount-row');
  const discountValEl = document.getElementById('cart-discount-val');
  const shippingEl = document.getElementById('cart-shipping');
  const totalEl = document.getElementById('cart-total');
  const checkoutTotalAmount = document.getElementById('checkout-total-amount');

  if (subtotalEl) subtotalEl.textContent = formatPrice(rawSubtotal);
  
  if (discountAmount > 0 && discountRowEl && discountValEl) {
    discountRowEl.classList.remove('hidden');
    discountValEl.textContent = `-${formatPrice(discountAmount)}`;
  } else if (discountRowEl) {
    discountRowEl.classList.add('hidden');
  }

  if (shippingEl) {
    shippingEl.textContent = shippingCost === 0 ? (rawSubtotal > 0 ? 'FREE' : '$0.00') : formatPrice(shippingCost);
  }

  if (totalEl) totalEl.textContent = formatPrice(finalTotal);
  if (checkoutTotalAmount) checkoutTotalAmount.textContent = formatPrice(finalTotal);

  initLucideIcons();
}

function openCartDrawer() {
  document.getElementById('cart-drawer')?.classList.add('active');
  updateCartUI();
}

function closeCartDrawer() {
  document.getElementById('cart-drawer')?.classList.remove('active');
}

// Coupon / Promo Code Engine
function applyPromoCode() {
  const input = document.getElementById('promo-code-input');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  const coupon = COUPONS[code];

  if (!coupon) {
    showToast(`Coupon "${code}" is invalid or expired. Try "KARTHI20"`, 'error');
    return;
  }

  STATE.appliedCoupon = { code, ...coupon };
  localStorage.setItem('karthi_coupon', JSON.stringify(STATE.appliedCoupon));

  const pill = document.getElementById('applied-coupon-pill');
  const label = document.getElementById('coupon-label');
  if (pill && label) {
    pill.classList.remove('hidden');
    label.textContent = `${coupon.label} (${code})`;
  }

  updateCartUI();
  showToast(`Promo code "${code}" applied successfully!`, 'success');
  input.value = '';
}

function removePromoCode() {
  STATE.appliedCoupon = null;
  localStorage.removeItem('karthi_coupon');

  const pill = document.getElementById('applied-coupon-pill');
  if (pill) pill.classList.add('hidden');

  updateCartUI();
  showToast('Promo code removed', 'info');
}

// =====================================================
// WISHLIST SYSTEM
// =====================================================

function toggleWishlist(productId) {
  const index = STATE.wishlist.indexOf(productId);
  const product = PRODUCTS.find(p => p.id === productId);

  if (index > -1) {
    STATE.wishlist.splice(index, 1);
    showToast(`Removed "${product?.name}" from wishlist`, 'info');
  } else {
    STATE.wishlist.push(productId);
    showToast(`Saved "${product?.name}" to your wishlist!`, 'success');
  }

  localStorage.setItem('karthi_wishlist', JSON.stringify(STATE.wishlist));
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlist-badge');
  const countEl = document.getElementById('wishlist-drawer-count');
  const count = STATE.wishlist.length;

  if (badge) {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove('scale-0');
      badge.classList.add('scale-100');
    } else {
      badge.classList.remove('scale-100');
      badge.classList.add('scale-0');
    }
  }

  if (countEl) countEl.textContent = `${count} items`;

  const container = document.getElementById('wishlist-items-container');
  if (!container) return;

  if (count === 0) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center text-center h-full py-16 text-zinc-400">
        <i data-lucide="heart" class="w-12 h-12 mb-3 stroke-1 text-zinc-300"></i>
        <h4 class="text-base font-bold text-zinc-950 mb-1">Your wishlist is empty</h4>
        <p class="text-xs text-zinc-500 max-w-xs font-medium">Click the heart icon on any product card to save pieces for later.</p>
      </div>
    `;
  } else {
    const savedProducts = PRODUCTS.filter(p => STATE.wishlist.includes(p.id));
    container.innerHTML = savedProducts.map(p => `
      <div class="flex items-center gap-4 bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200">
        <img src="${p.images[0]}" alt="${p.name}" class="w-16 h-20 object-cover rounded-xl bg-zinc-100 flex-shrink-0 cursor-pointer" onclick="openProductDetailModal('${p.id}')">
        
        <div class="flex-1 min-w-0 space-y-1">
          <h4 class="text-xs font-bold text-zinc-950 truncate cursor-pointer hover:text-red-600" onclick="openProductDetailModal('${p.id}')">${p.name}</h4>
          <span class="text-[11px] text-zinc-500 font-medium block">${p.fabric}</span>
          <div class="font-bold text-zinc-950 text-xs font-mono">${formatPrice(p.price)}</div>
        </div>

        <div class="flex flex-col items-end gap-2">
          <button onclick="toggleWishlist('${p.id}')" class="text-zinc-400 hover:text-red-600 p-1">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
          
          <button onclick="addToCart('${p.id}', '${p.sizes[0]}', '${p.colors[0]?.name}'); toggleWishlist('${p.id}');" class="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-[11px] font-bold transition shadow-xs">
            Move to Bag
          </button>
        </div>
      </div>
    `).join('');
  }

  initLucideIcons();
}

function openWishlistDrawer() {
  document.getElementById('wishlist-drawer')?.classList.add('active');
  updateWishlistUI();
}

function closeWishlistDrawer() {
  document.getElementById('wishlist-drawer')?.classList.remove('active');
}

function addAllWishlistToCart() {
  if (STATE.wishlist.length === 0) return;

  STATE.wishlist.forEach(id => {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (p) {
      addToCart(p.id, p.sizes[0], p.colors[0]?.name || 'Standard', 1);
    }
  });

  STATE.wishlist = [];
  localStorage.setItem('karthi_wishlist', JSON.stringify([]));
  updateWishlistUI();
  closeWishlistDrawer();
  openCartDrawer();
  showToast('All wishlist items moved to your shopping bag!', 'success');
}

// =====================================================
// CHECKOUT & PAYMENT MODAL
// =====================================================

function openCheckoutModal() {
  if (STATE.cart.length === 0) {
    showToast('Your bag is empty. Add items before checking out.', 'error');
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById('checkout-modal');
  modal.classList.add('active');
  initLucideIcons();
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal')?.classList.remove('active');
}

function switchPaymentView(method) {
  const cardView = document.getElementById('payment-card-view');
  const upiView = document.getElementById('payment-upi-view');
  const codView = document.getElementById('payment-cod-view');

  cardView?.classList.add('hidden');
  upiView?.classList.add('hidden');
  codView?.classList.add('hidden');

  if (method === 'card') cardView?.classList.remove('hidden');
  if (method === 'upi') upiView?.classList.remove('hidden');
  if (method === 'cod') codView?.classList.remove('hidden');

  document.querySelectorAll('.payment-method-card').forEach(c => {
    const radio = c.querySelector('input[name="payment-method"]');
    if (radio && radio.value === method) {
      c.classList.add('border-zinc-950', 'border-2');
      c.classList.remove('border-zinc-200');
    } else {
      c.classList.remove('border-zinc-950', 'border-2');
      c.classList.add('border-zinc-200');
    }
  });

  initLucideIcons();
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('submit-order-btn');
  if (submitBtn) {
    submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Authorizing Payment...`;
  }

  setTimeout(() => {
    closeCheckoutModal();
    const orderId = `#KAR-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Clear Cart
    STATE.cart = [];
    saveCart();
    updateCartUI();

    // Show Order Success
    const successModal = document.getElementById('order-success-modal');
    const orderIdEl = document.getElementById('success-order-id');
    if (orderIdEl) orderIdEl.textContent = orderId;
    if (successModal) successModal.classList.add('active');

    spawnConfetti();
    initLucideIcons();
  }, 1200);
}

function closeOrderSuccessModal() {
  document.getElementById('order-success-modal')?.classList.remove('active');
}

// Confetti Particle Generator
function spawnConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  container.innerHTML = '';
  const colors = ['#DC2626', '#09090B', '#991B1B', '#F59E0B', '#3B82F6'];

  for (let i = 0; i < 45; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;
    container.appendChild(piece);
  }
}

// =====================================================
// MOBILE DRAWER CONTROLS
// =====================================================

function openMobileNav() {
  document.getElementById('mobile-menu-drawer')?.classList.add('active');
}

function closeMobileNav() {
  document.getElementById('mobile-menu-drawer')?.classList.remove('active');
}

function openMobileFilterDrawer() {
  document.getElementById('mobile-filter-drawer')?.classList.add('active');
}

function closeMobileFilterDrawer() {
  document.getElementById('mobile-filter-drawer')?.classList.remove('active');
}

// =====================================================
// TOAST NOTIFICATIONS SYSTEM (WHITE LUXURY)
// =====================================================

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item pointer-events-auto flex items-center gap-3 p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xl text-xs font-bold text-zinc-900';

  if (type === 'success') {
    toast.classList.add('border-emerald-300', 'text-emerald-950');
    toast.innerHTML = `<i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i> <span>${message}</span>`;
  } else if (type === 'error') {
    toast.classList.add('border-red-300', 'text-red-950');
    toast.innerHTML = `<i data-lucide="alert-circle" class="w-4 h-4 text-red-600"></i> <span>${message}</span>`;
  } else {
    toast.classList.add('border-zinc-300', 'text-zinc-900');
    toast.innerHTML = `<i data-lucide="info" class="w-4 h-4 text-zinc-600"></i> <span>${message}</span>`;
  }

  container.appendChild(toast);
  initLucideIcons();

  setTimeout(() => toast.classList.add('show'), 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Newsletter Subscription
function handleNewsletterSubmit(e) {
  e.preventDefault();
  showToast('Welcome to the Karthi Atelier Club! Check your inbox for private drop access.', 'success');
  e.target.reset();
}
