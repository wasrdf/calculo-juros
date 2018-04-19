import { Component, OnInit, Input } from '@angular/core';
import { Emprestimo } from '../model/emprestimo.model';
import { Cliente } from '../model/cliente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SimulacaoService } from '../service/simulacao.service';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-simulacao',
  templateUrl: './simulacao.component.html',
  styleUrls: ['./simulacao.component.css']
})
export class SimulacaoComponent implements OnInit {

  emprestimo = new Emprestimo();

  valor: number;

  labelMsg: Message[] = [];

  constructor(private route: ActivatedRoute, private simulacaoService: SimulacaoService,private router: Router) { }

  ngOnInit() {

  }

  voltar() {
    this.router.navigateByUrl("/app-cliente");
  }

  simular() {
    //pega o codigo do cliente passado pela URL.
    this.emprestimo.codigoCliente = +this.route.snapshot.paramMap.get('codigo');
    this.simulacaoService.simular(this.emprestimo).subscribe(retorno => {
      this.labelMsg.push({ severity: 'info', summary: '', detail: 'Valor total a ser pago: ' + '[ R$ ' + retorno + ' ]' })
    });

  }

}
