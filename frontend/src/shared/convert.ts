export async function toArrayBuffer(file: File): Promise<ArrayBuffer> {
  return await file!.arrayBuffer();
}

export async function fileListToArrayBuffer(files: FileList): Promise<ArrayBuffer[]> {
  const buffers: ArrayBuffer[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const buffer = await file!.arrayBuffer();
    buffers.push(buffer);
  }

  return buffers
}

export function toBase64(str: ArrayBuffer): string {
  return Buffer.from(str).toString('base64');
}

export function toBRL(value: number): string {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}