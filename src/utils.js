import {
  from
} from 'rxjs';
import {
  map,
  concatAll,
  filter,
  take
} from 'rxjs/operators';

const fetchData = () => {
  return fetch('https://api.iextrading.com/1.0/stock/market/crypto').then(res => res.json());
}

export const fetchData$ = from(fetchData())
  .pipe(
    concatAll(),
    filter(({askPrice}) => askPrice > 50),
    take(5),
  );