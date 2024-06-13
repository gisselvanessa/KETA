import { Component, OnInit } from '@angular/core';
import {
  ConfirmEventType,
  ConfirmationService,
  MenuItem,
  MessageService,
} from 'primeng/api';
import { CanalesRecepciones } from '../models/CanalesRecepciones';
import { ClasesTarjetas } from '../models/ClasesTarjetas';
import { Conceptos } from './../models/Conceptos';
import { MarcasTarjetas } from './../models/MarcasTarjetas';
import { Prioridades } from '../models/Prioridades';
import { Tarjetas } from '../models/Tarjetas';
import { TicketTipos } from '../models/TicketTipos';
import { TiposComentarios } from '../models/TiposComentarios';
import { TiposProductos } from '../models/TiposProductos';
import { TiposTarjetas } from '../models/TiposTarjetas';
import { TiposTransacciones } from '../models/TiposTransacciones';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from '../../moduleusers/services/user.service';
import { TipoPersonas } from '../../moduleusers/models/TipoPersonas';
import { TipoIdentificacion } from '../../moduleusers/models/TipoIdentificacion';
import { Generos } from '../../moduleusers/models/Generos';
import { Departamentos } from '../../moduleusers/models/Departamentos';
import { Sucursales } from '../../moduleusers/models/Sucursales';
import { LinksService } from 'src/app/services/links.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css'],
})
export class TicketFormComponent implements OnInit {
  selectedCity: any = {};
  date6: any = Date;

  items: MenuItem[] = [];
  items2: MenuItem[] = [];
  activeIndex: number = 0;
  activeIndexAssign: number = 0;
  keyFikterLetras: RegExp = /^[A-Za-z\s]+$/;
  keyFilterEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  regexnumber: RegExp = /^[0-9]+$/;
  regexNumerosLetrasSinEspacios = /^[A-Za-z0-9]+$/;
  dash: MenuItem = {};
  data: any[] = [];
  canalesRecepciones: any = [];
  clasestarjetas: any = [];
  conceptos: any = [];
  conceptosObtenidos: any = [];
  marcasTarjetas: any = [];
  prioridades: any = [];
  tarjetas: any = [];
  ticketTipos: any = [];
  tiposcomentarios: any = [];
  tiposcomentariosReclamosGenerales: any = [];
  tiposcomentariosReclamos: any = [];
  tiposProductos: any = [];
  tiposTarjetas: any = [];
  tiposTransacciones: any = [];
  tipospersonas: any = [];
  tiposidentificacion: any = [];
  selectedOption: string = '';
  descripciontarea: string = '';
  descripcionarchivocedula: string = '';
  descripcionarchivoAbg: string = '';
  descripcionarchivoAdicional: string = '';
  generos: any = [];
  departamentos: any = [];
  departamentosregistro: any = [];
  departamentosReclamo: any = [];
  departamentosregistroReclamo: any = [];
  showtipoticket: number = 0;
  monto: number = 0;
  fechacreacion!: Date;
  mostrarModalAsignacion: boolean = false;
  spinnerLoad: boolean = false;
  tipoEstado: any = {};
  tipoEstadoNoAsignado: any = {};
  tipoEstadoAbierto: any = [];
  tipoEstadoPendiente: any = [];
  listaUsuarios: any = [];
  listaUsuariosOperador: any = [];
  listaPrincipalUsuariosReclamos: any = [];
  listaUsuariosReclamos: any = [];
  listaEstados: any = [];
  arrayArchivos: any = [];
  canalrecepcionseleccionada: CanalesRecepciones = {};
  clasetarjetaseleccionada: ClasesTarjetas = {};
  conceptoseleccionado: Conceptos = {};
  agenciareclamoseleccionado: any = {};
  marcatarjetaseleccionada: MarcasTarjetas = {};
  prioridadseleccionada: Prioridades = {};
  tarjetaseleccionada: Tarjetas = {};
  ticketiposeleccionada: TicketTipos = {};
  tipocomentarioseleccinada: TiposComentarios = {};
  tipoproductoseleccionado: TiposProductos = {};
  tipotarjetaseleccionada: TiposTarjetas = {};
  tipotransaccionseleccionada: TiposTransacciones = {};
  tipopersonaseleccionada: TipoPersonas = {};
  personaseleccionada: TipoPersonas = {};
  identificacionseleccionada: TipoIdentificacion = {};
  generoseleccionado: Generos = {};
  departamentoseleccionado: Departamentos = {};
  departamentoreclamoseleccionado: Departamentos = {};
  sucursales: any = [];
  sucursalseleccionada: Sucursales = {};
  usuarioseleccionado: any = {};
  usuarioreclamoseleccionado: any = {};
  estadoseleccionado: any = {};
  uploadedFiles: any[] = [];
  numeroidentificacion: string = '';
  name: string = '';
  apellidos: string = '';
  direccion: string = '';
  celular: string = '';
  telefono: string = '';
  extension: string = '';
  email: string = '';
  descripcion: string = '';
  descripcionservicio: string = '';
  nrotarjeta: string = '';
  nrotarjetahide: string = '';
  asunto: string = '';
  archivo: string = '';
  idUsuario: string = '';
  idTarea: any;
  ticketCreado: any = [];
  listFormulario: any = [];
  mostrarModalReasignacion: boolean = false;
  arrayformData: FormData[] = [];
  arrayformDataJSON: any[] = [];
  maxDniLength: number = 1;
  minDniLength: number = 1;
  myfilesCedula: any[] = [];
  myfilesAbg: any[] = [];
  myfilesAdicional: any[] = [];
  myfiles: any[] = [];
  descripcionArchivoFirma: string = '';
  spinnerLoad2: boolean = false;
  uploadCedula: boolean = false;
  uploadAbg: boolean = false;
  listaArchivos: any = [];
  mostrarModalArchivos: boolean = false;
  cargandoArchivos: boolean = false;

