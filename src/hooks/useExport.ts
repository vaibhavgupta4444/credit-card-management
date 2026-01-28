import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { ExportConfig } from "../types/IExport";


export const useExport = <T extends Record<string, any>>(data: T[], config: ExportConfig) => {
    const handleExportExcel = () => {
        const transformedData = data.map(item => {
            const row: Record<string, any> = {};
            config.columns.forEach(col => {
                const value = item[col.key];
                row[col.header] = col.formatter ? col.formatter(value) : value;
            });
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(transformedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, config.sheetName);
        XLSX.writeFile(workbook, `${config.filename}.xlsx`);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();

        if (config.title) {
            doc.setFontSize(16);
            doc.text(config.title, 14, 15);
        }

        const headers = config.columns.map(col => col.header);
        const body = data.map(item => 
            config.columns.map(col => {
                const value = item[col.key];
                return col.formatter ? col.formatter(value) : String(value);
            })
        );

        autoTable(doc, {
            head: [headers],
            body: body,
            startY: config.title ? 25 : 10,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [59, 130, 246] }
        });

        doc.save(`${config.filename}.pdf`);
    };

    return { handleExportExcel, handleExportPDF };
};
