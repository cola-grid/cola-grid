declare namespace JSX {
  interface IntrinsicElements {
    'cola-toolbar': {
      'oninsert-row'?: (e: CustomEvent) => void;
      'onhide-column'?: (e: CustomEvent) => void;
      'onfilter'?: (e: CustomEvent) => void;
      'ongroup'?: (e: CustomEvent) => void;
      'onsort'?: (e: CustomEvent) => void;
      'onadjust-row-height'?: (e: CustomEvent) => void;
      'onshare'?: (e: CustomEvent) => void;
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