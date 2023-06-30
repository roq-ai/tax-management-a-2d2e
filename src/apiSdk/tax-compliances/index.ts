import axios from 'axios';
import queryString from 'query-string';
import { TaxComplianceInterface, TaxComplianceGetQueryInterface } from 'interfaces/tax-compliance';
import { GetQueryInterface } from '../../interfaces';

export const getTaxCompliances = async (query?: TaxComplianceGetQueryInterface) => {
  const response = await axios.get(`/api/tax-compliances${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTaxCompliance = async (taxCompliance: TaxComplianceInterface) => {
  const response = await axios.post('/api/tax-compliances', taxCompliance);
  return response.data;
};

export const updateTaxComplianceById = async (id: string, taxCompliance: TaxComplianceInterface) => {
  const response = await axios.put(`/api/tax-compliances/${id}`, taxCompliance);
  return response.data;
};

export const getTaxComplianceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/tax-compliances/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTaxComplianceById = async (id: string) => {
  const response = await axios.delete(`/api/tax-compliances/${id}`);
  return response.data;
};
