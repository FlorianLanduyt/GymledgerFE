import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Training } from 'src/app/models/training.model';
import { Observable } from 'rxjs';
import { GymnastDataService } from './gymnast-data.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingResolver implements Resolve<Training> {
constructor(private _gymnastService: GymnastDataService) {}

  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<Training>{
      return this._gymnastService.getTraining$(route.params['id'])
  }
}
