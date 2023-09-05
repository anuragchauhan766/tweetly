/**
 *
 * @param element - React change event
 * @param {string} defaultHeight - default height of element
 * @param {number} padding - top and bottom padding of input element combined in pixle
 */
const autoheight = (
  element: React.ChangeEvent<HTMLTextAreaElement>,
  defaultHeight: string,
  padding: number = 0
) => {
  if (element) {
    const target = element.target;
    target.style.height = defaultHeight;
    target.style.height = `${target.scrollHeight + padding}px`;
    console.log(target.style.height);
  }
};
export default autoheight;
