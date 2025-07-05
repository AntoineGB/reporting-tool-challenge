// Renders an editable text block.

import React from "react";
import ElementWrapper from "./ElementWrapper";

function TextElement({ element, onUpdate, onDelete }) {
  return (
    <ElementWrapper element={element} onDelete={onDelete}>
      <textarea
        value={element.value}
        onChange={(e) => onUpdate(element.id, { value: e.target.value })}
        className="w-full bg-transparent text-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:text-gray-300"
        rows={3}
      />
    </ElementWrapper>
  );
}

export default TextElement;
