import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { LinksService } from 'src/app/services/links.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  @ViewChild('dt1') dt1!: Table;

  columns: any[] = [];
  usuario: any = {};
  rolUser: any ;
  items: MenuItem[] = [];
  dash: MenuItem = {};
  items2: MenuItem[] = [];
  usuarioEscogido: any={}


  constructor(

    private userservice: UserService,

    private linkservice: LinksService,
    private router: Router,
  ) { }

  listaUsuarios: any = [];

  loading: boolean = true;



  ngOnInit(): void {
    this.items2 = [

      {
        icon: 'pi pi-pencil',
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Editar',
          tooltipPosition: 'top'
        },
        command: () => {
          this.editUser(this.usuarioEscogido);
          // this.messageService.add({ severity: 'info', summary: 'Crear Subtarea', detail: 'Ingrese usuario al que desea asignar subtarea' });
        }
      },
      
    ];
    this.getUsuario();
    
    this.get_all_vusers();

    //Elementos para el componente de prime ng - Breadcrumb

    this.items = [
      { label: 'Lista de usuarios' },
    ];

    this.dash = { 
      icon: 'pi pi-users', routerLink: '/home-ticket/list-users' 
    };

  }
  async getUsuario() {
    try {
        // Obtener el usuario
        const userId = localStorage.getItem('user');
        if (!userId) {
            throw new Error('No se encontró el ID de usuario en el almacenamiento local');
        }
        
        const usuario = await firstValueFrom(this.userservice.get_usuario(String(userId)));

        // Obtener el rol del usuario
        const rol = await firstValueFrom(this.linkservice.getUrl(usuario.idrol));
        this.rolUser = rol.idrol;
    } catch (error) {
        console.error('Error al obtener usuario:', error);
    }
}

  /**
   * Limpia los filtros aplicados a la tabla.
   * @param dt1 - Referencia a la tabla de PrimeNG
   */
  clear(dt1: Table) {

    dt1.filterGlobal('', 'contains');

  }




  /**
   * Obtiene la lista de todos los usuarios con información adicional.
   */
  async getAllUsers() {

    const usuariosPromise = new Promise((resolve, reject) => {

      this.userservice.get_all_usuarios().subscribe(res => {

        resolve(res)

      })

    })

    this.listaUsuarios = await usuariosPromise.then(res => res);

    this.listaUsuarios = await Promise.all(this.listaUsuarios.map(async (usuario: any) => {

      const { idrol, idpersona, idcargo, iddepartamento } = usuario;

      const rolPromise = this.linkservice.getUrl(idrol).toPromise();

      const rol: any = await rolPromise;

      const { nombrerol } = rol;

      usuario.nombrerol = nombrerol;


      const departamentoPromise = this.linkservice.getUrl(iddepartamento).toPromise();

      const departamento: any = await departamentoPromise;

      const { nombredepartamento, idsucursal } = departamento;


      const sucursalPromise = this.linkservice.getUrl(idsucursal).toPromise();

      const sucursal: any = await sucursalPromise;

      const { nombresucursal } = sucursal;


      usuario.nombredepartamento = nombredepartamento;

      usuario.nombresucursal = nombresucursal;


      const cargoPromise = this.linkservice.getUrl(idcargo).toPromise();

      const cargo: any = await cargoPromise;

      const { descripcioncargo } = cargo;

      usuario.descripcioncargo = descripcioncargo;


      this.columns = [

        { field: 'nombres', header: 'Nombres' },
        { field: 'apellidos', header: 'Apellidos' },
        { field: 'email', header: 'Email' },
        { field: 'rol', header: 'Rol' },
        { field: 'sucursal', header: 'Sucursal' },
        { field: 'departamento', header: 'Departamento' },
        { field: 'cargo', header: 'Cargo' },

      ];

      return usuario;

    }));

  }



  /**
   * Maneja el evento de filtro en la tabla.
   * @param event - Evento de filtro
   */
  handleFilter(event: Event) {

    const value = (event.target as HTMLInputElement).value;

    this.dt1.filterGlobal(value, 'contains');

  }



  /**
   * Obtiene la lista de todos los usuarios con información adicional y la asigna a la propiedad 'listaUsuarios'.
   */
  async get_all_vusers() {
    this.loading=true;

    this.listaUsuarios = await firstValueFrom(this.userservice.get_all_users())
    this.loading=false;

  }

  userEscogido(usuario: any) {
    this.usuarioEscogido=usuario;
    
  }
  editUser(userObj:any){
    const idUser= userObj.idusuario
    this.router.navigate([`home-ticket/list-users/${idUser}`]);
    
  }
  
}
