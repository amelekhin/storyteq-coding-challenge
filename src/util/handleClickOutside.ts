type CallbackFn = () => void;

export default function handleClickOutside(node: HTMLElement, callback: CallbackFn): void {
  function handleClickOutside(event: MouseEvent) {
    let currentElem = event.target as HTMLElement;

    while (currentElem !== null && currentElem !== document.body) {
      if (currentElem === node) {
        return;
      }

      currentElem = currentElem.parentElement as HTMLElement;
    }

    callback();
    document.body.removeEventListener('click', handleClickOutside);
  }

  document.body.addEventListener('click', handleClickOutside);
}
