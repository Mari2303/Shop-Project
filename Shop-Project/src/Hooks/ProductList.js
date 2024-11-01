async function fetchProducts() {
    try {
      const response = await fetch("URL_DE_LA_API");
      const products = await response.json();
      const productList = document.getElementById("product-list");
  
      products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <p>${product.price}</p>
        `;
        productList.appendChild(productItem);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  
  fetchProducts();
  
