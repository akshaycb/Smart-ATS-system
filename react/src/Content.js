import React, {Component} from 'react';
import App from './App.js';
import Highlighter from "react-highlight-words";

class Content extends Component {
  constructor(props) {
    super(props);
  }
  state = {};

  render(){
    //to create the table for summary
    const createTable = () => {
      let row = [];
      let summary_obj = this.props.summary;
      for(let key in summary_obj){
        row.push(<tr><td><a onClick={()=>this.props.highlightWord(key)}>{key}</a></td><td>{summary_obj[key]}</td></tr>);
      }
      return row;
    }
    var summary;
//condition if text content is available
    if(this.props.text_content){
      var content = this.props.text_content;
      summary = <React.Fragment>
                  <h2 className="h2 summary_head">Summary</h2>
                  <div id="word_summary">
                    <table className="table">
                      <thead className="thead-dark">
                        <th scope="col">Words</th><th scope="col">Count</th>
                      </thead>
                      {createTable()}
                    </table>
                  </div>
                </React.Fragment>;
    }else {
      var content = 'Please Enter Valid URL';
    }
    //print the text content and summary
    return(
      <React.Fragment>
        <div className="contents">
          <h2 className="h2">Text Content</h2>
          <div id="paragraph" className="para ">
            <Highlighter highlightClassName="YourHighlightClass" searchWords={[' '+ this.props.key_word ]} autoEscape={true} textToHighlight={this.props.text_content} />
          </div>
          {summary}
        </div>
      </React.Fragment>
    );
  }
}
export default Content;
