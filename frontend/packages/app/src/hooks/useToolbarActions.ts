import { useCallback } from 'react';
import { Column, RowNode } from 'ag-grid-enterprise';

export interface UseToolbarActionsProps {
  gridRef: React.MutableRefObject<any>;
  onExportExcel: () => void;
}

export interface UseToolbarActionsResult {
  handleInsertRow: () => void;
  handleHideColumn: () => void;
  handleFilter: () => void;
  handleGroup: () => void;
  handleSort: () => void;
  handleRowHeight: () => void;
  handleShare: () => void;
}

export function useToolbarActions({
  gridRef,
  onExportExcel
}: UseToolbarActionsProps): UseToolbarActionsResult {
  const handleInsertRow = useCallback(() => {
    const rowData = {
      // 添加新行的默认数据
    };
    gridRef.current?.api.applyTransaction({ add: [rowData] });
  }, [gridRef]);

  const handleHideColumn = useCallback(() => {
    const selectedColumns = gridRef.current?.api.getSelectedColumns();
    if (selectedColumns?.length) {
      gridRef.current?.columnApi.setColumnsVisible(selectedColumns, false);
    }
  }, [gridRef]);

  const handleFilter = useCallback(() => {
    gridRef.current?.api.setQuickFilter(
      prompt('请输入筛选关键字') || ''
    );
  }, [gridRef]);

  const handleGroup = useCallback(() => {
    const selectedColumns = gridRef.current?.api.getSelectedColumns();
    if (selectedColumns?.length) {
      gridRef.current?.columnApi.addRowGroupColumns(selectedColumns);
    }
  }, [gridRef]);

  const handleSort = useCallback(() => {
    const selectedColumns = gridRef.current?.api.getSelectedColumns();
    if (selectedColumns?.length) {
      gridRef.current?.api.setSortModel(
        selectedColumns.map((col: Column) => ({
          colId: col.getId(),
          sort: 'asc'
        }))
      );
    }
  }, [gridRef]);

  const handleRowHeight = useCallback(() => {
    const height = parseInt(prompt('请输入行高（像素）', '40') || '40');
    if (!isNaN(height)) {
      gridRef.current?.api.forEachNode((node: RowNode) => {
        node.setRowHeight(height);
      });
      gridRef.current?.api.onRowHeightChanged();
    }
  }, [gridRef]);

  const handleShare = useCallback(() => {
    onExportExcel();
  }, [onExportExcel]);

  return {
    handleInsertRow,
    handleHideColumn,
    handleFilter,
    handleGroup,
    handleSort,
    handleRowHeight,
    handleShare
  };
} 