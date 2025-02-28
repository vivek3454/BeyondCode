"use client";

import React from "react";

export const CustomCodeBlock = ({ editor }) => {
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const handleDelete = () => {
        editor.chain().focus().deleteNode("codeBlock").run();
    };

    return (
        <div className="code-block">
            <div className="code-buttons">
                <button onClick={() => handleCopy(editor.getText())}>📋 Copy</button>
                <button onClick={handleDelete}>🗑 Delete</button>
            </div>
            <pre>
                <code>{editor.getText()}</code>
            </pre>
        </div>
    );
};
