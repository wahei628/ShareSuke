document.addEventListener("turbo:load", () => {
  const urlCopyBtn = document.getElementById("url_copy_btn");
  const url = document.getElementById("url").innerText;
  const urlDone = document.getElementById("url_done");

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
