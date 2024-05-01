"use client";

/**
 * Creates a new popup window in the middle of the screen
 * @param url the URL that the popup navigates to
 * @param title the title of the popup window
 * @param width the width of the popup window in pixels
 * @param height the height of the popup window in pixels
 * @returns a reference to the popup window
 */
export function openPopup(
  url: string,
  title: string,
  width: number,
  height: number
): Window | null {
  const features = {
    width: window.innerWidth,
    height: window.innerHeight,
    adjustX:
      window.screenLeft != undefined ? window.screenLeft : window.screenX,
    adjustY: window.screenTop != undefined ? window.screenTop : window.screenY,
  };
  const position = {
    left: features.width / 2 - width / 2 + features.adjustX,
    top: features.height / 2 - height / 2 + features.adjustY,
  };

  const popup = window.open(
    url,
    title,
    `scrollbars=yes,width=${width},height=${height},top=${position.top},left=${position.left}`
  );

  if (popup) {
    popup.focus();
  }

  return popup;
}
