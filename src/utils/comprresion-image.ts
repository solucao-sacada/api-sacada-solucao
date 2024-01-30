import sharp from "sharp";

export function makeCompressionImage(fileName: string, pathFolder:string, mainFolder: string){
    const inputFile = `${pathFolder}/${fileName}`
    const outputFile = `${pathFolder}/${mainFolder}/${fileName}`
    const outputFilePng = `${pathFolder}/${mainFolder}/${fileName.replace('.png', '.webp')}`

    if(fileName.includes('.png')){
        return sharp(inputFile).webp().toFile(outputFilePng, (err, info)=>{
            if(err){
                console.log('Erro ao comprimir imagem', err)
            }
        })
    }

    if(fileName.includes('.jpg') || fileName.includes('.jpeg')){
        return sharp(inputFile).webp({quality:40}).toFile(outputFile, (err, info)=>{
            if(err){
                console.log('Erro ao comprimir imagem', err)
            }
        })
    }
;}