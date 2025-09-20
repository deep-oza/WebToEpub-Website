export const setBaseTag = (url, dom) => {
  if (dom != null) {
    let tags = Array.from(dom.getElementsByTagName("base"));
    if (0 < tags.length) {
      tags[0].setAttribute("href", url);
    } else {
      let baseTag = dom.createElement("base");
      baseTag.setAttribute("href", url);
      dom.getElementsByTagName("head")[0].appendChild(baseTag);
    }
  }
};

export const parseHtml = (htmlString) => {
  return new DOMParser().parseFromString(htmlString, 'text/html');
};
