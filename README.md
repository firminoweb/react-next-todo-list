# React + Next.js | ToDo List

Trata-se de um projeto teste onde qualquer funcionário de uma empresa, que gostaria de ter uma lista de itens com sub-listas em um endereço público, que possa ser compartilhado por e-mail para um ou mais usuários e estes, quando receberem o link, possam colaborar. 

Ele utiliza **React**, **TypeScript**, **Next,js**, **TailwindCSS** e várias outras ferramentas modernas para desenvolvimento e testes como o **Husky** e o **Commitizen**.

## Funcionalidades
- Tela inicial com instruções e ponta pé inicial de navegação
- Criar TO DO
- Editar TO DO
- Compartilhar TO DO
- Excluir TO DO
- Interface estilizada com TailwindCSS
- Testes unitários abrangentes com Jest e Testing Library

## Instalação

### 1. Clone o repositório:

```
cd existing_repo
git remote add origin https://github.com/firminoweb/react-next-todo-list.git
git branch -M main
git push -uf origin main
```

### 2. Instale as dependências:

- Usando npm: `npm install`
- Usando yarn: `yarn install`

## Configuração da API

Para acessar a API do TODO, você precisa configurar um token de acesso. Altere o arquivo `configs/index.ts` e adicione o token da seguinte forma:

```
 .....
```

## Execução

Para iniciar o projeto, você pode usar os seguintes comandos:

### Ambiente de desenvolvimento:

- Usando NPM: `npm run dev`
- Usando Yarn: `yarn dev`

### Construir o projeto para produção:

- Usando NPM: `npm run build`
- Usando Yarn: `yarn build`

### Iniciar o serviço em produção:

- Usando NPM: `npm start`
- Usando Yarn: `yarn start`

## Testes Unitários

O projeto utiliza Jest para testes unitários. Você pode rodar os testes com cobertura de código utilizando os seguintes comandos:

- Usando NPM: `npm test`
- Usando Yarn: `yarn test`

## Outros Scripts Úteis

### Linting

- Usando NPM: `npm run lint`
- Usando Yarn: `yarn lint`

### Formatação de código:

- Usando NPM: `npm run format`
- Usando Yarn: `yarn format`

### Preparar husky para commits:

- Usando NPM: `npm run prepare`
- Usando Yarn: `yarn prepare`

