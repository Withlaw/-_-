export const initializingInput = (...nodes: HTMLInputElement[]) => {
  nodes.forEach((el, idx) => {
    if (idx === 0) el.focus(); // 첫번째 요소 오토 포커싱
    el.value = ''; // input 초기화
  });
};
