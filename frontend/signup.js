async function signup() {
    // Coleta os valores dos inputs
    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      userType: document.getElementById("userType").value
    };
  
    try {
      // Envia os dados para o backend
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      const result = await res.json();
  
      if (result.qrCodeUrl) {
        // Mostra o QR Code na tela
        document.getElementById("qr").src = result.qrCodeUrl;
        document.getElementById("qrArea").style.display = "block";
        alert("✅ Cadastro realizado! Escaneie o QR Code no Microsoft Authenticator.");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("❌ Ocorreu um erro no cadastro.");
    }
  }
  