// 编辑状态类型
export interface EditorState {
  rowIndex: number;
  colId: string;
  editor: string;
  color: string;
}

// 行跳转参数接口
export interface JumpToRowOptions {
  rowIndex: number;          // 目标行号（1-based）
  highlight?: boolean;       // 是否高亮显示
  scrollMode?: 'smooth' | 'instant' | 'none';  // 滚动模式：平滑/即时/不滚动
  focusCell?: {             // 可选的单元格聚焦
    field: string;          // 列字段名
    scrollIntoView?: boolean; // 是否滚动到可视区域
  };
}

// 表格列定义
export interface GridColumn {
  field?: string;
  headerName?: string;
  sortable?: boolean;
  filter?: boolean;
  editable?: boolean;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  cellEditor?: string;
  cellEditorParams?: any;
  valueGetter?: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  pinned?: 'left' | 'right';
  suppressMovable?: boolean;
  cellClass?: string;
}

// 车辆数据类型
export interface VehicleData {
  make: string;
  model: string;
  price: number;
  monthlyData: number[];
}
