import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    mobile: z.string().min(10, 'Phone number must be at least 10 digits').max(10, 'Phone number must be at most 10 digits'),
    stream: z.string().min(1, 'Please select a stream'),
    level: z.string().min(1, 'Please select your current education level'),
});
