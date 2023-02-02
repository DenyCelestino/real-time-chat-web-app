import React, { useState } from 'react'
import style from './style.module.css'
import Slide from 'react-reveal'
const socket = new WebSocket('ws://localhost:8080')

const Login = () => {
  const [message, setMessage] = useState('')
  const [user, setUser] = useState('')
  const [info, setInfo] = useState('')
  const [messages, setMessages] = useState([])

  socket.onopen = function (e) {
    connected(e)
  }

  socket.onmessage = function (e) {
    var data = JSON.parse(e.data)
    console.log(data)
    setMessages([...messages, data])
  }

  function connected(e) {
    setInfo(`Conectado com sucesso com o servidor ${e.target.url}`)
    setTimeout(() => {
      setInfo('')
    }, 3000)
  }
  const handleSendMessage = () => {
    if (message.trim() == '') {
      alert('Digite uma mensagem')
    }
    var data = {
      userId: localStorage.getItem('user_id'),
      msg: message,
      user: localStorage.getItem('user')
    }
    setMessages([...messages, data])

    socket.send(JSON.stringify(data))
    setMessage('')
  }
  const cadUser = () => {
    localStorage.setItem('user', user)
    localStorage.setItem('user_id', Math.floor(Math.random() * 100))
  }
  return (
    <div className={style.container}>
      <header>
        {info && <p>{info}</p>}
        {localStorage.getItem('user') && (
          <h4>Logado como: {localStorage.getItem('user')}</h4>
        )}
      </header>
      <div className={style.chat_container}>
        {messages != [] && (
          <>
            {messages.map((item, index) => (
              <Slide key={index}>
                <span
                  className={style.span_message}
                  style={{
                    alignSelf:
                      item.userId ==
                        localStorage.getItem('user_id') && 'flex-end',
                    marginRight:
                      item.userId ==
                        localStorage.getItem('user_id') && 20,
                    marginLeft:
                      item.userId !=
                        localStorage.getItem('user_id') && 20,
                    background:
                      item.userId ==
                        localStorage.getItem('user_id') && '#D9FDD3'
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>
                    {item.userId == localStorage.getItem('user_id')
                      ? 'Eu'
                      : item.user}
                    :
                  </span>
                  <span> {item.msg}</span>
                </span>
              </Slide>
            ))}
          </>
        )}
      </div>
      <div className={style.input_container}>
        {!localStorage.getItem('user') && (
          <input
            value={user}
            onChange={e => setUser(e.target.value)}
            placeholder="Digite seu nome para conversar"
            className={style.input}
          />
        )}
        {localStorage.getItem('user') && (
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Digite uma mensagem"
            className={style.input}
          />
        )}

        <button
          onClick={
            localStorage.getItem('user') ? handleSendMessage : cadUser
          }
        >
          {localStorage.getItem('user') ? 'Enviar' : 'Cadastrar nome'}
        </button>
      </div>
    </div>
  )
}

export default Login
