import React, { useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-enterprise';
import { themeQuartz } from 'ag-grid-community';
const myTheme = themeQuartz;
ModuleRegistry.registerModules([
  ClientSideRowModelModule
]);

export interface DataGridProps {
  className?: string;
}

export const DataGrid: React.FC<DataGridProps> = ({ className }) => {
  const [columnDefs] = useState([
    { 
      field: 'make',
      sortable: true,
      filter: true,
      rowGroup: true,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    { 
      field: 'model',
      sortable: true,
      filter: true,
      editable: true
    },
    { 
      field: 'price',
      sortable: true,
      filter: true,
      aggFunc: 'avg',
      editable: true,
      cellEditor: 'agRichSelect',
      cellEditorParams: {
        values: [25000, 28000, 30000, 32000, 35000, 72000],
      }
    },
    {
      field: 'monthlyData',
      headerName: '月度销量趋势',
      cellRenderer: 'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: {
          type: 'line',
          fill: '#91cc75',
          stroke: '#5470c6',
          highlightStyle: {
            fill: '#fac858',
          },
        },
      },
    }
  ]);

  const [rowData] = useState([
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
  ]);

  const onExportExcel = useCallback(() => {
    const params = {
      fileName: '车辆数据导出.xlsx',
    };
    gridRef.current!.api.exportDataAsExcel(params);
  }, []);

  const gridRef = React.useRef<any>();

  const getContextMenuItems = useCallback((params: any) => {
    const result = [
      {
        name: '导出到 Excel',
        action: () => {
          onExportExcel();
        },
      },
      'copy',
      'copyWithHeaders',
      'paste',
      'separator',
      'chartRange',
    ];
    return result;
  }, [onExportExcel]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onExportExcel}
        >
          导出到 Excel
        </button>
      </div>
      <div className={`w-full h-[500px]`}>
        <AgGridReact
          ref={gridRef}
          theme={myTheme}
          columnDefs={columnDefs}
          rowData={rowData}
          animateRows={true}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            resizable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            sortable: true,
            filter: true,
          }}
          sideBar={{
            toolPanels: [
              {
                id: 'columns',
                labelDefault: '列',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
              },
              {
                id: 'filters',
                labelDefault: '筛选',
                labelKey: 'filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
              },
            ],
          }}
          statusBar={{
            statusPanels: [
              { statusPanel: 'agTotalRowCountComponent', align: 'left' },
              { statusPanel: 'agFilteredRowCountComponent' },
              { statusPanel: 'agSelectedRowCountComponent' },
              { statusPanel: 'agAggregationComponent' },
            ],
          }}
          enableRangeSelection={true}
          enableCharts={true}
          groupDisplayType={'multipleColumns'}
          rowSelection="multiple"
          enableRangeHandle={true}
          enableFillHandle={true}
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          enableCellChangeFlash={true}
          getContextMenuItems={getContextMenuItems}
          suppressCopyRowsToClipboard={false}
          clipboardDelimiter="\t"
        />
      </div>
    </div>
  );
};
