import sharp from "sharp";

export function makeCompressionImage(fileName: string, pathFolder:string, mainFolder: string){
    const inputFile = `${pathFolder}/${fileName}`
    const outputFile = `${pathFolder}/${mainFolder}/${fileName}`
    const outputFilePng = `${pathFolder}/${mainFolder}/${fileName.replace('.png', '.jpg')}`

    if(fileName.includes('.png')){
        return sharp(inputFile).jpeg({quality:40}).toFile(outputFilePng, (err, info)=>{
            if(err){
                console.log('Erro ao comprimir imagem', err)
            }
        })
    }

    if(fileName.includes('.jpg') || fileName.includes('.jpeg')){
        return sharp(inputFile).jpeg({quality:40}).toFile(outputFile, (err, info)=>{
            if(err){
                console.log('Erro ao comprimir imagem', err)
            }
        })
    }
;}