import { model, models, Schema } from "mongoose";

const ContentSchema = new Schema({
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

const Content = models?.Content || model("Content", ContentSchema);
export default Content;