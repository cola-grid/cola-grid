import { useState, useCallback, useRef, useEffect } from 'react';
import { EditorState } from '@cola-grid/api';
import { DynamicStyleManager } from '../components/DynamicStyleManager';

export interface UseEditingStateProps {
  gridRef: React.MutableRefObject<any>;
  onEditorStateChange?: (state: EditorState, type: 'add' | 'update' | 'delete') => void;
}

export interface UseEditingStateResult {
  editingStates: Map<string, EditorState>;
  handleEditorStateChange: (state: EditorState, type: 'add' | 'update' | 'delete') => void;
  handleViewportChanged: () => void;
}

export function useEditingState({
  gridRef,
  onEditorStateChange
}: UseEditingStateProps): UseEditingStateResult {
  const [editingStates] = useState(new Map<string, EditorState>());
  const manager = useRef(new DynamicStyleManager());
  const debounceTimerRef = useRef<number>();

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

    // 如果提供了外部回调，则调用它
    onEditorStateChange?.(state, type);
  }, [getCellKey, getCellElement, editingStates, onEditorStateChange]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    editingStates,
    handleEditorStateChange,
    handleViewportChanged
  };
} 