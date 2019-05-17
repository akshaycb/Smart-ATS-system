import React, {Component} from 'react'

class Summary extends Component {
  constructor(props) {
    super(props)
  }
  // state = {summary:[]};


  render(){

    const highlightClickedWord = (key) => {
      var text = this.props.text_content;
      alert(key);
      var regex = new RegExp(key,"g");
      text.replace(regex, <span className="highlight">{key}</span>);
    }
    const createTable = () => {
      let row = [];
      let summary_obj = this.props.wordsSummary;
      for(let key in summary_obj){
        row.push(<tr><td><a onClick={()=>highlightClickedWord(key)}>{key}</a></td><td>{summary_obj[key]}</td></tr>);
      }
      return row;
    }
    return(
      <React.Fragment>
        <div id="word_summary">
        <table>
          <th>Words</th><th>Count</th>
          {createTable()}

        </table>
        </div>
      </React.Fragment>
    );
  }
}
export default Summary;
