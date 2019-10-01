import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Usuario } from 'app/models/usuario';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent {
    usuario: Usuario = new Usuario();

    constructor(
        private service: AuthService,
        private toastr: ToastrService,
        private route: Router,
        private location: Location
    ) { }

    login() {
        this.service.login(this.usuario).subscribe(x => {
            localStorage.setItem('UsuarioToken', x.token);
            localStorage.setItem('UsuarioEmail', x.usuario.email);
            localStorage.setItem('UsuarioSenha', x.usuario.senha);
            this.route.navigateByUrl('/home');
        }, error => {
            this.toastr.error('Login e/ou senha incorretos');
        });
    }
    goBack() {
        this.location.back();
    }
}
