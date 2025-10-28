# Parada Inteligente – Sistema e Protótipo IoT

🚦 **Parada Inteligente** é um projeto completo que combina hardware IoT e sistema web para monitoramento de paradas urbanas, com foco em acessibilidade para pessoas com deficiência visual e física.

O projeto integra lógica local no protótipo ESP32 com lógica via nuvem para coleta de dados e ajustes remotos, exibidos em um dashboard web interativo.

---

## 🔹 Descrição

O protótipo IoT utiliza **ESP32** para detectar acionamentos em botões adaptados e acionar LEDs correspondentes. Os dados são enviados para a nuvem (**ThingSpeak**) para análise histórica.  

O dashboard web permite visualizar métricas de cada parada, comparações de fluxo, distribuição de cliques por tipo de usuário e totais de acionamentos em tempo real.

---

## 🔹 Funcionalidades

### Protótipo ESP32
- **Botão Azul:** acionado por pessoas com deficiência visual → LED azul aceso + log.  
- **Botão Amarelo:** acionado por pessoas com deficiência física → LED amarelo aceso + log.  
- Busca limites via ThingSpeak (GET) e aplica regras remotas.  
- **À prova de falhas:** ações críticas locais (LEDs) não dependem da internet.  
- Logs enviados para nuvem permitem análise histórica e ajuste de limites.  

### Dashboard Web
- Gráficos de linhas: tempo, ativação de LED e som.  
- Gráficos de barras: total de cliques por tipo de botão.  
- Atualização automática a cada 5 segundos via API ThingSpeak.  
- Interface responsiva, clara e amigável, construída com HTML, CSS e Chart.js.  
- Visualização de distribuição de cliques por local e tipo de usuário.  

### Sistema Web de Usuários
- **Cadastro:** Nome, e-mail, senha, tipo de usuário (Estudante, Governo, Cidadão).  
- **Login seguro:** validação de senha + MFA (Microsoft Authenticator).  
- Redirecionamento para dashboard após autenticação.  
- Dashboard exibe métricas em tempo real com gráficos interativos.  
- Tema escuro/claro (toggle) e exibição do usuário logado.  

---

## 🔹 Tecnologias Utilizadas

- **Hardware:** ESP32 (simulado no Wokwi), ArduinoJson  
- **Nuvem:** ThingSpeak para logs e limites  
- **Back-end:** Node.js, Express, MongoDB, Mongoose  
- **Autenticação:** bcryptjs (senha), Speakeasy (MFA)  
- **QRCode:** QRCode.js para cadastro MFA  
- **Front-end:** HTML, CSS, JavaScript, Chart.js  

---

## 🔹 Estrutura de Pastas

paradalogin/
├─ backend/
│  ├─ models/
│  │  └─ User.js
│  ├─ server.js
│  └─ package.json
├─ frontend/
│  ├─ login.html
│  ├─ signup.html
│  ├─ dashboard.html
│  ├─ style.css
│  ├─ script.js
│  └─ login.js
├─ esp32/
│  └─ prototipo.ino
└─ README.md

---

## 🔹 Observações

- O dashboard utiliza **LocalStorage** para exibir o usuário logado.   
- Recomendado usar navegador moderno para melhor compatibilidade com gráficos e CSS.  
- Protótipo ESP32 permite decisões instantâneas localmente, garantindo acessibilidade mesmo sem internet.  

---

