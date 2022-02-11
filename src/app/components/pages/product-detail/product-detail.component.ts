import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: any;
  reviewForm!: FormGroup;
  currentProduct: any;

  constructor(private service: ProductService,private activatedRouter: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
        star: new FormControl(),
        comment: new FormControl()
    });

    this.activatedRouter.params.subscribe((params)=>{
      this.id = params['id'];
    });

    this.service.getProductById(this.id).subscribe(async (res)=>{
      this.currentProduct = await res.data;
    });
  }

  addReview(){
    let reviewData = {
      star: this.reviewForm.value.star,
      comment: this.reviewForm.value.comment
    }
    this.service.addreview(reviewData,this.id).subscribe((res)=>{
      console.log(res);
      window.alert("Review Complete");
      this.router.navigateByUrl('/',{skipLocationChange:true})
        .then(()=>{
          this.router.navigate([`/product/detail/${this.id}`]);
        });
    });
  }

}
