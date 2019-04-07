import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './main.scss';

export class App extends React.Component {
  render() {
    return (
      <>
        <TaskPlanner />
      </>
    )
  }
}

class TaskPlanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: [],
      inputVal: '',
    };
  }
  handleInput(ev) {
    this.setState({inputVal: ev.target.value,
                  inputEmpty: false});
}
  handleSubmit(ev) {
    ev.preventDefault();
    this.state.taskExists = this.state.newTask.includes(this.state.inputVal);
    if (!this.state.taskExists && this.state.inputVal !== '') {
      this.state.newTask.push(this.state.inputVal);
    }
    if (this.state.inputVal === '') {
      this.setState({inputEmpty: true,})
    }
    else {
      this.setState({inputVal:'',
                      inputEmpty: false,});
    }
  }

  render() {
      return (
      <React.Fragment>
      <div><h2>Have your To-Do-List scheduled</h2></div>
      <div id="TaskPlanner">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="write something you want to achieve"
          onChange={this.handleInput.bind(this)} value={this.state.inputVal}></input>
          <button type="submit">create a new task</button>
        </form>
        {this.state.inputEmpty && <p id="alert">Please type something!</p>}
        {this.state.taskExists && <p id="alert">This Task was already planned!</p>}
        <TaskInput inputVal={this.state.inputVal} newTask={this.state.newTask} taskExists={this.state.taskExists}/>

      </div>
      </React.Fragment>
    )
  }
}
class TaskInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textDeco: '',
      btnText: 'set task done',
    };
  }
  handleSetDone(ev) {
    this.state.textDeco === '' ?
    this.setState({
      textDeco: ev.target.parentNode.style.textDecoration='line-through',
      btnText: ev.target.innerText='revive this task',
    })
    :
    this.setState({
      textDeco: ev.target.parentNode.style.textDecoration='',
      btnText: ev.target.innerText='set task done',
    });
}
  handleRemove(ev) {
    this.setState({});
    let posInArr = (ev.target.parentElement.firstChild.innerText)-1;
    posInArr = Number(posInArr);
    this.props.newTask.splice(posInArr, 1);
}
  render() {
    return (
    <TransitionGroup>
    {!this.props.taskExists && this.props.newTask.map((task,index)=> <CSSTransition timeout={4000} classNames="fade" key={index}><p id="task">
    <span>{index+1}</span>. {task}
      <button onClick={this.handleRemove.bind(this)}>remove task</button>
      <button onClick={this.handleSetDone.bind(this)}>set task done</button>
    </p></CSSTransition>)}
    </TransitionGroup>
    )
  }
}
