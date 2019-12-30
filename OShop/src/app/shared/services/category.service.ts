import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProductService } from 'shared/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', r => r.orderByChild('name')).snapshotChanges();
  }
}
