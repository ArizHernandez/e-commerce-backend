import { Schema, model } from 'mongoose';
import IUser from 'interfaces/user';

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user',
    },
    photoPath: {
      type: String,
    },
    initials: {
      type: String,
      required: true,
      default: function () {
        const userInitials = this.firstName.charAt(0) + this.lastName.charAt(0);
        return userInitials;
      },
    },
  },
  { timestamps: true }
);

export default model<IUser>('User', UserSchema);
