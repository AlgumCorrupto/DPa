<h1>Desassistente Pessoal artificial</h1>
<p>Um bot que era para o servidor do discord do Estação Pirata.</p>
<h2>Uso</h2>
<p>é necessário a chave de API do bot, uma database postgres (no momento está hardcoded slots para database do pirata e do fronteira), um arquivo config.json 
e provavelmente no futuro uma chave de API do servidor de SS14 em si.</p>
<p> Até o momento não cheguei a checar como a instalação é feita em si, no entanto estou usando o node 18 e npm 9 na minha máquina, provavelmente o que você deve fazer é clonar o repositório com o comando:
<code>git clone https://github.com/AlgumCorrupto/DPa</code>;</p>

<p>Para instalar os pacotes necessários use o comando: <code>npm i</code>;</p>
<p>É necessário pegar um arquivo <code>config.json</code> comigo ou um dos integrantes do projeto. Mais tarde eu publico um template na repo.</p>
<p>Caso tudo esteja certo rode <code>node command-deployer.js</code> e <code>node index.js</code></p>

<h2>
  Contribuição:
</h2>
<p>Usamos o discord.js para o backend do bot, os comandos devem ficar no diretório <code>./commands</code>. Subdiretórios são permitidos</p>
<p>Usamos a lib postgres-node (pg) para fazer acesso ao o banco de dados</p>
<h2>
  Progresso:
</h2>
<p>
- _ Comandos da família playtime - v0.1.
</p>
