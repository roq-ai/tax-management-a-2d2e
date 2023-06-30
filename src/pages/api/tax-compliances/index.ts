import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { taxComplianceValidationSchema } from 'validationSchema/tax-compliances';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTaxCompliances();
    case 'POST':
      return createTaxCompliance();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTaxCompliances() {
    const data = await prisma.tax_compliance
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'tax_compliance'));
    return res.status(200).json(data);
  }

  async function createTaxCompliance() {
    await taxComplianceValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.tax_compliance.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
