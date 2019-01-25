import treeRender from './treeRender';
import plainRender from './plainRender';

const render = {
  tree: treeRender,
  plain: plainRender,
};

export default outputFormat => render[outputFormat];
