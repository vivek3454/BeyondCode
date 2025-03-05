import { useState } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Check, Copy } from 'lucide-react'; // Icons for UI
// import classes from './code-block-component.module.css'; // CSS file for styling

function CodeBlockComponent({ node }) {
    const [copied, setCopied] = useState(false);

    // Function to copy code content
    const copyToClipboard = async () => {
        console.log("function copyToClipboard called");

        const codeContent = node?.content?.content[0]?.text || ''; // Fetch code content properly
        console.log("codeContent: ", codeContent);

        if (codeContent) {
            await navigator.clipboard.writeText(codeContent);
            setCopied(true);

            // Reset "copied" state after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <NodeViewWrapper className="codeBlock not-prose">
            {/* Copy Button */}
            <button onClick={copyToClipboard} className="copyButton">
                {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>

            {/* Render code content */}
            <pre>
                <NodeViewContent as="code" />
            </pre>
        </NodeViewWrapper>
    );
}

export default CodeBlockComponent;