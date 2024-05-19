// src/App.js
import React, { useReducer } from 'react';
import CourseBuilder from './components/CourseBuilder';
import './App.css';

const initialState = {
  modules: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_MODULE':
      return {
        ...state,
        modules: [...state.modules, { id: Date.now(), name: action.name, resources: [] }],
      };
    case 'ADD_RESOURCE':
      return {
        ...state,
        modules: state.modules.map(module =>
          module.id === action.moduleId
            ? { ...module, resources: [...module.resources, { id: Date.now(), ...action.resource }] }
            : module
        ),
      };
    case 'RENAME_MODULE':
      return {
        ...state,
        modules: state.modules.map(module =>
          module.id === action.id ? { ...module, name: action.name } : module
        ),
      };
    case 'DELETE_MODULE':
      return {
        ...state,
        modules: state.modules.filter(module => module.id !== action.id),
      };
    case 'RENAME_RESOURCE':
      return {
        ...state,
        modules: state.modules.map(module => ({
          ...module,
          resources: module.resources.map(resource =>
            resource.id === action.id ? { ...resource, name: action.name } : resource
          ),
        })),
      };
    case 'DELETE_RESOURCE':
      return {
        ...state,
        modules: state.modules.map(module => ({
          ...module,
          resources: module.resources.filter(resource => resource.id !== action.id),
        })),
      };
    case 'MOVE_RESOURCE':
      const { sourceId, destinationId, resourceId } = action;
      const resourceToMove = state.modules
        .find(module => module.id === sourceId)
        .resources.find(resource => resource.id === resourceId);
      
      return {
        ...state,
        modules: state.modules.map(module => {
          if (module.id === sourceId) {
            return {
              ...module,
              resources: module.resources.filter(resource => resource.id !== resourceId),
            };
          }
          if (module.id === destinationId) {
            return {
              ...module,
              resources: [...module.resources, resourceToMove],
            };
          }
          return module;
        }),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <CourseBuilder state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
