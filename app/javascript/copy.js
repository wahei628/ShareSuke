document.addEventListener("turbo:load", () => {
  const passwordCopyBtn = document.getElementById("password_copy_btn");
  const password = document.getElementById("password").innerText;
  const passwordDane = document.getElementById("password_dane");

  const urlCopyBtn = document.getElementById("url_copy_btn");
  const url = document.getElementById("url").innerText;
  const urlDone = document.getElementById("url_done");

  passwordCopyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(password).then(
      () => {
        // コピー成功時の処理;
        passwordDane.style.display = "block";
        setTimeout(() => {
          passwordDane.style.display = "none";
        }, 3000);
      },
      () => {
        // コピー失敗の処理
        alert("コピーに失敗しました");
      }
    );
  });

  urlCopyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(url).then(
      () => {
        // コピー成功時の処理;
        urlDone.style.display = "block";
        setTimeout(() => {
          urlDone.style.display = "none";
        }, 3000);
      },
      () => {
        // コピー失敗の処理
        alert("コピーに失敗しました");
      }
    );
  });
});
