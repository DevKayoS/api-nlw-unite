# pass.in

O pass.in é uma aplicação de **gestão participantes em eventos presenciais**

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição

Os participantes inscritos podem emitir  uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial de participante para permitir a entrada no evento.

## Requisitos

### Requisitos funcionais 

- [ X ] O organizador deve poder cadastrar um novo evento;
- [ X ] O organizador deve poder visualizar dados de um evento;
- [ X ] O organizador deve poder visualizar a lista de participantes;
- [ X ] O participante deve poder visualizar seu crachá de inscrição;
- [ X ] O participante deve poder realizar check-in no evento;

### Regras de negócio

- [ X ] O participante só pode se inscrever em um evento uma única vez;
- [ X ] O participante só pode se inscrever em eventos com vagas disponíveis;
- [ X ] O particpante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [ X ] o check-in no evento será realizado através de um QRCode;


### Tecnologias usadas:
  * Node;
  * Typescript;
  * Fastify;
  * Prisma;
  * NoSQL;
  * Swagger;

## Rotas
  ### Eventos;
  * Rota de criar eventos
    ![image](https://github.com/DevKayoS/api-nlw-unite/assets/157029608/b6f6bd24-e474-4d24-b7a3-da7d4fc64fd3)
  ##
  * Rota de acessar os participantes de um evento
    ![image](https://github.com/DevKayoS/api-nlw-unite/assets/157029608/5d077b68-e191-4a8f-bceb-8783c2f3a122)

  ##
  * Rota de acessar os eventos
    ![image](https://github.com/DevKayoS/api-nlw-unite/assets/157029608/dde5f8ce-6cf8-406f-a31a-afc6af821189)

  ### Participantes;
  
  * Rota para adicionar participante em um evento
    ![image](https://github.com/DevKayoS/api-nlw-unite/assets/157029608/6aa678ed-cb6b-4e8f-a8fd-95894c7991bf)

  ##
  * Rota para acessar o badge do participante de um evento
    ![image](https://github.com/DevKayoS/api-nlw-unite/assets/157029608/28788668-18d9-48e3-8d60-3480a8e3a980)

  ### Check-ins
  * Rota para o participante fazer um check-in no evento
    ![image](https://github.com/DevKayoS/api-nlw-unite/assets/157029608/d55d33bd-1864-4cce-a3cb-c0180248a70f)





    

