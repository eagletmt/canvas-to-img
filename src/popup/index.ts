document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('popup-canvas-list')!;
  root.appendChild(document.createTextNode('Loading canvas elements...'));

  browser.tabs.executeScript(undefined, {file: '/dist/content.js'}).then(() => {
    return browser.tabs.query({active: true, currentWindow: true});
  }).then((tabs) => {
    return browser.tabs.sendMessage(tabs[0].id!, {}) as Promise<QueryResult>;
  }).then((result) => {
    renderCanvasList(root, result.canvasElements);
  }).catch((e) => {
    renderErrorMessage(root, e);
  });
});

function clearChildren(root: HTMLElement) {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
}

function renderCanvasList(root: HTMLElement, canvasElements: CanvasElement[]) {
  clearChildren(root);
  if (canvasElements.length === 0) {
    root.appendChild(document.createTextNode('No canvas elements'));
  } else {
    for (const canvas of canvasElements) {
      const div = document.createElement('div');
      const h3 = document.createElement('h3');
      const img = document.createElement('img');
      h3.appendChild(document.createTextNode(canvas.title));
      img.style.maxHeight = '480px';
      img.style.maxWidth = '640px';
      img.src = canvas.dataURL;
      div.appendChild(h3);
      div.appendChild(img);
      root.appendChild(div);
    }
  }
}

function renderErrorMessage(root: HTMLElement, error: Error) {
  clearChildren(root);
  const h3 = document.createElement('h3');
  h3.appendChild(document.createTextNode('Failed to load canvas elements'));
  root.appendChild(h3);
  root.appendChild(document.createTextNode(error.toString()));
}
