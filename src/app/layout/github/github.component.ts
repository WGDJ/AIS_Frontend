import { Component, OnInit} from '@angular/core';
import { routerTransition } from '../../router.animations';
import { GitHubService } from './services/github.service';
import { map, catchError, take, tap, debounceTime } from 'rxjs/operators';
import { empty } from 'rxjs';
import { Router, NavigationError } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AlertModalService } from '../shared/services/alert-modal.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss'],
  animations: [routerTransition()],
  preserveWhitespaces: true
})
export class GitHubComponent implements OnInit {

  loading: boolean;
  exibirTabela: boolean = false;
  formulario: FormGroup;
  resultado = null;

  colunas = [
    { field: 'name', header: 'Nome' }
  ];

  constructor(
    private githubService: GitHubService, 
    public router: Router, 
    private formBuilder: FormBuilder, 
    private alertService: AlertModalService) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationError) {
          router.navigate(['/error']);
        }
      });
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      usuario: ['', Validators.required]
    });
  }

  buscarRepos() {
    if (this.formulario.valid) {
      this.resultado = null;
      this.loading = true;
      this.githubService.findRepos(this.formulario.value.usuario)
        .pipe(
          take(1),
          map((result) => {
            this.colunas = [{ field: 'name', header: 'Nome Repositório' }];
            this.resultado = result;
          }),
          tap(_ => {
            this.loading = false
            if(Array.isArray(this.resultado) && this.resultado.length == 0 ){
              this.exibirTabela = false;
              this.alertService.showAlertSuccess('Não foram encontrados repositórios starred.');
            } else {
              this.exibirTabela = true;
            }
          }),
          catchError(error => {
            this.loading = false
            this.exibirTabela = false;
            this.resultado = null;
            this.alertService.showAlertDanger('Usuário não encontrado.');
            return empty();
          })
        ).subscribe();
    } else {
      this.verificaValidacoesFormulario(this.formulario);
    }
  }

  buscarStarred() {
    if (this.formulario.valid) {
      this.resultado = null;
      this.loading = true;
      this.githubService.findStarred(this.formulario.value.usuario)
        .pipe(
          take(1),
          map((result) => {
            this.colunas = [{ field: 'name', header: 'Nome Repositório Starred' }];
            this.resultado = result;
          }),
          tap(_ => {
            this.loading = false
            debugger
            if(Array.isArray(this.resultado) && this.resultado.length == 0 ){
              this.exibirTabela = false;
              this.alertService.showAlertSuccess('Não foram encontrados repositórios starred.');
            } else {
              this.exibirTabela = true;
            }
          }),
          catchError(error => {
            this.loading = false;
            this.exibirTabela = false;
            this.resultado = null;
            this.alertService.showAlertDanger('Usuário não encontrado.');
            return empty();
          })
        ).subscribe();
    } else {
      this.verificaValidacoesFormulario(this.formulario);
    }
  }

  verificaValidacoesFormulario(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesFormulario(controle);
      }
    });
  }
}