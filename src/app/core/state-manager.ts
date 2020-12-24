export abstract class StateManager {

  protected state;

  protected setState(key, value) {
    const newState = JSON.parse(JSON.stringify(this.state));
    newState[key] = value;
    this.state = newState;
  }

}
