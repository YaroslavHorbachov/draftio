import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserModel } from '@draftio/shared/common';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShelfApiService {
  constructor(private readonly httpClient: HttpClient) {}

  public createUser(model: CreateUserModel): Observable<void> {
    return this.httpClient.post<void>('/shelfapi/users', model);
  }
}
