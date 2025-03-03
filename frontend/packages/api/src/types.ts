// 编辑状态类型
export interface EditorState {
  rowIndex: number;
  colId: string;
  editor: string;
  color: string;
}

// 表格列定义
export interface GridColumn {
  field: string;
  headerName?: string;
  sortable?: boolean;
  filter?: boolean;
  editable?: boolean;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  cellEditor?: string;
  cellEditorParams?: any;
}

// 车辆数据类型
export interface VehicleData {
  make: string;
  model: string;
  price: number;
  monthlyData: number[];
}
