console.log(mqtt);
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

const host = 'ws://broker.emqx.io:8083/mqtt'

const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
}

console.log('Connecting mqtt client')
const MQTTclient = mqtt.connect(host, options)

MQTTclient.on('error', (err) => {
  console.log('Connection error: ', err)
  MQTTclient.end()
})

MQTTclient.on('reconnect', () => {
  console.log('Reconnecting...')
})
    
MQTTclient.on('connect', () => {
    console.log('Client connected:' + clientId)
    // Subscribe
    MQTTclient.subscribe('/angryducks/buttons', { qos: 0 })


    MQTTclient.publish('/angryducks/buttons', '{"AngryDucks" : "Connected"}', { qos: 0, retain: false })
  })


MQTTclient.on('message', (topic, message, packet) => {
  console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic);
  let test = JSON.parse(message.toString());
  if (test.launch == 1){
    shoot(1);
  } else if(test.launch == 2){
    shoot(0);
  }
})



function MQTTSendReload(varPlayer){
  MQTTclient.publish('/angryducks/buttons', `{"ready" : "${varPlayer}"}`, { qos: 0, retain: false })
}
