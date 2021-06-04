function identifier(o, b, a) {
  // identifierStart      la₁range('a','b')₁shift
  // identifier   la₁range(0x61,0x7a)₁shift₁la₁range(0x61,0x7a)
  //             ₀range(0x61,0x7a)
  //             ₀range(0x61,0x7a)
  //             ₀range(0x61,0x7a)
  //             ₁shift
  const buf = a - 2;
  const pos = a - 1;
  const cp = b[buf].codePointAt(b[pos]);
  if (cp < 0x61 || 0x7a < cp) o[0](o, b, a);
  else while (cp < 0x61 || 0x7a < cp) {}
}
