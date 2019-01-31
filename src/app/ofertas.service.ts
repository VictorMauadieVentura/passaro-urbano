import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';
import { URL_API } from './app.api';
import { Observable } from '../../node_modules/rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

@Injectable()
export class OfertasService {

    constructor(private http: Http) { }

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Response) => resposta.json());
    }

    public getOfertasPorCategoria(categoria: string): Promise<Array<Oferta>> {
        // Cuidado com a _`_ não é "aspas simples" _'_
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => resposta.json());
    }

    public getOfertasPorId(id: number): Promise<Oferta> {
        // Cuidado com a _`_ não é "aspas simples" _'_
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                // resposta.json() retorna um Array de relação de objetos, por isso definimos um início [0]
                return resposta.json()[0];
            });
    }

    // O que está vindo com BD é um texto simples por isso a Promise<string>
    public getComoUsarOfertasPorId(id: number): Promise<string> {
        // Cuidado com a _`_ não é "aspas simples" _'_
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0].descricao;
            });
    }

    // O que está vindo com BD é um texto simples por isso a Promise<string>
    public getOndeFicaOfertasPorId(id: number): Promise<string> {
        // Cuidado com a _`_ não é "aspas simples" _'_
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0].descricao;
            });
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        // descricao_oferta é o campo que está lá no arquivo json
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
        // retry serve para tentar se realizar a conexão HTTP com o servidor, após as X tentativas ele mostra a mensagem de erro
        .retry(10)
        // reactivex.io/documentation/operators/map
        .map((resposta: Response) => resposta.json());
    }

    /*

    CODIGO ANTIGO

    public ofertas: Array<Oferta> = [
        {
            id: 1,
            categoria: "restaurante",
            titulo: "Super Burger",
            descricao_oferta: "Rodízio de Mini-hambúrger com opção de entrada.",
            anunciante: "Original Burger",
            valor: 29.90,
            destaque: true,
            imagens: [
                { url: "/assets/ofertas/1/img1.jpg" },
                { url: "/assets/ofertas/1/img2.jpg" },
                { url: "/assets/ofertas/1/img3.jpg" },
                { url: "/assets/ofertas/1/img4.jpg" }
            ]
        },
        {
            id: 2,
            categoria: "restaurante",
            titulo: "Cozinha Mexicana",
            descricao_oferta: "Almoço ou Jantar com Rodízio Mexicano delicioso.",
            anunciante: "Mexicana",
            valor: 32.90,
            destaque: true,
            imagens: [
                { url: "/assets/ofertas/2/img1.jpg" },
                { url: "/assets/ofertas/2/img2.jpg" },
                { url: "/assets/ofertas/2/img3.jpg" },
                { url: "/assets/ofertas/2/img4.jpg" }
            ]

        },
        {
            id: 4,
            categoria: "diversao",
            titulo: "Estância das águas",
            descricao_oferta: "Diversão garantida com piscinas, trilhas e muito mais.",
            anunciante: "Estância das águas",
            valor: 31.90,
            destaque: true,
            imagens: [
                { url: "/assets/ofertas/3/img1.jpg" },
                { url: "/assets/ofertas/3/img2.jpg" },
                { url: "/assets/ofertas/3/img3.jpg" },
                { url: "/assets/ofertas/3/img4.jpg" },
                { url: "/assets/ofertas/3/img5.jpg" },
                { url: "/assets/ofertas/3/img6.jpg" }
            ]
        }
    ]

    public getOfertas(): Array<Oferta> {
        return this.ofertas;
    }

    public getOfertas2(): Promise<Array<Oferta>> {
        return new Promise((resolve, reject) => {

            let deu_certo = true

            if (deu_certo) {
                setTimeout(() => resolve(this.ofertas), 3000)
            } else {
                reject({ codigo_erro: 404, mensagem_erro: 'Servidor não disponível!' })
            }

        })
            .then((ofertas: Array<Oferta>) => {
                // Fazer algum tratativa, por exemplo outra pesquisa no banco
                console.log('1º _then_')
                return ofertas
            })
            .then((ofertas: Array<Oferta>) => {
                // Fazer algum tratativa, por exemplo outra pesquisa no banco
                console.log('2º _then_')
                return new Promise((resolve_2, reject_2) => {
                    setTimeout(() => { resolve_2(ofertas) }, 3000)
                })
            })
            .then((ofertas: Array<Oferta>) => {
                console.log('3º _then_ executado após 3 segundos, pois estava aguardando uma _Promise_ ser resolvida')
                return ofertas
            })
    }

    */
}