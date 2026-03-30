const skinForm = document.getElementById("skinForm");
const resultBox = document.getElementById("result");

const concernIngredients = {
  acne: [
    { ingredient: "Salicylic Acid", reason: "Exfoliates and unclogs pores" },
    { ingredient: "Niacinamide", reason: "Reduces oil and inflammation" },
  ],
  pigmentation: [
    { ingredient: "Vitamin C", reason: "Brightens skin and fades dark spots" },
    { ingredient: "Alpha Arbutin", reason: "Reduces melanin production" },
  ],
  aging: [
    { ingredient: "Retinol", reason: "Boosts collagen and smooths wrinkles" },
    { ingredient: "Peptides", reason: "Firms and plumps skin" },
  ],
  dullness: [
    { ingredient: "AHA/BHA", reason: "Removes dead skin cells" },
    { ingredient: "Vitamin C", reason: "Restores glow" },
  ],
  darkcircles: [
    { ingredient: "Caffeine", reason: "Reduces puffiness and improves circulation" },
    { ingredient: "Peptides", reason: "Firms under-eye area" },
  ],
  pores: [
    { ingredient: "Niacinamide", reason: "Minimizes pore appearance" },
    { ingredient: "Clay", reason: "Absorbs excess oil" },
  ],
  dryness: [
    { ingredient: "Hyaluronic Acid", reason: "Deep hydration" },
    { ingredient: "Ceramides", reason: "Restore skin barrier" },
  ],
  sensitivity: [
    { ingredient: "Centella Asiatica", reason: "Soothes and calms skin" },
    { ingredient: "Oat Extract", reason: "Reduces irritation" },
  ],
  puffiness: [
    { ingredient: "Caffeine", reason: "Reduces swelling and puffiness" },
    { ingredient: "Green Tea Extract", reason: "Anti-inflammatory and calming" }
  ],
  tanning: [
    { ingredient: "Vitamin C", reason: "Lightens sun-induced pigmentation" },
    { ingredient: "Niacinamide", reason: "Evens skin tone and reduces sun damage" }
  ],
  whiteheads: [
    { ingredient: "Salicylic Acid", reason: "Exfoliates and prevents whitehead formation" },
    { ingredient: "Tea Tree Oil", reason: "Antibacterial and helps unclog pores" }
  ],
  blackheads: [
    { ingredient: "Salicylic Acid", reason: "Penetrates and dissolves oil in pores" },
    { ingredient: "Charcoal", reason: "Draws out impurities from the skin" }
  ],
  irritation: [
    { ingredient: "Aloe Vera", reason: "Soothes and hydrates irritated skin" },
    { ingredient: "Panthenol (Vitamin B5)", reason: "Repairs and calms sensitive skin" }
  ],
  acnescars: [
    { ingredient: "Niacinamide", reason: "Improves skin texture and fades marks" },
    { ingredient: "Azelaic Acid", reason: "Reduces pigmentation and evens skin tone" }
  ],
};

const productData = {
  acne: [
    {
      brand: "Minimalist",
      name: "Salicylic Acid 2% Serum",
      price: "₹549",
      reason: "Unclogs pores and reduces acne",
      link: "https://beminimalist.co/products/salicylic-acid-serum",
    },
    {
      brand: "The Ordinary",
      name: "Niacinamide 10% + Zinc 1%",
      price: "₹600",
      reason: "Controls oil and soothes acne",
      link: "https://deciem.com/en-in/the-ordinary-niacinamide",
    },
  ],
  pigmentation: [
    {
      brand: "Minimalist",
      name: "Alpha Arbutin 2% + HA",
      price: "₹599",
      reason: "Fades pigmentation and hydrates",
      link: "https://beminimalist.co/products/alpha-arbutin-serum",
    },
    {
      brand: "Plum",
      name: "Vitamin C 15% Serum",
      price: "₹550",
      reason: "Brightens and evens skin tone",
      link: "https://plumgoodness.com/products/vitamin-c-serum",
    },
  ],
  aging: [
    {
      brand: "Olay",
      name: "Regenerist Retinol Night Cream",
      price: "₹899",
      reason: "Reduces wrinkles and smooths skin",
      link: "https://www.olay.co.in/en-in/retinol-24",
    },
    {
      brand: "Dot & Key",
      name: "Peptide Night Recovery Cream",
      price: "₹695",
      reason: "Improves skin elasticity",
      link: "https://dotandkey.com/products/peptide-cream",
    },
  ],
  dullness: [
    {
      brand: "Plum",
      name: "Grape Seed & Sea Buckthorn Oil",
      price: "₹675",
      reason: "Revives glow and softens skin",
      link: "https://plumgoodness.com/products/facial-oil",
    },
    {
      brand: "The Ordinary",
      name: "Glycolic Acid 7% Toning Solution",
      price: "₹750",
      reason: "Exfoliates and brightens",
      link: "https://deciem.com/en-in/glycolic-acid",
    },
  ],
  darkcircles: [
    {
      brand: "Mamaearth",
      name: "Under Eye Cream with Caffeine",
      price: "₹499",
      reason: "Reduces puffiness and pigmentation",
      link: "https://mamaearth.in/product/under-eye-cream",
    },
  ],
  pores: [
    {
      brand: "Innisfree",
      name: "Super Volcanic Pore Clay Mask",
      price: "₹950",
      reason: "Cleanses and tightens pores",
      link: "https://innisfree.com/product/pore-clay-mask",
    },
  ],
  dryness: [
    {
      brand: "CeraVe",
      name: "Moisturizing Cream with Ceramides",
      price: "₹899",
      reason: "Deeply hydrates and restores barrier",
      link: "https://www.cerave.com/skincare/moisturizers",
    },
  ],
  sensitivity: [
    {
      brand: "Dr. Sheth’s",
      name: "Centella & Niacinamide Toner",
      price: "₹499",
      reason: "Calms redness and irritation",
      link: "https://drsheths.com/products/centella-toner",
    },
  ],
};

skinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const skinType = document.getElementById("skinType").value;
  const selectedConcerns = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  ).map((cb) => cb.value);

  if (!skinType || selectedConcerns.length === 0) {
    resultBox.innerHTML = "<strong>Please select your skin type and concerns.</strong>";
    return;
  }

  let output = `<h3>🧴 What Your Skin Needs:</h3><ul>`;

  const addedIngredients = new Set();

  selectedConcerns.forEach((concern) => {
    concernIngredients[concern].forEach((item) => {
      if (!addedIngredients.has(item.ingredient)) {
        output += `<li><strong>${item.ingredient}:</strong> ${item.reason}</li>`;
        addedIngredients.add(item.ingredient);
      }
    });
  });

  output += `</ul><hr><h3>🛍️ Product Recommendations:</h3>`;

  selectedConcerns.forEach((concern) => {
  if (concernIngredients[concern]) {
    concernIngredients[concern].forEach((item) => {
      if (item.ingredient && !addedIngredients.has(item.ingredient)) {
        output += `<li><strong>${item.ingredient}:</strong> ${item.reason}</li>`;
        addedIngredients.add(item.ingredient);
      }
    });
  }
});
  resultBox.innerHTML = output;
});
