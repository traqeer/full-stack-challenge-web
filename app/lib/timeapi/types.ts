export type TimeApiResponse = {
  datetime: string; // ISO
  timezone: string;
  utc_offset?: string;
  abbreviation?: string;
  client_ip?: string;
  [key: string]: any;
};
