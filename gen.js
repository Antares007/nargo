const b = Buffer.from([]);
console.log(
  [
    b.readUInt48LE.toString(),
    b.readUInt40LE.toString(),
    b.readUInt24LE.toString(),
    b.readUInt32LE.toString(),
    b.readUInt16LE.toString(),
    b.readUInt48BE.toString(),
    b.readUInt40BE.toString(),
    b.readUInt24BE.toString(),
    b.readUInt32BE.toString(),
    b.readUInt16BE.toString(),
    b.readUInt8.toString(),
  ].join("\n")
);
