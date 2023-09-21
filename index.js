const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

const productsList = document.querySelector('.container-items');

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

/* -------------------------------------------------------------------------- */
//quitar el carrito cuando se apreta el carrito
btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

//productos del carrito
let allProducts = [];

//evento que pone productos
productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

//quitar productos si se presiona la equis
rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

//mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	//liimpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
			<svg class="icon-close" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clip-path="url(#clip0_429_11083)">
			<path d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006" stroke="#292929" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
			</g>
			<defs>
			<clipPath id="clip0_429_11083">
			<rect width="24" height="24" fill="white"/>
			</clipPath>
			</defs>
			</svg>
        `;

		rowProduct.append(containerProduct);

		//costo de los productos 
		total = total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};