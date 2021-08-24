const button = document.querySelector('button.test')
const cepTag = document.querySelector('input.cep')
const form = document.querySelector('form')

button.addEventListener('click', buscaCEP)

document.addEventListener('keydown', function(event)
{
  if(event.key === 'Enter')
  {
    buscaCEP()
  }
})

function buscaCEP()
{
    //let que pega o value da tag de input CEP
    let cep = cepTag.value

    //formatação
    cep = cep.replace(" ", "")
    cep = cep.replace(".", "")
    cep = cep.replace("-", "")
    cep = cep.trim()  //tira espaços do inicio e fim
  
    //requisição utilizando axios
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(function(response)
      {
        console.log(response.data)
        let exibeCEP = document.createElement('p')
        let content = document.createTextNode(`CEP ${response.data.cep}, rua ${response.data.logradouro}, bairro ${response.data.bairro}`)
        exibeCEP.appendChild(content)
        form.appendChild(exibeCEP)
      })
      .catch(function()
      {
        console.log('Algo de errado não está certo')
      })

    //imprimindo fora da promise para ver se está certo
    console.log(cep)
}