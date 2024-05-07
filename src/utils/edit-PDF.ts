import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as fs from 'fs/promises';
import { IBudGetModel } from '@/database/models/Budgets';
import { ICompanyDTO } from '@/dtos/Company';

export async function editarPDF({
    id,
    price,
    aparador,
    selante,
    prolongador,
    qtdAparador,
    qtdProlongador,
    qtdSelante,
    chapaInferior,
    chapaSuperior,
    area,
    pricePlates,
    priceGlasses,
    priceAcessories,
    priceKitSolutions,
    priceProlongador
}: IBudGetModel, company: ICompanyDTO) {
    // Carregar o PDF
    const pdfBytes = await fs.readFile('./src/assets/Proposta_Comercial_Modelo.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Pegar a terceira página
    const page = pdfDoc.getPage(3); // O índice começa em 0, então a quarta página é o índice 3
    const { width, height } = page.getSize();
    
    const fontSize = 12;
    const lineHeight = 22;
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
    
    let currentY = height - 310;
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Função para desenhar texto com ou sem negrito
    const drawTextWithBold = (text: string, isBold: boolean, y: number) => {
        const font = isBold ? boldFont : helveticaFont; // Usando a fonte bold ou regular
        page.drawText(text, { ...textOptions, y, font });
    };
    // ENDERECO
    drawText(`\u2022 ${company.tradingName}`, 720);
    drawText(`\u2022 ${company.streetAddress}, ${company.num} - ${company.neighborhood}, ${company.city} - ${company.state} - ${company.zipCode}`, 698);
    currentY -= lineHeight;
    
    // ORÇAMENTO
    drawTextWithBold(`\u2022 Aparador Inox:`, true, currentY);
    page.drawText(`${qtdAparador}`, { ...textOptions, x: 252, y: currentY });
    currentY -= lineHeight;
    
    drawTextWithBold(`\u2022 Prolongador:`, true, currentY);
    page.drawText(`${qtdProlongador}`, { ...textOptions, x: 242, y: currentY });
    currentY -= lineHeight;
    
    drawTextWithBold(`\u2022 Selante:`, true, currentY);
    page.drawText(`${qtdSelante}`, { ...textOptions, x: 212, y: currentY });
    currentY -= lineHeight;
    
    drawTextWithBold(`\u2022 Chapa Inferior:`, true, currentY);
    page.drawText(`${chapaInferior ? 'Sim' : 'Não'}`, { ...textOptions, x: 251, y: currentY });
    currentY -= lineHeight;
    
    drawTextWithBold(`\u2022 Chapa Superior:`, true, currentY);
    page.drawText(`${chapaSuperior ? 'Sim' : 'Não'}`, { ...textOptions, x: 259, y: currentY });
    currentY -= lineHeight;
    
    drawTextWithBold(`\u2022 Custo do vidro: `, true, currentY);
    page.drawText(`${priceGlasses}`, { ...textOptions, x: 255, y: currentY });
    currentY -= lineHeight;
    
    drawTextWithBold(`\u2022 Kit solução: `, true, currentY);
    page.drawText(`${priceKitSolutions}`, { ...textOptions, x: 234, y: currentY });
    currentY -= lineHeight;
    
    drawTextWithBold(`\u2022 Valor Prolongador: `, true, currentY);
    page.drawText(`${priceProlongador}`, { ...textOptions, x: 275, y: currentY });
    currentY -= lineHeight;
    
    drawTextWithBold(`\u2022 Custo dos acessórios: `, true, currentY);
    page.drawText(`${priceAcessories}`, { ...textOptions, x: 295, y: currentY });
    currentY -= lineHeight;
    
    drawTextWithBold(`\u2022 Custo das chapas: `, true, currentY);
    page.drawText(`${pricePlates}`, { ...textOptions, x: 272, y: currentY });
    currentY -= lineHeight;
    
    drawTextWithBold(`\u2022 Área: `, true, currentY);
    page.drawText(`${area}`, { ...textOptions, x: 196, y: currentY });
    currentY -= lineHeight;
    
    drawTextWithBold(`\u2022 Total: `, true, currentY);
    page.drawText(`${price}`, { ...textOptions, x: 198, y: currentY });
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
