// ============================================================
// 1. DOM 선택
// ============================================================

const copyButtons = document.querySelectorAll('.copy-component');

// ============================================================
// 2. 함수 구현
// ============================================================

/**
 * ui-component 내의 마크업을 HTML 문자열로 반환
 * copy-component 버튼과 br 태그는 제외
 * @param {Element} button - copy-component 버튼 요소
 * @returns {string} HTML 문자열
 */
function getComponentMarkup(button) {
  // copy-component 버튼의 이전 형제 요소들을 순회하며 ui-component 찾기
  let element = button.previousElementSibling;

  while (element) {
    // br 태그 건너뛰기
    if (element.tagName === 'BR') {
      element = element.previousElementSibling;
      continue;
    }

    // ui-component 찾음
    if (element.classList.contains('ui-component')) {
      return element.innerHTML;
    }

    element = element.previousElementSibling;
  }

  return '';
}

/**
 * 클립보드에 HTML을 텍스트로 복사
 * @param {string} html - 복사할 HTML 문자열
 * @returns {Promise<void>}
 */
async function copyToClipboard(html) {
  try {
    await navigator.clipboard.writeText(html);
  } catch (err) {
    console.error('클립보드 복사 실패:', err);
  }
}

/**
 * 버튼의 텍스트를 임시로 변경
 * @param {Element} button - 변경할 버튼 요소
 * @param {string} newText - 새로운 텍스트
 * @param {number} duration - 표시 시간 (밀리초)
 */
function updateButtonText(button, newText, duration = 2000) {
  const originalText = button.textContent;

  button.textContent = newText;
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, duration);
}

// ============================================================
// 3. 이벤트 바인딩
// ============================================================

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const markup = getComponentMarkup(button);

    if (markup) {
      await copyToClipboard(markup);
      updateButtonText(button, '복사됨', 2000);
    }
  });
});
