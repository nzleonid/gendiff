import treeRender from './treeRender';
import plainRender from './plainRender';

const render = {
  tree: treeRender,
  plain: plainRender,
  json: JSON.stringify,
};

export default outputFormat => render[outputFormat];
