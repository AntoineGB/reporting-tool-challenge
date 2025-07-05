// Renders an image with an editable source URL.
import React from "react";
import ElementWrapper from "./ElementWrapper";

// Renders an image with an editable source URL.
function ImageElement({ element, onUpdate, onDelete }) {
  return (
    <ElementWrapper element={element} onDelete={onDelete}>
      <div className="p-2">
        <img
          src={element.src}
          alt="Report content"
          className="max-w-full h-auto rounded-md mx-auto"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "[https://placehold.co/600x100/27272a/9ca3af?text=Invalid+Image+URL](https://placehold.co/600x100/27272a/9ca3af?text=Invalid+Image+URL)";
          }}
        />
        <input
          type="text"
          value={element.src}
          onChange={(e) => onUpdate(element.id, { src: e.target.value })}
          className="w-full bg-gray-800 text-gray-300 p-2 rounded-md mt-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Image URL"
        />
      </div>
    </ElementWrapper>
  );
}

export default ImageElement;
