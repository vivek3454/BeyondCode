import { model, models, Schema } from "mongoose";

const MenuItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isLink: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ["single", "multiple"],
        default: "single"
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "MenuItem",
        default: null
    },
}, {
    timestamps: true,
});

const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
export default MenuItem;