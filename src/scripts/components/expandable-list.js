const CLASS = 'expandable-list';
const CLASS_COLLAPSED = 'expandable-list--collapsed';

const insertAfter = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

const toggle = (list, button) => {
  list.classList.toggle(CLASS_COLLAPSED);

  button.textContent = list.classList.contains(CLASS_COLLAPSED)
    ? list.dataset.labelExpand
    : list.dataset.labelCollapse;
};

export default (list, length = 10) => {
  const button = document.createElement('button');
  button.textContent = list.dataset.labelExpand;
  insertAfter(button, list);

  list.classList.add(CLASS, CLASS_COLLAPSED);

  button.addEventListener('click', () => toggle(list, button));
};
