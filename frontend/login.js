let currentEmail = "";

async function login() {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value })
  });

  const data = await res.json();
  if (data.email) {
    currentEmail = data.email;
    mfa.style.display = "block";
  } else {
    alert(data.message);
  }
}

async function verifyMFA() {
  const res = await fetch("http://localhost:3000/verify-mfa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: currentEmail, token: token.value })
  });

  const data = await res.json();
  if (data.message === "Login bem-sucedido!") {
    alert("✅ Login completo!");
    window.location.href = "dashboard.html";
  } else {
    alert("❌ Código inválido!");
  }
}
