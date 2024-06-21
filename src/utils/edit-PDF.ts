import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as fs from 'fs/promises';
import { IBudGetModel } from '@/database/models/Budgets';
import { ICompanyDTO } from '@/dtos/Company';
import { IAttachment } from '@/providers/MailProvider/interface-mail-provider';

export async function editarPDF({
    id,
    price,
    height,
    width,
    email,
    name,
    address
}: IBudGetModel, company: ICompanyDTO) {
    // criar array de nome de PDFs
    const pdfsFileList: IAttachment[] = [
        {
            filename: 'Orçamento Blindex',
            path: 'src/assets/blindex/Orçamento Blindex.pdf'
        },
        {
            filename: 'Orçamento Perfect System',
            path: 'src/assets/perfect-system/Orçamento Perfect System.pdf'
        }
    ]

    // array de nome e path de PDFs
    let pdfs: IAttachment[] = []
  
    // criar um loop para percorrer o array de PDFs
    for(let pdf of pdfsFileList){
        const { path } = pdf
        // Carregar o PDF
        const pdfBytes = await fs.readFile(path);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Pegar a terceira página
        const page = pdfDoc.getPage(3); // O índice começa em 0, então a quarta página é o índice 3
        const { width: pageWidth, height: pageHeight } = page.getSize();
        
        const fontSize = 12;
        const lineHeight = 24;
        const textOptions = {
            x: 155,
            size: fontSize,
            color: rgb(0, 0, 0) // cor preta
        };

        const drawText = (text: string, y: number) => {
            page.drawText(text, {
                ...textOptions,
                y
            });
        };
        
        let currentY = pageHeight - 125;
        
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        
        // Função para desenhar texto com ou sem negrito
        const drawTextWithBold = (text: string, isBold: boolean, y: number) => {
            const font = isBold ? boldFont : helveticaFont; // Usando a fonte bold ou regular
            page.drawText(text, { ...textOptions, y, font });
        };

        // drawText(`\u2022 ${company.tradingName}`, 720);
         // CLIENTE ================
         drawText(`\u2022 ${name}`, currentY);
         currentY -= lineHeight;
 
         drawText(`\u2022 ${email}`, currentY);
         currentY -= lineHeight;
 
         drawTextWithBold(`\u2022 Edifício:`, true, currentY);
         page.drawText(`${address}`, { ...textOptions, x: 214, y: currentY });
         currentY -= lineHeight * 4.5
        
        // ORÇAMENTO ================

        // campo altura
        drawTextWithBold(`\u2022 Altura:`, true, currentY);
        page.drawText(`${height}`, { ...textOptions, x: 204, y: currentY });
        currentY -= lineHeight;

        // campo largura
        drawTextWithBold(`\u2022 Largura:`, true, currentY);
        page.drawText(`${width}`, { ...textOptions, x: 214, y: currentY });
        currentY -= lineHeight;

        drawTextWithBold(`\u2022 Total: `, true, currentY);
        page.drawText(`${price}`, { ...textOptions, x: 198, y: currentY });
        currentY -= lineHeight * 6.3;
        
        // EMPRESA ================
        drawText(`\u2022 ${company.legalName}`, currentY);
        currentY -= lineHeight  * 10; ;


        // FORMA DE PAGAMENTO ================
        drawText(`\u2022 PIX`, currentY);
        currentY -= lineHeight;

        drawText(`\u2022 Boleto`, currentY);
        currentY -= lineHeight;

        drawText(`\u2022 Credito a prazo até 12x`, currentY);


        const namePdf = `${id} - ${pdf.filename}.pdf`
        const pathNewFile = `./src/tmp/pdf/${namePdf}`
        
        // Salvar o PDF modificado
        const modifiedPdfBytes = await pdfDoc.save();
        await fs.writeFile(pathNewFile, modifiedPdfBytes);

        pdfs.push({
            filename: namePdf,
            path: pathNewFile,
        })
    }

    return pdfs
}
