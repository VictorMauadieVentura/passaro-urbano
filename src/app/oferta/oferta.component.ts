import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {
    /*
      snapshot tira uma "foto", ele copia os parâmetros contidos na rota no momento em que a
      rota é acessada se esses parâmentros mudarem (Ex: http://oferta/5 para http://oferta/1)
      o snapshot não vai recuperar o valor e não vai atualizar a página.

      CÓDIGO ANTIGO

      this.ofertasService.getOfertasPorId(this.route.snapshot.params['id'])
      .then((oferta: Oferta) => {
        this.oferta = oferta;
      });

      Então para ele conseguir recuperar o parâmentro, ou seja, fazer um "subscribe" eu tenho
      que recuperar ActivatedRoute (this.route) e vou acessar o atrubuto params (this.route.params)
      o atributo params retorna um observable, então demos um subscribe nesse observable, e
      (this.route.params.subscribe) informamos como ele pode tratar o desparo de eventos,
      Como pode ser visto no código abaixo:

      OBS: Combinamos Promises com Observables no código abaixo.
    */

    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertasPorId(parametros.id)
        .then((oferta: Oferta) => {
          this.oferta = oferta;
        });
    });
  }

  ngOnDestroy() {

  }
}

/*
    TESTES OBSERVABLES

    IMPORTAÇÕES

    import { Observable } from '../../../node_modules/rxjs/Observable';
    import { Observer } from '../../../node_modules/rxjs/Observer';
    import '../../../node_modules/rxjs/Rx';
    import { Subscription } from '../../../node_modules/rxjs/Rx';

    CLASSES (ANTES DO CONTRUTOR)

    private tempoObservableSubscription: Subscription;
    private meuObservableTesteSubscription: Subscription;

    CÓDIGO

    this.route.params.subscribe(
      (parametro: any) => { console.log(parametro) }
      (erro: any) => console.log(erro),
      () => console.log('Processamento foi classificado como concluído!')
    );

    let tempo = Observable.interval(2000);
    this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
      console.log(intervalo);
    });

    // Observable (observável)
    let meuObservableTeste = Observable.create((observer: Observer<any>) => {
      observer.next('Primeiro evento da stream');
      observer.next('Segundo evento da stream');
      observer.next(1);
      observer.next(2);
      observer.complete();
      observer.error('Algum erro foi encontrado na stream de eventos!');
      observer.next(5);
    });


    // Observable (observador)
    this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (resultado: any) => console.log(resultado + 10),
      (erro: string) => console.log(erro),
      () => console.log('Stream de eventos foi finalizada')
    );
  }

  ngOnDestroy() {
    this.meuObservableTesteSubscription.unsubscribe();
    this.tempoObservableSubscription.unsubscribe();
  }
*/