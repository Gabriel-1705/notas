import { Usuario } from '../tipos';

// Datos de prueba para desarrollo
const usuariosPrueba: Usuario[] = [
  {
    id: '1',
    codigo: '12345',
    nombre: 'Admin',
    apellido: 'Principal',
    email: 'admin@omie.edu',
    telefono: '+591 12345678',
    carrera: 'ADMINISTRACIÓN',
    rol: 'admin',
    contraseña: 'admin123',
    fechaCreacion: new Date()
  },
  {
    id: '2',
    codigo: '54321',
    nombre: 'María',
    apellido: 'González',
    email: 'maria.gonzalez@omie.edu',
    telefono: '+591 87654321',
    carrera: 'SISTEMAS INFORMATICOS',
    rol: 'docente',
    contraseña: 'docente123',
    fechaCreacion: new Date()
  },
  {
    id: '3',
    codigo: '11111',
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@omie.edu',
    telefono: '+591 11111111',
    carrera: 'SISTEMAS INFORMATICOS',
    rol: 'estudiante',
    contraseña: 'estudiante123',
    fechaCreacion: new Date()
  }
];

export const autenticarUsuario = (codigo: string, contraseña: string): Usuario | null => {
  return usuariosPrueba.find(usuario => usuario.codigo === codigo && usuario.contraseña === contraseña) || null;
};

export const generarCodigoUsuario = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const obtenerTodosLosUsuarios = (): Usuario[] => {
  return usuariosPrueba;
};

export const obtenerUsuariosPorRol = (rol: Usuario['rol']): Usuario[] => {
  return usuariosPrueba.filter(usuario => usuario.rol === rol);
};

export const crearUsuario = (datosUsuario: Omit<Usuario, 'id' | 'codigo' | 'fechaCreacion'>): Usuario => {
  const nuevoUsuario: Usuario = {
    ...datosUsuario,
    id: Date.now().toString(),
    codigo: generarCodigoUsuario(),
    fechaCreacion: new Date()
  };
  
  usuariosPrueba.push(nuevoUsuario);
  return nuevoUsuario;
};

export const actualizarContraseñaUsuario = (usuarioId: string, nuevaContraseña: string): boolean => {
  const usuario = usuariosPrueba.find(u => u.id === usuarioId);
  if (usuario) {
    usuario.contraseña = nuevaContraseña;
    return true;
  }
  return false;
};

// Nueva función para eliminar usuario
export const eliminarUsuario = (usuarioId: string): boolean => {
  const indice = usuariosPrueba.findIndex(u => u.id === usuarioId);
  if (indice !== -1) {
    usuariosPrueba.splice(indice, 1);
    return true;
  }
  return false;
};

// Nueva función para actualizar perfil de usuario
export const actualizarPerfilUsuario = (usuarioId: string, datosActualizados: Partial<Usuario>): Usuario | null => {
  const usuario = usuariosPrueba.find(u => u.id === usuarioId);
  if (usuario) {
    Object.assign(usuario, datosActualizados);
    return usuario;
  }
  return null;
};

// Nueva función para crear usuario con código personalizado
export const crearUsuarioConCodigo = (
  datosUsuario: Omit<Usuario, 'id' | 'fechaCreacion'>, 
  codigoPersonalizado: string
): Usuario | null => {
  // Verificar que el código no esté en uso
  if (usuariosPrueba.some(u => u.codigo === codigoPersonalizado)) {
    return null; // Código ya existe
  }

  const nuevoUsuario: Usuario = {
    ...datosUsuario,
    id: Date.now().toString(),
    codigo: codigoPersonalizado,
    fechaCreacion: new Date()
  };
  
  usuariosPrueba.push(nuevoUsuario);
  return nuevoUsuario;
};

// Función para verificar si un código está disponible
export const verificarCodigoDisponible = (codigo: string): boolean => {
  return !usuariosPrueba.some(u => u.codigo === codigo);
};