/**
 *
 * @param element - React change event
 * @param {string} defaultHeight - default height of element
 */
const autoheight = (
  element: React.ChangeEvent<HTMLTextAreaElement>,
  defaultHeight: string
) => {
  if (element) {
    const target = element.target;
    target.style.height = defaultHeight;
    target.style.height = `${target.scrollHeight}px`;
  }
};
export default autoheight;
