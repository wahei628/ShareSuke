document.addEventListener("turbo:load", () => {
  const passwordField = document.getElementById("password-field");
  const passwordDisplay = document.getElementById("password");
  const copyButton = document.getElementById("password_copy_btn");
  const tooltip = document.getElementById("password_tooltip");

  passwordField.addEventListener("input", function () {
    passwordDisplay.textContent = passwordField.value;
  });

  copyButton.addEventListener("click", function () {
    navigator.clipboard
      .writeText(passwordField.value)
      .then(() => {
        tooltip.classList.remove("hidden");
        setTimeout(() => {
          tooltip.classList.add("hidden");
        }, 2000);
      })
      .catch(() => {
        alert("パスワードのコピーに失敗しました。");
      });
  });
});
