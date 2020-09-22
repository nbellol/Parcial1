let Url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let handleClickBurger = (element) => {
  //console.log(element);
  fetch(Url).then((response) =>
    response.json().then((answer) => {
      console.log(answer);
      let burgers = answer[0];
      //console.log(burgers);
      let inner = ` <div class="row">\n`;
      for (let i = 0; i < burgers["products"].length; i++) {
        const e = burgers["products"][i];
        //console.log(e);
        let objstr =
          '<div class="col-sm-12 col-md-3 col-lg-3">\n<div class="card" style="width: 100%">\n <img class="card-img-top" src=' +
          e["image"] +
          'alt="Card image" height="230px"/>\n<div class="card-body">\n<h4 class="card-title">' +
          e["name"] +
          '</h4>\n<p class="card-text">' +
          e["description"] +
          '</p>\n <p class="price">$' +
          e["price"] +
          '</p>\n<button type="button" class="btn btn-primary">Add to cart</button> </div></div></div>\n';
        inner += objstr;
      }
      inner += "</div>";
      element.innerHTML = inner;
      document.getElementById("Nombre").innerHTML = "Burgers";
    })
  );
};

let handleClickTacos = (element) => {
  //console.log(element);
  fetch(Url).then((response) =>
    response.json().then((answer) => {
      console.log(answer);
      let tacos = answer[1];
      //console.log(burgers);
      let inner = ` <div class="row">\n`;
      for (let i = 0; i < tacos["products"].length; i++) {
        const e = tacos["products"][i];
        //console.log(e);
        let objstr =
          '<div class="col-sm-12 col-md-3 col-lg-3">\n<div class="card" style="width: 100%">\n <img class="card-img-top" src=' +
          e["image"] +
          'alt="Card image" height="230px"/>\n<div class="card-body">\n<h4 class="card-title">' +
          e["name"] +
          '</h4>\n<p class="card-text">' +
          e["description"] +
          '</p>\n <p class="price">$' +
          e["price"] +
          '</p>\n<button type="button" class="btn btn-primary">Add to cart</button> </div></div></div>\n';
        inner += objstr;
      }
      inner += "</div>";
      element.innerHTML = inner;
      document.getElementById("nombre").innerHTML = "Burgers";
    })
  );
};

let handleClickBtn2 = (element) => {
  //console.log(element);
  fetch(Url).then((response) =>
    response.json().then((answer) => {
      let events = [];
      for (var i = 0; i < answer.length; i++) {
        let obj = answer[i];
        let s = obj["events"];
        s.forEach((n) => {
          if (!events.includes(n)) {
            events[events.length] = n;
          }
        });
      }

      let corr = [];
      for (let k = 0; k < events.length; k++) {
        const e = events[k];
        let tp = 0;
        let tn = 0;
        let fp = 0;
        let fn = 0;
        for (var i = 0; i < answer.length; i++) {
          let obj = answer[i];
          let eve = obj["events"];
          let sqr = obj["squirrel"];
          if (eve.includes(e) && sqr === true) {
            tp += 1;
          }
          if (eve.includes(e) && sqr === false) {
            fn += 1;
          }
          if (!eve.includes(e) && sqr === true) {
            fp += 1;
          }
          if (!eve.includes(e) && sqr === false) {
            tn += 1;
          }
        }
        let mcc =
          (tp * tn - fp * fn) /
          Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn));
        corr[k] = mcc;
      }
      let tuplelist = [];
      for (let t = 0; t < events.length; t++) {
        const ev = events[t];
        const c = corr[t];
        tuplelist[tuplelist.length] = [ev, c];
      }
      tuplelist.sort(function (a, b) {
        return b[1] - a[1];
      });
      let inner = `<table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Events</th>
          <th>Correlation</th>
        </tr>
      </thead>
      <tbody>`;

      for (let j = 0; j < tuplelist.length; j++) {
        const caja = tuplelist[j];
        let cont = j + 1;
        let objstr = "";
        objstr =
          "<tr>\n  <td>" +
          cont +
          "</td>\n  <td>" +
          caja[0] +
          "</td>\n  <td>" +
          caja[1] +
          "</td>\n</tr>\n";

        inner += objstr;
      }
      inner += "</tbody>\n</table>";
      element.innerHTML = inner;
    })
  );
};
