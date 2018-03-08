export interface Operadora {
  operadoraId: number;
  rut: string;
  nombre: string;
  alias: string;
  observacion: string;
}

export interface Options {
    first: number;
    rows: number;
    sortField: string;
    sortOrder: string;
}

export interface OperadoraFiltro {
  rut: string;
  nombre: string;
}

export interface RbdFiltro {
  rbd: string;
  nombre: string;
  region: string;
  comuna: string;
}

export interface ArchivoFiltro {
  operadora: string;
  mes: number;
  year: number;
}

export interface Rbd {
  rbdId: number;
  rbd: number;
  nombre: string;
  direccion: string;
  nAlumnos: number;
  observacion: string;
  comuna: Comuna;
}

export interface Comuna {
  comunaId: number;
  numero: number;
  nombre: string;
  region: Region;
}

export interface Region {
  regionId: number;
  numero: number;
  nombre: string;
}

export interface RegionSet {
  regionId: number;
  numero: number;
  nombre: string;
  comunas: Comuna[];
}

export interface Files {
  id: number;
  nombre: string;
  fecha: string;
  status: Estado;
}

export interface Estado {
  estadoId: number;
  descripcion: string;
}

export interface SubEstado {
  estadoId: number;
  padre: Estado;
  descripcion: string;
}

export interface Tecnologia {
  tecnologiaId: number;
  nombre: string;
  observacion: string;
}

export interface Concurso {
  concursoId: number;
  nombre: string;
  fechaInicio: string;
  fechaTermino: string;
  comentarios: string;
}

export interface Contacto {
  contactoId: number;
  nombre: string;
  cargo: string;
  telefono1: string;
  telefono2: string;
  email: string;
  fechaBaja: string;
  rbdId: number;
}

export interface Archivo {
  id: number;
  tipo: string;
  nombre: string;
  version: number;
  fecha: string;
  estado: string;
  valor: number;
}

export interface Sftp {
  archivo: string;
  validar: boolean;
}

export interface Validador {
  operadora: string;
  year: number;
  month: number;
  archivos: Sftp[];
}

export interface Feriado {
  id: number;
  start: string;
  title: string;
}

export interface Usuario {
  usuarioId: number;
  username: string;
  password: string;
  email: string;
  bloqueado: boolean;
  intentos: number;
  intentosMax: number;
  rut: string;
  telefono: string;
  organizacion: string;
  nombre: string;
  apellido: string;
  rolId: number;
}

export interface Rol {
  rolId: number;
  nombre: string;
  descripcion: string;
}