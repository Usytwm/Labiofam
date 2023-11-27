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

2. ## Instala dotnet-ef

    dotnet-ef es la herramienta necesaria para trabajar con las migraciones de Entity Framework. Puedes instalarla con el siguiente comando:

    ```bash
    dotnet tool install --global dotnet-ef
    ```

3. ## Ejecuta las migraciones

    Usa el siguiente comando para aplicar las migraciones a la base de datos:

    ```bash
    dotnet ef migrations add <nombre de la migracion>
    dotnet ef database update
    ```

4. ## Inicia el servidor de desarrollo de Angular

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
