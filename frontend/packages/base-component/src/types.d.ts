declare namespace JSX {
  interface IntrinsicElements {
    'cola-toolbar': {
      'onInsert-row'?: (e: CustomEvent) => void;
      'onHide-column'?: (e: CustomEvent) => void;
      'onFilter'?: (e: CustomEvent) => void;
      'onGroup'?: (e: CustomEvent) => void;
      'onSort'?: (e: CustomEvent) => void;
      'onAdjust-row-height'?: (e: CustomEvent) => void;
      'onShare'?: (e: CustomEvent) => void;
      canInsertRow?: boolean;
      canHideColumns?: boolean;
      canFilter?: boolean;
      canGroup?: boolean;
      canSort?: boolean;
      canAdjustRowHeight?: boolean;
      canShare?: boolean;
    };
  }
} 