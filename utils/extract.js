const path = require('path');
const fs = require('fs');

const extract = async (file) => {
    const opcoesAE = ['A', 'B', 'C', 'D', 'E'];
    const opcoesCE = ['C', 'E'];

    if (await fs.existsSync(file)) {
        const data = await fs.readFileSync(file);
  
        return data.toString().split('****').map((questao, questao_id) => {
          const split = questao.split('***');
  
          let _gabarito = split[split.length - 1].trim();
          let gabarito = opcoesAE.indexOf(_gabarito);
  
          let opcoes = split
            .filter((_, index) => {
              return index > 0 && index < split.length - 1
            })
            .map((texto, index) => {
              return {
                letra: opcoesAE[index],
                texto: texto.trim(),
                correta: gabarito == index
              }
            });
  
          if(opcoes.length == 0){
            gabarito = opcoesCE.indexOf(_gabarito)
  
            opcoes = ['Certo', 'Errado'].map((option, index) => {
              return {
                letra: opcoesCE[index],
                texto: option,
                correta: gabarito == index
              }
            })
          }
  
          return {
            questao_id,
            aula_id: 0,
            enunciado: split[0].trim(),
            gabarito,
            opcoes,
          }
        });
      }
  
      return [];

}

module.exports = extract;