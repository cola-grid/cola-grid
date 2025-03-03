import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import './DataGrid.css';

export interface EditorCellProps extends ICellRendererParams {
  value: string;
  data: {
    editorInfo?: string;
  };
}

export const EditorCell: React.FC<EditorCellProps> = (props) => {
  const { value, data } = props;
  
  return (
    <div className="editor-cell">
      {value}
      {data.editorInfo && (
        <div className="editor-info" data-editor={data.editorInfo}>
          {data.editorInfo}
        </div>
      )}
    </div>
  );
};
