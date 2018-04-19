import { Endereco } from "./endereco.model";

export class Cliente {

    codigo: number;
    nome:   string;
    rendimentoMensal: number;
    risco: string;
    endereco:  Endereco[] = [];

}