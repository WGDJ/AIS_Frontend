import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  private readonly API_USER = `${environment.API}/$user$`;
  private readonly API_REPOS = `${environment.API}/$user$/repos`;
  private readonly API_STARRED = `${environment.API}/$user$/starred`;

  constructor(private http: HttpClient) { }

  findUser(usuario) {
    return this.http.get(this.API_USER.replace('$user$', usuario));
  }

  findRepos(usuario) {
    return this.http.get(this.API_REPOS.replace('$user$', usuario));
  }

  findStarred(usuario) {
    return this.http.get(this.API_STARRED.replace('$user$', usuario));
  }
}
