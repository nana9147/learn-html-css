// ===== DOM 선택 =====
const copyButtons = document.querySelectorAll('.copy-component');

// ===== 함수 구현 =====
function copyComponentMarkup(button) {
  const uiComponent = button.closest('.ui-component');
  if (!uiComponent) return;
  // 복사할 마크업: copy-component 버튼 제외
  const clone = uiComponent.cloneNode(true);
  const copyBtnInClone = clone.querySelector('.copy-component');
  if (copyBtnInClone) copyBtnInClone.remove();
  // innerHTML 복사
  const markup = clone.innerHTML.trim();
  // 클립보드에 복사
  navigator.clipboard.writeText(markup);
}

function showCopiedState(button) {
  const originalText = button.textContent;
  button.textContent = '복사됨';
  button.disabled = true;
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 1500);
}

// ===== 이벤트 바인딩 =====
copyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    copyComponentMarkup(button);
    showCopiedState(button);
  });
});
