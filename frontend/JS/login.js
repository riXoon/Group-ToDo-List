document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("http://localhost:5000/api/v1/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let result;
    try {
      result = await res.json();
    } catch {
      result = {};
    }

    if (res.ok) {
      alert("✅ " + (result.message || "Sign in successfully"));
      localStorage.setItem("token", result.data?.token || "");
      window.location.href = "../HTML/dashboard-mytask.html";
    } else {
      alert("❌ " + (result.message || "Something went wrong"));
    }
  } catch (error) {
    console.error(error);
    alert("❌ Server error, check backend logs");
  }
});
