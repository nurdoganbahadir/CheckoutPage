const shipping = 15.0;
const tax = 0.18;

let sepettekiler = [
  { name: "Vintage Backpack", price: 34.99, piece: 1, img: "./img/photo1.png" },
  { name: "Levi Shoes", price: 40.99, piece: 1, img: "./img/photo2.png" },
  { name: "Antique Clock", price: 69.99, piece: 1, img: "./img/photo3.jpg" },
];

sepettekiler.forEach(({ img, name, price, piece }) => {
  document.querySelector("#product-rowlari").innerHTML += `
    <div class="card mb-3" style="max-width: 540px;">

  <div class="row ">

    <div class="col-md-5 ">
      <img src=${img}  class=" w-100 rounded-start" alt="...">
    </div>

    <div class="col-md-7 ">

      <div class="card-body">
      
        <h5 class="card-title">${name}</h5>
        
             <div class="ürün-price">
                    <p class="text-warning h2">$
                      <span class="indirim-price">${(price * 0.7).toFixed(
                        2
                      )} </span>
                      <span class="h5 text-dark text-decoration-line-through">${price}</span>
                    </p>
                  </div>

                  
                  <div
                    class="border border-1 border-dark shadow-lg d-flex justify-content-center p-2"
                  >
                    <div class="adet-controller ">
                      <button class="btn btn-secondary btn-sm minus">
                        <i class="fas fa-minus"></i>
                      </button>
                      <p class="d-inline mx-4" id="ürün-adet">${piece}</p>
                      <button class="btn btn-secondary btn-sm plus">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>

                  </div>

                  <div class="ürün-removal mt-4">
                    <button class="btn btn-danger btn-sm w-100 remove-product">
                      <i class="fa-solid fa-trash-can me-2"></i>Remove
                    </button>
                  </div>

                  <div class="mt-2">
                    Ürün Toplam: $<span class="product-total">${(
                      price *
                      0.7 *
                      piece
                    ).toFixed(2)} </span>
                  </div>
      </div>
    </div>
  </div>
</div>
    `;
});

producstTotal();
removeButton();
pieceButton();

function pieceButton() {
  document.querySelectorAll(".adet-controller").forEach((kutu) => {
    const plus = kutu.lastElementChild;
    const minus = kutu.firstElementChild;
    const adet = plus.previousElementSibling;

    plus.onclick = () => {
      adet.textContent = +adet.textContent + 1;
      plus.closest(".card-body").querySelector(".product-total").textContent =
        plus.closest(".card-body").querySelector(".indirim-price").textContent *
        adet.textContent;

      producstTotal();
    };

    minus.onclick = () => {
      adet.textContent = adet.textContent - 1;
      minus.closest(".card-body").querySelector(".product-total").textContent =
        minus.closest(".card-body").querySelector(".indirim-price")
          .textContent * adet.textContent;

      producstTotal();

      if (adet.textContent < 1) {
        alert("sileyim mi?");

        minus.closest(".card").remove();
      }
    };
  });
}

function removeButton() {
  document.querySelectorAll(".remove-product").forEach((btn) => {
    btn.onclick = () => {
      btn.closest(".card").remove();
      producstTotal();
    };
  });
}

function producstTotal() {
  const toplam = document.querySelectorAll(".product-total");

  const pToplam = Array.from(toplam).reduce(
    (acc, item) => acc + Number(item.textContent),
    0
  );

  document.querySelector(".productstoplam").textContent = pToplam;

  document.querySelector(".vergi").textContent = (pToplam * tax).toFixed(2);

  document.querySelector(".kargo").textContent = pToplam ? shipping : 0;

  document.querySelector(".toplam").textContent = pToplam
    ? (pToplam + pToplam * tax + shipping).toFixed(2)
    : 0;
}
