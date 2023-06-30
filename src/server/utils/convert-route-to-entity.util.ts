const mapping: Record<string, string> = {
  organizations: 'organization',
  'tax-compliances': 'tax_compliance',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
