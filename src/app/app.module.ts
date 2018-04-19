import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteService } from './service/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {TabViewModule} from 'primeng/tabview';
import { EnderecoService } from './service/endereco.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { SimulacaoComponent } from './simulacao/simulacao.component';
import { SimulacaoService } from './service/simulacao.service';



const appRoutes: Routes = [
  { path: 'app-cliente', component: ClienteComponent },
  { path: 'app-simulacao/:codigo', component: SimulacaoComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    SimulacaoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    TableModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TabViewModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,        
    
    
  ],
  providers: [ClienteService , EnderecoService , ConfirmationService,SimulacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
