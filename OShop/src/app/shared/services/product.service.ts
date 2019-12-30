import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { map, shareReplay } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Injectable({providedIn:'root'})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges()
      .pipe(
        map(changes => changes.map(c => {
          const data = c.payload.val() as Product;
          data.key = c.key;
          return data;
        }))
      );
  }

  get(id) {
    return this.db.object('/products/' + id);
  }

  update(id, product) {
    return this.db.object(`/products/${id}`).update(product);
  }

  delete(id) {
    return this.db.object(`/products/${id}`).remove();
  }
}
