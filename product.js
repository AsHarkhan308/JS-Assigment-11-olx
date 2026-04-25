const root = document.getElementById("product-root");

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id ? String(id) : "";
}

async function loadProduct() {
  if (!root) return;

  const id = getProductIdFromUrl();
  if (!id) {
    root.textContent = "No product selected.";
    return;
  }

  root.textContent = "Loading...";

  const res = await fetch("https://dummyjson.com/products/" + encodeURIComponent(id));
  if (!res.ok) {
    root.textContent = "Product not found.";
    return;
  }

  const p = await res.json();

  const imgSrc = p.thumbnail || (p.images && p.images[0]) || "";

  root.innerHTML = `
    <div class="product-card">
      <img class="product-image" src="${imgSrc}" alt="${p.title || "Product"}" />
    </div>
    <div class="product-card">
      <div class="product-info">
        <h1 class="product-title">${p.title || "Untitled"}</h1>
        <p class="product-price">Price: $${p.price ?? ""}</p>
        <p class="product-meta">
          ${p.brand ? `<strong>Brand:</strong> ${p.brand}<br/>` : ""}
          ${p.category ? `<strong>Category:</strong> ${p.category}<br/>` : ""}
          ${p.rating ? `<strong>Rating:</strong> ⭐ ${Number(p.rating).toFixed(1)}<br/>` : ""}
          ${p.stock != null ? `<strong>Stock:</strong> ${p.stock}<br/>` : ""}
        </p>
        ${p.description ? `<p class="product-meta" style="margin-top:10px;">${p.description}</p>` : ""}
      </div>
    </div>
  `;
}

loadProduct().catch(function () {
  if (!root) return;
  root.textContent = "Failed to load product.";
});

