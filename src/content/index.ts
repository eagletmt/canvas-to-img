const UNDEFINED_CANVAS_HEIGHT = 150;
const UNDEFINED_CANVAS_WIDTH = 300;

let canvasElements: HTMLCanvasElement[] = [];

for (let canvas of document.querySelectorAll('canvas')) {
  if (canvas.height !== UNDEFINED_CANVAS_HEIGHT && canvas.width != UNDEFINED_CANVAS_WIDTH) {
    canvasElements.push(canvas);
  }
}

if (!(window as any).hasRun) {
  (window as any).hasRun = true;

  browser.runtime.onMessage.addListener((message: object, sender: browser.runtime.MessageSender, sendResponse: (response: object) => Promise<void>) => {
    sendResponse(buildResult());
  });
}

function buildResult(): QueryResult {
  return {
    canvasElements: canvasElements.map((c) => {
      let attrs = [];
      for (let attr of Array.from(c.attributes)) {
        attrs.push(`${attr.name}="${attr.value}"`);
      }
      let title = '<canvas';
      if (attrs.length !== 0) {
        title += ` ${attrs.join(' ')}`;
      }
      title += '>';
      return {
        title: title,
        dataURL: c.toDataURL(),
      };
    }),
  };
}
