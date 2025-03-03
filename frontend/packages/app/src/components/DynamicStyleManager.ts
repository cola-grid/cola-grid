export class DynamicStyleManager {
  private styleSheet: CSSStyleSheet;

  constructor() {
    // 创建 style 元素
    const style = document.createElement('style');
    document.head.appendChild(style);
    this.styleSheet = style.sheet as CSSStyleSheet;
  }

  addOrUpdateStyle(editor: string, color: string): void {
    const selector = `[data-editor-info="${editor}"]::after`;
    const rule = `{
      background-color: ${color};
      opacity: 0.8;
    }`;

    // 查找并更新现有规则，如果不存在则添加新规则
    const index = this.findRuleIndex(selector);
    if (index !== -1) {
      this.styleSheet.deleteRule(index);
      this.styleSheet.insertRule(selector + rule, index);
    } else {
      this.styleSheet.insertRule(selector + rule, this.styleSheet.cssRules.length);
    }
  }

  removeStyle(editor: string): void {
    const index = this.findRuleIndex(`[data-editor-info="${editor}"]::after`);
    if (index !== -1) {
      this.styleSheet.deleteRule(index);
    }
  }

  private findRuleIndex(selector: string): number {
    for (let i = 0; i < this.styleSheet.cssRules.length; i++) {
      if ((this.styleSheet.cssRules[i] as CSSStyleRule).selectorText === selector) {
        return i;
      }
    }
    return -1;
  }
}
