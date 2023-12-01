import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaServiceService {

  constructor(private swUpdate: SwUpdate) {
  }

  
  ngOnInit() {

    if (this.swUpdate.isEnabled) {

        this.swUpdate.available.subscribe(() => {

            if(confirm("Nueva version disponible. Desea cargar la nueva version?")) {

                window.location.reload();
            }
        });
    }        
}
}
