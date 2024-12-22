import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";

export default async function CloudStoringFile(file) {
  const s3 = new S3Client({
    region: "default",
    endpoint: process.env.LIARA_ENDPOINT,
    credentials: {
      accessKeyId: process.env.LIARA_ACCESS_KEY,
      secretAccessKey: process.env.LIARA_SECRET_KEY,
    },
  });

  const fileName = Date.now() + "_" + file.name;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  let fileBuffer;
  let contentType = file.type;

  if (contentType.startsWith("image/")) {
    fileBuffer = await sharp(buffer)
      .resize({ width: 800 })
      .jpeg({ quality: 50 })
      .toBuffer();
  } else if (contentType.startsWith("video/")) {
    fileBuffer = buffer;
  } else {
    return Response.json({ message: "Unsupported file type" }, { status: 400 });
  }

  const params = {
    Body: fileBuffer,
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: fileName,
    ContentType: contentType,
  };

  await s3.send(new PutObjectCommand(params));

  const fileAddress = `https://${process.env.LIARA_BUCKET_NAME}.storage.iran.liara.space/${fileName}`;

  return fileAddress;
}
