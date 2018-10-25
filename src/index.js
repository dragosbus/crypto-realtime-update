// Import stylesheets
import { from, Observable } from "rxjs";
import { map, concatAll, take, filter } from "rxjs/operators";

const stock = document.querySelector(".stock");

const makeStock = data => {
  return `<h3>${data.companyName}</h3>
  <p class="price">${data.askPrice}</p>
  `;
};

const getData = () =>
  fetch("https://api.iextrading.com/1.0/stock/market/crypto").then(res =>
    res.json()
  );

const stock$ = Observable.create(observer => {
  setInterval(() => {
    observer.next(getData());
  }, 10000);
});

stock$.pipe(
  map(data => {
    return from(data);
  })
);

stock$.subscribe(data => {
  stock.innerHTML = "";
  from(data)
    .pipe(
      map(val => val),
      concatAll(),
      filter(crypto => crypto.askPrice > 200),
      take(4)
    )
    .subscribe(res => {
      stock.innerHTML += makeStock(res);
    });
});
