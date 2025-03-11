import { GridColumn, VehicleData } from './types';

// 表格列定义
export const columnDefs: GridColumn[] = [
  {
    headerName: '#',
    valueGetter: 'node.rowIndex + 1',
    width: 80,
    minWidth: 80,
    maxWidth: 80,
    sortable: false,
    filter: false,
    cellClass: 'grid-row-number'
  },
  { 
    field: 'make',
    editable: true,
  },
  { 
    field: 'model',
    editable: true,
  },
  { 
    field: 'price',
    editable: true,
    cellEditor: 'agRichSelect',
    cellEditorParams: {
      values: [25000, 28000, 30000, 32000, 35000, 72000],
    }
  }
];

// 汽车品牌和型号的映射
const carModels = {
  Toyota: ['Celica', 'Corolla', 'Camry', 'RAV4', 'Highlander', 'Prius'],
  Ford: ['Mondeo', 'Focus', 'Mustang', 'Explorer', 'F-150', 'Escape'],
  Porsche: ['Boxster', 'Cayman', '911', 'Panamera', 'Cayenne', 'Macan'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', 'M3', 'M5'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'AMG GT']
};

const prices = [25000, 28000, 30000, 32000, 35000, 72000];

// 生成随机数据的函数
function generateRandomData(count: number): VehicleData[] {
  const data: VehicleData[] = [];
  const makes = Object.keys(carModels);
  
  for (let i = 0; i < count; i++) {
    const make = makes[Math.floor(Math.random() * makes.length)];
    const models = carModels[make as keyof typeof carModels];
    const model = models[Math.floor(Math.random() * models.length)];
    const price = prices[Math.floor(Math.random() * prices.length)];
    
    // 生成6个月的随机数据，范围在5-20之间
    const monthlyData = Array.from({length: 6}, () => 
      Math.floor(Math.random() * 16) + 5
    );
    
    data.push({
      make,
      model,
      price,
      monthlyData
    });
  }
  
  return data;
}

// 导出1500行随机生成的数据
export const rowData: VehicleData[] = generateRandomData(1500);
