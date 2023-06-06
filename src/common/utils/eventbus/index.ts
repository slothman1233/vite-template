import mitt from 'mitt';
import { Handler } from 'mitt/index';

type Events = {
  // imSendMsg: imSendMsgModel;
  // stopAudio: string;
};

// interface imSendMsgType<K extends customMsgEnum> {
//   type: K;
//   data: costomMsgEvents[K];
// }

/** 发送消息模型
 * @param { customMsgEnum } type 发送类型
 * @param { striing } data 发送的json字符串数据
 */
export type imSendMsgModel = {
  // type: customMsgEnum;
  // data: sendCostomMsgEvents[customMsgEnum];
};

const bus = mitt<Events>();

type emitType = <Key extends keyof Events>(type: Key, handler: Events[Key]) => void;
type onType = <Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) => void;
type offType = <Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>) => void;

/** 发送消息 */
const emit: emitType = (type, event) => {
  bus.emit(type, event);
};

/** 添加监听 */
const on: onType = (type, handler) => {
  bus.on(type, handler);
};

/** 移除监听事件 */
const off: offType = (type, handler) => {
  bus.off(type, handler);
};

/** 清空所有事件 */
const allClear = () => {
  bus.all.clear();
};

export { emit as busEmit, on as busOn, off as busOff, allClear as busAllClear };

export default bus;
