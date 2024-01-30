import sharp from "sharp";

export async function makeCompressionImage(fileName: string, pathFolder:string, mainFolder: string){
    const inputFile = `${pathFolder}/${fileName}`
    const outputFile = `${pathFolder}/${mainFolder}/${fileName}`

    const extension = fileName.includes('.png') ? 'png' : 'jpeg'

    if(extension === 'png'){
        return sharp(inputFile).png({quality:50}).toFile(outputFile, (err, info)=>{
            if(err){
                console.log('Erro ao comprimir imagem', err)
            }else{
                console.log('Imagem comprimida com sucesso', info)
            }
        })
    }

    if(extension === 'jpeg'){
        return sharp(inputFile).jpeg({quality:70}).toFile(outputFile, (err, info)=>{
            if(err){
                console.log('Erro ao comprimir imagem', err)
            }else{
                console.log('Imagem comprimida com sucesso', info)
            }
        })
    }
   
;}