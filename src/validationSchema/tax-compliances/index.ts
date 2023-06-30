import * as yup from 'yup';

export const taxComplianceValidationSchema = yup.object().shape({
  type: yup.string().required(),
  details: yup.string().required(),
  organization_id: yup.string().nullable(),
});
