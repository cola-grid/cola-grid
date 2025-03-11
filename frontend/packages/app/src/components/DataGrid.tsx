import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { 
  ValidationModule, 
  AllEnterpriseModule, 
  ModuleRegistry,
  Column,
  RowNode,
  CellPosition
} from 'ag-grid-enterprise';
import { 
  AllCommunityModule, 
  themeQuartz,
  ThemeDefaultParams
} from 'ag-grid-community';
import './DataGrid.css';
import { DynamicStyleManager } from './DynamicStyleManager';
import '@cola-grid/base-component';
import { 
  EditorState, 
  columnDefs, 
  rowData, 
  subscribeToEditorStateChanges, 
  simulateServerPush,
  JumpToRowOptions 
} from '@cola-grid/api';
import { useTheme } from '../hooks/useTheme';
import { useToolbarActions } from '../hooks/useToolbarActions';
import { useRowNavigation } from '../hooks/useRowNavigation';

const lightTheme = themeQuartz.withParams({
  columnBorder: '1px solid #ccc',
  backgroundColor: '#ffffff',
  headerBackgroundColor: '#f3f4f6',
  rowHoverColor: '#f9fafb',
  selectedRowBackgroundColor: '#e5edff',
  borderColor: '#e5e7eb',
} as Partial<ThemeDefaultParams>);

const darkTheme = themeQuartz.withParams({
  columnBorder: '1px solid #374151',
  backgroundColor: '#1f2937',
  headerBackgroundColor: '#111827',
  rowHoverColor: '#374151',
  selectedRowBackgroundColor: '#2563eb',
  borderColor: '#374151',
  foregroundColor: '#ffffff',
} as Partial<ThemeDefaultParams>);

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
  const [editingStates] = useState(new Map<string, EditorState>());
  const manager = useRef(new DynamicStyleManager());
  const unsubscribeRef = useRef<() => void>();
  const debounceTimerRef = useRef<number>();
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

  // 防抖函数
  const debounce = useCallback((fn: Function, delay: number) => {
    return (...args: any[]) => {
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = window.setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }, []);

  // 获取单元格的唯一标识
  const getCellKey = useCallback((rowIndex: number, colId: string) => {
    return `${rowIndex}-${colId}`;
  }, []);

  // 获取单元格元素
  const getCellElement = useCallback((rowIndex: number, colId: string) => {
    // 首先尝试在主网格区域查找行
    const mainRow = document.querySelector(`.ag-center-cols-container div[role="row"][row-index="${rowIndex}"]`);
    const leftRow = document.querySelector(`.ag-pinned-left-cols-container div[role="row"][row-index="${rowIndex}"]`);
    const rightRow = document.querySelector(`.ag-pinned-right-cols-container div[role="row"][row-index="${rowIndex}"]`);

    if (!mainRow && !leftRow && !rightRow) {
      console.debug(`未找到行：row-index="${rowIndex}"`);
      return null;
    }

    // 在所有区域中查找单元格
    const cell = [leftRow, mainRow, rightRow].reduce((found, row) => {
      if (found) return found;
      return row?.querySelector(`div[col-id="${colId}"]`) || null;
    }, null as Element | null);

    if (!cell) {
      console.debug(`未找到单元格：col-id="${colId}"`);
      return null;
    }

    return cell;
  }, []);

  // 重新计算指定范围内的编辑状态
  const recalculateEditingStates = useCallback((startRow: number, endRow: number) => {
    console.log('recalculateEditingStates', startRow, endRow);
    editingStates.forEach((state, key) => {
      // 检查是否在可视范围内
      if (state.rowIndex >= startRow && state.rowIndex <= endRow) {
        const cell = getCellElement(state.rowIndex, state.colId);
        if (cell) {
          cell.setAttribute('data-editor-info', state.editor);
          manager.current.addOrUpdateStyle(state.editor, state.color);
        }
      }
    });
  }, [editingStates, getCellElement]);

  // 处理可视区域变化（带防抖）
  const debouncedRecalculate = useCallback(
    debounce((firstRow: number, lastRow: number) => {
      recalculateEditingStates(firstRow, lastRow);
    }, 100),
    [recalculateEditingStates]
  );

  // 处理可视区域变化
  const handleViewportChanged = useCallback(() => {
    if (!gridRef.current) return;

    const api = gridRef.current.api;
    const firstRow = api.getFirstDisplayedRowIndex();
    const lastRow = api.getLastDisplayedRowIndex();

    if (firstRow === null || lastRow === null) return;

    // 使用防抖后的重新计算函数
    debouncedRecalculate(firstRow, lastRow);
  }, [debouncedRecalculate]);

  // 处理编辑状态变化
  const handleEditorStateChange = useCallback((state: EditorState, type: 'add' | 'update' | 'delete') => {
    const key = getCellKey(state.rowIndex, state.colId);
    console.log(`编辑状态${type}:`, state);

    if (type === 'delete') {
      editingStates.delete(key);
    } else {
      editingStates.set(key, state);
    }

    const cell = getCellElement(state.rowIndex, state.colId);
    if (!cell) {
      console.debug(`未找到单元格：row-index="${state.rowIndex}", col-id="${state.colId}"`);
      return;
    }

    if (type === 'delete') {
      cell.removeAttribute('data-editor-info');
      manager.current.removeStyle(state.editor);
    } else {
      cell.setAttribute('data-editor-info', state.editor);
      manager.current.addOrUpdateStyle(state.editor, state.color);
    }
  }, [getCellKey, getCellElement, editingStates]);

  // 清理订阅和定时器
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

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
