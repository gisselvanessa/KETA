import { Component, OnInit } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import { UserService } from './../../../moduleusers/services/user.service';
import { MessageService } from 'primeng/api';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-profile-tecnico',
  templateUrl: './profile-tecnico.component.html',
  styleUrls: ['./profile-tecnico.component.css']
})
export class ProfileTecnicoComponent implements OnInit {
  idUsuario:any
  usuarioData:any={};
  local_data:any={};
  avatar_name:string=''
  spinnerLoad: boolean = false;

  constructor(
    public userservice: UserService,
    private messageService: MessageService,
  ) { }
  async ngOnInit(): Promise<void> {
    await this.obtenerUsuario();
    await this.get_Usuario();

  }

  async obtenerUsuario() {
    const user = await firstValueFrom(
      this.userservice.get_usuario(String(localStorage.getItem('user')))
    );
    const { idusuario } = user;
    this.idUsuario = idusuario;

    
  }
  async get_Usuario() {
    try {
      this.usuarioData = await firstValueFrom(this.userservice.getUserById(this.idUsuario));
      this.local_data= this.usuarioData.data
      this.avatar_name= this.local_data.nombres.charAt(0).toUpperCase() + this.local_data.apellidos.charAt(0).toUpperCase()
      
    } catch (error) {
      console.error('Error al obtener datos de la persona:', error);
    }
  }

  updateDetail() {
    this.spinnerLoad=true;

    const usuarioUpdate:any = {
      "persona": {
        "celular": this.local_data.celular,
        "direccion": this.local_data.direccion,
        "idpersona": this.local_data.idpersona
      },
      "usuario": {
        "idusuario": this.local_data.idusuario
      }
    };
  
    if (this.local_data.password) {
      usuarioUpdate.usuario.password = this.local_data.password;
    }
  
    forkJoin([
      this.userservice.updateUser(usuarioUpdate.usuario),
      this.userservice.updatePerson(usuarioUpdate.persona)
    ]).subscribe(
      ([userData, personData]) => {
        // Verificar si se realizaron ambas actualizaciones con éxito
        if (userData && personData) {
          this.messageService.add({ severity: 'success', summary: 'Actualización exitosa', detail: 'La actualización de su información se realizó con éxito' });
          this.local_data = {};
          this.ngOnInit();
          this.spinnerLoad=false;

        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede realizar el registro' });
          this.spinnerLoad=false;

        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la información' });
        console.error('Error al obtener datos:', error);
        this.spinnerLoad=false;

      }
    );
  }
  formatTimestamp(timestamp: string): string {
    if (!timestamp) {
        return ''; // Devolver una cadena vacía si el timestamp es nulo o vacío
    }

    const date = parseISO(timestamp);
    if (!date) {
        return ''; // Devolver una cadena vacía si la fecha no se puede parsear
    }

    return format(date, 'yyyy-MM-dd HH:mm');
}

}
