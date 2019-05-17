import React, {Component} from 'react';
import Content from './Content.js';
//importing the css file
import './style.css';

class App extends Component {
  constructor(props){
    super(props);
    this.getURL = this.getURL.bind(this);
  }

  state = { summary:{}}

//to change the component's state when user clicks the specific word
  highlightClickedWord = (key) => {
    this.setState({key_word: key})
  }

//method to manipulate the summary of words displayed in table
  summary_manipulate = (text_content) =>{
    //get key when passed a value
    const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val);
    //to get keys with highest values 0-> object and n-> number of highest values required
    const getKeysWithHighestValue = (o, n) => {
      var keys = Object.keys(o);
      keys.sort(function(a,b){
        return o[b] - o[a];
      })
      return keys.slice(0,n);
    }
    var word_count = {};
    //if text content is there
    if (text_content) {
      var text_summary;
      text_summary = text_content.replace(/[^A-Za-z]/ig, " ").toLowerCase();
      text_summary = text_summary.replace(/(\s+)/g, ' ').trim();
      text_summary.split(' ').map((val,i) => {
        if (word_count[val]) {
          word_count[val]++;
        }else {
          word_count[val] = 1;
        }
      });
      var top10Words = getKeysWithHighestValue(word_count, 10);
      //manipulate the summary and change the state
      var top10words_summary = {};
      top10Words.map((vals,j)=>{
        top10words_summary[vals] = word_count[vals];
      });
      this.setState({ summary: top10words_summary })
    }
  }
//check if url entered is valid
  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
//event after user clicks submit button and send ajax request if url is valid
  getURL = (url) =>{
    if(!this.validURL(url)){
      alert('Please Enter Valid URL ');
      return false;
    }
    fetch('http://localhost/cushion_backend/index.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: url,
      }),
    }).then(res => res.json())
    .then(response => {
      //collect the response and change the state
      response = response.message
      if (response == false) {
        alert('Something went wrong! Try another URL.');
      }else {
        this.setState({ response });
        this.summary_manipulate(response);
      }

    });
  }
  render(){
    //render the form components
    var content = '';
    if (this.state.response) {
      content = <Content text_content={this.state.response} key_word={this.state.key_word} summary={this.state.summary} highlightWord={(key)=>this.highlightClickedWord(key)}/>;
    }
    return (
      <React.Fragment>
      <div className="container">
        <div className="content">
          <div id="url_button" className="d-flex justify-content-center form-group">
            <input type="text" className="form-control form-control-lg" id="url" placeholder="Please Enter a Valid URL to Parse.."/>
            <button className="form-control form-control-lg" onClick={()=>this.getURL(document.getElementById('url').value)}> Submit </button>
          </ div>
          {content}
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