  constructor(
    private ticketservice: TicketService,
    private userservice: UserService,
    private messageService: MessageService,
    private linkservice: LinksService,
    private confirmationService: ConfirmationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.obtenerCanalRecepcion();
    this.obtenerClaseTarjeta();
    this.obtenerConcepto();
    this.obtenerMarcaTarjeta();
    this.obtenerPrioridades();
    this.obtenerTarjeta();
    this.obtenerTicketTipo();
    this.obtenerTipoComentario();
    this.obtenerTipoProducto();
    this.obtenerTipoTarjeta();
    this.obtenerTipoTransaccion();
    this.obtenerTipoPersona();
    this.obtenerTipoIdentificacion();
    this.obtenerGenero();
    this.obtenerDepartamento();
    this.obtenerDepartamentoReclamo();
    this.obtenerSucursal();
    this.obtenerUsuario();
    this.getAllUsers();
    this.obtenerEstado();

    this.items = [{ label: 'Tickets' }, { label: 'Crear ticket' }];
    this.items2 = [
      { label: 'Sucursal' },
      { label: 'Datos' },
      { label: 'Reclamo' },
      { label: 'Documentos' },
      { label: 'Confirmación' },
      { label: 'Firma' },
    ];

    this.dash = {
      icon: 'fa-solid fa-ticket',
      routerLink: '/home-ticket/ticket-form',
    };

    this.data = [
      {
        sucursalseleccionada: {
          nombresucursal: this.sucursalseleccionada?.nombresucursal,
        },
        personaseleccionada: {
          descripciontipopersona:
            this.personaseleccionada?.descripciontipopersona,
        },
        identificacionseleccionada: {
          descripciontipoidentificacion:
            this.identificacionseleccionada?.descripciontipoidentificacion,
        },
        numeroidentificacion: this.numeroidentificacion,
        name: this.name,
        apellidos: this.apellidos,
        generoseleccionado: {
          descripciongenero: this.generoseleccionado?.descripciongenero,
        },
        email: this.email,
        celular: this.celular,
        telefono: this.telefono,
        direccion: this.direccion,
      },
    ];
  }

  cambiarMaxlengthDni() {
    switch (this.identificacionseleccionada.codigotipoidentificacion) {
      case 'C':
        this.maxDniLength = 10;
        this.minDniLength = 10;
        break;
      case 'R':
        this.maxDniLength = 13;
        this.minDniLength = 13;

        break;
      case 'P':
        this.maxDniLength = 50;
        this.minDniLength = 7;

        break;
      case 'F':
        this.maxDniLength = 50;
        this.minDniLength = 7;


        break;
      case 'X':
        this.maxDniLength = 50;
        this.minDniLength = 7;

        break;
      default:
        this.maxDniLength = 1;
        this.minDniLength = 1;

    }
  }
  concatenateLabel(user: any): string {
    return `${user.first_name} - ${user.email}`;
  }
  ocultarNumerosIntermedios(): string {
    if (this.nrotarjeta && this.nrotarjeta.length === 16) {
      const primerosCuatro = this.nrotarjeta.substring(0, 4);
      const ultimosCuatro = this.nrotarjeta.substring(12);
      const asteriscos = '********';
      this.nrotarjetahide = `${primerosCuatro}${asteriscos}${ultimosCuatro}`;
      return this.nrotarjetahide;
    } else {
      return this.nrotarjeta;
    }
  }
  async agenciaReclamoObtenida() {
    const { url } = this.agenciareclamoseleccionado;

    if (url) {
      this.departamentosReclamo = this.departamentosregistroReclamo.filter(
        (departamento: any) => {
          return departamento.idsucursal == url;
        }
      );
    }
  }

  async departamentoReclamoObtenido() {
    const { url } = this.departamentoreclamoseleccionado;

    this.listaUsuariosReclamos = this.listaPrincipalUsuariosReclamos.filter(
      (usuario: any) => {
        return usuario.iddepartamento == url;
      }
    );
  }

  async getAllUsers() {
    this.userservice.get_all_usuarios().subscribe({
      next: (data: any) => {
        this.listaPrincipalUsuariosReclamos = data;
      },
    });

    this.userservice.get_all_vusers().subscribe({
      next: (data: any) => {
        this.listaUsuarios = data;
      },
    });
  }

  async obtenerTipoIdentificacion() {
    const tipoidentifacionPromise = new Promise((resolve, reject) => {
      this.userservice.getTipoIdentificacion().subscribe((res) => {
        resolve(res);
      });
    });
    this.tiposidentificacion = await tipoidentifacionPromise.then((res) => res);
  }
  async obtenerTipoPersona() {
    const persona = new Promise((resolve, reject) => {
      this.userservice.getTipoPersona().subscribe((res) => {
        resolve(res);
      });
    });
    this.tipospersonas = await persona.then((res) => res);
  }

  async obtenerGenero() {
    const genero = new Promise((resolve, reject) => {
      this.userservice.getGeneros().subscribe((res) => {
        resolve(res);
      });
    });
    this.generos = await genero.then((res) => res);
  }

  /**
   * Esta función obtiene la lista de departamentos.
   */
  async obtenerDepartamento() {
    const departamento = new Promise((resolve, reject) => {
      this.userservice.getDepartamentos().subscribe((res) => {
        resolve(res);
      });
    });
    this.departamentosregistro = await departamento.then((res) => res);
  }

  async obtenerDepartamentoReclamo() {
    const departamento = new Promise((resolve, reject) => {
      this.userservice.getDepartamentos().subscribe((res) => {
        resolve(res);
      });
    });
    this.departamentosregistroReclamo = await departamento.then((res) => res);
  }

  async obtenerSucursal() {
    const sucursal = new Promise((resolve, reject) => {
      this.userservice.getSucursales().subscribe((res) => {
        resolve(res);
      });
    });
    this.sucursales = await sucursal.then((res) => res);
  }

  async sucursalobtenida() {
    const { codigosucursal } = this.sucursalseleccionada;

    if (codigosucursal) {
      this.activeIndex = 1;

      this.departamentos = this.departamentosregistro.filter(
        (departamento: any) => {
          return departamento.idsucursal == codigosucursal;
        }
      );
    }
  }

  async obtenerCanalRecepcion() {
    const canal = new Promise((resolve, reject) => {
      this.ticketservice.getCanalesRecepciones().subscribe((res) => {
        resolve(res);
      });
    });
    this.canalesRecepciones = await canal.then((res) => res);
  }

  async obtenerClaseTarjeta() {
    const clasetarjeta = new Promise((resolve, reject) => {
      this.ticketservice.getClasesTarjetas().subscribe((res) => {
        resolve(res);
      });
    });
    this.clasestarjetas = await clasetarjeta.then((res) => res);
  }

