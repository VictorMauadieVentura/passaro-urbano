import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Oferta } from '../shared/oferta.model';
import { Subject } from '../../../node_modules/rxjs/Subject';

import '../util/rxjs-extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa // Retorna Oferta[]
      .debounceTime(1000) // Pesquisa só ocorre após a liberação da ultima tecla
      .distinctUntilChanged() // Impede de fazer duas requisições com base no mesmo termo
      .switchMap((termo: string) => {
        console.log('Requisição HTTP para a API');
        if (termo.trim() === '') { // Trim elimina os espaços em branco da esquerda ou da direita deixando apenas o conteudo de uma string
          return Observable.of<Oferta[]>([]); // Passando um Observable de Array de Ofertas utilizando o método "of" do rxjs
        } else {
          return this.ofertasService.pesquisaOfertas(termo);
        }
      })
      .catch((err: any) => {
        console.log(err);
        return Observable.of<Oferta[]>([]); // Apesar do erro, para a aplicação não "quebrar" enviamos um Array de Ofertas vazio
      });

    /*
    Tudo isso foi subsituido por apenas o pipe async

    *ngFor="let oferta of ofertas2"

    public ofertas2: Oferta[];

    this.ofertas.subscribe((ofertas: Oferta[]) => {
      console.log(ofertas); // Caso não chegue um Array de Ofertas a aplicação "quebra"
      this.ofertas2 = ofertas;
    });
    */
  }

  public pesquisa(termoDaPesquisa: string): void {
    console.log('Keyup: ', termoDaPesquisa);
    this.subjectPesquisa.next(termoDaPesquisa);
  }

  public limpaPesquisa(): void {
    /*
      Quando subjectPesquisa receber o valor vazio na string ele entra no
      if (termo.trim() === '') retornando um Observable contendo um array vazio
    */
    this.subjectPesquisa.next('');
  }

  /*
  FORMA ANTIGA 02 DE RECUPERAR OS CAMPOS DIGITADOS

  public pesquisa(termoDaPesquisa: string): void {
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaPesquisa);

    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas),
      (erro: any) => console.log('Erro status: ', erro.status),
      () => console.log('Fluxo de eventos completo!')
    );
  }

  */

  /*
  FORMA ANTIGA 01 DE RECUPERAR OS CAMPOS DIGITADOS

  <input
    type="text"
    class="form-control"
    placeholder="Pesquise por ofertas"
    #termoDaPesquisa
    (keyup)="pesquisa($event)"
  >

  public pesquisa(event: Event): void {
    console.log((<HTMLIFrameElement>event.target).value);
  }
  */

}
