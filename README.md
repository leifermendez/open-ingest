# Ingestar datos Pinecone

### Instalar
```
npm install
```

### Enviroment

Crear una archivo `.env` basado en el archivo de ejemplo `.env.example`  y agregar las keys correspondientes

### Data
Encontraras un carpeta `data` en la cual debes colocar los datos que quieres ingestar

```ts ingest.single.ts
//  ingest.single.ts
//  Puedes ver donde se hace referencia a usar un archivo .txt
const PATH_FILE = `${process.cwd()}/data/video-subtitulos-node.txt`
```

```ts
//  ingest.directory.ts
//  Puedes ver donde se hace referencia a escanear un directorio entero
const FROM_PATH = `${process.cwd()}/curso-node-api-js-master`;
```

### Uso
__RECUERDA__ Cambiar el `namespace` por el correspondiente en cada ingesta

Para ingestar un solo archivo `.txt` ejemplo los subtitulos

```
npm run dev:single

```
---
Para ingestar datos de una carpeta `.js .ts` util para ingestar los datos de un repositorio
```
npm run dev:directory

```