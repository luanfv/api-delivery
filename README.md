# Configurando o projeto

## Database

Se for a primeira vez executando o projeto siga os seguintes passos:

1- Baixe o [docker](https://www.docker.com/) e execute o comando abaixo para criar um banco de dados e execute o container.

```shell
$ docker run --name NOME_DO_CONTAINER -e POSTGRES_USER=NOME_DO_USER -e POSTGRES_PASSWORD=SENHA_PARA_O_USER -e POSTGRES_DB=NOME_DO_BANCO -p 5432:5432 -d postgres
```
2- Faça uma copia do arquivo `.env.example` e renomeie ele para `.env`.

3- Altere o arquivo `.env` para as configurações que foram criadas no docker.

4- Execute o migration para criar as tabelas no banco de dados.
```shell
$ yarn prisma migrate dev
```
