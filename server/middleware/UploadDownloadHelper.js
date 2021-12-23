import { NOTFOUND } from 'dns'
import formidable from 'formidable'
import fs from 'fs'
import middleware from './middleware'
const uploadDir = process.cwd()+'/storages/'

const uploadImages = async (req,res,next) => {
    const options ={
        multiples : false,
        keepExtensions : true,
        uploadDir : uploadDir,
        maxFileSize : 50 * 1024 * 1024,
    }

    const form = formidable(options)
    let files = {};
    let fields = []

    form 
        .on('field',(fieldName, value)=>{
            fields.push({fieldName,value})
        })
        .on('file',(fieldName, file)=>{
            files = {...{fieldName, file}}
        })
        .on('end',()=>{
            console.log('Upload done');
            req.fileAttrb=({
                files:files,
                fields:fields
            })
            next()
        })
        form.parse(req)
}

const showImage = async (req, res) => {
    const filename = req.params.filename;
    const url = `${uploadDir}/${filename}`;
    fs.createReadStream(url)
        .on("error", () => middleware.notFound(req, res))
        .pipe(res);
}

export default{
    uploadImages,
    showImage
}