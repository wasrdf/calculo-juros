import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cliente } from "../model/cliente.model";
import { Injectable } from "@angular/core";
import { Endereco } from "../model/endereco.model";
import { Emprestimo } from "../model/emprestimo.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class SimulacaoService {

    private api: string = `${environment.apiURL}`;

    constructor(private http: HttpClient) { }

    simular(emprestimo: Emprestimo)  {
        return this.http.post<number>(this.api.concat("/simulacao/simular"),emprestimo);
    }

}