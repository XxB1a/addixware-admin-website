import {IBlog} from "../models/blog";

export class Blog {

  private _blog: IBlog = {} as IBlog;

  constructor(props) {
    this._blog.description = props.description;
    this._blog.tag = props.tag;
    this._blog.title = props.title;
    this._blog.thumbnail = '';
    this._blog.content = props.content;
    this._blog.group = props.group;
  }

  public get blog() {
    return this._blog;
  }

}
