import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cliente } from "../model/cliente.model";
import { Injectable } from "@angular/core";
import { Endereco } from "../model/endereco.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class EnderecoService {

    private api: string = `${environment.apiURL}`;

    constructor(private http: HttpClient) { }

    findEnderecoById(codEndereco: number) {
        return this.http.get<Endereco>(this.api.concat("/endereco/find/"+codEndereco));
    }

    salvarEndereco(endereco: Endereco) {
        return this.http.post(this.api.concat("/endereco/salvar"),endereco);
    }

    deletarEndereco(codEndereco: number) {
        return this.http.delete<any>(this.api.concat("/endereco/delete/"+codEndereco));
    }


}