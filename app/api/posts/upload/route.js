// app/api/posts/upload/route.js
import {NextResponse} from "next/server";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);

export async function POST(req,res) {
    try{
        const formData = await req.formData();
        const file = formData.getAll('files')[0]
        const filePath = `./public/uploads/${file.name}`;
        await pump(file.stream(), fs.createWriteStream(filePath));
        //return NextResponse.json({status:"success",data:file.size})
        return NextResponse.json({ imageUrl:`/uploads/${file.name}` }, { status: 200 });
    }
    catch (e) {
        //return  NextResponse.json({status:"fail",data:e})
        return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
    }
}

