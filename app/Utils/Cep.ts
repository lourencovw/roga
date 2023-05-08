import axios from 'axios'

export default class Cep {
  public static async validate(cep) {
    try {
      const { data } = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
      if (data.erro) {
        return {
          error: true,
          data: {
            "errors": [
              {
                "rule": "cep",
                "field": "cep",
                "message": "cep validation failed"
              }
            ]
          }
        }
      }
      return {
        error: false,
        data
      }
    } catch (error) {
      throw new Error('Erro ao consultar API de CEP');
    }
  }
}
