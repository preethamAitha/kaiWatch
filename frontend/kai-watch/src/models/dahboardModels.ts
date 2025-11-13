export interface vulnsModel {
  vulns: number;
  critical_vuls: number;
  high_vuls: number;
  medium_vuls: number;
  low_vuls: number;
}

export interface FreqDataItem {
  factorname: string;
  frequency: number;
}

export interface LineDataItem{
    month: number;
  vulns: number;
  critical_vuls: number;
  high_vuls: number;
  medium_vuls: number;
  low_vuls: number;
}

export interface VulnTableItem {
  id: number;
  image_id: number;
  cve: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | string;
  cvss: string;
  status: string;
  kaistatus: string | null;
  cause: string;
  description: string;
  vecstr: string;
  exploit: string;
  link: string;
  type: string;
  packagename: string;
  packageversion: string;
  packagetype: string;
  layertime: string;
  published: string;
  fixdate: string;
  applicablerules: string[];
  owner: string;
  advisorytype: string;
  path: string;
}

export interface VulnGridRow {
  id: number;
  cve: string;
  severity: string;
  status: string;
  cvss: string;
  kaiStatus: string | null;
  published: string;
  fixDate: string;
}