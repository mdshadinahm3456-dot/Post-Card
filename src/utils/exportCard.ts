import html2canvas from 'html2canvas-pro';

export interface ExportOptions {
  element: HTMLElement;
  filename: string;
  format: 'png' | 'jpeg';
  scale?: number;
}

export async function exportElementToImage({
  element,
  filename,
  format,
  scale = 2.5
}: ExportOptions): Promise<boolean> {
  try {
    if (!element) {
      throw new Error('Export element not found');
    }

    // Capture with html2canvas-pro which natively supports CSS Color Level 4 (oklab, oklch, lab, etc.)
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#120e0b',
      logging: false,
      imageTimeout: 10000,
      onclone: (_clonedDoc, clonedElement) => {
        // Ensure no transform glitches or animation artifacts on clone
        clonedElement.style.transform = 'none';
        clonedElement.style.boxShadow = 'none';
        clonedElement.style.animation = 'none';
        clonedElement.style.transition = 'none';

        const allNodes = clonedElement.querySelectorAll('*');
        allNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            node.style.animation = 'none';
            node.style.transition = 'none';
          }
        });
      }
    });

    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const extension = format === 'jpeg' ? 'jpg' : 'png';
    const dataUrl = canvas.toDataURL(mimeType, 0.95);

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${filename || 'magic-card'}-${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}
