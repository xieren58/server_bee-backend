import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from '@/server/api/trpc'
import { z } from 'zod'

export const serverRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            }
        }),

    create: protectedProcedure
        .input(z.object({ name: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            return ctx.db.server.create({
                data: {
                    name: input.name,
                    owner: { connect: { id: ctx.session.user.id } },
                },
            })
        }),

    getSecretMessage: protectedProcedure.query(() => {
        return 'you can now see this secret message!'
    }),
})
