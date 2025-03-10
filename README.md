
# DavxeShop

Este proyecto DavxeShop es una aplicación web que consta de una **SPA** (Single Page Application) y una **API**. La aplicación está conectada a una base de datos local y necesita ser configurada y ejecutada siguiendo algunos pasos previos.

## Requisitos

Asegúrate de tener los siguientes programas instalados antes de comenzar:

- **Node.js**: Necesario para ejecutar el frontend. Puedes descargarlo desde [aquí](https://nodejs.org/).
- **Visual Studio 2022**: Necesario para ejecutar y recompilar la API. Puedes descargarlo desde [aquí](https://visualstudio.microsoft.com/es/vs/).
- **Git**: Para clonar el repositorio. Puedes descargarlo desde [aquí](https://git-scm.com/).

## Pasos para ejecutar el proyecto

### 1. Clonar el repositorio

Primero, debes clonar el repositorio en tu máquina local. Abre una terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/Tonaxe/DavxeShop.git
cd DavxeShop
```

Esto descargará el proyecto y cambiará al directorio del mismo.

### 2. Configuración de la base de datos local

Para que la base de datos se ejecute de forma local, necesitas hacer algunos cambios de configuración:

1. Abre el archivo `config.json` en la raíz del proyecto.
2. Busca la clave `localDatabase` y cambia su valor de `false` a `true` para activar la base de datos local.

El archivo `config.json` debería verse así:

```json
{
  "localDatabase": true,
  ...
}
```

### 3. Ejecutar el Frontend

Una vez configurada la base de datos, el siguiente paso es levantar el frontend de la aplicación. Aquí te explico cómo hacerlo:

1. Abre Visual Studio Code o tu terminal preferida.
2. Navega hasta la carpeta del proyecto (si no lo estás ya).
3. Ejecuta el siguiente comando para instalar las dependencias del frontend:

```bash
npm install
```

Este comando descargará todas las dependencias necesarias para que la aplicación frontend funcione.

4. Después de que las dependencias se instalen correctamente, ejecuta el siguiente comando para iniciar la aplicación:

```bash
npm start
```

Esto levantará el frontend y te proporcionará un enlace para abrir la SPA en tu navegador (normalmente en `http://localhost:3000`).

### 4. Ejecutar la API

Ahora, necesitas levantar la API para que la aplicación frontend pueda comunicarse con ella. Sigue estos pasos:

1. Abre **Visual Studio 2022** en tu máquina.
2. Abre la solución del proyecto de la API dentro de Visual Studio 2022.
3. Compila la solución presionando `Ctrl + Shift + B` o haciendo clic en el botón "Compilar".
4. Una vez que la solución esté compilada correctamente, inicia la API presionando `Ctrl + F5` o haciendo clic en "Iniciar sin depurar".

La API se levantará en el puerto predeterminado `http://localhost:5000`, aunque el puerto puede variar dependiendo de la configuración de tu proyecto.

### 5. ¡Todo listo!

Con el **Frontend** corriendo en `http://localhost:3000` y la **API** funcionando en `http://localhost:5000`, ya puedes interactuar con la aplicación web y la API localmente.

---

¡Gracias por usar **DavxeShop**!
