import React,{Component} from 'react';
import './App.css';
import Button from './components/Button';
import "./css/style.css";
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: '0',
      previous: [],
      nextIsreset:false
    }
  }

  reset = () => {
    this.setState({current:'0',previous:[], nextIsreset:false });
  }

  addtocurrent = (symbol) =>{
    if(["/","+","-","*"].indexOf(symbol) >-1)
    {
      let {previous} = this.state;
      previous.push(this.state.current+symbol);
      this.setState({previous, nextIsreset:true});
    }else{
      if((this.state.current ==="0" && symbol !== ".") || this.state.nextIsreset)
      {
        this.setState({current:symbol,nextIsreset:false});
      }else
      {
        this.setState({current: this.state.current+ symbol});
      }
    }
    
  }

  calculate = (symbol) => {
    let {current,previous,nextIsreset}= this.state;
    if(previous.length>0){
      current=eval(String(previous[previous.length-1]+current));
      this.setState({current, previous : [], nextIsreset :false});
    }
  }
  render(){
    const buttons =[
      {  symbol: 'C',      cols:3,    action: this.reset     },
      {  symbol: '/',      cols:1,    action: this.addtocurrent},
      {  symbol: '7',      cols:1,    action: this.addtocurrent},
      {  symbol: '8',      cols:1,    action: this.addtocurrent},
      {  symbol: '9',      cols:1,    action: this.addtocurrent},
      {  symbol: '*',      cols:1,    action: this.addtocurrent},
      {  symbol: '4',      cols:1,    action: this.addtocurrent},
      {  symbol: '5',      cols:1,    action: this.addtocurrent},
      {  symbol: '6',      cols:1,    action: this.addtocurrent},
      {  symbol: '-',      cols:1,    action: this.addtocurrent},
      {  symbol: '1',      cols:1,    action: this.addtocurrent},
      {  symbol: '2',      cols:1,    action: this.addtocurrent},
      {  symbol: '3',      cols:1,    action: this.addtocurrent},
      {  symbol: '+',      cols:1,    action: this.addtocurrent},
      {  symbol: '0',      cols:1,    action: this.addtocurrent},
      {  symbol: '.',      cols:1,    action: this.addtocurrent},
      {  symbol: '=',      cols:1,    action: this.calculate},
      
    ]

    
    return (
      <div className="App">
        { this.state.previous.length>0 ? 
        <div className="floaty-class">{this.state.previous[this.state.previous.length-1]}</div>
       : null}
        <input className="result" type="text" value={this.state.current} ></input>
        <span></span>
        {buttons.map((btn,i)=>{
          return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol)=> btn.action(symbol)}></Button>
        })}
      </div>
    );
  }
  
}

export default App;
