import { useState, useCallback, useEffect } from 'react';
import { CellPosition } from 'ag-grid-enterprise';
import { JumpToRowOptions } from '@cola-grid/api';

export interface UseRowNavigationProps {
  gridRef: React.MutableRefObject<any>;
  onJumpToRow?: (options: JumpToRowOptions) => void;
}

export interface UseRowNavigationResult {
  jumpToRow: number | '';
  setJumpToRow: (value: number | '') => void;
  handleJumpToRow: () => void;
  handleRowNavigation: (options: JumpToRowOptions) => void;
}

export function useRowNavigation({
  gridRef,
  onJumpToRow
}: UseRowNavigationProps): UseRowNavigationResult {
  const [jumpToRow, setJumpToRow] = useState<number | ''>(100);

  // 处理滚动后的操作（高亮、选中等）
  const handlePostScroll = useCallback((api: any, targetIndex: number, options: JumpToRowOptions) => {
    // 确保目标行可见
    api.ensureIndexVisible(targetIndex);

    // 高亮效果
    if (options.highlight) {
      const rowNode = api.getDisplayedRowAtIndex(targetIndex);
      if (rowNode) {
        rowNode.setDataValue('flash', true);
        setTimeout(() => rowNode.setDataValue('flash', false), 1000);
      }
    }

    // 如果需要聚焦特定单元格
    if (options.focusCell) {
      const cellPosition: CellPosition = {
        rowIndex: targetIndex,
        column: gridRef.current.columnApi.getColumn(options.focusCell.field),
        rowPinned: null
      };
      
      if (options.focusCell.scrollIntoView) {
        api.ensureColumnVisible(options.focusCell.field);
      }
      
      api.clearRangeSelection();
      api.setFocusedCell(
        cellPosition.rowIndex,
        cellPosition.column,
        cellPosition.rowPinned
      );
    }
    
    // 选中目标行
    api.getDisplayedRowAtIndex(targetIndex)?.setSelected(true);
  }, [gridRef]);

  // 处理行跳转的核心逻辑
  const handleRowNavigation = useCallback((options: JumpToRowOptions) => {
    if (!gridRef.current) return;
    
    const targetIndex = options.rowIndex - 1; // 转换为0基索引
    if (targetIndex < 0 || targetIndex >= 1500) return;

    const api = gridRef.current.api;
    
    // 如果不需要滚动，直接处理选中和高亮
    if (options.scrollMode === 'none') {
      handlePostScroll(api, targetIndex, options);
      return;
    }

    // 获取表格容器元素
    const gridBodyElement = document.querySelector('.ag-body-viewport') as HTMLElement;
    if (!gridBodyElement) return;

    // 获取当前滚动位置和视口高度
    const currentScrollTop = gridBodyElement.scrollTop;
    const viewportHeight = gridBodyElement.clientHeight;
    const defaultRowHeight = 40; // 默认行高
    
    // 计算目标位置
    const targetScrollTop = targetIndex * defaultRowHeight;
    const targetCenterOffset = viewportHeight / 2 - defaultRowHeight / 2;
    const finalScrollTop = Math.max(0, targetScrollTop - targetCenterOffset);

    // 根据滚动模式选择滚动方式
    if (options.scrollMode === 'instant') {
      gridBodyElement.scrollTop = finalScrollTop;
      handlePostScroll(api, targetIndex, options);
      return;
    }

    // 平滑滚动模式
    const startTime = performance.now();
    const duration = 800; // 动画持续时间（毫秒）
    const startScrollTop = currentScrollTop;
    const distanceToScroll = finalScrollTop - startScrollTop;

    function easeInOutCubic(t: number): number {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animateScroll(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = easeInOutCubic(progress);
      const currentPosition = startScrollTop + distanceToScroll * easeProgress;
      
      gridBodyElement.scrollTop = currentPosition;
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        handlePostScroll(api, targetIndex, options);
      }
    }

    // 开始动画
    requestAnimationFrame(animateScroll);
  }, [gridRef, handlePostScroll]);

  // 处理输入框跳转按钮点击
  const handleJumpToRow = useCallback(() => {
    if (typeof jumpToRow !== 'number') return;
    
    const options: JumpToRowOptions = {
      rowIndex: jumpToRow,
      highlight: true,
      scrollMode: 'smooth'  // 默认使用平滑滚动
    };
    
    // 如果提供了外部处理函数，则调用它
    if (onJumpToRow) {
      onJumpToRow(options);
    } else {
      // 否则使用内部处理逻辑
      handleRowNavigation(options);
    }
  }, [jumpToRow, onJumpToRow, handleRowNavigation]);

  // 暴露行跳转方法给外部
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.jumpToRow = handleRowNavigation;
    }
  }, [handleRowNavigation]);

  return {
    jumpToRow,
    setJumpToRow,
    handleJumpToRow,
    handleRowNavigation
  };
} 