# Introdução
O projeto consiste em um software dividido entre frontend e backend, que implementa um sistema dinâmico de apresentação de dados de filmes. Os dados são obtidos de uma API externa, processados e armazenados em um banco de dados online, e, por fim, apresentados em uma interface online onde são devidamente trabalhados.

# Estrutura do Projeto
- **Branches:**
  - O código do **frontend** pode ser encontrado na branch `main` (a branch atual onde este arquivo está localizado).
  - O código do **backend** está na branch `master`.

- **Tecnologias Utilizadas:**
  - **Frontend:** Desenvolvido em JavaScript e TypeScript usando o framework **Next.js**. Bibliotecas como **Axios** são utilizadas para a conexão com o backend.
  - **Backend:** Desenvolvido em Python com o framework **Django**. Bibliotecas adicionais, como **Django Ninja** e **Requests**, ajudam no desenvolvimento da API.

# Links Úteis
- **API no servidor da Render:** [https://api-filmes-fnqy.onrender.com](https://api-filmes-fnqy.onrender.com)
- **Frontend conectado com a API no Vercel:** [https://api-filmes-ten.vercel.app/](https://api-filmes-ten.vercel.app/)
## Observação
- **Como a aplicação possui um banco de dados alimentado por uma API externa talvez quando abra pela primeira vez demore um pouco pois não consegui deixar tudo muito otimizado**
- **E aparentemente a API sofre atualizações constantemente influenciando no número de páginas da aplicação, inicialmente havia 5 páginas de 4 filmes**

# Configuração do Ambiente
Para utilizar o projeto localmente, siga os passos abaixo:

## Clonando o Repositório
1. **Instalação do Git:** Se você ainda não tem o Git instalado, faça o download e instale a partir deste link: [https://git-scm.com/downloads](https://git-scm.com/downloads).
2. **Clonagem do Repositório:** Para clonar o repositório do projeto em seu computador, execute o seguinte comando no terminal:
   ```bash
   git clone https://github.com/Torfyz/API-filmes.git
   ```
   Isso criará uma cópia local do repositório.

## Editor de Código
- Recomendo o uso do **Visual Studio Code**.

## Node.js
- Instale o Node.js, que é necessário para executar o código JavaScript. Você pode baixá-lo [aqui](https://nodejs.org/en).

## Python
- Baixe o interpretador Python, disponível [neste link](https://www.python.org/downloads/).

# Uso da Aplicação
## Observação
- **Link da API:** O link da API no código do frontend deve ser alterado para um link local. A API que está vinculada no código é a mesma do backend do projeto, mas já está em um servidor no Render. 

  O link pode ser encontrado em:
  - **Pasta:** `src` → **Pasta:** `Components` → **Pasta:** `Movielist` → **Arquivo:** `index.tsx` (linha 26).

  **Possível link local:** `http://127.0.0.1:8000/ListFilmes/api/filme/`
  **Obs:** O link deve conter as rotas `/ListFilmes/api/filme/`.

## Execução do Frontend
1. Abra o terminal no Visual Studio Code ou no seu editor de código dentro do diretório do projeto.
2. Execute o seguinte comando para instalar as dependências:
   ```bash
   npm install
   ```
3. Para iniciar o projeto, digite:
   ```bash
   npm run dev
   ```
   O projeto começará a rodar em uma porta local, que será exibida no terminal.

## Execução do Backend
1. Abra o terminal do editor de código dentro do diretório do projeto.
2. Instale as dependências do backend com o comando:
   ```bash
   pip install -r requirements.txt
   ```
3. Para rodar o Django, execute o seguinte comando:
   ```bash
   python manage.py runserver
   ```

# Explorando a Estrutura do Projeto
## Frontend
A pasta `src` contém a principal estrutura da interface, que é uma característica fundamental do **Next.js**, um framework que facilita a criação de aplicações React com renderização no lado do servidor. Dentro da pasta `src`, temos a pasta `Components`, onde ocorre a **componentização**. Um componente específico encontrado na pasta `Moviecards` é responsável por apresentar a dinamismo dos dados que vêm da API conectada no componente `Movielist`.

### Estrutura do Next.js
- **Next.js** organiza os arquivos de maneira que cada página da aplicação pode ser um componente React, permitindo fácil roteamento e otimização. Para mais informações, consulte a [documentação do Next.js](https://nextjs.org/docs).
- **React** é baseado na ideia de componentes, onde a interface é dividida em partes reutilizáveis, facilitando a manutenção e o desenvolvimento. Você pode aprender mais sobre isso na [documentação do React](https://pt-br.react.dev/).

## Backend
A pasta `Movielist` contém o arquivo `settings.py`, que configura todo o projeto Django. Dentro da pasta `NovoCatalogoFilmes`, você encontrará a **app** que estrutura a API externa localizada no arquivo `externalApi.py`. Este arquivo se conecta à API externa, enquanto o arquivo `api.py` cria uma API própria que guarda os dados no banco de dados estruturado no arquivo `models.py`.

### O Que é uma App?
No contexto do Django, uma **app** é um módulo que contém funcionalidades específicas, permitindo uma organização modular do código. Cada app pode ter seu próprio conjunto de modelos, visualizações e rotas. Para mais detalhes, consulte a [documentação do Django](https://docs.djangoproject.com/pt-br/5.1/).
