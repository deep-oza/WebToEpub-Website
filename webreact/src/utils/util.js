export const isStringWhiteSpace = (s) => {
    return !(/\S/.test(s));
};

export const isElementWhiteSpace = (element) => {
    switch (element.nodeType) {
        case Node.TEXT_NODE:
            return isStringWhiteSpace(element.textContent);
        case Node.COMMENT_NODE:
            return true;
    }
    if ((element.tagName === "IMG") || (element.tagName === "image")) {
        return false;
    }
    if (element.querySelector("img, image") !== null) {
        return false;
    }
    return isStringWhiteSpace(element.innerText);
};

export const removeElements = (elements) => {
    for (let e of elements) {
        e.remove();
    }
};

export const removeChildElementsMatchingSelector = (element, selector) => {
    if (element !== null) {
        removeElements(element.querySelectorAll(selector));
    }
};

export const removeComments = (root) => {
    let walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
    let nodeList = [];
    while (walker.nextNode()) {
        nodeList.push(walker.currentNode);
    }
    removeElements(nodeList);
};

const removeEventHandlers = (contentElement) => {
    let walker = contentElement.ownerDocument.createTreeWalker(contentElement, NodeFilter.SHOW_ELEMENT);
    let element = contentElement;
    while (element != null) {
        element.removeAttribute("onclick");
        element = walker.nextNode();
    }
};

export const removeScriptableElements = (element) => {
    removeChildElementsMatchingSelector(element, "script, iframe");
    removeEventHandlers(element);
};

export const removeUnwantedWordpressElements = (element) => {
    let ccs = "div.sharedaddy, div.wpcnt, ul.post-categories, div.mistape_caption, "
        + "div.wpulike, div.wp-next-post-navi, .ezoic-adpicker-ad, .ezoic-ad, "
        + "ins.adsbygoogle";
    removeChildElementsMatchingSelector(element, ccs);
};

export const removeShareLinkElements = (contentElement) => {
    removeChildElementsMatchingSelector(contentElement, "div.sharepost");
};

export const getElements = (dom, tagName, filter) => {
    let array = Array.from(dom.getElementsByTagName(tagName));
    return (filter === undefined || typeof filter !== "function")
        ? array : array.filter(filter);
};

const moveChildElements = (from, to) => {
    while (from.firstChild) {
        to.appendChild(from.firstChild);
    }
};

const copyAttributes = (from, to) => {
    for (let i = 0; i < from.attributes.length; ++i) {
        let attr = from.attributes[i];
        try {
            to.setAttribute(attr.localName, attr.value);
        } catch (e) {
            // probably invalid attribute name.  Discard
        }
    }
};

const convertElement = (element, replacement) => {
    let parent = element.parentElement;
    parent.insertBefore(replacement, element);
    moveChildElements(element, replacement);
    copyAttributes(element, replacement);
    element.remove();
};

const replaceCenterTags = (element) => {
    for (let center of element.querySelectorAll("center")) {
        let replacement = center.ownerDocument.createElement("p");
        replacement.style.textAlign = "center";
        convertElement(center, replacement);
    }
};

const replaceUnderscoreTags = (element) => {
    for (let underscore of element.querySelectorAll("U")) {
        let replacement = underscore.ownerDocument.createElement("span");
        replacement.setAttribute("style", "text-decoration: underline;");
        convertElement(underscore, replacement);
    }
};

const replaceSTags = (element) => {
    for (let underscore of element.querySelectorAll("s")) {
        let replacement = underscore.ownerDocument.createElement("span");
        replacement.setAttribute("style", "text-decoration: line-through;");
        convertElement(underscore, replacement);
    }
};

export const prepForConvertToXhtml = (element) => {
    replaceCenterTags(element);
    replaceUnderscoreTags(element);
    replaceSTags(element);
};

export const removeEmptyAttributes = (content) => {
    const elements = content.querySelectorAll("*");
    for (const element of elements) {
        const attributes = element.attributes;
        const attributesToRemove = [];
        for (let i = 0; i < attributes.length; i++) {
            if (attributes[i].value.trim() === "") {
                attributesToRemove.push(attributes[i].name);
            }
        }
        for (let i = attributesToRemove.length - 1; i >= 0; i--) {
            element.removeAttribute(attributesToRemove[i]);
        }
    }
};

export const removeSpansWithNoAttributes = (content) => {
    const spans = content.querySelectorAll("p span, div span");
    for (const span of spans) {
        if (span.attributes.length === 0) {
            while (span.firstChild) {
                span.parentNode.insertBefore(span.firstChild, span);
            }
            span.parentNode.removeChild(span);
        }
    }
};

export const removeEmptyDivElements = (element) => {
    removeElements(getElements(element, "div", e => isElementWhiteSpace(e)));
};

export const removeTrailingWhiteSpace = (element) => {
    let children = element.childNodes;
    while ((0 < children.length) && isElementWhiteSpace(children[children.length - 1])) {
        children[children.length - 1].remove();
    }
};

export const removeLeadingWhiteSpace = (element) => {
    let children = element.childNodes;
    while ((0 < children.length) && isElementWhiteSpace(children[0])) {
        children[0].remove();
    }
};
