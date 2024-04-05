import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/check-in.ts
import z from "zod";
async function checkIn(app) {
  app.withTypeProvider().get("/attendees/:attendeeId/check-in", {
    schema: {
      summary: "Check-in an attendees",
      tags: ["check-ins"],
      params: z.object({
        attendeeId: z.coerce.number().int()
      }),
      response: {
        201: z.null()
      }
    }
  }, async (request, reply) => {
    const { attendeeId } = request.params;
    const atteendeCheckIn = await prisma.cheeckIn.findUnique({
      where: {
        attendeeId
      }
    });
    if (atteendeCheckIn !== null) {
      throw new BadRequest("Ateendee already checked in");
    }
    await prisma.cheeckIn.create({
      data: {
        attendeeId
      }
    });
    return reply.status(201).send();
  });
}

export {
  checkIn
};
