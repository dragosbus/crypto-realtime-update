// Import stylesheets
import { from, interval, Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  mapTo,
  map,
  concatAll,
  take,
  concatMap,
  filter,
  switchMap,
  delay,
  concatMapTo
} from "rxjs/operators";

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
  }, 4000);
});

stock$.pipe(
  map(data => {
    return from(data).pipe(map(res => res));
  })
);

stock$.subscribe(data => {
  if (stock.querySelectorAll("p.price")) {
    for (let i = 0; i < stock.querySelectorAll("p.price").length; i++) {
      stock.querySelectorAll("p.price")[i].textContent = "";
      stock.querySelectorAll("h3")[i].textContent = "";
    }
  }
  from(data)
    .pipe(
      map(val => val),
      concatAll(),
      take(4)
    )
    .subscribe(res => {
      stock.innerHTML += makeStock(res);
    });
});
