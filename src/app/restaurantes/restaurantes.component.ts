import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {

  public ofertas: Array<Oferta>;
  public dataTeste: any = new Date(2017, 8, 30);

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('restaurante')
      .then((ofertas: Array<Oferta>) => {
        console.log(ofertas);
        this.ofertas = ofertas;
      })
      .catch((param: any) => {
        console.log(param);
      });
  }

}
