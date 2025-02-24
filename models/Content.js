import { model, models, Schema } from "mongoose";

const contentSchema = new Schema({
    contentString: {
        type: String,
        required: true
    },
    menuItemId: {
        type: Schema.Types.ObjectId,
        ref: "MenuItem",
        default: null
    },
}, {
    timestamps: true,
});

const Content = models?.Content || model("Content", contentSchema);
export default Content;