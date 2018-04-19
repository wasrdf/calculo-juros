import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../model/cliente.model';
import { Endereco } from '../model/endereco.model';
import { EnderecoService } from '../service/endereco.service';
import { Message } from 'primeng/components/common/message';
import { ConfirmationService } from 'primeng/components/common/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ConfirmationService]

})
export class ClienteComponent implements OnInit {

  form: FormGroup;

  clientes: Array<Cliente>;

  cliente = new Cliente();

  endereco = new Endereco();

  displayDialog: boolean = false;

  labelMsg: Message[] = [];
  labelEndereco: Message[] = [];
  labelErro: Message[] = [];


  constructor(private clienteService: ClienteService, private enderecoService: EnderecoService, private confirmationService: ConfirmationService,private router: Router) { }

  ngOnInit() {
    //carrega a lista de clientes
    this.listarPessoas();
  }

  abrirSimulacao(c: Cliente) {
    this.router.navigateByUrl("app-simulacao/"+c.codigo);
  }


  novoCliente() {
    this.cliente = new Cliente();
    this.endereco = new Endereco();
    this.displayDialog = true;
  }



  listarPessoas() {
    this.clienteService.getAll().subscribe(c => {
      this.clientes = c;
    })
  }

  salvar(c: Cliente) {

    //valida os campos de informacoes pessoais se tudo estiver ok retorna TRUE.
    if (this.validarInformacoesPessoas()) {

      //valida os campos do endereço se tudo estiver ok retorna TRUE.
      if (this.validarEndereco()) {

        //adiciona o endereço na lista de enderecos do cliente.
        if (this.endereco.rua !== undefined) {
          this.cliente.endereco.push(this.endereco);
        }

        this.clienteService.salvar(c)
          .subscribe((data: Cliente[]) => {
            this.listarPessoas();
            this.displayDialog = false;
            this.labelMsg.push({ severity: 'info', summary: 'Sucesso', detail: 'Cliente salvo com sucesso!' })
          });
      }

    }
  }

  //deleta um endereço
  deletarEndereco(e: Endereco) {

    this.confirmationService.confirm({
      message: 'Você tem certeza que quer deletar esse endereço?',
      accept: () => {
        this.enderecoService.deletarEndereco(e.codigo).subscribe(e => {
          this.displayDialog = false;
          this.labelMsg.push({ severity: 'info', summary: 'Sucesso', detail: 'Endereço deletado com sucesso!' })
        });
      }
    });
  }

  //salva um endereço
  salvarEndereco(c: Cliente) {

    if (this.validarInformacoesPessoas()) {
      if (this.validarEndereco()) {

        if (this.endereco.rua !== undefined) {
          this.cliente.endereco.push(this.endereco);
        }


        this.clienteService.salvar(c)
          .subscribe((data: Cliente[]) => {
            this.endereco = new Endereco();
            this.listarPessoas();
            this.displayDialog = false;
            this.labelMsg.push({ severity: 'info', summary: 'Sucesso', detail: 'Endereço salvo com sucesso!' })
          });

      }
    }
  }


  //deleta um cliente junto com seus enderecos
  deletar(cliente: Cliente) {

    this.confirmationService.confirm({
      message: 'Você tem certeza que quer deletar esse cliente?',
      accept: () => {
        this.clienteService.deleteCliente(cliente.codigo).subscribe(c => {
          this.listarPessoas();
          this.labelMsg.push({ severity: 'info', summary: 'Sucesso', detail: 'Cliente deletado com sucesso!' })
        });
      }
    });
  }

  findById(c: Cliente) {
    this.clienteService.findClienteById(c.codigo).subscribe(cli => {
      this.cliente = cli;
    });
  }

  abrirDialogPessoa(c: Cliente) {
    this.endereco = new Endereco();
    this.clienteService.findClienteById(c.codigo).subscribe(cli => {
      this.cliente = cli;
    });
    this.displayDialog = true;
  }

  fechar() {
    this.displayDialog = false;
  }


  editarEndereco(e: Endereco) {

    this.enderecoService.findEnderecoById(e.codigo).subscribe(e => {
      this.endereco = e;
    });
    this.cliente.endereco = this.cliente.endereco.filter(end => end.codigo !== e.codigo);
  }



  validarInformacoesPessoas() {

    if (this.cliente.nome == null || this.cliente.nome.trim() == '') {
      this.labelErro.push({ severity: 'error', summary: 'Atenção', detail: 'Campo nome é obrigatório' });
      return false;
    }

    if (this.cliente.rendimentoMensal == null || this.cliente.rendimentoMensal <= 0) {
      this.labelErro.push({ severity: 'error', summary: 'Atenção', detail: 'Campo rendimento mensal é obrigatório' });
      return false;
    }

    return true;
  }

  validarEndereco() {

    if (this.cliente.endereco.length <= 0) {

      if (this.endereco.rua == undefined || this.endereco.rua.trim() == '') {
        this.labelErro.push({ severity: 'error', summary: 'Atenção', detail: 'Campo rua é obrigatório' });
        return false;
      }

      if (this.endereco.numero == undefined) {
        this.labelErro.push({ severity: 'error', summary: 'Atenção', detail: 'Campo número é obrigatório' });
        return false;
      }

      if (this.endereco.bairro == undefined || this.endereco.bairro.trim() == '') {
        this.labelErro.push({ severity: 'error', summary: 'Atenção', detail: 'Campo bairro é obrigatório' });
        return false;
      }

      if (this.endereco.cidade == undefined || this.endereco.cidade.trim() == '') {
        this.labelErro.push({ severity: 'error', summary: 'Atenção', detail: 'Campo cidade é obrigatório' });
        return false;
      }

      if (this.endereco.uf == undefined || this.endereco.uf.trim() == '') {
        this.labelErro.push({ severity: 'error', summary: 'Atenção', detail: 'Campo UF é obrigatório' });
        return false;
      }

    }

    return true;


  }

}
