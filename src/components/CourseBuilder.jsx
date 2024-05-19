// src/components/CourseBuilder.js
import React, { useReducer } from 'react';
import Module from './Module';
import DropdownMenu from './DropdownMenu';
import Resource from './Resource';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const initialState = {
  modules: [],
  resources: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MODULE':
      return {
        ...state,
        modules: [...state.modules, { id: Date.now(), name: action.name }],
      };
    case 'RENAME_MODULE':
      return {
        ...state,
        modules: state.modules.map((module) =>
          module.id === action.id ? { ...module, name: action.name } : module
        ),
      };
    case 'DELETE_MODULE':
      return {
        ...state,
        modules: state.modules.filter((module) => module.id !== action.id),
        resources: state.resources.filter((resource) => resource.moduleId !== action.id),
      };
    case 'ADD_RESOURCE':
      return {
        ...state,
        resources: [...state.resources, { id: Date.now(), ...action.resource }],
      };
    case 'DELETE_RESOURCE':
      return {
        ...state,
        resources: state.resources.filter((resource) => resource.id !== action.id),
      };
    case 'MOVE_RESOURCE':
      return {
        ...state,
        resources: state.resources.map((resource) =>
          resource.id === action.resourceId ? { ...resource, moduleId: action.destinationId } : resource
        ),
      };
    default:
      return state;
  }
};

function CourseBuilder() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addModule = () => {
    const moduleName = prompt('Enter module name:');
    if (moduleName) {
      dispatch({ type: 'ADD_MODULE', name: moduleName });
    }
  };

  const addLink = () => {
    const url = prompt('Enter URL:');
    const name = prompt('Enter link name:');
    if (url && name) {
      dispatch({ type: 'ADD_RESOURCE', resource: { type: 'link', url, name } });
    }
  };

  const uploadFile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        dispatch({ type: 'ADD_RESOURCE', resource: { type: 'file', name: file.name, file } });
      }
    };
    fileInput.click();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="course-builder">
        <DropdownMenu onAddModule={addModule} onAddLink={addLink} onUploadFile={uploadFile} />
        <div className="modules">
        {state.modules.length === 0 && <div className='empty'> 
        <img src="https://st3.depositphotos.com/8119216/15864/v/450/depositphotos_158642868-stock-illustration-office-accessories-in-a-cardboard.jpg" alt="Click on + icon to add Module"  width="360" />
        Nothing Added here Yet
        <p style={{fontWeight:"100", fontSize:"16px"}}>Click on the [+] Add button to add item to this courses</p>
        </div>}
          {state.modules.map((module) => (
            <Module key={module.id} module={module} dispatch={dispatch} />
          ))}
        </div>
        <div className="resources">
          {state.resources.map((resource) => (
            <Resource key={resource.id} resource={resource} dispatch={dispatch} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default CourseBuilder;
