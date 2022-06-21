import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private apiService: ApiService
  ) { }

  getDasboardStats() {

    const route = '/public/stats';

    return this.apiService.get(route)
      .pipe(map(
        data => {
          return data;
        }
      ));

  }
}
