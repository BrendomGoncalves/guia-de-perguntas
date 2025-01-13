# Guia de Perguntas

Este é um projeto de um guia de perguntas desenvolvido com Node.js, Express, Sequelize e EJS. O objetivo do projeto é permitir que os usuários façam perguntas e respondam anonimamente.

## Funcionalidades

- Listar todas as perguntas
- Criar uma pergunta
- Responder a uma pergunta existente
- Visualizar uma pergunta específica com as suas respostas
- Redirecionar para uma página de erro 404 quando a rota não for encontrada

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- EJS
- MySQL

## Instalação

1. Clone o repositório:

    ```sh
    git clone https://github.com/BrendomGoncalves/guia-de-perguntas.git
    ```

2. Navegue até o diretório do projeto:

    ```sh
    cd guia-de-perguntas
    ```

3. Instale as dependências:

    ```sh
    npm install
    ```

4. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```env
    DB_NAME=guiaperguntas
    DB_USER=root
    DB_PASSWORD=sua_senha
    DB_HOST=localhost
    DB_DIALECT=mysql
    ```
   
5. Inicie a aplicação:

    ```sh
    nodemon index.js
    ```

   O servidor estará rodando em `http://localhost:8080`.

## Estrutura do Projeto

- `index.js`: Arquivo principal do servidor
- `database/`: Configuração do banco de dados e modelos
- `views/`: Templates EJS
- `public/`: Arquivos estáticos (CSS, JS, imagens)
- ~~`routes.js`: Definição das rotas~~ [EM BREVE]
- ~~`middleware.js`: Configuração dos middlewares~~ [EM BREVE]

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit as suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça o push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request