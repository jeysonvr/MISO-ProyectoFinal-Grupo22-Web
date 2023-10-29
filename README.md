ABC Jobs es una plataforma que permite conectar personas especializadas en tecnologías requeridas por companías del sector tecnológico con el fin de contratarlos para la ejecución de proyectos.

La plataforma web de ABC Jobs está desarrollada con [Next.js](https://nextjs.org/) utilizando tecnologías como RSC (React Server Components), Typescript, Jest.

Url: https://miso-proyecto-final-grupo22-web.vercel.app/


## Ejecución en ambiente local

1. Obtenención del código: <br>
`git clone https://github.com/jeysonvr/MISO-ProyectoFinal-Grupo22-Web.git`

2. Intalación de dependencias: <br>
`npm install`

3. Ejecución: <br>
`npm run dev`

4. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

```
npm install
```

#### Otros comandos útiles:
* Ejecución de pruebas unitarias `npm run test`


## Estructura del proyecto
````
├── .github
|   └── workflows # Configuración de pipeline
|   └── pull_request_template.md # Template para los Pull Requessts
├── Coverage
|   └── Icov-report # Reporte de cobertura de pruebas unitarias
├── messages # Configuración de textos para la localización 
├── public
|   └── icons # iconos
|   └── images # imágenes
├── public
|   └── icons # iconos
|   └── images # imágenes
├── src (app)
|   └── [locale] # Páginas del proyecto
|   └── components
|   └── containers
|   └── constants
|   └── mocks
|   └── globals.css # CSS global
└── .gitignore # Archivo que contiene paths que debe ignorar para subir al repositorio
└── jest.config.ts # Configuración de pruebas unitarias con Jest
└── next.config.js # Configuración de NextJS
└── package.json # Dependencias del proyecto
└── tailwind.config.ts # Configuración de tailwind
└── .env # Configuración de variables de entorno
└── README.md # Estás aquí
````

## CI/CD

La rama principal del proyecto es main. Para incluir código en esta rama se debe crear un PR (Pull Request) sobre el que se valida que el build de la aplicación se ejecuta correctamente y requiere al menos una aprobación por otro miembro del equipo.

Adicional, se ejecutan pruebas unitarias con jest y se valida una cobertura mínima de 60%.

Cuando se incluye nuevo código a main se ejecuta un proceso de despliegue automático en la [plataforma vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).


### Acerca del desarrollo

Este proyecto es desarrollado como parte de la [maestría de ingeniería de software de la Univerisdad de los Andes](https://sistemas.uniandes.edu.co/maestrias/miso/virtual/).

Equipo de desarrollo:
* [Erik Bernal](https://github.com/ErikBernal94)
* [Lizeth López](https://github.com/lizlopez10)
* [Zaray Rey](https://github.com/VivianaReyV)
* [Jeyson Vega](https://github.com/jeysonvr)
