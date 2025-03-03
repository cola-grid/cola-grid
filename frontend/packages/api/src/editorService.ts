import { EditorState } from './types';

// 存储所有编辑状态
let editorStates: EditorState[] = [
  { rowIndex: 0, colId: 'model', editor: 'User1', color: '#0000ff' },
  { rowIndex: 1, colId: 'model', editor: '2人编辑', color: '#ff0000' },
  { rowIndex: 3, colId: 'model', editor: 'User2', color: '#ff0000' }
];

// 记录活跃的编辑者
const activeEditors = new Set<string>();

type EditorStateChangeCallback = (state: EditorState, type: 'add' | 'update' | 'delete') => void;
const subscribers: EditorStateChangeCallback[] = [];

// 订阅编辑状态变化
export const subscribeToEditorStateChanges = (callback: EditorStateChangeCallback) => {
  subscribers.push(callback);
  
  // 初始化时，发送所有现有状态
  editorStates.forEach(state => {
    activeEditors.add(state.editor);
    callback(state, 'add');
  });

  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};

// 获取当前所有编辑状态
export const getCurrentEditorStates = () => {
  return [...editorStates];
};

// 更新编辑状态
export const updateEditorState = (state: EditorState) => {
  // 如果该编辑者已有状态，先移除旧状态
  const oldIndex = editorStates.findIndex(s => s.editor === state.editor);
  if (oldIndex > -1) {
    const oldState = editorStates[oldIndex];
    editorStates.splice(oldIndex, 1);
    subscribers.forEach(callback => callback(oldState, 'delete'));
  }

  // 添加新状态
  editorStates.push(state);
  activeEditors.add(state.editor);
  subscribers.forEach(callback => callback(state, 'add'));
};

// 删除编辑状态
export const deleteEditorState = (rowIndex: number, colId: string) => {
  const index = editorStates.findIndex(
    state => state.rowIndex === rowIndex && state.colId === colId
  );

  if (index > -1) {
    const state = editorStates[index];
    editorStates.splice(index, 1);
    activeEditors.delete(state.editor);
    subscribers.forEach(callback => callback(state, 'delete'));
  }
};

// 模拟服务端推送新的编辑状态
export const simulateServerPush = () => {
  const rowIndex = Math.floor(Math.random() * 6);
  const editors = ['User1', 'User2', 'User3', 'User4'];
  const colors = ['#0000ff', '#ff0000', '#00ff00', '#ff00ff'];
  const colIds = ['make', 'model', 'price'];
  
  // 随机选择一个未使用的编辑者
  const availableEditors = editors;
  
  const randomEditorIndex = Math.floor(Math.random() * availableEditors.length);
  const editor = availableEditors[randomEditorIndex];
  const color = colors[editors.indexOf(editor)];
  const colId = colIds[Math.floor(Math.random() * colIds.length)];

  updateEditorState({
    rowIndex,
    colId,
    editor,
    color
  });
};
