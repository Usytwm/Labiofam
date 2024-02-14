export const navbarData = [
  {
    ruta: 'home',
    nombre: 'Panel de control',
    icon: 'fas fa-tachometer-alt',
    permisos: [
      'superadmin',
      'establecimientos',
      'ventas',
      'testimonios',
      'bioproductos',
    ],
    pas: false,
  },
  {
    ruta: 'users-admin',
    nombre: 'Usuarios',
    icon: 'fas fa-users',
    permisos: ['superadmin'],
    pas: false,
  },
  {
    ruta: 'points-of-sales-admin',
    nombre: 'Puntos de Venta',
    icon: 'fas fa-store',
    permisos: ['superadmin', 'establecimientos'],
    pas: false,
  },
  {
    ruta: 'services-admin',
    nombre: 'Servicios',
    icon: 'fas fa-concierge-bell',
    permisos: ['superadmin'],
    pas: false,
  },
  {
    ruta: 'testimonios-admin',
    nombre: 'Testimonios',
    icon: 'fas fa-comments',
    permisos: ['superadmin', 'testimonios'],
    pas: false,
  },
  {
    ruta: 'bioproducts-admin',
    nombre: 'Bioproductos',
    icon: 'fas fa-seedling',
    permisos: ['superadmin', 'bioproductos'],
    pas: false,
  },
  {
    ruta: 'contacts-admin',
    nombre: 'Contactos',
    icon: 'fas fa-address-book',
    permisos: ['superadmin'],
    pas: false,
  },
  {
    ruta: '/home',
    nombre: 'Salir de la administración',
    icon: 'fas fa-sign-out-alt',
    permisos: [
      'superadmin',
      'establecimientos',
      'ventas',
      'testimonios',
      'bioproductos',
    ],
    pas: false,
  },
];
