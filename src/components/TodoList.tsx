/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { Todo } from '../types/Todo';
import { getFilteredTodos } from '../utils/filterTodosByType';
import { FilterType } from '../types/FilterType';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  typeFilter: FilterType;
  handleDeleteTodo: (todoId: number) => void;
  isLoading: boolean;
  tempTodo: Todo | null;
  idsProcessing: number | null;
  onEdit: (
    id: number,
    data: Partial<Todo>,
  ) => Promise<void | { error: boolean } | undefined>;
  loadingIds: number[];
}

export const TodoList: React.FC<Props> = ({
  todos,
  typeFilter,
  handleDeleteTodo,
  isLoading,
  tempTodo,
  idsProcessing,
  onEdit,
  loadingIds,
}) => {
  const filteredTodos = getFilteredTodos(todos, typeFilter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          idsProcessing={idsProcessing}
          onEdit={onEdit}
          loadingIds={loadingIds}
        />
      ))}

      {tempTodo && (
        <TodoItem
          todo={tempTodo}
          isLoading={isLoading}
          handleDeleteTodo={handleDeleteTodo}
          onEdit={onEdit}
          loadingIds={loadingIds}
        />
      )}

      {/* This todo is being edited */}
      {false && (
        <div data-cy="Todo" className="todo">
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}

      {/* This todo is in loadind state */}
      {false && (
        <div data-cy="Todo" className="todo">
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            Todo is being saved now
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>

          {/* 'is-active' class puts this modal on top of the todo */}
          <div data-cy="TodoLoader" className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </section>
  );
};
