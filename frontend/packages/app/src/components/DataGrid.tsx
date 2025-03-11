import React, { useRef, useEffect, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { 
  ValidationModule, 
  AllEnterpriseModule, 
  ModuleRegistry
} from 'ag-grid-enterprise';
import { 
  AllCommunityModule
} from 'ag-grid-community';
import './DataGrid.css';
import '@cola-grid/base-component';
import { 
  columnDefs, 
  rowData, 
  subscribeToEditorStateChanges, 
  simulateServerPush,
  JumpToRowOptions 
} from '@cola-grid/api';
import { useTheme } from '../hooks/useTheme';
import { useToolbarActions } from '../hooks/useToolbarActions';
import { useRowNavigation } from '../hooks/useRowNavigation';
import { useEditingState } from '../hooks/useEditingState';

ModuleRegistry.registerModules([
  AllEnterpriseModule,
  AllCommunityModule,
  ValidationModule
]);

export interface DataGridProps {
  className?: string;
  onJumpToRow?: (options: JumpToRowOptions) => void;
}

export const DataGrid: React.FC<DataGridProps> = ({ className, onJumpToRow }) => {
  const gridRef = useRef<any>();
  const unsubscribeRef = useRef<() => void>();
  const { isDarkMode, toggleTheme, currentTheme, themeClass, themeStyles, inputClassName } = useTheme();

  // 导出到 Excel 的处理函数
  const onExportExcel = useCallback(() => {
    const params = {
      fileName: '车辆数据导出.xlsx',
    };
    gridRef.current!.api.exportDataAsExcel(params);
  }, []);

  // 使用工具栏 actions hook
  const {
    handleInsertRow,
    handleHideColumn,
    handleFilter,
    handleGroup,
    handleSort,
    handleRowHeight,
    handleShare
  } = useToolbarActions({
    gridRef,
    onExportExcel
  });

  // 使用行跳转 hook
  const {
    jumpToRow,
    setJumpToRow,
    handleJumpToRow,
    handleRowNavigation
  } = useRowNavigation({
    gridRef,
    onJumpToRow
  });

  // 使用编辑状态 hook
  const {
    handleEditorStateChange,
    handleViewportChanged
  } = useEditingState({
    gridRef
  });

  const onGridReady = useCallback(() => {
    if (!gridRef.current) return;

    // 表格准备好后，订阅编辑状态变化
    unsubscribeRef.current = subscribeToEditorStateChanges(handleEditorStateChange);

    // 添加可视区域变化的监听
    gridRef.current.api.addEventListener('viewportChanged', handleViewportChanged);
    
    // 组件卸载时移除监听
    return () => {
      if (gridRef.current) {
        gridRef.current.api.removeEventListener('viewportChanged', handleViewportChanged);
      }
    };
  }, [handleEditorStateChange, handleViewportChanged]);

  // 清理订阅
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  const getContextMenuItems = useCallback(() => {
    return [
      {
        name: '导出到 Excel',
        action: onExportExcel,
      },
      'separator',
      'copy',
      'copyWithHeaders',
      'paste',
      'separator',
      'chartRange',
    ] as any;
  }, [onExportExcel]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onExportExcel}
        >
          导出到 Excel
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={simulateServerPush}
        >
          模拟新编辑者
        </button>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            max="1500"
            className={inputClassName}
            placeholder="行号"
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                setJumpToRow('');
              } else {
                const num = parseInt(value);
                if (!isNaN(num)) {
                  setJumpToRow(Math.max(1, Math.min(1500, num)));
                }
              }
            }}
            value={jumpToRow}
          />
          <button
            className={`px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 ${
              typeof jumpToRow !== 'number' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleJumpToRow}
            disabled={typeof jumpToRow !== 'number'}
          >
            跳转
          </button>
        </div>
        <button
          className={`px-4 py-2 rounded ${
            isDarkMode 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
              : 'bg-gray-800 hover:bg-gray-900 text-white'
          }`}
          onClick={toggleTheme}
        >
          {isDarkMode ? '☀️ 日间模式' : '🌙 夜间模式'}
        </button>
      </div>
      <div>
        <cola-toolbar
          oninsert-row={handleInsertRow}
          onhide-column={handleHideColumn}
          onfilter={handleFilter}
          ongroup={handleGroup}
          onsort={handleSort}
          onadjust-row-height={handleRowHeight}
          onshare={handleShare}
        />
      </div>
      <div 
        className={`w-full h-[500px] ${themeClass}`}
        style={themeStyles as React.CSSProperties}
      >
        <AgGridReact
          ref={gridRef}
          theme={currentTheme}
          columnDefs={[
            ...(columnDefs as any)
          ]}
          rowData={rowData}
          onGridReady={onGridReady}
          animateRows={true}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            resizable: true,
          }}
          rowSelection={{
            mode: 'multiRow',
            headerCheckbox: true,
            enableClickSelection: true,
          }}
          statusBar={{
            statusPanels: [
              { statusPanel: 'agTotalRowCountComponent', align: 'left' },
              { statusPanel: 'agFilteredRowCountComponent' },
              { statusPanel: 'agSelectedRowCountComponent' },
              { statusPanel: 'agAggregationComponent' },
            ],
          }}
          cellSelection={true}
          groupDisplayType={'multipleColumns'}
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          getContextMenuItems={getContextMenuItems}
          clipboardDelimiter="\t"
        />
      </div>
    </div>
  );
};
