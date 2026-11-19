# Sistema de gerenciamento de oficina mecânica

## Contexto

A oficina controla agendamentos, clientes e veículos manualmente, o que pode
causar perda de horários, duplicidade de agendamentos e falhas no armazenamento
dos dados. O sistema centraliza essas informações e protege os dados dos
clientes.

## Requisitos funcionais

- **RF01** — Permitir que usuários entrem com e-mail e senha.
- **RF02** — Informar quando o acesso falhar.
- **RF03** — Manter a sessão por tempo limitado, usando um token com expiração.
- **RF04** — Exibir o nome do usuário, os links de navegação e a opção de sair.
- **RF05** — Permitir pesquisar clientes pelo nome.
- **RF06** — Permitir cadastrar, editar e remover clientes.
- **RF07** — Armazenar o CPF criptografado no banco de dados.
- **RF08** — Permitir cadastrar, editar e remover veículos associados a clientes.
- **RF09** — Listar agendamentos por data, com os dados do veículo e do cliente.
- **RF10** — Permitir cadastrar, alterar a data e remover agendamentos.

## Tecnologias

- **Banco de dados:** MySQL 8.0 ou superior.
- **Servidor:** Node.js 18 ou superior e Express 4.
- **Driver do banco:** mysql2.
- **Interface:** HTML, CSS e JavaScript.

## Como executar

1. Instale o MySQL e crie um banco de dados local.
2. No diretório `backend`, instale as dependências:

   ```powershell
   npm install
   ```

3. Configure `backend/.env` com as credenciais do MySQL, usando
   `backend/.env.example` como referência. Use uma chave de criptografia com
   32 bytes e um vetor de inicialização com 16 bytes; os valores do exemplo
   servem apenas para desenvolvimento local. Não compartilhe o arquivo `.env`.
4. Gere o script de criação e os dados de demonstração usando a configuração
   local:

   ```powershell
   npm run gerar-script
   ```

5. Execute `database/script.sql` no MySQL Workbench ou em outro cliente MySQL.
6. Inicie o servidor:

   ```powershell
   npm start
   ```

7. Abra <http://localhost:3000> no navegador. O servidor entrega a interface e
   a API pela mesma origem.

O acesso de demonstração é `admin@oficina.com` com a senha `123456`. Altere ou
remova essas credenciais antes de usar o sistema fora do ambiente local.
