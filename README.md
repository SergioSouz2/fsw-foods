
# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Database

Adicione no package.json 

```
"scripts": {
   "dev": "next dev",
   "build": "next build",
   "start": "next start",
   "docker:db": "docker run -d --name fsw_foods -p 5432:5432 -e POSTGRES_PASSWORD=123456 postgres",
   "lint": "next lint"
},
```

Para rodar o script e criar o banco com docker partindo do ponto que tenha o docker instalado

```
yarn database:db
```
Em seguinda podemos rodar nossas migrates init
```
npx prisma migrate dev --name init_database 
```
Em seguinda podemos rodar nossas seed para alimentar nosso banco
```
npx prisma db seed   
```