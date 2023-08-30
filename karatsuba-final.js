class KaratsubaCalculator {

  // divide a string em 3 partes
  divideIntoThreeParts(arg) {
    const partsize = Math.ceil(arg.length / 3);
    const parts = [];

    for (let i = 0; i < arg.length; i += partsize) {
      parts.push(arg.slice(i, i + partsize));
    }

    return parts;
  }

  // faz a soma intermediária dos numeros de acordo com o algoritmo de karatsuba
  sum(a, b) {
    let carry =0;
    let result = "";

    for (let i = 0; i < Math.max(a.length, b.length) || carry; i++) {
      const digitA = Number(a[a.length - 1 - i]) || 0;     
      const digitB = Number(b[b.length - 1 - i]) || 0;
      const sum = digitA + digitB + carry;

      result = (sum % 10) + result;
      carry = Math.floor(sum / 10);
    }

    return result;
  }

  multiply(s, p) {
    // se chegou no final onde cada string só tem 1 digito faz a multiplicação simples retorna
    if (s.length === 1 && p.length === 1) {
      return String(Number(s) * Number(p));
    }

    const a = this.divideIntoThreeParts(s);
    const b = this.divideIntoThreeParts(p);

    // calcula a diferença de tamanho dos numeros e adicina zeros no final
    const e = [
      s.length - a[0].length,
      s.length - (a[0].length + (a[1] ? a[1].length : 0)),
      0,
    ];
    const f = [
      p.length - b[0].length,
      p.length - (b[0].length + (b[1] ? b[1].length : 0)),
      0,
    ];

    let result = "0";

    // parte responsável por acionar a recursividade da função
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        result = this.sum(
          result,
          this.multiply(a[i] || "0", b[j] || "0") + "0".repeat(e[i] + f[j])
        );
      }
    }

    return result
  }

  // função principal de entrada
 calculate(a, b) {
    return this.multiply(a, b);
  }
}

// TESTE:
const calculator = new KaratsubaCalculator();
const result = calculator.calculate(
  process.argv[2],
  process.argv[3]
);
console.log(result);

// Rodar com:  node karatsuba-final.js 12432134341245674745675476 7054920058988836008343024 
// obs: tem que ter o node instalado :)
