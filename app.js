let Url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

const ejecutar = async () => {
  fetch(Url).then((response) =>
    response.json().then((answer) => {
      //console.log(answer);
      let burgers = answer[0];
      //console.log(burgers);
      let inner = ` <div class="row">\n`;
      for (let i = 0; i < burgers["products"].length; i++) {
        const e = burgers["products"][i];
        //console.log(e);
        let nameid = "name" + i;
        let priceid = "price" + i;
        let objstr =
          '<div class="col-sm-12 col-md-3 col-lg-3">\n<div class="card" style="width: 100%">\n <img class="card-img-top" src=' +
          e["image"] +
          'alt="Card image" height="230px"/>\n<div class="card-body">\n<h4 id="' +
          nameid +
          '" class="card-title">' +
          e["name"] +
          '</h4>\n<p class="card-text">' +
          e["description"] +
          '</p>\n <p id="' +
          priceid +
          '" class="price">$' +
          e["price"] +
          '</p>\n<button type="button" class="btn btn-dark"onclick="handleClickAdd(' +
          nameid +
          "," +
          priceid +
          ')">Add to cart</button> </div></div></div>\n';
        inner += objstr;
      }
      inner += "</div>";
      document.getElementById("container").innerHTML = inner;
      document.getElementById("Nombre").innerHTML = "Burgers";
      let burger = document.getElementById("Burger");
      let taco = document.getElementById("Tacos");
      let salad = document.getElementById("Salads");
      let dessert = document.getElementById("Desserts");
      let drink = document.getElementById("Drinks");
      let shop = document.getElementById("cart");

      //console.log(shop);
      burger.addEventListener("click", handleClickBurger);
      taco.addEventListener("click", handleClickTacos);
      salad.addEventListener("click", handleClickSalads);
      dessert.addEventListener("click", handleClickDesserts);
      drink.addEventListener("click", handleClickDrink);
      shop.addEventListener("click", handleClickOrder);
    })
  );
};

let handleConfirmOrder = (element) => {
  console.log(confirm);
  order = [];
  confirm = [];
  //location.reload();
};

let handleCancelOrder = (element) => {
  order = [];
  confirm = [];
  location.reload();
};

let handleClickOrder = (element) => {
  let items = [];
  let prices = [];
  let cantidad = [];
  let pritot = [];

  for (let i = 0; i < order.length; i++) {
    const element = order[i];
    if (!items.includes(element["nombre"])) {
      items.push(element["nombre"]);
      prices.push(element["precio"]);
    }
  }

  for (let j = 0; j < items.length; j++) {
    const element = items[j];
    let cont = 0;
    for (let k = 0; k < order.length; k++) {
      const item = order[k]["nombre"];
      if (item === element) {
        cont += 1;
      }
    }
    cantidad.push(cont);
    let pt = cantidad[j] * prices[j];
    pritot.push(pt);
  }
  //console.log(cantidad);
  //console.log(items);
  //console.log(prices);
  //console.log(pritot);
  let inner = `   <table class="table table-striped">
  <thead>
    <tr>
      <th>Item</th>
      <th>Qty</th>
      <th>Description</th>
      <th>Unit Price</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>`;

  let total = 0;
  for (let l = 0; l < cantidad.length; l++) {
    const cant = cantidad[l];
    const desc = items[l];
    const unit = prices[l];
    const amo = pritot[l];
    const it = l + 1;
    total += amo;

    let jso = { item: it, quantity: cant, description: desc, unitPrice: unit };
    confirm.push(jso);

    let stritem =
      "<tr>\n<td>" +
      it +
      "</td>\n<td>" +
      cant +
      "</td>\n<td>" +
      desc +
      "</td>\n<td>" +
      unit +
      "</td>\n<td>" +
      amo +
      "</td>\n</tr>";
    inner += stritem;
  }
  inner += `</tbody>
  </table>`;

  inner += `<div class="row">
  <div class="col-sm-2 col-md-2 col-lg-2">`;

  inner += " <p><strong>Total:$" + total.toFixed(2) + "</strong></p>";
  inner += `</div>
  <div class="col-sm-6 col-md-6 col-lg-6"></div>
  <div class="col-sm- col-md-2 col-lg-2">
    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal">Cancel</button>
  </div>
  <div class="col-sm-2 col-md-2 col-lg-2">
    <button type="button" class="btn btn-success" onclick="handleConfirmOrder()">Confirm Order</button>
  </div>
</div>`;

  document.getElementById("container").innerHTML = inner;
  document.getElementById("Nombre").innerHTML = "Order Details";
};

