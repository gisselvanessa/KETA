import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../moduleusers/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../moduleusers/services/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.css']
})
export class OperadorComponent implements OnInit {

  usuarioLoggeado: string = "";



  constructor(private authservice:AuthService, private route: Router, private userService: UserService) { }


  
  async ngOnInit() {
    const userLog = await firstValueFrom(this.userService.get_usuario(String(localStorage.getItem('user'))))

    this.usuarioLoggeado = userLog.first_name +' '+ userLog.last_name;
    
  }


  logout(){

    this.authservice.logout();

    this.route.navigate(['']);

    localStorage.clear();

    localStorage.removeItem('auth_token');

    localStorage.removeItem('user');
  }

}
