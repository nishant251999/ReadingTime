const article = document.querySelector("article");

if(article) {
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g; // Regular expression
    let words = text.matchAll(wordMatchRegExp);
    words = [...words];
    const readingTime = Math.round(words.length/200);
    const readingTimeInSec = Math.round(words.length*60/200);

    const badge = document.createElement("p");
    badge.classList.add("timeBadge", "color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} min Read`;
    const time = article.querySelector(".flow-space-200.stack time")?.parentNode;
    const heading = article.querySelector("h1");
    (time??heading).insertAdjacentElement("afterend", badge);
    badge.style.display = 'none';
}

