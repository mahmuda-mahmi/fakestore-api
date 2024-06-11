let productsArray = [];

/// getting all product from api --------------
const getAllProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    productsArray = data;
    showAllProducts();
}

// showing all products _---------------------------
const showAllProducts = (products = productsArray) => {
    const showCards = document.getElementById("showAllCards");
    showCards.textContent = ' ';
    products.forEach(element => {
        // console.log(element);
        const div = document.createElement('div');
        div.classList = `card glass p-5 bg-white shadow-xl`;
        div.innerHTML = `
                <figure><img src="${element.image}" class="w-full h-60 object-contain"/></figure>
                <div class="card-body p-0 justify-between">
                <h2 class="text-sm my-2 font-semibold text-center sans">${element.title}</h2>
                <p class="font-semibold text-center sans">$${element.price}</p>
                <div class ="flex gap-4 justify-between items-center px-4">
                <p class="sans">${element.rating.rate} <i class="fa-sharp fa-solid fa-star"></i> (${element.rating.count})</p>
                <button class="font-bold bg-slate-800 py-3 px-4 text-white rounded-lg bttn "><i class="fa-sharp fa-solid fa-cart-shopping"></i></button>
                </div>
                </div>`;
        showCards.appendChild(div);
    });

}

/////////////// getting  name for menu -----------
const getMenuNames = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const nameData = await res.json();
    menuName(nameData);
}

/// getting menu names -----------------
const menuName = (names) => {
    const menu = document.getElementById('categories');
    const menu2 = document.getElementById('categories2');

    names.forEach(element => {
        const escapedElement = element.replace(/'/g, "\\'");
        const li = document.createElement('li');
        li.classList = "list-none";
        li.innerHTML = `
        <a class="cursor-pointer capitalize nav-active nav-menu sans" onclick="loadProducts('${escapedElement}');changeName('${escapedElement}')">${element}</a>`;
        /// for responsive menu 
        const li2 = document.createElement('li');
        li2.classList = "list-none";
        li2.innerHTML = `
        <a class="cursor-pointer capitalize nav-active nav-menu sans" onclick="loadProducts('${escapedElement}');changeName('${escapedElement}')">${element}</a>`;

        // append to menu
        menu.appendChild(li);
        menu2.appendChild(li2);
    })
    activeMenu();
}

//// changing the name of category --------------------------------------
const changeName = (element) => {
    const categoryName = document.getElementById('current-category');
    categoryName.innerHTML = element;
}

const activeMenu = () => {
    const links = document.querySelectorAll(".nav-active");
    links.forEach(btn => btn.addEventListener("click",(e)=>{
    // e.preventDefault();
    document.querySelector(".nav-active.active").classList.remove("active");
    btn.classList.add("active");
  }));
}


// getting products by category -------------------------------------------------
const loadProducts = async (category) => {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const product = await res.json();
    productsArray =  product;
    showAllProducts();
}

/// sort by price ----------------------------------------------------
const sortPrice = () => {
    productsArray.sort((a,b) => a.price - b.price);
    showAllProducts();
}

//// sort by rating ----------------------------------------------------------
const sortByRating = () => {
    productsArray.sort((a,b) => b.rating.rate - a.rating.rate);
    showAllProducts();
}

// search items by title ---------------------------------------------------
const searchProduct = () => {
    const inputText = document.getElementById('input-text');
    inputTextValue = inputText.value.toLowerCase();
    if(inputTextValue !== ''){
        inputText.value = '';
        const filterProducts =  productsArray.filter(product => 
            product.title.toLowerCase().includes(inputTextValue)
        );
        showAllProducts(filterProducts);
    }
}

getAllProducts();
getMenuNames()
