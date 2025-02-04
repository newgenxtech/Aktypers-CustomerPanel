export interface InvoiceMaster {
    Date: string;
    Invoiceid: string;
    Particulars: string;
    VCH_TYP: string;
    VCH_NO: string | null;
    Debit: string;
    Credit: string;
    file_name?: string;
} 