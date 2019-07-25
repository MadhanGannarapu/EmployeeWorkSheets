import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
image: any;
  constructor() { }

  ngOnInit() {
  }

  // fileChangeEvent(fileInput: any) {
  //   var fileName = fileInput.target.value;
  //   var idxDot = fileName.lastIndexOf(".") + 1;
  //   var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  //   if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
  //     ImageCompressService.filesToCompressedImageSource(fileInput.target.files).then(observableImages => {
  //       observableImages.subscribe((image) => {
  //           this.image = image.compressedImage.imageDataUrl;
  //           this.image.URL=  image.compressedImage.imageDataUrl;
  //           this.image = this.image.replace("data:image/gif;base64,", "");
  //           this.image = this.image.replace("data:image/jpeg;base64,", "");
  //           this.image = this.image.replace("data:image/jpg;base64,", "");
  //           this.image = this.image.replace("data:image/png;base64,", "");
  //       });
  //     });
  //   }else{
  //     alert("Only jpg/jpeg and png files are allowed!");
  //   }
  // }

}
