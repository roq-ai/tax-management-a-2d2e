import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TaxComplianceInterface {
  id?: string;
  type: string;
  details: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface TaxComplianceGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  details?: string;
  organization_id?: string;
}
