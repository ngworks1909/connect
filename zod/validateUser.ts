import z from 'zod';

export const mobileValidator = z.string().regex(
    /^[6-9]\d{9}$/,
    {
      message: "Not a valid mobile number.",
    }
)
    
export const signupInput = z.object({
    email: z.string().min(3),
    password: z.string().min(6),
    mobile: mobileValidator,
    username: z.string().min(3)
})
export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export type SigninInput = z.infer<typeof signinInput>
