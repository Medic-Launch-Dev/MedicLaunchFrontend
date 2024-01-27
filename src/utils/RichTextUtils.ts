export function getInnerTextFromHTML(htmlString) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlString;
  return tempElement.innerText;
}