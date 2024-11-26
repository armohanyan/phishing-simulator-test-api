export default interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
}