let handleClickAdd = (name, price) => {
  let nom = name.innerHTML;
  let pri = price.innerHTML;
  let pre = pri.replace("$", "");

  let jso = { nombre: nom, precio: pre };
  //console.log(jso);
  order.push(jso);
  cart += 1;
  document.getElementById("cantidad").innerHTML = cart + " items";
};

let handleClickBurger = (element) => {
  //console.log(element);
  fetch(Url).then((response) =>
    response.json().then((answer) => {
      //console.log(answer);
      let burgers = answer[0];
      console.log(burgers);
      let inner = ` <div class="row">\n`;
      for (let i = 0; i < burgers["products"].length; i++) {
        const e = burgers["products"][i];
        let nameid = "name" + i;
        let priceid = "price" + i;
        let objstr =
          '<div class="col-sm-12 col-md-3 col-lg-3">\n<div class="card" style="width: 100%">\n <img class="card-img-top" src=' +
          e["image"] +
          'alt="Card image" height="230px"/>\n<div class="card-body">\n<h4 id="' +
          nameid +
          '" class="card-title">' +
          e["name"] +
          '</h4>\n<p class="card-text">' +
          e["description"] +
          '</p>\n <p id="' +
          priceid +
          '" class="price">$' +
          e["price"] +
          '</p>\n<button type="button" class="btn btn-dark"onclick="handleClickAdd(' +
          nameid +
          "," +
          priceid +
          ')">Add to cart</button> </div></div></div>\n';
        inner += objstr;
      }
      inner += "</div>";
      document.getElementById("container").innerHTML = inner;
      document.getElementById("Nombre").innerHTML = "Burgers";
    })
  );
};

let handleClickTacos = (element) => {
  //console.log(element);
  fetch(Url).then((response) =>
    response.json().then((answer) => {
      //console.log(answer);
      let tacos = answer[1];
      //console.log(burgers);
      let inner = ` <div class="row">\n`;
      for (let i = 0; i < tacos["products"].length; i++) {
        const e = tacos["products"][i];
        let nameid = "name" + i;
        let priceid = "price" + i;
        let objstr =
          '<div class="col-sm-12 col-md-3 col-lg-3">\n<div class="card" style="width: 100%">\n <img class="card-img-top" src=' +
          e["image"] +
          'alt="Card image" height="230px"/>\n<div class="card-body">\n<h4 id="' +
          nameid +
          '" class="card-title">' +
          e["name"] +
          '</h4>\n<p class="card-text">' +
          e["description"] +
          '</p>\n <p id="' +
          priceid +
          '" class="price">$' +
          e["price"] +
          '</p>\n<button type="button" class="btn btn-dark"onclick="handleClickAdd(' +
          nameid +
          "," +
          priceid +
          ')">Add to cart</button> </div></div></div>\n';
        inner += objstr;
      }
      inner += "</div>";
      document.getElementById("container").innerHTML = inner;
      document.getElementById("Nombre").innerHTML = "Tacos";
    })
  );
};

