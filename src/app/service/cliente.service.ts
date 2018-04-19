import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cliente } from "../model/cliente.model";
import { Injectable } from "@angular/core";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ClienteService {

    private api: string = `${environment.apiURL}`;

    constructor(private http: HttpClient) { }

    salvar(cliente: Cliente) {
        return this.http.post(this.api.concat("/cliente/salvar"),cliente);
    }

    getAll() {
        return this.http.get<any>(this.api.concat("/cliente/getAll"));
    }

    findClienteById(codCliente: number) {
        return this.http.get<Cliente>(this.api.concat("/cliente/find/"+codCliente));
    }

    deleteCliente(codCliente: number) {
        return this.http.delete<any>(this.api.concat("/cliente/delete/"+codCliente));
    }

}