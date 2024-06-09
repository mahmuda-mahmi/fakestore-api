const getAllProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    showAllProducts(data);
}

const showAllProducts = (products) => {
    const showCards = document.getElementById("showAllCards");
    products.forEach(element => {
        console.log(element);
        const div = document.createElement('div');
        div.classList = `card glass p-5`;
        div.innerHTML = `
                <figure><img src="${element.image}" class="w-full h-60 object-contain"/></figure>
                <div class="card-body p-0 justify-between">
                <h2 class="card-title text-sm my-2 font-semibold">${element.title}</h2>
                <div class ="flex gap-4 justify-between">
                <p>${element.price}$</p>
                <p>${element.rating.rate} <i class="fa-sharp fa-thin fa-star"></i></p>
                </div>
                </div>`;
        showCards.appendChild(div);
        
    });
}

getAllProducts();

/* <div class="card glass">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!"/></figure>
        <div class="card-body">
          <h2 class="card-title">Life hack</h2>
          <p>How to park your car at your garage?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Learn now!</button>
          </div>
        </div>
        </div> */