  async obtenerConcepto() {
    const concepto = new Promise((resolve, reject) => {
      this.ticketservice.getConceptos().subscribe((res) => {
        resolve(res);
      });
    });

    this.conceptosObtenidos = await concepto.then((res) => res);
  }

  async obtenerMarcaTarjeta() {
    const marcatarjeta = new Promise((resolve, reject) => {
      this.ticketservice.getMarcasTarjetas().subscribe((res) => {
        resolve(res);
      });
    });
    this.marcasTarjetas = await marcatarjeta.then((res) => res);
  }

  async obtenerPrioridades() {
    const prioridad = new Promise((resolve, reject) => {
      this.ticketservice.getPrioridades().subscribe((res) => {
        resolve(res);
      });
    });
    this.prioridades = await prioridad.then((res) => res);
  }

  async obtenerTarjeta() {
    const tarjeta = new Promise((resolve, reject) => {
      this.ticketservice.getTarjetas().subscribe((res) => {
        resolve(res);
      });
    });
    this.tarjetas = await tarjeta.then((res) => res);
  }

  async obtenerTicketTipo() {
    const tickettipo = new Promise((resolve, reject) => {
      this.ticketservice.getTicketTipos().subscribe((res) => {
        resolve(res);
      });
    });
    this.ticketTipos = await tickettipo.then((res) => res);
  }

  async obtenerTipoComentario() {
    const tipocomentario = new Promise((resolve, reject) => {
      this.ticketservice.getTiposComentarios().subscribe((res) => {
        resolve(res);
      });
    });
    this.tiposcomentarios = await tipocomentario.then((res) => res);

    this.tiposcomentariosReclamos = this.tiposcomentarios.filter(
      (comentario: any) => {
        return (
          comentario.idtipocomentario != 4 && comentario.idtipocomentario != 5
        );
      }
    );
    this.tiposcomentariosReclamosGenerales = this.tiposcomentarios.filter(
      (comentario: any) => {
        return (
          comentario.idtipocomentario == 1 ||
          comentario.idtipocomentario == 4 ||
          comentario.idtipocomentario == 5
        );
      }
    );
  }

  async obtenerTipoProducto() {
    const tipoproducto = new Promise((resolve, reject) => {
      this.ticketservice.getTiposProductos().subscribe((res) => {
        resolve(res);
      });
    });
    this.tiposProductos = await tipoproducto.then((res) => res);
  }
  /**
   * Se obtiene el estado asignado
   */
  async obtenerEstado() {
    this.tipoEstado = await firstValueFrom(this.userservice.getEstadosId(3));

    this.tipoEstadoNoAsignado = await firstValueFrom(
      this.userservice.getEstadosId(1)
    );

    this.tipoEstadoPendiente = await firstValueFrom(
      this.userservice.getEstadosId(2)
    );

    this.listaEstados = [this.tipoEstadoNoAsignado, this.tipoEstadoPendiente];
  }

  async listarTipoConcepto() {
    const { url } = this.tipoproductoseleccionado;

    this.conceptos = this.conceptosObtenidos.filter((data: any) => {
      return data.idtipoproducto == url;
    });
  }

  async obtenerTipoTarjeta() {
    const tipotarjeta = new Promise((resolve, reject) => {
      this.ticketservice.getTiposTarjetas().subscribe((res) => {
        resolve(res);
      });
    });
    this.tiposTarjetas = await tipotarjeta.then((res) => res);
  }

  async obtenerTipoTransaccion() {
    const tipotransaccion = new Promise((resolve, reject) => {
      this.ticketservice.getTiposTransacciones().subscribe((res) => {
        resolve(res);
      });
    });
    this.tiposTransacciones = await tipotransaccion.then((res) => res);
  }

