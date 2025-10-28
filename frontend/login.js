let currentEmail = "";

// Função de login
async function login() {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value })
  });

  const data = await res.json();
  if (data.email) {
    currentEmail = data.email;
    document.getElementById("mfa-modal").style.display = "flex";
  } else {
    showPopup("Erro", data.message, false);
  }
}

// Função para mostrar popup estilizado
function showPopup(title, message, success = true) {
  const popup = document.createElement("div");
  popup.className = "popup";

  // Ícone de check ou erro
  const icon = document.createElement("div");
  icon.className = "icon";
  icon.innerHTML = success ? "✔" : "✖";
  icon.style.color = success ? "#0a6624" : "#ff4c4c"; 

  // Container de texto
  const text = document.createElement("div");
  text.className = "text";

  const popupTitle = document.createElement("h3");
  popupTitle.className = "title";
  popupTitle.innerText = title;
  popupTitle.style.color = "#ffffff"; 

  const popupMessage = document.createElement("p");
  popupMessage.className = "message";
  popupMessage.innerText = message;
  popupMessage.style.color = "#e0e6ed";

  text.appendChild(popupTitle);
  text.appendChild(popupMessage);

  popup.appendChild(icon);
  popup.appendChild(text);

  document.body.appendChild(popup);

  // Mostra popup
  setTimeout(() => popup.classList.add("show"), 10);

  // Esconde depois de 2,5 segundos
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  }, 2500);
}

// Função de verificação do MFA
async function verifyMFA() {
  const res = await fetch("http://localhost:3000/verify-mfa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: currentEmail, token: token.value })
  });

  const data = await res.json();
  if (data.message === "Login bem-sucedido!") {
    showPopup("Login Completo", "✅ Você entrou no ConectaBus com sucesso!", true);
    setTimeout(() => window.location.href = "dashboard.html", 2500);
  } else {
    showPopup("Erro", "❌ Código inválido!", false);
  }
}
