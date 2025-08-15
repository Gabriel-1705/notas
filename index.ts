export interface Usuario {
  id: string;
  codigo: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  carrera: string;
  foto?: string;
  rol: 'admin' | 'docente' | 'estudiante';
  contraseña: string;
  fechaCreacion: Date;
}

export interface Calificacion {
  id: string;
  estudianteId: string;
  docenteId: string;
  materia: string;
  nota: number;
  semestre: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

export interface Carrera {
  codigo: string;
  nombre: string;
  descripcion?: string;
}

export interface FormularioLogin {
  codigo: string;
  contraseña: string;
}

export interface FormularioRegistro {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  carrera: string;
  rol: 'docente' | 'estudiante';
  foto?: string;
}