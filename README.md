# Labiofam

Este proyecto está construido con .NET y Angular. Aquí encontrarás los pasos necesarios para configurar tu entorno y ejecutar el proyecto.

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- .NET
- Angular
- Git
- MySQL

## **Instalación**

Sigue estos pasos para configurar tu entorno y ejecutar el proyecto:

1. ## Clona el repositorio:

   Usa el siguiente comando para clonar el repositorio a tu máquina local:

   ```bash
   git clone <URL del repositorio>
   ```

2. ## Instala las dependencias de Angular:

   Navega al directorio del proyecto

   ```bash
   cd <directorio de proyecto>
   ```

   despues desplazate a la carpeta ClientApp

   ```bash
   cd ClientApp
   ```

   y ejecuta el siguiente comando para instalar las dependencias de Angular

   ```bash
   npm install
   ```

3. ## Instala dotnet-ef

   dotnet-ef es la herramienta necesaria para trabajar con las migraciones de Entity Framework. Puedes instalarla con el siguiente comando:

   ```bash
   dotnet tool install --global dotnet-ef
   ```

4. ## Ejecuta las migraciones

   Usa el siguiente comando para aplicar las migraciones a la base de datos:

   ```bash
   dotnet ef migrations add <nombre de la migracion>
   dotnet ef database update
   ```

5. ## Inicia el servidor de desarrollo de Angular

   Usa el siguiente comando para iniciar el servidor de desarrollo de Angular:

   ```bash
   ng serve -o
   ```

   esto abrira de manera automatica la aplicacion en su navegador predeterminado

### **Solución de problemas**

Si encuentras un error que dice que PowerShell no puede cargar un script debido a su política de ejecución, puedes cambiar la política de ejecución con el siguiente comando:

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Tenga en cuenta que cambiar la política de ejecución puede tener implicaciones de seguridad, así que asegúrate de entender lo que este comando hace antes de ejecutarlo.

## **Archivo de configuración**

Deben editar el archivo de appsettings.json de acuerdo a las necesidades de la empresa.

En la sección:

```bash
"ConnectionStrings": {
    "DefaultConnection": "server=localhost;port=3306;database=LabiofamTesting;user=root;password=210701Bb;"
  }
```

se guarda la configuración de la conexión a la base de datos, la cual ha de ser adaptada al servidor donde se aloje dicha base de datos.

En la sección:

```bash
"JWT": {
    "Issuer": "http://localhost:5263",
    "Audience": "http://localhost:4200",
    "Key": "73B9E92A2F2C45C782B6FACCED78A",
    "EXPIRATION_MINUTES": 100
  }
```

se guarda la configuración de la autenticación y autorización. El parámetro _Issuer_ debe contener la dirección http del servidor, el parámetro _Audience_ la dirección http del cliente, el parámetro _Key_ la llave sobre la cual se codifican los JWT y el parámetro _EXPIRATION_MINUTES_ la duración del token.

En la sección:

```bash
"RefreshToken": {
    "EXPIRATION_MINUTES": 60
  }
```

se guarda el token de actualización del servicio de autenticación. Esto agrega mayor seguridad al proceso de autenticación y autorización al crear un nuevo token cuando el anterior expire, y evita la necesidad de volver a iniciar sesión.

En la sección:

```bash
"EmailConfig": {
    "ServerName": "Labiofam Server",
    "MailRecipient": "labiofam.server@outlook.com",
    "PasswordRecipient": "LabiofamServer2023",
    "MailSender": "labiofam.testing@outlook.com",
    "PasswordSender": "LabiofamTesting2023"
  }
```

se guarda la configuración del servicio de correos. Se usó el dominio @outlook.com de Microsoft porque permite el acceso de aplicaciones no seguras (sin certificado SSL). Si se usase un servidor de correos privado se debe cambiar el código en C# del servicio, a menos que este admita el protocolo SMTP. Para continuar el uso de Outlook se puede crear un nuevo correo que funcione como Remitente y otro como Destinatario. En el Destinatario aparecerán los emails que los usuarios del sitio envíen como feedback. Si se desea mantener la configuración actual, las cuentas de Outlook ya están creadas con los correos y las contraseñas que aparecen en la configuración.

## **Respecto a la autorización**

Se pusieron por defecto los decoradores:

- **[Authorize(Roles = "superadmin")]** en los métodos CUD (_Create_, _Update_ y _Delete_) de los CRUD de la aplicación para que el único rol capaz de utilizarlos fuese el hipotético ´superadmin´. En caso de agregar otros roles a los usuarios del sitio que puedan tener acceso a ciertos métodos dentro de los anteriormente expuestos, debe agregar la etiqueta **[Authorize(Roles = "superadmin,new_role,new_role,...")]** con los nuevos roles en la forma estipulada (donde aparecen los _new_role_).

- **[AllowAnonymus]** en los métodos R (_Read_) de los CRUD de la aplicación para que puedan ser utilizados por cualquier usuario o visitante del sitio.

Además se incluyen por defecto los siguientes roles:

- **bioproductos:** Este rol tiene acceso a los métodos _Create_, _Update_ y _Delete_ de las tablas `Productos` y `TiposPrecios`.
- **establecimientos:** Este rol tiene acceso a los métodos _Create_, _Update_ y _Delete_ de la tabla `PuntosDeVenta`.
- **ventas:** Este rol tiene acceso a los métodos _Create_, _Update_ y _Delete_ de la tabla `Productos_PuntosDeVenta`.
- **testimonios:** Este rol tiene acceso a los métodos _Create_, _Update_ y _Delete_ de la tabla `Testimonios`.
