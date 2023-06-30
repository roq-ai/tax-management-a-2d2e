import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { taxComplianceValidationSchema } from 'validationSchema/tax-compliances';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.tax_compliance
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTaxComplianceById();
    case 'PUT':
      return updateTaxComplianceById();
    case 'DELETE':
      return deleteTaxComplianceById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTaxComplianceById() {
    const data = await prisma.tax_compliance.findFirst(convertQueryToPrismaUtil(req.query, 'tax_compliance'));
    return res.status(200).json(data);
  }

  async function updateTaxComplianceById() {
    await taxComplianceValidationSchema.validate(req.body);
    const data = await prisma.tax_compliance.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTaxComplianceById() {
    const data = await prisma.tax_compliance.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
