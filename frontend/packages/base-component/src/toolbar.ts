import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cola-toolbar')
export class ColaToolbar extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      background: var(--toolbar-bg, #ffffff);
      border-bottom: 1px solid var(--toolbar-border-color, #e8e8e8);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
      justify-content: space-between;
    }

    .toolbar-left,
    .toolbar-middle,
    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toolbar-middle {
      flex: 1;
      justify-content: flex-start;
      margin: 0 16px;
    }

    .toolbar-button {
      padding: 4px 8px;
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--button-color, #636363);
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      border-radius: 4px;
      transition: all 0.2s;
      height: 28px;
    }

    .toolbar-button.icon-only {
      width: 28px;
      padding: 4px;
      justify-content: center;
    }

    .toolbar-button:hover {
      color: var(--button-hover-color, #1890ff);
      background: var(--button-hover-bg, rgba(24, 144, 255, 0.1));
    }

    .toolbar-button:active {
      color: var(--button-active-color, #0958d9);
    }

    .toolbar-button svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
      flex-shrink: 0;
    }

    .toolbar-button[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .divider {
      width: 1px;
      height: 24px;
      background: var(--divider-color, #e8e8e8);
      margin: 0 8px;
    }
  `;

  @property({ type: Boolean })
  canUndo = false;

  @property({ type: Boolean })
  canRedo = false;

  @property({ type: Boolean })
  canInsertRow = true;

  @property({ type: Boolean })
  canHideColumns = true;

  @property({ type: Boolean })
  canFilter = true;

  @property({ type: Boolean })
  canGroup = true;

  @property({ type: Boolean })
  canSort = true;

  @property({ type: Boolean })
  canAdjustRowHeight = true;

  @property({ type: Boolean })
  canShare = true;

  private handleUndo() {
    this.dispatchEvent(new CustomEvent('undo'));
  }

  private handleRedo() {
    this.dispatchEvent(new CustomEvent('redo'));
  }

  private handleInsertRow() {
    this.dispatchEvent(new CustomEvent('insert-row'));
  }

  private handleHideColumn() {
    this.dispatchEvent(new CustomEvent('hide-column'));
  }

  private handleFilter() {
    this.dispatchEvent(new CustomEvent('filter'));
  }

  private handleGroup() {
    this.dispatchEvent(new CustomEvent('group'));
  }

  private handleSort() {
    this.dispatchEvent(new CustomEvent('sort'));
  }

  private handleRowHeight() {
    this.dispatchEvent(new CustomEvent('adjust-row-height'));
  }

  private handleShare() {
    this.dispatchEvent(new CustomEvent('share'));
  }

  render() {
    return html`
      <div class="toolbar-left">
        <button 
          class="toolbar-button icon-only" 
          ?disabled=${!this.canUndo}
          @click=${this.handleUndo}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" class="sc-eDvSVe sc-jSUZER hKQPaV lksHLk" size="16" fill="#636363" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M7.75008 3.79335C7.75008 2.65081 6.34372 2.1071 5.57516 2.9525L1.75086 7.15915C1.31742 7.63593 1.31742 8.36407 1.75086 8.84085L5.57523 13.0476C6.34381 13.893 7.7502 13.3492 7.75015 12.2067L7.75007 10.4156C7.87372 10.3713 8.04504 10.3296 8.26864 10.3046C8.6234 10.2648 9.06039 10.2728 9.54403 10.3468C10.5135 10.4953 11.6106 10.9 12.5478 11.6324C12.9632 11.957 13.5008 11.9913 13.9201 11.7931C14.1345 11.6918 14.3396 11.5188 14.4668 11.2679C14.5983 11.0085 14.6205 10.7159 14.5441 10.4364C14.0886 8.77209 12.944 7.53151 11.645 6.69291C10.4117 5.89663 8.99178 5.42988 7.75008 5.29284L7.75008 3.79335ZM3.01365 8L6.25008 4.43999V5.50004C6.25008 6.20318 6.81079 6.71621 7.43588 6.76917C8.48074 6.85769 9.74589 7.25226 10.8314 7.95309C11.6363 8.47273 12.3134 9.14059 12.7442 9.94772C11.767 9.35237 10.719 9.00928 9.77109 8.86412C9.1758 8.77296 8.60515 8.7575 8.10164 8.81391C7.61062 8.86892 7.12792 8.99852 6.7521 9.24278C6.36281 9.4958 6.25004 9.90982 6.25006 10.2072L6.25012 11.56L3.01365 8Z" fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
        <button 
          class="toolbar-button icon-only" 
          ?disabled=${!this.canRedo}
          @click=${this.handleRedo}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" class="sc-eDvSVe sc-jSUZER hKQPaV lksHLk" size="16" fill="#636363" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M9.00055 3.79335C9.00054 2.65081 10.4069 2.1071 11.1755 2.9525L14.9998 7.15915C15.4332 7.63593 15.4332 8.36407 14.9998 8.84085L11.1754 13.0476C10.4068 13.893 9.00042 13.3492 9.00047 12.2067L9.00055 10.4156C8.8769 10.3713 8.70558 10.3296 8.48198 10.3046C8.12722 10.2648 7.69023 10.2728 7.2066 10.3468C6.2371 10.4953 5.14001 10.9 4.20282 11.6324C3.78742 11.957 3.24985 11.9913 2.83051 11.7931C2.61616 11.6918 2.41102 11.5188 2.28383 11.2679C2.15233 11.0085 2.13009 10.7159 2.20655 10.4364C2.66199 8.77209 3.80667 7.53151 5.1056 6.69291C6.33896 5.89663 7.75884 5.42988 9.00055 5.29284V3.79335ZM13.737 8L10.5005 4.43999V5.50004C10.5005 6.20318 9.93983 6.71621 9.31474 6.76917C8.26988 6.85769 7.00473 7.25226 5.91919 7.95309C5.1143 8.47273 4.43727 9.14059 4.00645 9.94772C4.9836 9.35237 6.03167 9.00928 6.97953 8.86412C7.57482 8.77296 8.14547 8.7575 8.64898 8.81391C9.14 8.86892 9.6227 8.99852 9.99852 9.24278C10.3878 9.4958 10.5006 9.90982 10.5006 10.2072L10.5005 11.56L13.737 8Z" fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
      </div>

      <div class="toolbar-middle">
        ${this.canInsertRow ? html`
          <button class="toolbar-button" @click=${this.handleInsertRow}>
            <svg width="16" height="16" viewBox="0 0 16 16" class="sc-eDvSVe sc-jSUZER hKQPaV lksHLk" size="16" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M8 4.25C8.41421 4.25 8.75 4.58579 8.75 5V7.25H11C11.4142 7.25 11.75 7.58579 11.75 8C11.75 8.41421 11.4142 8.75 11 8.75H8.75V11C8.75 11.4142 8.41421 11.75 8 11.75C7.58579 11.75 7.25 11.4142 7.25 11V8.75H5C4.58579 8.75 4.25 8.41421 4.25 8C4.25 7.58579 4.58579 7.25 5 7.25H7.25V5C7.25 4.58579 7.58579 4.25 8 4.25Z" fill="inherit"></path><path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM2.5 8C2.5 4.96243 4.96243 2.5 8 2.5C11.0376 2.5 13.5 4.96243 13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C4.96243 13.5 2.5 11.0376 2.5 8Z" fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            插入行
          </button>
        ` : ''}
        ${this.canHideColumns ? html`
          <button class="toolbar-button" @click=${this.handleHideColumn}>
            <svg width="16" height="16" viewBox="0 0 16 16" class="sc-eDvSVe sc-jSUZER hKQPaV lksHLk" size="16" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M9.75 8C9.75 8.9665 8.9665 9.75 8 9.75C7.0335 9.75 6.25 8.9665 6.25 8C6.25 7.0335 7.0335 6.25 8 6.25C8.9665 6.25 9.75 7.0335 9.75 8Z" fill="inherit"></path><path d="M8 3C6.08192 3 4.52684 3.89532 3.40981 4.85522C2.29196 5.81583 1.55559 6.88863 1.2552 7.3671C1.01087 7.75629 1.01087 8.24371 1.2552 8.63289C1.55559 9.11137 2.29196 10.1842 3.40981 11.1448C4.52684 12.1047 6.08192 13 8 13C9.91809 13 11.4732 12.1047 12.5902 11.1448C13.708 10.1842 14.4444 9.11137 14.7448 8.6329C14.9891 8.24371 14.9891 7.75629 14.7448 7.36711C14.4444 6.88863 13.708 5.81583 12.5902 4.85522C11.4732 3.89532 9.91809 3 8 3ZM4.38744 10.0071C3.53975 9.27868 2.93876 8.4641 2.6318 8C2.93876 7.5359 3.53975 6.72132 4.38744 5.99287C5.348 5.16743 6.56824 4.5 8 4.5C9.43177 4.5 10.652 5.16743 11.6126 5.99287C12.4603 6.72132 13.0612 7.5359 13.3682 8C13.0612 8.4641 12.4603 9.27868 11.6126 10.0071C10.652 10.8326 9.43177 11.5 8 11.5C6.56824 11.5 5.348 10.8326 4.38744 10.0071Z" fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            隐藏列
          </button>
        ` : ''}

        <div class="divider"></div>

        ${this.canFilter ? html`
          <button class="toolbar-button" @click=${this.handleFilter}>
            <svg width="16" height="16" viewBox="0 0 16 16" class="sc-eDvSVe sc-jSUZER hKQPaV lksHLk" size="16" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M3.35696 1.5C2.39979 1.5 1.79777 2.53179 2.26876 3.36507L5.00001 8.19729V11.9787C5.00001 12.4148 5.22735 12.8195 5.59986 13.0463L9.09986 15.1777C9.93285 15.685 11 15.0854 11 14.1101V8.19729L13.7313 3.36507C14.2022 2.53179 13.6002 1.5 12.6431 1.5H3.35696ZM6.33821 7.51645L3.78544 3H12.2146L9.66181 7.51646C9.55575 7.7041 9.50001 7.91598 9.50001 8.13153V13.6651L6.50001 11.8382V8.13153C6.50001 7.91598 6.44428 7.7041 6.33821 7.51645Z" fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            筛选
          </button>
        ` : ''}
        ${this.canGroup ? html`
          <button class="toolbar-button" @click=${this.handleGroup}>
            <svg width="16" height="16" viewBox="0 0 16 16" class="sc-eDvSVe sc-jSUZER hKQPaV lksHLk" size="16" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M5.25 7C5.66421 7 6 6.66421 6 6.25C6 5.83579 5.66421 5.5 5.25 5.5C4.83579 5.5 4.5 5.83579 4.5 6.25C4.5 6.66421 4.83579 7 5.25 7Z" fill="inherit"></path><path d="M7.75 5.5C7.33579 5.5 7 5.83579 7 6.25C7 6.66421 7.33579 7 7.75 7L10.75 7C11.1642 7 11.5 6.66421 11.5 6.25C11.5 5.83579 11.1642 5.5 10.75 5.5H7.75Z" fill="inherit"></path><path d="M5.25 10.5C5.66421 10.5 6 10.1642 6 9.75C6 9.33579 5.66421 9 5.25 9C4.83579 9 4.5 9.33579 4.5 9.75C4.5 10.1642 4.83579 10.5 5.25 10.5Z" fill="inherit"></path><path d="M7.75 9C7.33579 9 7 9.33579 7 9.75C7 10.1642 7.33579 10.5 7.75 10.5H10.75C11.1642 10.5 11.5 10.1642 11.5 9.75C11.5 9.33579 11.1642 9 10.75 9H7.75Z" fill="inherit"></path><path d="M2.75 1.5C2.05964 1.5 1.5 2.05964 1.5 2.75V13.25C1.5 13.9404 2.05964 14.5 2.75 14.5H13.25C13.9404 14.5 14.5 13.9404 14.5 13.25V2.75C14.5 2.05964 13.9404 1.5 13.25 1.5H2.75ZM3 13V3H13V13H3Z" fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            分组
          </button>
        ` : ''}
        ${this.canSort ? html`
          <button class="toolbar-button" @click=${this.handleSort}>
          <svg width="16" height="16" viewBox="0 0 16 16" class="sc-eDvSVe sc-jSUZER hKQPaV lksHLk" size="16" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M7 2.25C7 2.14831 6.97976 2.05134 6.94309 1.96291C6.90649 1.87445 6.85224 1.79158 6.78033 1.71967C6.70842 1.64776 6.62555 1.59351 6.53709 1.55691C6.44866 1.52024 6.35169 1.5 6.25 1.5C6.14831 1.5 6.05134 1.52024 5.96291 1.55691C5.87445 1.59351 5.79158 1.64776 5.71967 1.71967L1.71967 5.71967C1.42678 6.01256 1.42678 6.48744 1.71967 6.78033C2.01256 7.07322 2.48744 7.07322 2.78033 6.78033L5.5 4.06066V13.75C5.5 14.1642 5.83579 14.5 6.25 14.5C6.66421 14.5 7 14.1642 7 13.75V2.25Z" fill="inherit"></path><path d="M9.46291 14.4431C9.55134 14.4798 9.64831 14.5 9.75 14.5C9.85169 14.5 9.94866 14.4798 10.0371 14.4431C10.1255 14.4065 10.2084 14.3522 10.2803 14.2803L14.2803 10.2803C14.5732 9.98744 14.5732 9.51256 14.2803 9.21967C13.9874 8.92678 13.5126 8.92678 13.2197 9.21967L10.5 11.9393V2.25C10.5 1.83579 10.1642 1.5 9.75 1.5C9.33579 1.5 9 1.83579 9 2.25V13.75C9 13.9563 9.08329 14.1431 9.21808 14.2787L9.21967 14.2803L9.22126 14.2819C9.2928 14.353 9.37511 14.4068 9.46291 14.4431Z" fill="inherit"></path></svg>  
          排序
          </button>
        ` : ''}
        ${this.canAdjustRowHeight ? html`
          <button class="toolbar-button" @click=${this.handleRowHeight}>
            <svg width="16" height="16" viewBox="0 0 16 16" class="sc-eDvSVe sc-jSUZER hKQPaV lksHLk" size="16" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M4.21967 1.71967C4.51256 1.42678 4.98744 1.42678 5.28033 1.71967L7.53033 3.96967C7.82322 4.26256 7.82322 4.73744 7.53033 5.03033C7.23744 5.32322 6.76256 5.32322 6.46967 5.03033L5.5 4.06066V11.9393L6.46967 10.9697C6.76256 10.6768 7.23744 10.6768 7.53033 10.9697C7.82322 11.2626 7.82322 11.7374 7.53033 12.0303L5.28033 14.2803C4.98744 14.5732 4.51256 14.5732 4.21967 14.2803L1.96967 12.0303C1.67678 11.7374 1.67678 11.2626 1.96967 10.9697C2.26256 10.6768 2.73744 10.6768 3.03033 10.9697L4 11.9393V4.06066L3.03033 5.03033C2.73744 5.32322 2.26256 5.32322 1.96967 5.03033C1.67678 4.73744 1.67678 4.26256 1.96967 3.96967L4.21967 1.71967Z" fill="inherit"></path><path d="M9 3.25C9 2.83579 9.33579 2.5 9.75 2.5H13.75C14.1642 2.5 14.5 2.83579 14.5 3.25C14.5 3.66421 14.1642 4 13.75 4H9.75C9.33579 4 9 3.66421 9 3.25Z" fill="inherit"></path><path d="M9 8C9 7.58579 9.33579 7.25 9.75 7.25H13.75C14.1642 7.25 14.5 7.58579 14.5 8C14.5 8.41421 14.1642 8.75 13.75 8.75H9.75C9.33579 8.75 9 8.41421 9 8Z" fill="inherit"></path><path d="M9.75 12C9.33579 12 9 12.3358 9 12.75C9 13.1642 9.33579 13.5 9.75 13.5H13.75C14.1642 13.5 14.5 13.1642 14.5 12.75C14.5 12.3358 14.1642 12 13.75 12H9.75Z" fill="inherit"></path></svg>
            调整行高
          </button>
        ` : ''}

        ${this.canShare ? html`
            <button class="toolbar-button" @click=${this.handleShare}>
              <svg width="16" height="16" viewBox="0 0 16 16" class="sc-eDvSVe sc-jSUZER hKQPaV lksHLk" size="16" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M9.5 4C9.5 2.61929 10.6193 1.5 12 1.5C13.3807 1.5 14.5 2.61929 14.5 4C14.5 5.38071 13.3807 6.5 12 6.5C11.3603 6.5 10.7767 6.25971 10.3345 5.86447L7.89692 7.18483C7.96421 7.44532 8 7.71848 8 8C8 8.30454 7.95811 8.5993 7.87978 8.87883L10.8286 10.5058C11.2161 10.1896 11.7109 10 12.25 10C13.4926 10 14.5 11.0074 14.5 12.25C14.5 13.4926 13.4926 14.5 12.25 14.5C11.0074 14.5 10 13.4926 10 12.25C10 12.0916 10.0164 11.9371 10.0475 11.788L7.1513 10.1901C6.55696 10.8414 5.7012 11.25 4.75 11.25C2.95507 11.25 1.5 9.79493 1.5 8C1.5 6.20507 2.95507 4.75 4.75 4.75C5.72488 4.75 6.5995 5.17923 7.19519 5.85901L9.56636 4.57463C9.52296 4.39013 9.5 4.19775 9.5 4ZM12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3ZM4.75 6.25C3.7835 6.25 3 7.0335 3 8C3 8.9665 3.7835 9.75 4.75 9.75C5.7165 9.75 6.5 8.9665 6.5 8C6.5 7.0335 5.7165 6.25 4.75 6.25ZM11.5 12.25C11.5 11.8358 11.8358 11.5 12.25 11.5C12.6642 11.5 13 11.8358 13 12.25C13 12.6642 12.6642 13 12.25 13C11.8358 13 11.5 12.6642 11.5 12.25Z" fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
              分享
            </button>
          ` : ''}
      </div>

      <div class="toolbar-right">
        ${this.canShare ? html`
          <button class="toolbar-button" @click=${this.handleShare}>
            <svg width="16" height="16" viewBox="0 0 16 16" class="sc-eDvSVe sc-jSUZER hKQPaV lksHLk" size="16" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M10.0854 11.3961C7.92978 13.0344 4.84146 12.8696 2.87347 10.9016C0.725587 8.75375 0.725587 5.27134 2.87347 3.12346C5.02135 0.975572 8.50376 0.975572 10.6516 3.12346C12.6196 5.09145 12.7845 8.17981 11.1461 10.3355L13.1265 12.3158C13.4194 12.6087 13.4194 13.0836 13.1265 13.3765C12.8336 13.6694 12.3587 13.6694 12.0658 13.3765L10.0854 11.3961ZM3.93413 9.84097C2.37203 8.27887 2.37203 5.74621 3.93413 4.18412C5.49623 2.62202 8.02889 2.62202 9.59099 4.18412C11.1517 5.74483 11.1531 8.2744 9.59512 9.83683L9.59095 9.84097L9.58682 9.84513C8.02438 11.4031 5.49484 11.4017 3.93413 9.84097Z" fill="inherit" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            查找
          </button>
        ` : ''}
      </div>
    `;
  }
} 