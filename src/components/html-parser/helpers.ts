export const preHTMLClear = (html: string): string => {
  let finalHTML;

  finalHTML = html.replace(/\n/g, '');
  finalHTML = finalHTML.replace(/&nbsp;/g, ' ');

  return finalHTML;
};

export const cleanText = (text: string): string => {
  let finalText;

  finalText = text.replace(/\[.*?\]/g, '');
  finalText = finalText.trim();

  return finalText;
};

export const cleanFromTags = (el): string => {
  const { children, type, data } = el;

  if (type === 'text') return cleanText(data);

  const text = children
    .map((childNode) => {
      const { type, data } = childNode;

      if (type === 'text') {
        return cleanText(data);
      } else if (type === 'tag') {
        return cleanFromTags(childNode);
      }

      return '';
    })
    .filter((nodeText) => nodeText.trim().length !== 0)
    .join('');

  return text;
};

export const cleanSrc = (src: string): string => {
  const [finalSrc] = src.match(/(.*?(?:jpg|png|jpeg))|.*/)!;

  return finalSrc;
};
