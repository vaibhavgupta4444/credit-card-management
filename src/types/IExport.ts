export interface ExportColumn {
    header: string;
    key: string;
    formatter?: (value: any) => string;
}

export interface ExportConfig {
    filename: string;
    sheetName: string;
    title?: string;
    columns: ExportColumn[];
}