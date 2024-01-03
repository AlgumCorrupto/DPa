<h1>Desassistente Pessoal artificial</h1>
<p>Um bot que estou desenvolvendo para o servidor do discord do Estação Pirata.</p>
<p>Bot ainda em desenvolvimento, planejado para ser tanto ferramenta administrativa remota, quanto uma ferramenta divertida com algumas interações.</p>
<h2>Uso</h2>
<p>é necessário a chave de API do bot, uma database postgres (no momento está hardcoded slots para database do pirata e do fronteira), um arquivo config.json 
e provavelmente no futuro uma chave de API do servidor de SS14 em si.</p>
<p> até o momento não cheguei a checar como a instalação é feita em si, estou usando o node 18 e npm 9 na minha máquina, provavelmente o que você deve fazer é clonar o repositório com o comando:
<code>git clone https://github.com/AlgumCorrupto/DPa</code>;</p>

<p>Instalar os pacotes necessários com o comando: <code>npm i</code>.</p>
<p>E pegar um arquivo <code>config.json</code> comigo ou um dos integrantes do projeto, mais tarde eu publico um template na repo.</p>
<p>Caso tudo esteja certo rode <code>node command-deployer.js</code> e <code>node index.js</code></p>

<h2>
  Contribuição:
</h2>
<p>Usamos o discord.js para o backend do bot, os comandos devem ficar no diretório <code>./commands</code>.</p>
<p></p>subdiretórios são permitidos, usamos a lib postgres para fazer crud com o banco de dados</p>

