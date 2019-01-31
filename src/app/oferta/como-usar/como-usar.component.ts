import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = '';

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {

    this.route.parent.params.subscribe((paramentros: Params) => {
      this.ofertasService.getComoUsarOfertasPorId(paramentros.id)
      .then((resposta: string) => {
        this.comoUsar = resposta;
      });
    });

    /*
    CÓDIGO ANTIGO

    // Recuperar dados da rota pai, no caso abaixo seria o dado do ID

    this.ofertasService.getComoUsarOfertasPorId(this.route.parent.snapshot.params['id'])
      .then((resposta: string) => {
        this.comoUsar = resposta;
      });
    */
  }

}
