## Backend

Projeto utilizando node, typescript, express, jest.\

### Pré requisitos

- Antes de rodar o projeto certifique se você tem o git e o node instalados em sua maquina rodando os seguintes comandos:
  **git --version** e **node -v** respectivamente, caso não tenha instale antes de ir para o próximo passo.

### Instalação

1. Clone o repositorio do seu fork
   ```sh
   git clone <URL>
   ```
2. Entre na pasta server
   ```sh
   cd server
   ```
3. Copie o arquivo .env.example e renomeie para .env e preencha a API_KEY <br />
   Obs: O token pode ser gerado no site Alpha Vantage [click aqui](https://www.alphavantage.co/support/#api-key)

4. Instale os pacotes npm
   ```sh
   npm install
   ```

### Execução

- Para executar em modo desenvolvimento
  ```sh
  npm run dev
  ```

### Rotas

Utilizando o projeto de forma local a base URL será [http://localhost:3001](http://localhost:3001)

#### `/stock/:stockName/quote`<br>

Esta requisição irá buscar a última cotação da ação especificada.<br>
Neste exemplo iremos utilizar a ação **"VAL"** <br>
**"/stock/VAL/quote"**<br><br>

- Sucesso:
  ```sh
  {
  "name": "VAL",
  "lastPrice": 62.83,
  "pricedAt": "2022-11-03"
  }
  ```
- Falha:
  ```sh
  {
  	"message": "Stock with name VAL not found "
  }
  ```
  <br><br><br>

#### `/stocks/:stockName/history`<br>

Está requisição irá buscar todas as alterações da ação especificada no periodo enviado.<br>
É obrigatório o envio dos parâmetros `from` e `to` nos query params da requisição, os 2 campos devem ir com o tipo Date.<br>
Neste exemplo iremos utilizar a ação **"VAL"**, from **"Nov 01 2022 GMT-0300"** e to **"Nov 02 2022 GMT-0300"**<br>
**"/stocks/VAL/history?from=Nov%2001%202022%20GMT-0300&to=Nov%2002%202022%20GMT-0300"**<br><br>

- Sucesso:
  ```sh
  {
  "name": "VAL",
  "prices": [
  	{
  		"opening": 63.19,
  		"low": 61,
  		"high": 64.35,
  		"closing": 61.63,
  		"pricedAt": "2022-11-02",
  		"volume": 1011467
  	},
  	{
  		"opening": 67.89,
  		"low": 62.631,
  		"high": 68.87,
  		"closing": 62.92,
  		"pricedAt": "2022-11-01",
  		"volume": 1375669
  	}
  ]
  }
  ```
- Falha:

  ```sh
  {
  "message": "Stock with name VAL not found "
  }
  ```

  ```sh
  {
  "message": "Missing query param: from"
  }
  ```

  ```sh
  {
  "message": "Missing query param: to"
  }
  ```

  <br><br><br>

#### `/stocks/:stockName/compare`<br>

Esta requisição irá trazer a última alteração da ação principal e de todas as ações enviadas para comparação.<br>
É obrigatório o envio do parâmetro `stocksToCompare[]` do tipo array nos query params da requisição.<br>
Neste exemplo iremos utilizar a ação **"VAL"**, stocksToCompare[] **"VALE"** e stocksToCompare[] **"V"**<br>
**"/stocks/VAL/compare?stocksToCompare[]=VALE&stocksToCompare[]=V"**<br><br>

- Sucesso:
  ```sh
  {
  "lastPrices": [
  	{
  		"name": "VAL",
  		"lastPrice": 62.83,
  		"pricedAt": "2022-11-03"
  	},
  	{
  		"name": "VALE",
  		"lastPrice": 13.11,
  		"pricedAt": "2022-11-03"
  	},
  	{
  		"name": "V",
  		"lastPrice": 194.75,
  		"pricedAt": "2022-11-03"
  	}
  ]
  }
  ```
- Falha:

  ```sh
  {
  "message": "Stock with name VAL not found "
  }
  ```

  ```sh
  {
  "message": "The stocks to compare was not provided or was provided as empty array"
  }
  ```

  <br><br><br>

#### `/stocks/:stockName/gains`<br>

Esta requisição irá trazer a previsão de ganhos baseados na data de compra e quantidade comprada se for vender a ação de acordo com sua última cotação.<br>
É obrigatório o envio dos parâmetros `purchasedAt` do tipo Date e `purchasedAmount` do tipo númerico nos query params da requisição.<br>
Neste exemplo iremos utilizar a ação **"VAL"**, purchasedAt **"Nov 01 2022 GMT-0300"** e purchasedAmount **"10.5"**<br>
**"/stocks/VAL/gains?purchasedAt=Nov%2001%202022%20GMT-0300&purchasedAmount=10.5"**<br><br>

- Sucesso:
  ```sh
   {
  "name": "VAL",
  "lastPrice": 62.83,
  "priceAtDate": 62.92,
  "purchasedAmount": 10.5,
  "purchasedAt": "2022-11-01",
  "capitalGains": -0.9449999999999363
   }
  ```
- Falha:

  ```sh
  {
  "message": "Stock with name VAL not found "
  }
  ```

  ```sh
  {
  "message": "Missing query param: purchasedAt"
  }
  ```

  ```sh
  {
  "message": "Missing query param: purchasedAmount"
  }
  ```

# 🚨 IMPORTANTE 🚨

Ao utilizar a chave de api do Alpha Vantage você só poderá realizar 5 chamadas por minuto e 100 por dia. Entretanto nada impede que você registre várias chaves para conseguir dar continuidade ao desenvolvimento.
