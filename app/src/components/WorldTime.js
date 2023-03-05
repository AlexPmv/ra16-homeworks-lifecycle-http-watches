import { Component } from "react";
import WatchAddForm from "./WatchAddForm";
import Watch from "./Watch";

export default class WorldTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      watchArray: []
    }
    this.addWatchToList = this.addWatchToList.bind(this)
    this.removeWatch = this.removeWatch.bind(this)
  }
 
  addWatchToList(e) {
    e.preventDefault();
    const array = this.state.watchArray;
    const newId = this.generateId(array);
    array.push({
      id: newId,
      name: e.target[0].value,
      timezone: e.target[1].value,
    })

    this.setState({
      watchArray: array,
    })

    e.target[0].value = '';
    e.target[1].value = '';
  }

  removeWatch(e) {
    e.preventDefault();
    if (e.target.className === 'watch__delete') {
      this.setState({
        watchArray: this.state.watchArray.filter(item => item.id !== +e.currentTarget.id)
      })
    }
  }

  generateId(array) {
    let i = 1;

    if (array.length >= 1) {
      while (array.find(item => item.id === i) !== undefined) {
        i++;
      }
    }
    
    return i;
  }

  render() {
    return (
      <div className="world-timezone">
        <WatchAddForm onSubmit={this.addWatchToList}/>
        <ul className="watch-list">
          {this.state.watchArray.map(watch => {
            return <Watch {...watch} key={watch.id} removeWatch={this.removeWatch}/>
          })}
        </ul>
      </div>
    )
  }
}