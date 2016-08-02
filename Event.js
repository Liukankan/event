myEvent = {
        readyEvent  :   function(fn){
            var oldonload = window.onload;
            if ( typeof oldonload == 'function') {
              window.onload = function(){
                oldonload();
                fn();
              }
            }
            else{
              window.onload = fn;
            }
        },
       // �������ֱ�ʹ��dom0||dom2||IE��ʽ �����¼�
      // ������ ������Ԫ��,�¼����� ,�¼��������
        addEvent : function(element, type, handler) {
          if (element.addEventListener) {
            //�¼����͡���Ҫִ�еĺ������Ƿ�׽
            element.addEventListener(type, handler, false);
          } else if (element.attachEvent) {
            element.attachEvent('on' + type, function() {
              handler.call(element);
            });
          } else {
            element['on' + type] = handler;
          }
        },
        remove  : function (element,type,fn){
          if (element.removeEventListener) {
            element.removeEventListener(type,fn,false);
          }
          else if(element.detachEvent){
            element.detachEvent('on'+type,fn);
          }
          else{
            element['on'+type] = null;
          }
        },
        // ��ֹ�¼� (��Ҫ���¼�ð�ݣ���ΪIE��֧���¼�����)
        stopPropagation : function(ev) {
          if (ev.stopPropagation) {
            ev.stopPropagation();
          }
           else {
            ev.cancelBubble = true;
          }
        },
        // ȡ���¼���Ĭ����Ϊ
        preventDefault : function(event) {
          if (event.preventDefault) {
            event.preventDefault();
          } else {
            event.returnValue = false;
          }
        },
        getTarget :   function(event){
          return event.target ||event.srcElement;
        },
        // ��ȡevent��������ã�ȡ���¼���������Ϣ��ȷ����ʱ��ʹ��event��
        getEvent : function(ev) {
          // var ev = e || window.event;
          if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
              ev = c.arguments[0];
              if (ev && Event == ev.constructor) {
                break;
              }
              c = c.caller;
            }
          }
          return ev;
        }
      }