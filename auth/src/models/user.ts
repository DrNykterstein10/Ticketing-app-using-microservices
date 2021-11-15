import mongoose from "mongoose";
import { PasswordService } from "../services/passwordService";

//Properties that are used to create a user
interface UserAttributes {
  email: string;
  password: string;
}

//Properties that a User Model has
interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttributes): UserDocument;
}

//Properties that a single user has
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttributes) => {
  return new User(attrs);
};

userSchema.pre('save', async function(done){
    if(this.isModified('password')){
        const hashedPassword = await PasswordService.generateHash(this.get('password'));
        this.set('password', hashedPassword);
    }
    done();
})

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
