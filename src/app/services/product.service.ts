import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `${environment.serviceUrl}/product`;//http://localhost:4000/product
  constructor(private http: HttpClient) { }

  //Get All Product
  getProduct() : any{
    return this.http.get<any>(this.url);
  }

  getProductById(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.get<any>(getUrl);
  }

  //add Product
  addProduct(product: any){
    return this.http.post<any>(this.url,product)
    .pipe(map((res)=>{
      return res;
    }));
  }

  //Update Product
  updateProduct(product: any,id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.put<any>(getUrl,product)
    .pipe(map((res)=>{
      return res;
    }));
  }

  //Edit Product
  addreview(reviewData: any,id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.patch<any>(getUrl,reviewData)
    .pipe(map((res)=>{
      return res;
    }));
  }

  //Delete Product
  deleteProduct(id: any){
    let getUrl = `${this.url}/${id}`;
    return this.http.delete<any>(getUrl);
  }

}
