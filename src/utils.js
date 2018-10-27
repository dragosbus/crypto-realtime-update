import {
  from,
  timer,
} from 'rxjs';
import {
  concatAll,
  filter,
  switchMap,
  scan,distinct,
  map
} from 'rxjs/operators';

const fetchData = () => {
  return fetch('https://api.iextrading.com/1.0/stock/market/crypto').then(res => res.json());
}

export const fetchAndReload$ = timer(0, 5000)
  .pipe(
    switchMap(() => from(fetchData())),
    concatAll(),
    filter(coin => coin.askPrice > 50),
    map(({symbol, askPrice})=>({symbol, askPrice}))
  );