let handleClickSalads = (element) => {
  //console.log(element);
  fetch(Url).then((response) =>
    response.json().then((answer) => {
      console.log(answer);
      let salads = answer[2];
      //console.log(burgers);
      let inner = ` <div class="row">\n`;
      for (let i = 0; i < salads["products"].length; i++) {
        const e = salads["products"][i];
        //let nameid = "name" + i;
        let priceid = "price" + i;
        let objstr =
          '<div class="col-sm-12 col-md-3 col-lg-3">\n<div class="card" style="width: 100%">\n <img class="card-img-top" src=' +
          e["image"] +
          'alt="Card image" height="230px"/>\n<div class="card-body">\n<h4 id="' +
          nameid +
          '" class="card-title">' +
          e["name"] +
          '</h4>\n<p class="card-text">' +
          e["description"] +
          '</p>\n <p id="' +
          priceid +
          '" class="price">$' +
          e["price"] +
          '</p>\n<button type="button" class="btn btn-dark"onclick="handleClickAdd(' +
          nameid +
          "," +
          priceid +
          ')">Add to cart</button> </div></div></div>\n';
        inner += objstr;
      }
      inner += "</div>";
      document.getElementById("container").innerHTML = inner;
      document.getElementById("Nombre").innerHTML = "Salads";
    })
  );
};

let handleClickDesserts = (element) => {
  //console.log(element);
  fetch(Url).then((response) =>
    response.json().then((answer) => {
      console.log(answer);
      let desserts = answer[3];
      //console.log(burgers);
      let inner = ` <div class="row">\n`;
      for (let i = 0; i < desserts["products"].length; i++) {
        const e = desserts["products"][i];
        let nameid = "name" + i;
        let priceid = "price" + i;
        let objstr =
          '<div class="col-sm-12 col-md-3 col-lg-3">\n<div class="card" style="width: 100%">\n <img class="card-img-top" src=' +
          e["image"] +
          'alt="Card image" height="230px"/>\n<div class="card-body">\n<h4 id="' +
          nameid +
          '" class="card-title">' +
          e["name"] +
          '</h4>\n<p class="card-text">' +
          e["description"] +
          '</p>\n <p id="' +
          priceid +
          '" class="price">$' +
          e["price"] +
          '</p>\n<button type="button" class="btn btn-dark"onclick="handleClickAdd(' +
          nameid +
          "," +
          priceid +
          ')">Add to cart</button> </div></div></div>\n';
        inner += objstr;
      }
      inner += "</div>";
      document.getElementById("container").innerHTML = inner;
      document.getElementById("Nombre").innerHTML = "Desserts";
    })
  );
};

let handleClickDrink = (element) => {
  //console.log(element);
  fetch(Url).then((response) =>
    response.json().then((answer) => {
      console.log(answer);
      let drinks = answer[4];
      //console.log(burgers);
      let inner = ` <div class="row">\n`;
      for (let i = 0; i < drinks["products"].length; i++) {
        const e = drinks["products"][i];
        //console.log(e);
        let nameid = "name" + i;
        let priceid = "price" + i;
        let objstr =
          '<div class="col-sm-12 col-md-3 col-lg-3">\n<div class="card" style="width: 100%">\n <img class="card-img-top" src=' +
          e["image"] +
          'alt="Card image" height="230px"/>\n<div class="card-body">\n<h4 id="' +
          nameid +
          '" class="card-title">' +
          e["name"] +
          '</h4>\n<p class="card-text">' +
          e["description"] +
          '</p>\n <p id="' +
          priceid +
          '" class="price">$' +
          e["price"] +
          '</p>\n<button type="button" class="btn btn-dark"onclick="handleClickAdd(' +
          nameid +
          "," +
          priceid +
          ')">Add to cart</button> </div></div></div>\n';
        inner += objstr;
      }
      inner += "</div>";
      document.getElementById("container").innerHTML = inner;
      document.getElementById("Nombre").innerHTML = "Drinks & Sides";
    })
  );
};
let cart = 0;
let order = [];
let confirm = [];
ejecutar();
