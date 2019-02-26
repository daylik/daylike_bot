const isset = function(v_var) {
  if (typeof(v_var) == 'number') {
    if (isNaN(v_var)) {
      return false;
    }
  }
  if (typeof(v_var) == 'undefined' || v_var === null) {
    return false;
  }
  return true;
};

var steps_line = [
  { 
    step_id: 0,
    send_text: "Здравствуйте!\nЧто бы вы хотели чтобы я сделал?", 
    buttons: [[
      { 
        "action": { 
          "type": "text", 
          "payload": "{\"next_step\": 2}", 
          "label": "Хочу зарегистрироваться на мероприятие" 
        }, 
        "color": "positive" 
      }],
      [{ 
        "action": { 
          "type": "text", 
          "payload": "{\"next_step\": 1}", 
          "label": "Ничего, пока)" 
        }, 
        "color": "default" 
      }
    ]]
  }, 
  { 
    step_id: 1, 
    send_text: "Если что то понадобиться, пишите не стесняйтесь!", 
    buttons: [
    [{ 
        "action": { 
          "type": "text", 
          "payload": "{\"next_step\": 3}", 
          "label": "Я не знаю что писать" 
        }, 
        "color": "default" 
      },
      { 
        "action": { 
          "type": "text", 
          "payload": "{\"next_step\": 4}", 
          "label": "Понятно!" 
        }, 
        "color": "default" 
      }]
    ]
  }, 
  { 
    step_id: 2, 
    send_text: "На какое из мероприятий вы хотели бы зарегистрироваться?", 
    buttons: [
    [{ 
        "action": { 
          "type": "text", 
          "payload": "{\"next_step\": 5}", 
          "label": "Хочу поехать на экскурсию" 
        }, 
        "color": "positive" 
      },
      { 
        "action": { 
          "type": "text", 
          "payload": "{\"next_step\": 5}", 
          "label": "Хочу записаться в Девичий клуб" 
        }, 
        "color": "positive" 
      }]
    ]
  },
  { 
    step_id: 3, 
    send_text: "Сейчас пришлю инструкцию - (Ещё в разработке)", 
    buttons: [],
    action: 'send_info'
  },
  { 
    step_id: 4, 
    send_text: "Пока)", 
    buttons: [],
    action: 'keybord_off'
  },
  { 
    step_id: 5, 
    send_text: "Отлично я вас записал", 
    buttons: [],
    action: 'register_user'
  }
];
var vk_regexp_bot_calc = /([()+/:0-9*-]+)[\s]*=[\s]*/i;

vk_lavrik.on("message", function( event, msg ) {  

   var vk_lavrik_msg = msg.body.match(vk_lavrik_msg_reg);
   var vk_lavrik_match_calc = msg.body.match(vk_regexp_bot_calc);
   
    if(isset(msg.body)){

      if ( /([()+/:0-9*-]+)[\s]*=[\s]*/.test(msg.body) ) {
        if (isset(vk_lavrik_match_calc[1])) {
          var out = ''+ vk_lavrik_match_calc[1]+ ' = ' + eval(vk_lavrik_match_calc[1]);
          // var out = vk_match_bot_calc[1];
           vk_lavrik.messages.send({
                      message: out,
                      peer_id: msg.peer_id
           }).catch(function (err){
            console.log(err);
           });
           event.ok();
        }
      } 
 var msg_body = msg.body.toLowerCase();
      if ( /привет|здарова|хай|добрый\s(день|вечер)/.test(msg_body) ) {
       var keybord = { 
          "one_time" : false, 
          "buttons": steps_line[0].buttons 
        };

        vk_lavrik.messages.send({
            message: steps_line[0].send_text,
            peer_id: msg.peer_id,
            keyboard: JSON.stringify(keybord)
        }).catch(function (err){
            console.log(err);
        });
        event.ok();

      } else {
var next_step_id = JSON.parse(msg.data[7].payload);

          if(steps_line[next_step_id.next_step].action == "register_user" ){
              vk_lavrik.users.get({ user_id: msg.from_id})
                      .then(function(res) {
                           vk_lavrik.messages.send({
                              message: 'Я вас записал '+ res[0].first_name +'\nЕсли что то понадобиться ещё, то просто напишите мне.',
                              peer_id: msg.peer_id
                           }).catch(function (err){
                            console.log(err);
                           });
                           event.ok();
            });
                      
          } else {
            var keybord = { 
                "one_time" : false, 
                "buttons": steps_line[next_step_id.next_step].buttons 
              };

              vk_lavrik.messages.send({
                message: steps_line[next_step_id.next_step].send_text,
                peer_id: msg.peer_id,
                keyboard: JSON.stringify(keybord)
              }).catch(function (err){
                console.log(err);
              });
              event.ok();
        }
      }
    }
});
