import z from 'zod';
import { mobileValidator } from './validateUser';

export const contactValidator = z.object({
    username: z.string(),
    mobile: mobileValidator
})