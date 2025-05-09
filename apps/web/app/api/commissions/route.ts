import { getStartEndDates } from "@/lib/analytics/utils/get-start-end-dates";
import { DubApiError } from "@/lib/api/errors";
import { withWorkspace } from "@/lib/auth";
import {
  CommissionResponseSchema,
  getCommissionsQuerySchema,
} from "@/lib/zod/schemas/commissions";
import { prisma } from "@dub/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// GET /api/commissions - get all commissions for a program
export const GET = withWorkspace(async ({ workspace, searchParams }) => {
  const { programId } = searchParams;

  if (programId !== workspace.defaultProgramId) {
    throw new DubApiError({
      code: "not_found",
      message: "Program not found",
    });
  }

  const {
    status,
    type,
    customerId,
    payoutId,
    partnerId,
    page,
    pageSize,
    sortBy,
    sortOrder,
    start,
    end,
    interval,
  } = getCommissionsQuerySchema.parse(searchParams);

  const { startDate, endDate } = getStartEndDates({
    interval,
    start,
    end,
  });

  const commissions = await prisma.commission.findMany({
    where: {
      earnings: {
        gt: 0,
      },
      programId,
      partnerId,
      status,
      type,
      customerId,
      payoutId,
      createdAt: {
        gte: startDate.toISOString(),
        lte: endDate.toISOString(),
      },
    },
    include: {
      customer: true,
      partner: true,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { [sortBy]: sortOrder },
  });

  return NextResponse.json(
    z.array(CommissionResponseSchema).parse(commissions),
  );
});
