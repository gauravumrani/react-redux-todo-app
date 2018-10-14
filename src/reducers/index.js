import {
  ADD_TODO, REMOVE_TODO, CHECK_TODO, FETCH_SUCCESS, LOADING,
} from '../constants/action-types';

const initialState = {
  todos: [],
  loading: { isLoading: false, loadingMsg: '' },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case REMOVE_TODO:
      return { ...state, todos: state.todos.filter((el => el._id !== action.payload.id)) };
    case CHECK_TODO:
      return {
        ...state,
        todos: state.todos.map((el) => {
          if (el._id === action.payload.id) el.check = action.payload.value;
          return el;
        }),
      };
    case FETCH_SUCCESS:
      return { ...state, todos: action.payload, loading: { isLoading: false, loadingMsg: '' } };
    case LOADING:
      return { ...state, loading: { isLoading: true, loadingMsg: action.loadingMsg } };
    default:
      return state;
  }
};

export default rootReducer;
