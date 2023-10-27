import { Node } from './node_generator.js';

export default function classHighlighter(nodes: Node[]) {
  let text = '';
  for (const node of nodes) {
    if (node.type === 'header_file') node.value = node.value.replace('>', '&gt').replace('<', '&lt');
    text += `<span class="aurora-${node.type}">${node.value}</span>`;
  }
  return text;
}

export function inlineHighlighter(nodes: Node[], styles: { [key: string]: string }) {
  let text = '';
  for (const node of nodes) {
    if (node.type === 'header_file') node.value = node.value.replace('>', '&gt').replace('<', '&lt');
    if (styles[node.type]) text += `<span style="color:${styles[node.type]}">${node.value}</span>`;
    else text += node.value;
  }
  return text;
}
