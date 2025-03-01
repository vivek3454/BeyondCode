
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from "lowlight"
const lowlight = createLowlight(common);
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

const CustomCodeBlock = (props) => {
    // console.log("CodeBlockLowlight", CodeBlockLowlight);

    const copyToClipboard = () => {
        const codeText = props.node.textContent;
        navigator.clipboard.writeText(codeText).then(() => {
            toast.success("Copied to clipboard!");
        });
    };

    return (
        <div className="relative group">
            <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-1 bg-gray-800 text-white rounded transition"
            >
                <Copy size={16} />
            </button>

            <pre className="bg-gray-900 text-white p-4 rounded-md">
                <NodeViewContent as="code" />
            </pre>
        </div>
    );
};

// Extend CodeBlockLowlight with a custom node view
export const CustomCodeBlockLowlight = CodeBlockLowlight.extend({
    addNodeView() {
        return (props) => {
            return <CustomCodeBlock {...props} />;
        };
    },
}).configure({ lowlight });

