
# Stark Bank - AI Revolution Hackathon

## Solução: Hakutaku

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="assets/hakutaku.png" alt="Hakutaku" border="0"></a>
</p>

## Equipe: Refrescos 🥤🥝

Apresentação: [Link para o Canva](https://www.canva.com/design/DAGPfm-homw/2dk2stOKLL1KByeFm-IKdA/edit?utm_content=DAGPfm-homw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton/)

### Integrantes:

<div align="center">
  <table>
    <tr>
      <td align="center"><a href="https://www.linkedin.com/in/davi-abreu-da-silveira/"><img style="border-radius: 10%;" src="./assets/davi.jpg" width="100px;" alt="Davi" /><br><sub><b>Davi Abreu</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/gabriela-fichtner/"><img style="border-radius: 10%;" src="./assets/gabriela.jpeg" width="100px;" alt="Gabriela"/><br><sub><b> Gabriela Fichtner</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/raduanmuarrek/"><img style="border-radius: 10%;" src="./assets/raduan.jpeg" width="100px;" alt="Raduan"/><br><sub><b>Raduan Muarrek</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/vinicioslugli/"><img style="border-radius: 10%;" src="./assets/lugli.jpg" width="100px;" alt="Vinicios"/><br><sub><b>Vinicios Lugli</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/rodrigo-campos-8b70191ab/"><img style="border-radius: 10%;" src="./assets/rodrigo.jpeg" width="100px;" alt="Rodrigo"/><br><sub><b>Rodrigo Campos</b></sub></a></td>
    </tr>
  </table>
</div>

## Sumário
[1. Extrutura de Pastas](#1-extrutura-de-pastas)

[2. Descrição](#c2)

[3. Personas](#c3)

[4. Análise da empresa](#c4)

[5. Análise de dados](#c5)

## 1. Extrutura de Pastas

## 2. Descrição da Hakutaku

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A Hakutaku é um assistente inteligente que usa IA para fornecer insights e otimizar o uso de informações no StarkBank, ajudando clientes e colaboradores a economizar tempo com um chatbot que resolve dúvidas sobre APIs e facilita o acesso a dados.

### 2.1 Missão:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Transformar a informação da empresa em ações que impulsionem o sucesso de clientes e colaboradores, promovendo inovação e transparência

## 3. Personas

### 3.1 Colaborador do StarkBank:

**Nome**: Lucas Almeida

**Profissão**: Desenvolvedor

**Descrição**: Lucas trabalha no StarkBank há três anos, e faz parte da equipe de devs do banco. Com formação em Sistemas de Informação, Lucas tem facilidade com tecnologia e é conhecido por resolver problemas complexos e entender as necessidades dos clientes.

**Objetivos:**
- Dar autonomia e otimizar o tempo de implementação da API do StarkBank pelo cliente
- Obter insights que possam ser compartilhados com as áreas de produto e marketing para melhorar a experiência do cliente
- Aumentar o número de produtos que o cliente utiliza do StarkBank

**Dores:**
- Frequentemente precisa interromper operações para responder a dúvidas de clientes sobre a integração da API do Stark Bank
- Sentimento de frustração ao lidar com perguntas recorrentes que poderiam ser evitadas com melhorias no produto ou na comunicação
- Pressão para manter altos níveis de satisfação do cliente em um ambiente dinâmico e com alta demanda
- Desafios para integrar insights de diferentes fontes de dados, criando uma visão coesa das necessidades dos clientes

### 3.2 Dev de empresa cliente

**Nome**: Mariana Costa

**Profissão**: Engenheira de Software

**Descrição**: Mariana é uma Engenheira de Software na VTEX. Ela é conhecida pela sua habilidade em resolver problemas complexos e implementar soluções técnicas robustas.

**Objetivos**:
- Concluir a integração entre os sistemas da VTEX e as APIs do Stark Bank de forma autonoma
- Minimizar o tempo de desenvolvimento, evitando retrabalhos e garantindo a entrega dentro dos prazos
- Garantir a segurança e conformidade das integrações com os padrões exigidos

**Dores:**
- Documentações longas que entregam informações pontuais para ela
- Dúvidas personalizadas em relação à integração da VTEX com o StarkBank, que podem ser sanadas com os desenvolvedores da Stark, mas leva tempo

## 4. Análise da empresa

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A Hakutaku é uma solução SaaS (Software as a Service) voltada para o mercado B2B, atendendo especialmente instituições financeiras, empresas de tecnologia e organizações que oferecem infraestrutura tecnológica de alta complexidade. Nossa proposta é ajudar empresas que lidam com grandes volumes de dados e necessitam de rapidez e precisão no suporte ao cliente, transformando o atendimento e o acesso a informações em uma vantagem competitiva, gerando insights visando a rampagem de clientes e melhoria de produtos para seus clientes.

**Diferencial:**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Os dados qualitativos e as dores (dados) coletadas pelo chatbot, que são baseados em histórico, quando associados é possível identificar padrões e tendências que podem ser usados para aprimorar a experiência do cliente e oferecer mais serviços, já que boa parte da informação da potencialidade dos clientes não são tão profundos atualmente na StarkBank, mas são de grande valor pois podem afetar positivamente a rampagem dos clientes.

## 5. Desenvolvimento
Descrição do desenvolvimento da solução.
### 5.1 Análise de Dados

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Utilizando os dados fornecidos pela equipe da Stark Bank, o arquivo corporate_purchase.csv foi analisado para identificar características relevantes dos clientes. Foram examinados padrões de compra, como o número de transações, valores, categorias dos produtos e datas, com o objetivo de fornecer essas informações como input para o chatbot. Inicialmente, o software Looker Studio foi empregado para explorar os dados por meio de gráficos e análises estatísticas.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Em seguida, os dados foram processados no Jupyter Notebook, onde, com o uso da biblioteca Pandas em Python, foram extraídas informações detalhadas de nove dimensões distintas, como o total de transações por categoria, transações por status e status por tipo de produto, entre outros. Após essa extração, as informações foram preparadas e incorporadas como input ao modelo.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;É possivel encontrar os arquivos relativos na pasta [sources/notebook](./sources/notebook/).

### 5.2 Modelo de Chatbot

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Utilizamos do serviço de Agent Builder da Vertex AI para criar o sistema de chatbot, junto ao RAG e Embeddings do nossa datalake. O chatbot foi treinado com base nas perguntas mais frequentes dos clientes e colaboradores que geramos em uma mockup, e ele entende muito bem as perguntas e responde com precisão com base nos dados fornecidos pela Stark Bank ( Atualmente foi adicionado informaçoes sobre o uso da API e sobre os produtos da Stark Bank).

![Vertex](./assets/vertex.png)

### 5.3 Dashboard e API

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Para criação da nossa dashboard e API (Integrada) foi utilizado da framework NextJS, que é uma framework de ReactJS, e do serviço de API Gateway da Google Cloud. A dashboard foi criada para que os colaboradores da Stark Bank possam ter acesso a informações sobre os clientes e sobre o uso da API, e a API foi criada para que os clientes da Stark Bank possam ter acesso a informações sobre os produtos da Stark Bank.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Os código relativo a dashboard e API podem ser encontrados na pasta [sources/dashboard](./sources/dashboard/).

Componentes principais da nossa solução:
- [Rotas da API](./sources/dashboard/app/api)
- [Página de Chat](./sources/dashboard/app/(layout))
- [Página de Report](./sources/dashboard/app/(raw))
- [Serviços da Google, OpenAPI e Fake testes gerados](./sources/dashboard/services)


Arquitetura de fluxo:
- Temos a entrada de dados do cliente e colaborador, que são processados pelo chatbot e pela API, e retornam informações para o cliente e colaborador como resposta e armazenamento os chats e dados dos clientes.
- Os Logs de requisições da API da Stark Bank são coletados e armazenados(no caso mockados com os dados enviados no Drive).
- O modelo da OpenAI gera relatórios e insights com base nos dados coletados, usando o histórico de conversas e dados dos clientes, e as requisições da API da Stark Bank, que foram devidamente tratadas e armazenadas com filtros fornecidos em [5.1 Análise de Dados](#5-1-analise-de-dados).
- Os resultados são exibidos na dashboard, que é acessada pelos colaboradores da Stark Bank, e na API, que é acessada pelos clientes da Stark Bank.

![Arquitetura](./assets/arquitetura.png)

