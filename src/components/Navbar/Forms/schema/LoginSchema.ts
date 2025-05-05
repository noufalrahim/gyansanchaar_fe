import { z } from 'zod';

export const loginSchema = z.object({
    mobile: z.string().min(10, 'Phone number must be at least 10 digits').max(10, 'Phone number must be at most 10 digits'),
});
