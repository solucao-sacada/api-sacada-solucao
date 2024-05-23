import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as fs from 'fs/promises';
import { IBudGetModel } from '@/database/models/Budgets';
import { ICompanyDTO } from '@/dtos/Company';

export async function editarPDF({
    id,
    price,
    height,
    width
}: IBudGetModel, company: ICompanyDTO) {
    // Carregar o PDF
    const pdfBytes = await fs.readFile('./src/assets/Proposta_Comercial_Modelo.pdf');
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
    
    let currentY = pageHeight - 255;
    
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Função para desenhar texto com ou sem negrito
    const drawTextWithBold = (text: string, isBold: boolean, y: number) => {
        const font = isBold ? boldFont : helveticaFont; // Usando a fonte bold ou regular
        page.drawText(text, { ...textOptions, y, font });
    };

    // ENDERECO
    drawText(`\u2022 ${company.tradingName}`, 720);
    drawText(`\u2022 ${company.streetAddress}, ${company.num} - ${company.neighborhood}, ${company.city} - ${company.state} - ${company.zipCode}`, 695);
    currentY -= lineHeight;
    
    // ORÇAMENTO

    // campo altura
    drawTextWithBold(`\u2022 Altura:`, true, currentY);
    page.drawText(`${height}`, { ...textOptions, x: 204, y: currentY });
    currentY -= lineHeight;

    // campo largura
    drawTextWithBold(`\u2022 Largura:`, true, currentY);
    page.drawText(`${width}`, { ...textOptions, x: 214, y: currentY });
    currentY -= lineHeight;

    drawTextWithBold(`\u2022 Total: `, true, currentY);
    page.drawText(`${price}`, { ...textOptions, x: 252, y: currentY });
    currentY -= lineHeight * 4.5;
    
    // EMPRESA
    drawText(`\u2022 ${company.legalName}`, currentY);
    currentY -= lineHeight;

    const namePdf = `${id} - Proposta_Comercial_Modelo.pdf`
    const filePath = `./src/tmp/pdf`
    // Salvar o PDF modificado
    const modifiedPdfBytes = await pdfDoc.save();
    await fs.writeFile(`${filePath}/${namePdf}`, modifiedPdfBytes);

    return {
        namePdf,
        filePath
    }
}
