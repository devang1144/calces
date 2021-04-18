import FOS from './lib';
export function calc(m1, m2, fw1, fw2, length, rpm, torque, poisson, modulus, hardness, Q, Ko, process, material, grade, R1i, R1f, R2i, R2f){
    
    let result = [];
    let graph1 = [];
    let graph2 = [];
    let count1, count2 = 0;

    for(let n1=8;n1<101;n1++) { //pinion1
        for(let n2=16;n2<251;n2++) { // gear1

            let red1 = n2/n1;
            if (red1 > R1f || red1 < R1i ) break //important line to filter out wrong cases

            for(let n3=10;n3<120;n3++) { //pinion2
                for(let n4=20;n4<240;n4++) { //gear2
                    
                    let red2 = n4/n3;
                    if (red2 < R2i || red2 > R2f) break //important line to filter out wrong cases
                    
                    let len = m1*(n1 + 1 + n2/2) + m2*(n3/2 + 1 + n4) + 10; //in mm  (+ 10 mm for spacing b|w gears and gearbox casing)

                    if (len > length) break //important line to filter out wrong cases
                    
                    let fos1 =  FOS(m1, n1, n2, fw1, rpm, torque, poisson, modulus, hardness, Q, Ko, process, material, grade)
                    let fos2 =  FOS(m2, n2, n1, fw1, rpm/red1, torque*red1, poisson, modulus, hardness, Q, Ko, process, material, grade)
                    let fos3 =  FOS(m2, n3, n4, fw2, rpm/red1, torque*red1, poisson, modulus, hardness, Q, Ko, process, material, grade)
                    let fos4 =  FOS(m2, n4, n3, fw2, rpm/(red1*red2), torque*red1*red2, poisson, modulus, hardness, Q, Ko, process, material, grade)

                    result.push({ fosp1b:fos1[0], fosp1c:fos1[1], fosg1b:fos2[0], fosg1c:fos2[0], fosp2b:fos3[0], fosp2c:fos3[0], fosg2b:fos4[0], fosg2c:fos4[0],  })
                    return result
                }
            }
        }
    }
            
    return [result, graph1, graph2];
}