  onBasicUploadAuto(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  regresarSucursal() {
    this.activeIndex = 0;
    this.sucursalseleccionada = {};
    // this.limpiarCampos();
  }

  limpiarCamposReclamos() {
    this.descripcion = '';
    this.monto = 0;
    this.prioridadseleccionada = {};
    this.tipocomentarioseleccinada = {};
    this.canalrecepcionseleccionada = {};
    this.tipotransaccionseleccionada = {};
    this.ticketiposeleccionada = {};
    this.tipoproductoseleccionado = {};
    this.conceptoseleccionado = {};
    this.marcatarjetaseleccionada = {};
    this.tipotarjetaseleccionada = {};
    this.clasetarjetaseleccionada = {};
    this.agenciareclamoseleccionado = {};
    this.usuarioreclamoseleccionado = {};
    this.departamentoreclamoseleccionado = {};
    this.descripcionservicio = '';
    this.asunto = '';
    this.showtipoticket = 0;
  }

  // regresarDatosCobrosIndebidos() {
  //   this.activeIndex = 1;
  //   this.tipoproductoseleccionado = {}
  //   this.conceptoseleccionado = {};
  //   // this.limpiarCamposReclamos();
  // }

  // regresarDatosReclamosTarjetas() {
  //   this.marcatarjetaseleccionada = {};
  //   this.tipotarjetaseleccionada = {};
  //   this.clasetarjetaseleccionada = {};
  //   // this.limpiarCamposReclamos();
  //   this.activeIndex = 1;
  // }

  // regresarDatosReclamosGenerales() {
  //   this.activeIndex = 1;
  //   this.tipoproductoseleccionado = {}
  //   this.conceptoseleccionado = {};
  //   // this.limpiarCamposReclamos();
  // }

  // regresarDatosQuejas() {
  //   this.descripcion = '';
  //   this.prioridadseleccionada = {};
  //   this.activeIndex = 1;
  // }

  regresarDatos() {
    this.activeIndex = 1;
    // this.tipoproductoseleccionado = {}
    // this.conceptoseleccionado = {};
    // this.marcatarjetaseleccionada = {};
    // this.tipotarjetaseleccionada = {};
    // this.clasetarjetaseleccionada = {};
    // this.descripcion = '';
    // this.prioridadseleccionada = {};
  }

  limpiarCampos() {
    this.sucursalseleccionada = {};
    this.apellidos = '';
    this.generoseleccionado = {};
    this.identificacionseleccionada = {};
    this.personaseleccionada = {};
    this.numeroidentificacion = '';
    this.name = '';
    this.email = '';
    this.celular = '';
    this.telefono = '';
    this.extension = '';
    this.direccion = '';
    this.departamentoseleccionado = {};
    this.email = '';
    this.usuarioseleccionado = {};
    this.estadoseleccionado = {};
  }

  siguienteDocumentos() {
    if (
      this.tipotransaccionseleccionada.codigotipotransaccion != null &&
      this.canalrecepcionseleccionada.codigocanalrecepcion != null &&
      this.ticketiposeleccionada.idtipoticket != null &&
      this.tipoproductoseleccionado.codigotipoproducto != null &&
      this.conceptoseleccionado.codigoconcepto != null &&
      this.descripcion != '' &&
      this.monto != null &&
      this.prioridadseleccionada.codigoprioridad != null &&
      this.tipocomentarioseleccinada.codigotipocomentario != null
    ) {
      this.activeIndex = 3;
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Hay campos vacíos',
        detail: 'No se puede realizar el registro',
      });
    }
  }

  siguienteConfirmacion() {
    if (this.uploadCedula) {
      this.activeIndex = 4;
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campo obligatorio',
        detail: 'La cédula es requerida',
      });
    }
  }

  siguienteReclamo() {
    if (
      this.personaseleccionada.idtipopersona !== null &&
      this.identificacionseleccionada.idtipoidentificacion !== null &&
      this.numeroidentificacion !== null &&
      this.numeroidentificacion.length >= this.minDniLength &&
      this.numeroidentificacion.length <= this.maxDniLength &&
      this.name !== '' &&
      this.apellidos !== '' &&
      this.generoseleccionado.idgenero !== null &&
      this.email !== '' &&
      this.direccion !== ''
    ) {
      this.activeIndex = 2;
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Hay campos vacíos o incorrectos',
        detail: 'No se puede continuar con el registro',
      });
    }
  }

  async obtenerUsuario() {
    const user = await firstValueFrom(
      this.userservice.get_usuario(String(localStorage.getItem('user')))
    );
    const { url } = user;
    this.idUsuario = url;
  }

  obtenerIdTipoTicket() {
    const { idtipoticket } = this.ticketiposeleccionada;
    this.showtipoticket = idtipoticket ?? 0;
  }

  siguienteConfCobrosIndebidos(tipo: any) {
    if (tipo.idtipoticket == 1) {
      if (
        this.tipotransaccionseleccionada.codigotipotransaccion != null &&
        this.canalrecepcionseleccionada.codigocanalrecepcion != null &&
        this.ticketiposeleccionada.idtipoticket != null &&
        this.tipoproductoseleccionado.codigotipoproducto != null &&
        this.conceptoseleccionado.codigoconcepto != null &&
        this.descripcion != '' &&
        this.monto != null &&
        this.prioridadseleccionada.codigoprioridad != null &&
        this.tipocomentarioseleccinada.codigotipocomentario != null
      ) {
        this.activeIndex = 3;
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Hay campos vacíos',
          detail: 'No se puede realizar el registro',
        });
      }
    } else if (tipo.idtipoticket == 2) {
      if (
        this.marcatarjetaseleccionada.codigomarcatarjeta != null &&
        this.tipotarjetaseleccionada.codigotipotarjeta != null &&
        this.clasetarjetaseleccionada.codigoclasetarjeta != null &&
        this.descripcion != '' &&
        this.monto != null &&
        this.prioridadseleccionada.codigoprioridad != null &&
        this.tipocomentarioseleccinada.codigotipocomentario != null
      ) {
        this.activeIndex = 3;
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Hay campos vacíos',
          detail: 'No se puede realizar el registro',
        });
      }
    } else if (tipo.idtipoticket == 3) {
      if (
        // this.usuarioreclamoseleccionado != null &&
        this.descripcionservicio != '' &&
        this.agenciareclamoseleccionado &&
        Object.keys(this.agenciareclamoseleccionado).length !== 0 &&
        this.descripcion != '' &&
        this.prioridadseleccionada.codigoprioridad != null &&
        this.tipocomentarioseleccinada.codigotipocomentario != null
      ) {
        this.activeIndex = 3;
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Hay campos vacíos',
          detail: 'No se puede realizar el registro',
        });
      }
    } else if (tipo.idtipoticket == 4) {
      if (this.prioridadseleccionada.codigoprioridad != null) {
        this.activeIndex = 3;
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Hay campos vacíos',
          detail: 'No se puede realizar el registro',
        });
      }
    } else if (tipo.idtipoticket == null) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Tipo de reclamo vacío',
        detail: 'Escoja un tipo de reclamo',
      });
    }
  }

  // siguienteConfReclamosTarjetas() {
  //   if (this.marcatarjetaseleccionada.codigomarcatarjeta != null &&
  //     this.tipotarjetaseleccionada.codigotipotarjeta != null &&
  //     this.clasetarjetaseleccionada.codigoclasetarjeta != null &&
  //     this.descripcion != '' &&
  //     this.monto != null &&
  //     this.prioridadseleccionada.codigoprioridad != null &&
  //     this.tipocomentarioseleccinada.codigotipocomentario != null
  //   ) {
  //     this.activeIndex = 3;
  //   }
  //   else {
  //     this.messageService.add({ severity: 'warn', summary: 'Hay campos vacíos', detail: 'No se puede realizar el registro' });
  //   }
  // }

  // siguienteConfReclamosGenerales() {
  //   if (
  //     this.usuarioreclamoseleccionado != null &&
  //     this.descripcionservicio != '' &&
  //     this.descripcion != '' &&
  //     this.prioridadseleccionada.codigoprioridad != null &&
  //     this.tipocomentarioseleccinada.codigotipocomentario != null
  //   ) {
  //     this.activeIndex = 3;
  //   }
  //   else {
  //     this.messageService.add({ severity: 'warn', summary: 'Hay campos vacíos', detail: 'No se puede realizar el registro' });
  //   }
  // }

  // siguienteConfirmacionQuejas() {
  //   if (
  //     this.prioridadseleccionada.codigoprioridad != null
  //   ) {
  //     this.activeIndex = 3;
  //   }
  //   else {
  //     this.messageService.add({ severity: 'warn', summary: 'Hay campos vacíos', detail: 'No se puede realizar el registro' });
  //   }
  // }

  regresarReclamos() {
    this.activeIndex = 2;
    // this.tipoproductoseleccionado = {}
    // this.conceptoseleccionado = {};
    // this.marcatarjetaseleccionada = {};
    // this.tipotarjetaseleccionada = {};
    // this.clasetarjetaseleccionada = {};
    // this.descripcion = '';
    // this.prioridadseleccionada = {};
    // this.showtipoticket = 0;
    // this.limpiarCamposReclamos();
  }
  regresarDocumentos() {
    this.activeIndex = 3;
  }
  regresarConfirmación() {
    this.activeIndex = 4;
  }

  async guardarTicket() {
    this.spinnerLoad = true;
    const usuarioObtenido = await firstValueFrom(
      this.userservice.get_usuario(String(localStorage.getItem('user')))
    );

    const { url } = usuarioObtenido;

    if (this.showtipoticket == 2) {
      const ticketRegistro = {
        persona: {
          idtipopersona: this.personaseleccionada.url,
          idtipoidentificacion: this.identificacionseleccionada.url,
          identificacion: this.numeroidentificacion,
          nombre: this.name,
          apellido: this.apellidos,
          idgenero: this.generoseleccionado.url,
          emailcliente: this.email,
          celular: this.celular,
          telefono: this.telefono,
          direccion: this.direccion,
        },
        ticket: {
          descripcionasunto: this.descripcion,
          monto: this.monto,
          idusuario: url,
          idtipotransaccion: this.tipotransaccionseleccionada.url,
          idtipocomentario: this.tipocomentarioseleccinada.url,
          idcanalrecepcion: this.canalrecepcionseleccionada.url,
          idtipoticket: this.ticketiposeleccionada.url,
          idconcepto: this.conceptoseleccionado.url,
          idtarjeta: this.tarjetaseleccionada.url,
          idprioridad: this.prioridadseleccionada.url,
          idsucursal: this.sucursalseleccionada.url,
        },
        tarjeta: {
          idmarcatarjeta: this.marcatarjetaseleccionada.url,
          idtipotarjeta: this.tipotarjetaseleccionada.url,
          idclasetarjeta: this.clasetarjetaseleccionada.url,
          numerotarjeta: this.nrotarjeta,
        },
      };

      const crearTicketPromise = new Promise((resolve, reject) => {
        this.ticketservice.createTicket(ticketRegistro).subscribe({
          next: (res: any) => {
            resolve(res);

            this.spinnerLoad = false;
          },
          error: (err: any) => {
            reject(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Ticket no creado',
              detail: 'El ticket no se ha creado correctamente',
            });
            this.spinnerLoad = false;
            this.regresarConfirmación();
          },
        });
      });
      const ticketCreado: any = await crearTicketPromise.then((res) => res);

      if (ticketCreado) {
        this.messageService.add({
          severity: 'success',
          summary: 'Ticket creado!',
          detail: 'El ticket se creo correctamente',
        });
        this.asignarTicketOperador();
        this.cerrarCreacionTicket();
        this.limpiarCampos();
        this.limpiarCamposReclamos();
        this.ticketCreado = ticketCreado;

        this.spinnerLoad = false;
      } else {
        // this.limpiarCampos();
        // this.limpiarCamposReclamos();
        this.regresarConfirmación();

        this.messageService.add({
          severity: 'error',
          summary: 'Ticket no creado',
          detail: 'El ticket no se ha creado',
        });
        this.spinnerLoad = false;
      }
    } else if (this.showtipoticket == 3) {
      const ticketRegistro = {
        persona: {
          idtipopersona: this.personaseleccionada.url,
          idtipoidentificacion: this.identificacionseleccionada.url,
          identificacion: this.numeroidentificacion,
          nombre: this.name,
          apellido: this.apellidos,
          idgenero: this.generoseleccionado.url,
          emailcliente: this.email,
          celular: this.celular,
          telefono: this.telefono,
          direccion: this.direccion,
        },
        ticket: {
          descripcionasunto: this.descripcion,
          monto: this.monto,
          idusuario: url,
          idtipotransaccion: this.tipotransaccionseleccionada.url,
          idtipocomentario: this.tipocomentarioseleccinada.url,
          idcanalrecepcion: this.canalrecepcionseleccionada.url,
          idtipoticket: this.ticketiposeleccionada.url,
          idconcepto: this.conceptoseleccionado.url,
          idprioridad: this.prioridadseleccionada.url,
          idsucursal: this.sucursalseleccionada.url,
          idsucursalproblema: this.agenciareclamoseleccionado.url,
          idddepartamentoproblema: this.departamentoreclamoseleccionado.url,
          idusuarioproblema: this.usuarioreclamoseleccionado
            ? this.usuarioreclamoseleccionado.url
            : '', //reclamos generales
          servicio: this.descripcionservicio, //reclamos generales
        },
      };

      const crearTicketPromise = new Promise((resolve, reject) => {
        this.ticketservice.createTicket(ticketRegistro).subscribe({
          next: (res: any) => {
            resolve(res);

            this.messageService.add({
              severity: 'success',
              summary: 'Ticket creado!',
              detail: 'El ticket se creo correctamente',
            });
            this.spinnerLoad = false;
          },
          error: (err: any) => {
            reject(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Ticket no creado',
              detail: 'El ticket no se ha creado',
            });
            this.spinnerLoad = false;
            this.regresarConfirmación();
          },
        });
      });
      const ticketCreado: any = await crearTicketPromise.then((res) => res);

      if (ticketCreado) {
        this.asignarTicketOperador();
        this.cerrarCreacionTicket(), this.limpiarCampos();
        this.limpiarCamposReclamos();
        this.ticketCreado = ticketCreado;

        this.spinnerLoad = false;
      } else {
        // this.limpiarCampos();
        // this.limpiarCamposReclamos();
        this.regresarConfirmación();

        this.messageService.add({
          severity: 'error',
          summary: 'Ticket no creado',
          detail: 'El ticket no se ha creado3',
        });
        this.spinnerLoad = false;
      }
    } else {
      //CONTROL DE DOCUMENTOS
      const ticketRegistro = {
        persona: {
          idtipopersona: this.personaseleccionada.url,
          idtipoidentificacion: this.identificacionseleccionada.url,
          identificacion: this.numeroidentificacion,
          nombre: this.name,
          apellido: this.apellidos,
          idgenero: this.generoseleccionado.url,
          emailcliente: this.email,
          celular: this.celular,
          telefono: this.telefono,
          direccion: this.direccion,
        },
        ticket: {
          descripcionasunto: this.descripcion,
          monto: this.monto,
          idusuario: url,
          idtipotransaccion: this.tipotransaccionseleccionada.url,
          idtipocomentario: this.tipocomentarioseleccinada.url,
          idcanalrecepcion: this.canalrecepcionseleccionada.url,
          idtipoticket: this.ticketiposeleccionada.url,
          idconcepto: this.conceptoseleccionado.url,
          idprioridad: this.prioridadseleccionada.url,
          idsucursal: this.sucursalseleccionada.url,
        },
      };

      const crearTicketPromise = new Promise((resolve, reject) => {
        this.ticketservice.createTicket(ticketRegistro).subscribe({
          next: (res: any) => {
            resolve(res);

            this.messageService.add({
              severity: 'success',
              summary: 'Ticket creado!',
              detail: 'El ticket se creo correctamente',
            });
            this.spinnerLoad = false;
          },
          error: (err: any) => {
            reject(err);
            this.regresarConfirmación();

            this.messageService.add({
              severity: 'error',
              summary: 'Ticket no creado',
              detail: 'El ticket no se ha creado',
            });
            this.spinnerLoad = false;
          },
        });
      });
      const ticketCreado: any = await crearTicketPromise.then((res) => res);

      if (ticketCreado) {
        this.asignarTicketOperador();
        this.cerrarCreacionTicket();
        this.limpiarCampos();
        this.limpiarCamposReclamos();
        this.ticketCreado = ticketCreado;

        this.spinnerLoad = false;
      } else {
        // this.limpiarCampos();
        // this.limpiarCamposReclamos();
        this.regresarConfirmación();

        this.messageService.add({
          severity: 'error',
          summary: 'Ticket no creado',
          detail: 'El ticket no se ha creado',
        });
        this.spinnerLoad = false;
      }
    }
    this.showtipoticket = 0;
  }

  cancelar() {
    this.limpiarCampos();
    this.limpiarCamposReclamos();
    this.showtipoticket = 0;
    this.activeIndex = 0;
    this.descripciontarea = '';
    this.usuarioseleccionado = {};
    this.messageService.add({
      severity: 'error',
      summary: 'Ticket no creado',
      detail: 'Se canceló el proceso de creación de ticket',
    });
    this.spinnerLoad = false;
    this.arrayformDataJSON = [];
  }

  async asignarTicketOperador() {
    const idestadopendiente = await firstValueFrom(
      this.userservice.getEstadosId(2)
    );
    const { url: urlPendiente } = idestadopendiente;
    const {
      ticket: { url, idtipoticket, numeroticket },
    } = this.ticketCreado;
    const descripcionTarea = await firstValueFrom(
      this.linkservice.getUrl(idtipoticket)
    );
    const tareas = {
      descripciontarea:
        'Tarea: ' +
        descripcionTarea.descripciontipoticket +
        ' ' +
        numeroticket.slice(0, 5),
      indicador: 'P',
      idestado: urlPendiente,
      idproblema: url,
      idusuarioqasigno: this.idUsuario,
    };

    this.ticketservice.crearTarea(tareas).subscribe(
      (res) => {
        if (this.arrayformData.length > 0) {
          this.arrayformData = this.arrayformData.map((formdata: FormData) => {
            formdata.set('idtarea', res.url);

            return formdata;
          });
          this.subirArchivos();
        }
        this.idTarea = res; //asignar id tarea
        if (descripcionTarea.idtipoticket !== 4) {
          this.downloadReporte(res.idtarea);
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Tarea no asignada',
          detail: 'El ticket no se ha asignado correctamente',
        });
      }
    );
  }

  async actualizarEstadoTicket() {
    this.spinnerLoad = true;
    const {
      ticket: { url, idtipoticket, numeroticket },
    } = this.ticketCreado;
    const descripcionTarea = await firstValueFrom(
      this.linkservice.getUrl(idtipoticket)
    );
    const tareas = {
      descripciontarea:
        'Tarea: ' +
        descripcionTarea.descripciontipoticket +
        ' ' +
        numeroticket.slice(0, 5),
      indicador: 'P',
      idestado: this.estadoseleccionado.url,
      idproblema: url,
      idusuarioqasigno: this.idUsuario,
    };

    this.ticketservice.crearTarea(tareas).subscribe(
      (res) => {
        if (this.arrayformData.length > 0) {
          this.arrayformData = this.arrayformData.map((formdata: FormData) => {
            formdata.set('idtarea', res.url);
            return formdata;
          });
          this.subirArchivos();
        }
        this.cerrarModalAsignacion();
        this.messageService.add({
          severity: 'success',
          summary: 'Tarea pendiente!',
          detail: 'La tarea con asignación pendiente',
        });
      },
      (error) => {
        this.cerrarModalAsignacion();
      }
    );
    this.spinnerLoad = false;
  }

  convertirAMayusculasName(event: any) {
    this.name = event.target.value.toUpperCase();
  }

  convertirAMayusculasApellido(event: any) {
    this.apellidos = event.target.value.toUpperCase();
  }

  convertirAMayusculasDireccion(event: any) {
    this.direccion = event.target.value.toUpperCase();
  }

  validarNumeroidentificacion(numInput: NgModel): void {
    //Cedula
    if (this.identificacionseleccionada.idtipoidentificacion === 1) {
      if (numInput.value && numInput.value.length !== 10) {
        numInput.control.setErrors({ longitudIncorrecta: true });
      } else {
        numInput.control.setErrors(null);
      }
      //Ruc
    } else if (this.identificacionseleccionada.idtipoidentificacion === 2) {
      if (numInput.value && numInput.value.length !== 13) {
        numInput.control.setErrors({ longitudIncorrecta2: true });
      } else {
        numInput.control.setErrors(null);
      }
    } else {
      if (numInput.value && numInput.value.length < 7) {
        numInput.control.setErrors({ longitudIncorrecta3: true });
      } else {
        numInput.control.setErrors(null);
      }
    }
  }

  validarNumeroCelular(numInput: NgModel): void {
    if (numInput.value && numInput.value.length !== 10) {
      numInput.control.setErrors({ longitudIncorrecta: true });
    } else {
      numInput.control.setErrors(null);
    }
  }

  validarNumeroTelefono(numInput: NgModel): void {
    if (numInput.value && numInput.value.length !== 9) {
      numInput.control.setErrors({ longitudIncorrecta: true });
    } else {
      numInput.control.setErrors(null);
    }
  }

  confirm1() {
    this.mostrarModalAsignacion = true;
  }
  async openPDF(data: any) {
    data.showspinner = true;
    const idArchivo = await firstValueFrom(this.linkservice.getUrl(data.url));
    const newWindow = window.open();
    if (newWindow) {
      newWindow.location.href = `${environment.apiUrl}tasks/getarchivos/${idArchivo.idarchivo}/`;
    }

    data.showspinner = false;
  }
  async subirArchivos() {
    this.arrayformData.forEach(async (formdata: FormData) => {
      await firstValueFrom(this.ticketservice.subirPDF(formdata));
    });
    this.arrayformDataJSON = [];
    this.arrayformData = [];
    this.descripcionarchivoAdicional = '';
    this.descripcionarchivoAbg = '';
    this.descripcionarchivocedula = '';
  }
  async getArchivos() {
    this.mostrarModalArchivos = true;
    this.cargandoArchivos = true;

    try {
      this.listaArchivos = await firstValueFrom(
        this.ticketservice.obtenerArchivosListXId(this.idTarea.idtarea)
      );
    } catch (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'No existen archivos',
        detail: 'No existen archivos adjuntos a este ticket!',
      });
      this.listaArchivos = [];

      // Aquí puedes manejar el error de acuerdo a tus necesidades.
      console.error('Se produjo un error al obtener archivos:', error);
    } finally {
      this.cargandoArchivos = false;
    }
  }
  downloadReporte(idtarea: any): void {
    this.ticketservice.downloadReporte(idtarea).subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const newWindow = window.open(url, '_blank');
        if (newWindow) {
          // Para asegurarse de que la ventana se cierre correctamente
          newWindow.onbeforeunload = () => {
            window.URL.revokeObjectURL(url);
          };
        }
      },
      (error) => {
        console.error('Error al descargar el informe', error);
      }
    );
  }

  async cerrarCreacionTicket() {
    this.limpiarCampos();
    this.limpiarCamposReclamos();
    this.activeIndex = 5;
    this.descripciontarea = '';
    this.usuarioseleccionado = {};
    this.arrayformDataJSON = []

  }
  async finalizarTicket() {
    this.messageService.add({
      severity: 'success',
      summary: 'Ticket finalizado!',
      detail: 'El ticket se creó correctamente',
    });
    this.limpiarCampos();
    this.limpiarCamposReclamos();
    this.activeIndex = 0;
    this.uploadCedula = false;
    this.uploadAbg = false;
    this.listaArchivos = [];
    this.descripciontarea = '';
    this.usuarioseleccionado = {};
  }
  cerrarModalArchivos() {
    this.mostrarModalArchivos = false;
    this.listaArchivos = [];
  }

  async cerrarModalAsignacion() {
    this.mostrarModalAsignacion = false;
    this.limpiarCampos();
    this.limpiarCamposReclamos();
    this.activeIndex = 0;
    this.descripciontarea = '';
    this.usuarioseleccionado = {};

    const {
      ticket: { url, idtipoticket, numeroticket },
    } = this.ticketCreado;
    const descripcionTarea = await firstValueFrom(
      this.linkservice.getUrl(idtipoticket)
    );
    const idestadoabierto = await firstValueFrom(
      this.userservice.getEstadosId(1)
    );
    const { url: urlAbierto } = idestadoabierto;
    const tareas = {
      descripciontarea:
        'Tarea: ' +
        descripcionTarea.descripciontipoticket +
        ' ' +
        numeroticket.slice(0, 5),
      indicador: 'P',
      idestado: urlAbierto,
      idproblema: url,
      idusuarioqasigno: this.idUsuario,
    };
    this.ticketservice.crearTarea(tareas).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Nuevo ticket!',
          detail: 'La tarea se envío a Nuevos Casos',
        });
      },
      (error) => {}
    );
    this.activeIndexAssign = 0;
  }

  reasignarTicket() {
    const {
      ticket: { url },
    } = this.ticketCreado;
    const tareas = {
      descripciontarea: this.descripciontarea,
      indicador: 'P',
      idestado: this.tipoEstado.url,
      idproblema: url,
      idusuarioasignado: this.usuarioseleccionado.url,
      idusuarioqasigno: this.idUsuario,
    };
    this.ticketservice.crearTarea(tareas).subscribe(
      (res) => {
        this.cerrarModalAsignacion();
        this.messageService.add({
          severity: 'success',
          summary: 'Tarea asignada!',
          detail: 'La tarea se asignó exitosamente',
        });
      },
      (error) => {
        this.cerrarModalAsignacion();
        this.messageService.add({
          severity: 'error',
          summary: 'Tarea no asignada',
          detail: 'La tarea no se ha asignado correctamente',
        });
      }
    );
  }

  cerrarModalReasignacion() {
    this.mostrarModalReasignacion = false;
  }

  async myUploaderSignDocument(event: any) {
    this.spinnerLoad2 = true;

    const file = event.files[0];
    const formData = new FormData();

    formData.append('pdf_file', file);
    formData.append('idtarea', this.idTarea.url);
    formData.append('nombrearchivo', event.files[0].name);
    formData.append(
      'descripcionarchivo',
      'Documento firmado ' + this.descripcionArchivoFirma
    );
    formData.append('mimetypearchivo', 'application/pdf');

    this.ticketservice.subirPDF(formData).subscribe(
      (resp) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Archivo Subido!',
          detail: 'El archivo se ha subido correctamente',
        });
        this.descripcionArchivoFirma = '';
        this.spinnerLoad2 = false;
        this.myfiles = [];
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Upload fallido',
          detail: error.statusText,
        });
        this.spinnerLoad2 = false;
      }
    );
  }

  myUploader1(event: any, type: any) {
    if (this.descripcionarchivocedula !== '') {
      const file = event.files[0];

      const id = uuidv4(); // Generar un UUID para el campo 'id'
      const formData = new FormData();
      formData.append('pdf_file', file);
      formData.append('nombrearchivo', file.name);
      formData.append('descripcionarchivo', this.descripcionarchivocedula);
      formData.append('mimetypearchivo', 'application/pdf');
      formData.append('idtarea', id);
      formData.append('type', 'Cédula');

      // Verificar si ya existe un objeto con el mismo nombre de archivo
      const existsfromdata = this.arrayformData.some(
        (existingFormData: FormData) => {
          return (
            existingFormData.get('nombrearchivo') ===
            formData.get('nombrearchivo')
          );
        }
      );

      if (!existsfromdata) {
        // Solo agregar formData si no existe un objeto con el mismo nombre de archivo
        this.arrayformData.push(formData);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Archivo repetido!',
          detail: 'Ya existe un archivo con ese nombre',
        });
      }
      this.arrayformData.forEach((formData: FormData) => {
        const formDataJSON: any = {};
        formData.forEach((value, key) => {
          formDataJSON[key] = value;
        });
        // Verificar si formDataJSON ya existe en arrayformDataJSON
        const exists = this.arrayformDataJSON.some((existingData: any) => {
          return (
            JSON.stringify(existingData) === JSON.stringify(formDataJSON) ||
            existingData.nombrearchivo === formDataJSON.nombrearchivo
          );
        });
        if (!exists) {
          this.arrayformDataJSON.push(formDataJSON);
          this.messageService.add({
            severity: 'success',
            summary: 'Archivo cargado',
            detail: 'El archivo se ha cargado correctamente',
          });
          this.descripcionarchivocedula = '';
          this.myfilesCedula = [];
          this.uploadCedula = true;
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Archivo sin descripción!',
        detail: 'Debe poner una decripción al archivo',
      });
    }
  }
  myUploader2(event: any, type: any) {
    if (this.descripcionarchivoAbg !== '') {
      const file = event.files[0];

      const id = uuidv4(); // Generar un UUID para el campo 'id'
      const formData = new FormData();
      formData.append('pdf_file', file);
      formData.append('nombrearchivo', file.name);
      formData.append('descripcionarchivo', this.descripcionarchivoAbg);
      formData.append('mimetypearchivo', 'application/pdf');
      formData.append('idtarea', id);
      formData.append('type', 'Matrícula Abogado');

      // Verificar si ya existe un objeto con el mismo nombre de archivo
      const existsfromdata = this.arrayformData.some(
        (existingFormData: FormData) => {
          return (
            existingFormData.get('nombrearchivo') ===
            formData.get('nombrearchivo')
          );
        }
      );

      if (!existsfromdata) {
        // Solo agregar formData si no existe un objeto con el mismo nombre de archivo
        this.arrayformData.push(formData);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Archivo repetido!',
          detail: 'Ya existe un archivo con ese nombre',
        });
      }
      this.arrayformData.forEach((formData: FormData) => {
        const formDataJSON: any = {};
        formData.forEach((value, key) => {
          formDataJSON[key] = value;
        });
        // Verificar si formDataJSON ya existe en arrayformDataJSON
        const exists = this.arrayformDataJSON.some((existingData: any) => {
          return (
            JSON.stringify(existingData) === JSON.stringify(formDataJSON) ||
            existingData.nombrearchivo === formDataJSON.nombrearchivo
          );
        });
        if (!exists) {
          this.arrayformDataJSON.push(formDataJSON);
          this.messageService.add({
            severity: 'success',
            summary: 'Archivo cargado',
            detail: 'El archivo se ha cargado correctamente',
          });
          this.descripcionarchivoAbg = '';
          this.myfilesAbg = [];
          this.uploadAbg = true;
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Archivo sin descripción!',
        detail: 'Debe poner una decripción al archivo',
      });
    }
  }
  myUploader3(event: any, type: any) {
    if (this.descripcionarchivoAdicional !== '') {
      const file = event.files[0];

      const id = uuidv4(); // Generar un UUID para el campo 'id'
      const formData = new FormData();
      formData.append('pdf_file', file);
      formData.append('nombrearchivo', file.name);
      formData.append('descripcionarchivo', this.descripcionarchivoAdicional);
      formData.append('mimetypearchivo', 'application/pdf');
      formData.append('idtarea', id);
      formData.append('type', 'Adicional');

      // Verificar si ya existe un objeto con el mismo nombre de archivo
      const existsfromdata = this.arrayformData.some(
        (existingFormData: FormData) => {
          return (
            existingFormData.get('nombrearchivo') ===
            formData.get('nombrearchivo')
          );
        }
      );

      if (!existsfromdata) {
        // Solo agregar formData si no existe un objeto con el mismo nombre de archivo
        this.arrayformData.push(formData);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Archivo repetido!',
          detail: 'Ya existe un archivo con ese nombre',
        });
      }
      this.arrayformData.forEach((formData: FormData) => {
        const formDataJSON: any = {};
        formData.forEach((value, key) => {
          formDataJSON[key] = value;
        });
        // Verificar si formDataJSON ya existe en arrayformDataJSON
        const exists = this.arrayformDataJSON.some((existingData: any) => {
          return (
            JSON.stringify(existingData) === JSON.stringify(formDataJSON) ||
            existingData.nombrearchivo === formDataJSON.nombrearchivo
          );
        });
        if (!exists) {
          this.arrayformDataJSON.push(formDataJSON);
          this.messageService.add({
            severity: 'success',
            summary: 'Archivo cargado',
            detail: 'El archivo se ha cargado correctamente',
          });
          this.descripcionarchivocedula = '';
          this.myfilesAdicional = [];
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Archivo sin descripción!',
        detail: 'Debe poner una decripción al archivo',
      });
    }
  }

  eliminarArchivosCargados(idToDelete: any) {
    this.arrayformData = this.arrayformData.filter((formData: FormData) => {
      const id = formData.get('idtarea'); // Verifica si el campo "id" dentro de formData es igual al idToDelete
      return id?.toString() != idToDelete;
    });
    this.arrayformDataJSON = this.arrayformDataJSON.filter(
      (formdatajson: any) => {
        if (formdatajson.type === 'Cédula') {
          this.uploadCedula = false; // Si el formData.type es 'Cedula', establece uploadCedula en true
        }
        if (formdatajson.type === 'Matrícula Abogado') {
          this.uploadAbg = false; // Si el formData.type es 'Cedula', establece uploadCedula en true
        }
        return formdatajson.idtarea !== idToDelete;
      }
    );
  }
}
