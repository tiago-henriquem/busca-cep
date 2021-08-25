const button = document.querySelector('button.test')
const cepTag = document.querySelector('input.cep')
const form = document.querySelector('form')

button.addEventListener('click', buscaCEP)

document.addEventListener('keydown', function(event)
{
  if(event.key === 'Enter')
  {
    buscaCEP(event)
  }
})

function buscaCEP(event)
{
    event.preventDefault()
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
        showAddress(response)
      })
      .catch(function()
      {
        console.log('Algo de errado não está certo')
        limpaVisor()
      })
      //Está faltando tratar o caso "CEP inválido". Nesse caso, a API retorna undefined e retorna o error true (exemplo CEP 16900200, que não existe).
      //O que ocorre com o CEP inválido é que exibe na tela as propriedades undefined.


    //imprimindo fora da promise para ver se está certo
    console.log(cep)
}

function showAddress(response)
{
  let CEPVisor = document.querySelector('form p')
  let content = `CEP ${response.data.cep}, rua ${response.data.logradouro}, bairro ${response.data.bairro}`
  CEPVisor.innerText = content

  CEPVisor.style.fontSize = '25px'
  CEPVisor.style.textAlign = 'center'
  CEPVisor.style.fontFamily = 'sans-serif'
}

function limpaVisor()
{
  let CEPVisor = document.querySelector('form p')
  CEPVisor.innerText = ''
}