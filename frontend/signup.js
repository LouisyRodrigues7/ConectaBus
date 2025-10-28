async function signup() {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    userType: document.getElementById("userType").value
  };

  try {
    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.qrCodeUrl) {
      showQRPopup(result.qrCodeUrl);
    } else {
      showPopup(result.message, false);
    }
  } catch (error) {
    console.error("Erro no cadastro:", error);
    showPopup("❌ Ocorreu um erro no cadastro.", false);
  }
}

function showQRPopup(qrUrl) {
  const popup = document.getElementById("qr-popup");
  const qrImg = document.getElementById("qrPopupImg");
  qrImg.src = qrUrl;

  popup.classList.add("show");

  const closeBtn = document.getElementById("closeQRBtn");
  closeBtn.onclick = () => {
    popup.classList.remove("show");
  };
}

// Popup de mensagens geral 
function showQRPopup(qrUrl) {
  const popup = document.getElementById("qr-popup");
  const qrImg = document.getElementById("qrPopupImg");
  qrImg.src = qrUrl;

  popup.classList.add("show");

  const closeBtn = document.getElementById("closeQRBtn");
  closeBtn.onclick = () => {
    popup.classList.remove("show");
    // Redireciona para a tela de login
    window.location.href = "index.html";
  };
}
