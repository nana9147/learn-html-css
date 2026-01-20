// ============================================================
// Avatar 토글: DOM 선택, 함수 구현, 이벤트 바인딩 구분
// ============================================================

// -------------------------
// 1) DOM 선택
// -------------------------
const avatarButtons = document.querySelectorAll('.avatar');

// -------------------------
// 2) 함수 구현
// -------------------------
// 초기 aria-pressed 상태 및 역할/tabindex 보강
function initAriaPressed() {
  avatarButtons.forEach((btn) => {
    const isOnline = btn.classList.contains('online');
    btn.setAttribute('aria-pressed', String(!!isOnline));

    // button 요소가 아닐 경우 접근성 역할 및 포커스 허용
    if (btn.tagName !== 'BUTTON') {
      if (!btn.hasAttribute('role')) btn.setAttribute('role', 'button');
      if (!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex', '0');
    }
  });
}

// 즉시 초기화
initAriaPressed();

/**
 * 아바타의 상태를 토글합니다.
 * - `online` <-> `offline` 클래스 토글
 * - 접근성용 텍스트(.sr-only) 업데이트
 * @param {HTMLButtonElement} btn
 */
function toggleAvatarState(btn) {
  const isOnline = btn.classList.contains('online');

  if (isOnline) {
    btn.classList.remove('online');
    btn.classList.add('offline');
  } else {
    btn.classList.remove('offline');
    btn.classList.add('online');
  }

  const sr = btn.querySelector('.sr-only');
  if (sr) {
    sr.textContent = isOnline ? '오프라인' : '온라인';
  }

  // aria-pressed 업데이트
  btn.setAttribute('aria-pressed', String(!isOnline));
}

// -------------------------
// 3) 이벤트 바인딩
// -------------------------
avatarButtons.forEach((btn) => {
  btn.addEventListener('click', () => toggleAvatarState(btn));

  // 비-버튼 요소의 경우 키보드로도 토글할 수 있게 처리 (Enter / Space)
  if (btn.tagName !== 'BUTTON') {
    btn.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
        e.preventDefault();
        toggleAvatarState(btn);
      }
    });
  }
});
