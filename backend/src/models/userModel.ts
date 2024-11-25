import { Document, Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface UserSchemaTypes extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePic: string;
  tripList: string[];
  wishList: string[];
  propertyList: string[];
  reservationList: string[];
}
const userSchema: Schema<UserSchemaTypes> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: true },
    tripList: { type: [String], default: [] },
    wishList: { type: [String], default: [] },
    propertyList: { type: [String], default: [] },
    reservationList: { type: [String], default: [] },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User: Model<UserSchemaTypes> = model<UserSchemaTypes>("User", userSchema);
export default User;
