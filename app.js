const container = document.getElementById("product-container");

async function fetchProducts() {
  if (!container) return;

  container.innerHTML = "";

  const res = await fetch("https://dummyjson.com/products?limit=30");
  const data = await res.json();
  const products = data && data.products ? data.products : [];

  for (let i = 0; i < products.length; i++) {
    const p = products[i];

    const card = document.createElement("div");
    card.className = "sell-cont";
    card.tabIndex = 0;
    card.setAttribute("role", "link");
    card.setAttribute(
      "aria-label",
      "View details for " + (p.title || "product")
    );

    function goToDetails() {
      if (p && p.id != null) {
        window.location.href = "product.html?id=" + encodeURIComponent(p.id);
      }
    }

    card.addEventListener("click", goToDetails);
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter") goToDetails();
    });

    const imgWrap = document.createElement("div");
    imgWrap.className = "proimg-cont";

    const img = document.createElement("img");
    img.className = "proimg";
    img.loading = "lazy";
    img.src = p.thumbnail || (p.images && p.images[0]) || "";
    img.alt = p.title || "Product";

    imgWrap.appendChild(img);

    const desc = document.createElement("div");
    desc.className = "prodes";

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = "Price: $" + (p.price ?? "");

    const specs = document.createElement("p");
    specs.className = "specs";
    specs.textContent =
      (p.title || "Untitled") +
      (p.rating ? " | ⭐ " + Number(p.rating).toFixed(1) : "");

    desc.appendChild(price);
    desc.appendChild(specs);

    card.appendChild(imgWrap);
    card.appendChild(desc);

    container.appendChild(card);
  }
}

fetchProducts().catch(function () {
  if (!container) return;
  container.textContent = "Failed to load products.";
});