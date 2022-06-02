$( () => {
	
	//On Scroll Functionality
	$(window).scroll( () => {
		var windowTop = $(window).scrollTop();
		windowTop > 100 ? $('nav').addClass('navShadow') : $('nav').removeClass('navShadow');
		windowTop > 100 ? $('ul').css('top','100px') : $('ul').css('top','160px');
	});
	
	//Click Logo To Scroll To Top
	$('#logo').on('click', () => {
		$('html,body').animate({
			scrollTop: 0
		},500);
	});
	
	//Smooth Scrolling Using Navigation Menu
	$('a[href*="#"]').on('click', function(e){
		$('html,body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 100
		},500);
		e.preventDefault();
	});
	
	//Toggle Menu
	$('#menu-toggle').on('click', () => {
		$('#menu-toggle').toggleClass('closeMenu');
		$('ul').toggleClass('showMenu');
		
		$('li').on('click', () => {
			$('ul').removeClass('showMenu');
			$('#menu-toggle').removeClass('closeMenu');
		});
	});

	
	
});


const input = document.querySelector(".finder__input");
const finder = document.querySelector(".finder");
const form = document.querySelector("form");

input.addEventListener("focus", () => {
  finder.classList.add("active");
});

input.addEventListener("blur", () => {
  if (input.value.length === 0) {
    finder.classList.remove("active");
  }
});

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  finder.classList.add("processing");
  finder.classList.remove("active");
  input.disabled = true;
  setTimeout(() => {
    finder.classList.remove("processing");
    input.disabled = false;
    if (input.value.length > 0) {
      finder.classList.add("active");
    }
  }, 1000);
});

//----------------------------api---------------------------------------

const productCardTemplate = document.querySelector("[data-product-template]")
const productCardContainer = document.querySelector("[data-product-cards-container]")
const searchInput = document.querySelector("[data-search]")

let products = []

input.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  products.forEach(product => {
    const isVisible =
      product.title.toLowerCase().includes(value)
    product.element.classList.toggle("hide", !isVisible)
  })
})



fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    products = data.map(product => {
      const card = productCardTemplate.content.cloneNode(true).children[0]
	  const img = card.querySelector("[data-img]")
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
	  img.src = product.image
      header.textContent = product.title
      body.textContent = "$"+product.price
      productCardContainer.append(card)
      return { title: product.title, price: product.price, element: card }
    })
  })

/*
fetch("https://claudiorigollet.cl/api/products")
	.then(res => res.json())
	.then(data => {
		data.forEach(product => {
			const card = productTemplate.textContent.cloneNode(true).children[0]
			const header = card.querySelector("[data-header]")
			const body = card.querySelector("[data-body]")
			header.textContent = product.name
			body.textContent = product.description
			dataContainer.append(card)
		})
	})

*/


