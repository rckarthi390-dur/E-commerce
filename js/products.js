// ==========================================
// KARTHI APPAREL - PRODUCT CATALOG DATABASE
// All Prices in Indian Rupee (INR - ₹)
// Calibrated for Budget Range: ₹100 - ₹1,500
// ==========================================

const DEFAULT_PRODUCTS = [
  // ----------------------------------------
  // SHIRTS (₹749 - ₹999)
  // ----------------------------------------
  {
    id: "shirt-01",
    name: "Architect Poplin Classic Shirt",
    category: "shirts",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    rating: 4.9,
    reviewsCount: 142,
    badge: "BESTSELLER",
    isSale: true,
    isNew: false,
    fabric: "100% Egyptian Cotton",
    fit: "Regular",
    stock: 14,
    stockStatus: "in_stock",
    colors: [
      { name: "Crisp White", hex: "#FFFFFF", border: "#D1D5DB" },
      { name: "Slate Blue", hex: "#334155" },
      { name: "Onyx Black", hex: "#18181B" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "assets/images/category-shirts.jpg",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Constructed from 120-thread-count Egyptian Giza cotton, the Architect Poplin Shirt delivers an impeccably crisp drape with a modern tailored cut. Features mother-of-pearl buttons, a reinforced French placket, and curved hem suitable for tucking or casual untucked styling.",
    features: [
      "120s 2-ply Egyptian long-staple cotton",
      "Semi-spread collar with removable stays",
      "Single-needle tailoring with 22 stitches per inch",
      "Pre-washed for zero shrinkage and ultra-soft hand feel"
    ],
    careInstructions: "Machine wash cold on gentle cycle. Hang dry or tumble dry low. Warm iron while slightly damp.",
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
  },
  {
    id: "shirt-02",
    name: "Riviera Linen Cuban Collar Shirt",
    category: "shirts",
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.8,
    reviewsCount: 98,
    badge: "SALE",
    isSale: true,
    isNew: false,
    fabric: "100% French Flax Linen",
    fit: "Relaxed",
    stock: 2,
    stockStatus: "only_2_left",
    colors: [
      { name: "Oatmeal Sand", hex: "#D6C7B2" },
      { name: "Olive Sage", hex: "#556B2F" },
      { name: "Midnight Navy", hex: "#1E293B" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
      "assets/images/category-shirts.jpg"
    ],
    description: "Breezy and effortlessly refined, our Riviera Cuban Collar shirt is woven from pure Normandy flax linen. Features an open camp collar, straight boxy hem with side vents, and an airy weave that breathes in high summer humidity.",
    features: [
      "100% Normandy flax certified organic linen",
      "Camp / Cuban open collar construction",
      "Natural shell buttons with cross-stitching",
      "Naturally anti-microbial and moisture-wicking"
    ],
    careInstructions: "Hand wash or gentle machine wash in cold water. Reshape and air dry flat. Embrace natural linen crinkles.",
    measurements: {
      inches: {
        S: { chest: "40", length: "27.5", shoulder: "18", sleeve: "9.5" },
        M: { chest: "43", length: "28", shoulder: "18.75", sleeve: "10" },
        L: { chest: "46", length: "28.5", shoulder: "19.5", sleeve: "10.5" },
        XL: { chest: "49", length: "29", shoulder: "20.25", sleeve: "11" }
      },
      cm: {
        S: { chest: "101.6", length: "70", shoulder: "45.7", sleeve: "24" },
        M: { chest: "109.2", length: "71", shoulder: "47.6", sleeve: "25.4" },
        L: { chest: "116.8", length: "72.4", shoulder: "49.5", sleeve: "26.7" },
        XL: { chest: "124.5", length: "73.6", shoulder: "51.4", sleeve: "28" }
      }
    }
  },
  {
    id: "shirt-03",
    name: "Kuro Structured Minimal Overshirt",
    category: "shirts",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.9,
    reviewsCount: 76,
    badge: "NEW ARRIVAL",
    isSale: false,
    isNew: true,
    fabric: "Heavy Cotton Twill (320 GSM)",
    fit: "Oversized",
    stock: 9,
    stockStatus: "in_stock",
    colors: [
      { name: "Washed Charcoal", hex: "#27272A" },
      { name: "Khaki Moss", hex: "#4B5320" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The Kuro Overshirt bridges the gap between structured shirting and outerwear. Cut in a heavyweight Japanese cotton twill with dual chest drop pockets, concealed snap closures, and a boxy silhouette ideal for layering.",
    features: [
      "320 GSM heavy brushed cotton twill",
      "Dual oversized flap chest pockets with hidden gussets",
      "Matte black snap-button hardware",
      "Reinforced yoke and elbow seams"
    ],
    careInstructions: "Machine wash inside out in cold water. Hang dry only to maintain structure.",
    measurements: {
      inches: {
        S: { chest: "44", length: "29", shoulder: "19.5", sleeve: "34" },
        M: { chest: "47", length: "29.5", shoulder: "20.25", sleeve: "35" },
        L: { chest: "50", length: "30", shoulder: "21", sleeve: "36" },
        XL: { chest: "53", length: "30.5", shoulder: "21.75", sleeve: "37" },
        XXL: { chest: "56", length: "31", shoulder: "22.5", sleeve: "37.5" }
      },
      cm: {
        S: { chest: "111.8", length: "73.6", shoulder: "49.5", sleeve: "86.4" },
        M: { chest: "119.4", length: "75", shoulder: "51.4", sleeve: "88.9" },
        L: { chest: "127", length: "76.2", shoulder: "53.3", sleeve: "91.4" },
        XL: { chest: "134.6", length: "77.5", shoulder: "55.2", sleeve: "94" },
        XXL: { chest: "142.2", length: "78.7", shoulder: "57.1", sleeve: "95.2" }
      }
    }
  },
  {
    id: "shirt-04",
    name: "Milano Tailored Slim Oxford",
    category: "shirts",
    price: 749,
    originalPrice: 1099,
    discount: 31,
    rating: 4.7,
    reviewsCount: 115,
    badge: "SALE",
    isSale: true,
    isNew: false,
    fabric: "Royal Oxford Cotton Blend",
    fit: "Slim",
    stock: 5,
    stockStatus: "in_stock",
    colors: [
      { name: "Pure White", hex: "#FAFAFA", border: "#E4E4E7" },
      { name: "Pale Pink", hex: "#FCE7F3" },
      { name: "Sky Chambray", hex: "#93C5FD" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "assets/images/category-shirts.jpg"
    ],
    description: "A precision-cut slim silhouette designed with back darts for a clean taper. Woven in a fine basketweave Royal Oxford cotton with a soft button-down collar and durable cross-stitched horn buttons.",
    features: [
      "2-ply 100% combed cotton basketweave",
      "Tapered athletic slim cut with side back darts",
      "Hidden button-down collar stay design",
      "Wrinkle-resistant easy care finish"
    ],
    careInstructions: "Machine wash warm. Low tumble dry. Light steam iron.",
    measurements: {
      inches: {
        S: { chest: "37", length: "28.5", shoulder: "17", sleeve: "33" },
        M: { chest: "39.5", length: "29", shoulder: "17.75", sleeve: "34" },
        L: { chest: "42.5", length: "29.5", shoulder: "18.5", sleeve: "35" },
        XL: { chest: "45.5", length: "30", shoulder: "19.25", sleeve: "36" }
      },
      cm: {
        S: { chest: "94", length: "72.4", shoulder: "43.2", sleeve: "83.8" },
        M: { chest: "100.3", length: "73.6", shoulder: "45", sleeve: "86.4" },
        L: { chest: "108", length: "75", shoulder: "47", sleeve: "88.9" },
        XL: { chest: "115.5", length: "76.2", shoulder: "48.9", sleeve: "91.4" }
      }
    }
  },

  // ----------------------------------------
  // T-SHIRTS (₹349 - ₹549)
  // ----------------------------------------
  {
    id: "tee-01",
    name: "Neo-Archive Heavyweight Graphic Tee",
    category: "tshirts",
    price: 499,
    originalPrice: 799,
    discount: 37,
    rating: 5.0,
    reviewsCount: 230,
    badge: "TRENDING",
    isSale: false,
    isNew: true,
    fabric: "280 GSM Heavyweight Terry Cotton",
    fit: "Oversized",
    stock: 18,
    stockStatus: "in_stock",
    colors: [
      { name: "Washed Vintage Black", hex: "#222225" },
      { name: "Crimson Red", hex: "#991B1B" },
      { name: "Chalk Off-White", hex: "#F3F4F6", border: "#D1D5DB" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "assets/images/category-tees.jpg",
      "assets/images/antigravity-feature.jpg",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Engineered for maximum street drape with dropped shoulders and a thick 1.25-inch ribbed collar that never sags. Finished with an intricate high-density micro-screen graphic on back and chest.",
    features: [
      "280 GSM 100% ring-spun combed compact cotton",
      "High-density discharge screen printing",
      "Drop-shoulder silhouette with wide sleeve openings",
      "Vintage enzyme wash for lived-in softness"
    ],
    careInstructions: "Machine wash cold inside out with similar colors. Do not iron directly on graphics. Hang to dry.",
    measurements: {
      inches: {
        S: { chest: "44", length: "28", shoulder: "21", sleeve: "8.75" },
        M: { chest: "47", length: "29", shoulder: "22", sleeve: "9.25" },
        L: { chest: "50", length: "30", shoulder: "23", sleeve: "9.75" },
        XL: { chest: "53", length: "31", shoulder: "24", sleeve: "10.25" },
        XXL: { chest: "56", length: "32", shoulder: "25", sleeve: "10.75" }
      },
      cm: {
        S: { chest: "111.8", length: "71.1", shoulder: "53.3", sleeve: "22.2" },
        M: { chest: "119.4", length: "73.6", shoulder: "55.8", sleeve: "23.5" },
        L: { chest: "127", length: "76.2", shoulder: "58.4", sleeve: "24.7" },
        XL: { chest: "134.6", length: "78.7", shoulder: "61", sleeve: "26" },
        XXL: { chest: "142.2", length: "81.3", shoulder: "63.5", sleeve: "27.3" }
      }
    }
  },
  {
    id: "tee-02",
    name: "Supima Luxe Ribbed Crewneck",
    category: "tshirts",
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4.8,
    reviewsCount: 167,
    badge: "BESTSELLER",
    isSale: true,
    isNew: false,
    fabric: "100% California Supima Cotton",
    fit: "Regular",
    stock: 22,
    stockStatus: "in_stock",
    colors: [
      { name: "Pitch Black", hex: "#09090B" },
      { name: "Optical White", hex: "#FFFFFF", border: "#E4E4E7" },
      { name: "Desert Sand", hex: "#C2B280" },
      { name: "Forest Olive", hex: "#3B4D3C" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The ultimate daily base layer. Crafted from extra-long staple Supima cotton harvested in California, yielding twice the durability and an unmistakably silky, pill-resistant surface.",
    features: [
      "100% Certified American Supima cotton (190 GSM)",
      "Blind-stitched hems for a sleek, elevated finish",
      "Tailored regular drape that flatters the chest and arms",
      "Reactive dyed for rich, fade-proof colors"
    ],
    careInstructions: "Machine wash cold with mild detergent. Tumble dry low or line dry.",
    measurements: {
      inches: {
        S: { chest: "38", length: "27.5", shoulder: "17", sleeve: "8" },
        M: { chest: "41", length: "28.5", shoulder: "18", sleeve: "8.5" },
        L: { chest: "44", length: "29.5", shoulder: "19", sleeve: "9" },
        XL: { chest: "47", length: "30.5", shoulder: "20", sleeve: "9.5" },
        XXL: { chest: "50", length: "31.5", shoulder: "21", sleeve: "10" }
      },
      cm: {
        S: { chest: "96.5", length: "69.8", shoulder: "43.2", sleeve: "20.3" },
        M: { chest: "104", length: "72.4", shoulder: "45.7", sleeve: "21.6" },
        L: { chest: "111.8", length: "75", shoulder: "48.3", sleeve: "22.8" },
        XL: { chest: "119.4", length: "77.5", shoulder: "50.8", sleeve: "24.1" },
        XXL: { chest: "127", length: "80", shoulder: "53.3", sleeve: "25.4" }
      }
    }
  },
  {
    id: "tee-03",
    name: "Antigravity Zero-G Oversized Tee",
    category: "tshirts",
    price: 549,
    originalPrice: 849,
    discount: 35,
    rating: 4.9,
    reviewsCount: 84,
    badge: "EXCLUSIVE",
    isSale: true,
    isNew: true,
    fabric: "300 GSM Heavy French Terry",
    fit: "Oversized",
    stock: 2,
    stockStatus: "only_2_left",
    colors: [
      { name: "Void Black", hex: "#0A0A0A" },
      { name: "Crimson Red", hex: "#DC2626" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "assets/images/antigravity-feature.jpg",
      "assets/images/category-tees.jpg",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Designed around dynamic fabric drift and zero-gravity proportions. Features an architectural box silhouette, exaggerated drop shoulders, and high-impact crimson heat-reactive accents.",
    features: [
      "300 GSM compact loopback French Terry",
      "Seamless side-body tubular construction",
      "Reinforced high-rib neckband",
      "Silicon-washed for weightless tactile glide"
    ],
    careInstructions: "Hand wash cold or dry clean recommended to preserve graphic details.",
    measurements: {
      inches: {
        S: { chest: "45", length: "29", shoulder: "22", sleeve: "9.5" },
        M: { chest: "48", length: "30", shoulder: "23", sleeve: "10" },
        L: { chest: "51", length: "31", shoulder: "24", sleeve: "10.5" },
        XL: { chest: "54", length: "32", shoulder: "25", sleeve: "11" }
      },
      cm: {
        S: { chest: "114.3", length: "73.6", shoulder: "55.8", sleeve: "24.1" },
        M: { chest: "121.9", length: "76.2", shoulder: "58.4", sleeve: "25.4" },
        L: { chest: "129.5", length: "78.7", shoulder: "61", sleeve: "26.7" },
        XL: { chest: "137.1", length: "81.3", shoulder: "63.5", sleeve: "28" }
      }
    }
  },
  {
    id: "tee-04",
    name: "Raw Hem Waffle Knit Tee",
    category: "tshirts",
    price: 349,
    originalPrice: 499,
    discount: 30,
    rating: 4.6,
    reviewsCount: 52,
    badge: "SALE",
    isSale: true,
    isNew: false,
    fabric: "Thermal Waffle Cotton (240 GSM)",
    fit: "Regular",
    stock: 11,
    stockStatus: "in_stock",
    colors: [
      { name: "Washed Mocha", hex: "#5E4B3C" },
      { name: "Dusty Grey", hex: "#71717A" },
      { name: "Off White", hex: "#F5F5F4", border: "#D6D3D1" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "assets/images/category-tees.jpg"
    ],
    description: "Textured thermal waffle knit with a subtle raw cut hem line. Features raglan sleeves for unrestrained mobility and a relaxed drape that looks great solo or under jackets.",
    features: [
      "Micro-honeycomb thermal weave cotton",
      "Raglan shoulder construction",
      "Laser-finished raw bottom hem with lock-stitch",
      "Pre-washed to resist twisting"
    ],
    careInstructions: "Machine wash cold. Lay flat to dry to maintain knit tension.",
    measurements: {
      inches: {
        S: { chest: "39", length: "27", shoulder: "17.5", sleeve: "8.5" },
        M: { chest: "42", length: "28", shoulder: "18.5", sleeve: "9" },
        L: { chest: "45", length: "29", shoulder: "19.5", sleeve: "9.5" },
        XL: { chest: "48", length: "30", shoulder: "20.5", sleeve: "10" }
      },
      cm: {
        S: { chest: "99", length: "68.5", shoulder: "44.5", sleeve: "21.6" },
        M: { chest: "106.7", length: "71.1", shoulder: "47", sleeve: "22.8" },
        L: { chest: "114.3", length: "73.6", shoulder: "49.5", sleeve: "24.1" },
        XL: { chest: "121.9", length: "76.2", shoulder: "52", sleeve: "25.4" }
      }
    }
  },

  // ----------------------------------------
  // PANTS / TROUSERS (₹849 - ₹1,199)
  // ----------------------------------------
  {
    id: "pants-01",
    name: "Atelier Pleated Wide-Leg Trousers",
    category: "pants",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.9,
    reviewsCount: 189,
    badge: "BESTSELLER",
    isSale: true,
    isNew: false,
    fabric: "Wool-Viscose Flannel Drape Blend",
    fit: "Relaxed Tapered",
    stock: 12,
    stockStatus: "in_stock",
    colors: [
      { name: "Charcoal Melange", hex: "#3F3F46" },
      { name: "Midnight Navy", hex: "#1E293B" },
      { name: "Espresso Brown", hex: "#38281F" }
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    images: [
      "assets/images/category-pants.jpg",
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80",
      "assets/images/hero-campaign.jpg"
    ],
    description: "Masterfully tailored with double front reverse pleats, a high-rise waistline, and an architectural wide-leg that pools cleanly over sneakers or loafers. Internal curtain waistband ensures comfortable all-day hold.",
    features: [
      "Subtle wool-blend with four-way mechanical stretch",
      "Double reverse front pleats for fluid movement",
      "Internal tailored curtain waistband with hook-and-bar closure",
      "Deep slant side pockets and welt rear pockets"
    ],
    careInstructions: "Dry clean only recommended. Spot clean with wool-safe detergent.",
    measurements: {
      inches: {
        28: { waist: "29", hip: "41", rise: "11.5", inseam: "31", legOpening: "18" },
        30: { waist: "31", hip: "43", rise: "12", inseam: "31.5", legOpening: "18.5" },
        32: { waist: "33", hip: "45", rise: "12.5", inseam: "32", legOpening: "19" },
        34: { waist: "35", hip: "47", rise: "13", inseam: "32.5", legOpening: "19.5" },
        36: { waist: "37", hip: "49", rise: "13.5", inseam: "33", legOpening: "20" },
        38: { waist: "39", hip: "51", rise: "14", inseam: "33.5", legOpening: "20.5" }
      },
      cm: {
        28: { waist: "73.6", hip: "104", rise: "29.2", inseam: "78.7", legOpening: "45.7" },
        30: { waist: "78.7", hip: "109.2", rise: "30.5", inseam: "80", legOpening: "47" },
        32: { waist: "83.8", hip: "114.3", rise: "31.7", inseam: "81.3", legOpening: "48.3" },
        34: { waist: "88.9", hip: "119.4", rise: "33", inseam: "82.5", legOpening: "49.5" },
        36: { waist: "94", hip: "124.5", rise: "34.3", inseam: "83.8", legOpening: "50.8" },
        38: { waist: "99", hip: "129.5", rise: "35.5", inseam: "85.1", legOpening: "52" }
      }
    }
  },
  {
    id: "pants-02",
    name: "Tactical Minimalist Cargo Pant",
    category: "pants",
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    rating: 4.8,
    reviewsCount: 140,
    badge: "NEW ARRIVAL",
    isSale: false,
    isNew: true,
    fabric: "High-Density Ripstop Cotton",
    fit: "Regular",
    stock: 16,
    stockStatus: "in_stock",
    colors: [
      { name: "Stealth Black", hex: "#18181B" },
      { name: "Olive Drab", hex: "#475536" },
      { name: "Slate Grey", hex: "#4B5563" }
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80",
      "assets/images/category-pants.jpg",
      "assets/images/hero-campaign.jpg"
    ],
    description: "Engineered utilitarian style without unnecessary bulk. Features streamlined flush cargo pockets with concealed magnetic snaps, articulated knee darting, and an adjustable toggle hem to switch between wide and tapered fit.",
    features: [
      "Durable 260 GSM diamond-ripstop woven cotton",
      "Stealth side cargo pockets with hidden magnetic closure",
      "Articulated knees for ergonomic flexion",
      "Shock-cord cinch hem system"
    ],
    careInstructions: "Machine wash cold. Air dry to preserve water-repellent DWR coating.",
    measurements: {
      inches: {
        28: { waist: "29", hip: "40", rise: "11", inseam: "30.5", legOpening: "16" },
        30: { waist: "31", hip: "42", rise: "11.5", inseam: "31", legOpening: "16.5" },
        32: { waist: "33", hip: "44", rise: "12", inseam: "31.5", legOpening: "17" },
        34: { waist: "35", hip: "46", rise: "12.5", inseam: "32", legOpening: "17.5" },
        36: { waist: "37", hip: "48", rise: "13", inseam: "32.5", legOpening: "18" },
        38: { waist: "39", hip: "50", rise: "13.5", inseam: "33", legOpening: "18.5" }
      },
      cm: {
        28: { waist: "73.6", hip: "101.6", rise: "28", inseam: "77.5", legOpening: "40.6" },
        30: { waist: "78.7", hip: "106.7", rise: "29.2", inseam: "78.7", legOpening: "41.9" },
        32: { waist: "83.8", hip: "111.8", rise: "30.5", inseam: "80", legOpening: "43.2" },
        34: { waist: "88.9", hip: "116.8", rise: "31.7", inseam: "81.3", legOpening: "44.5" },
        36: { waist: "94", hip: "121.9", rise: "33", inseam: "82.5", legOpening: "45.7" },
        38: { waist: "99", hip: "127", rise: "34.3", inseam: "83.8", legOpening: "47" }
      }
    }
  },
  {
    id: "pants-03",
    name: "Sartorial Stretch Chino Trousers",
    category: "pants",
    price: 849,
    originalPrice: 1199,
    discount: 29,
    rating: 4.7,
    reviewsCount: 112,
    badge: "SALE",
    isSale: true,
    isNew: false,
    fabric: "97% Combed Cotton, 3% Elastane",
    fit: "Slim",
    stock: 2,
    stockStatus: "only_2_left",
    colors: [
      { name: "Khaki Sand", hex: "#C8B69B" },
      { name: "Navy Blue", hex: "#1E3A5F" },
      { name: "Olive Green", hex: "#556B2F" }
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
      "assets/images/category-pants.jpg"
    ],
    description: "The quintessential slim chino refined with Italian tailoring sensibilities. Woven with dual-core elastane to maintain crisp shape retention throughout long workdays and travel without bagging at knees.",
    features: [
      "Brushed peach-skin finish stretch twill",
      "Clean flat-front silhouette with horn button closure",
      "Reinforced crotch gusset for flexibility",
      "Non-binding comfort elastic inner waistband tab"
    ],
    careInstructions: "Machine wash warm with like colors. Line dry or tumble dry low.",
    measurements: {
      inches: {
        28: { waist: "29", hip: "38", rise: "10.5", inseam: "31", legOpening: "14" },
        30: { waist: "31", hip: "40", rise: "11", inseam: "31.5", legOpening: "14.5" },
        32: { waist: "33", hip: "42", rise: "11.5", inseam: "32", legOpening: "15" },
        34: { waist: "35", hip: "44", rise: "12", inseam: "32.5", legOpening: "15.5" },
        36: { waist: "37", hip: "46", rise: "12.5", inseam: "33", legOpening: "16" },
        38: { waist: "39", hip: "48", rise: "13", inseam: "33.5", legOpening: "16.5" }
      },
      cm: {
        28: { waist: "73.6", hip: "96.5", rise: "26.7", inseam: "78.7", legOpening: "35.5" },
        30: { waist: "78.7", hip: "101.6", rise: "28", inseam: "80", legOpening: "36.8" },
        32: { waist: "83.8", hip: "106.7", rise: "29.2", inseam: "81.3", legOpening: "38.1" },
        34: { waist: "88.9", hip: "111.8", rise: "30.5", inseam: "82.5", legOpening: "39.4" },
        36: { waist: "94", hip: "116.8", rise: "31.7", inseam: "83.8", legOpening: "40.6" },
        38: { waist: "99", hip: "121.9", rise: "33", inseam: "85.1", legOpening: "41.9" }
      }
    }
  },
  {
    id: "pants-04",
    name: "Verona Drawstring Relaxed Linen Pant",
    category: "pants",
    price: 1099,
    originalPrice: 1599,
    discount: 31,
    rating: 4.8,
    reviewsCount: 65,
    badge: "NEW SEASON",
    isSale: false,
    isNew: true,
    fabric: "100% Normandy Linen",
    fit: "Relaxed Tapered",
    stock: 8,
    stockStatus: "in_stock",
    colors: [
      { name: "Ivory Ecru", hex: "#FDFBF7", border: "#E5E7EB" },
      { name: "Mineral Sage", hex: "#6B7280" },
      { name: "Pure Black", hex: "#111827" }
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    images: [
      "assets/images/category-pants.jpg",
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Relaxed summer trousers with an elasticated waistband and internal braided cotton drawcord. Woven from breathable pure linen that drapes gracefully with an easy tapered leg.",
    features: [
      "Pure French Normandy linen",
      "Elastic waistband with dipped-metal drawcord aglets",
      "Deep mesh-lined pockets for cool breathability",
      "Finished with a 1.5-inch stitched cuff"
    ],
    careInstructions: "Machine wash cold delicate. Reshape while wet and dry in the shade.",
    measurements: {
      inches: {
        28: { waist: "28-30", hip: "41", rise: "11.5", inseam: "29.5", legOpening: "15" },
        30: { waist: "30-32", hip: "43", rise: "12", inseam: "30", legOpening: "15.5" },
        32: { waist: "32-34", hip: "45", rise: "12.5", inseam: "30.5", legOpening: "16" },
        34: { waist: "34-36", hip: "47", rise: "13", inseam: "31", legOpening: "16.5" },
        36: { waist: "36-38", hip: "49", rise: "13.5", inseam: "31.5", legOpening: "17" },
        38: { waist: "38-40", hip: "51", rise: "14", inseam: "32", legOpening: "17.5" }
      },
      cm: {
        28: { waist: "71-76", hip: "104", rise: "29.2", inseam: "75", legOpening: "38.1" },
        30: { waist: "76-81", hip: "109.2", rise: "30.5", inseam: "76.2", legOpening: "39.4" },
        32: { waist: "81-86", hip: "114.3", rise: "31.7", inseam: "77.5", legOpening: "40.6" },
        34: { waist: "86-91", hip: "119.4", rise: "33", inseam: "78.7", legOpening: "41.9" },
        36: { waist: "91-96", hip: "124.5", rise: "34.3", inseam: "80", legOpening: "43.2" },
        38: { waist: "96-101", hip: "129.5", rise: "35.5", inseam: "81.3", legOpening: "44.5" }
      }
    }
  }
];

// Dynamic Products Store (Synchronized with Admin Panel & LocalStorage)
function getActiveProducts() {
  const saved = localStorage.getItem('karthi_products');
  if (saved) {
    try {
      let parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // If stored products contain old pricing (> 1500 or < 100), sync with new INR catalog
        if (parsed.some(p => p.price && (p.price > 1500 || p.price < 100))) {
          localStorage.removeItem('karthi_products');
          localStorage.setItem('karthi_products', JSON.stringify(DEFAULT_PRODUCTS));
          return DEFAULT_PRODUCTS;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Error parsing stored products', e);
    }
  }
  localStorage.setItem('karthi_products', JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}

// Global dynamic products references (Always in sync)
let PRODUCTS = getActiveProducts();
let ACTIVE_PRODUCTS = PRODUCTS;

// Coupon Codes configuration (Dynamic with Admin sync)
function getActiveCoupons() {
  const saved = localStorage.getItem('karthi_coupons');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing coupons', e);
    }
  }
  const defaults = {
    "KARTHI20": { discount: 0.20, label: "20% Karthi Atelier Discount" },
    "WELCOME10": { discount: 0.10, label: "10% Welcome Discount" },
    "GRAVITY20": { discount: 0.20, label: "20% Drop Discount" },
    "FREESHIP": { discount: 0.00, freeShipping: true, label: "Free Express Shipping Across India" }
  };
  localStorage.setItem('karthi_coupons', JSON.stringify(defaults));
  return defaults;
}

const COUPONS = getActiveCoupons();

// Currency configurations (Exclusively Indian Rupee INR - ₹)
const CURRENCIES = {
  INR: { symbol: "₹", rate: 1.00, label: "INR (₹)" }
};
