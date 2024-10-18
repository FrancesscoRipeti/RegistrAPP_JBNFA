import { Component } from '@angular/core';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage  {
  QRcodeString: string = '';
  QRStatus: string = '';

  constructor() { }



  Scan(codigo : any){
    // TODO call service for registry the asistence code
  }
}
