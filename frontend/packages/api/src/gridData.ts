import { GridColumn, VehicleData } from './types';

// 表格列定义
export const columnDefs: GridColumn[] = [
  { 
    field: 'make',
    sortable: true,
    filter: true,
    checkboxSelection: true,
    headerCheckboxSelection: true
  },
  { 
    field: 'model',
    sortable: true,
    filter: true,
    editable: true,
  },
  { 
    field: 'price',
    sortable: true,
    filter: true,
    editable: true,
    cellEditor: 'agRichSelect',
    cellEditorParams: {
      values: [25000, 28000, 30000, 32000, 35000, 72000],
    }
  }
];

// 示例数据
export const rowData: VehicleData[] = [
  { 
    make: 'Toyota',
    model: 'Celica',
    price: 35000,
    monthlyData: [10, 15, 8, 12, 9, 14]
  },
  { 
    make: 'Ford',
    model: 'Mondeo',
    price: 32000,
    monthlyData: [8, 7, 9, 11, 13, 10]
  },
  { 
    make: 'Ford',
    model: 'Focus',
    price: 28000,
    monthlyData: [12, 11, 10, 9, 8, 7]
  },
  { 
    make: 'Porsche',
    model: 'Boxster',
    price: 72000,
    monthlyData: [5, 6, 8, 9, 7, 8]
  },
  { 
    make: 'Toyota',
    model: 'Corolla',
    price: 25000,
    monthlyData: [15, 14, 13, 12, 11, 10]
  },
  { 
    make: 'Toyota',
    model: 'Camry',
    price: 30000,
    monthlyData: [9, 10, 11, 12, 13, 14]
  }
];
