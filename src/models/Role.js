import { Schema, model } from 'mongoose';

export const ROLES = ['user','admin','moderator']

const RolesSchema = new Schema({
    name: String
}, {
    versionKey: false
});

export default model('Roles', RolesSchema);