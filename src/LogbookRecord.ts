import { LogBookRecordType } from './context/LogbookContext';
import { v4 as uuidv4 } from 'uuid';

export default class LogbookRecord implements LogBookRecordType {
  id: string;
  added: Date;
  value: number;

  constructor(added: Date = new Date(), value: number) {
    this.id = uuidv4();
    this.added = added;
    this.value = value;
  }
}
