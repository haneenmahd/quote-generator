import React from "react";
import "./styles.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      isLoaded: false
    };
    this.getQuotes = this.getQuotes.bind(this);
    this.genRandomQuote = this.genRandomQuote.bind(this);
  }
  componentDidMount() {
    this.getQuotes();
  }
  async getQuotes() {
    axios
      .get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      )
      .then((response) => {
        for (var obj in response.data) {
          for (var subObj = 0; subObj < response.data[obj].length; subObj++) {
            var newArr = [...response.data[obj]];
            this.setState({
              quotes: newArr,
              isLoaded: true,
              randomQuote: undefined
            });
            return newArr;
          }
        }
      });
  }
  genRandomQuote() {
    this.setState({
      randomQuote: Math.floor(Math.random() * this.state.quotes.length)
    });
  }

  render() {
    const randomIndex = Math.floor(Math.random() * this.state.quotes.length);
    const colors = [
      "#ffe6e6",
      "#ffabe1",
      "#a685e2",
      "#6155a6",
      "#314e52",
      "#f2a154",
      "#ff577f",
      "#ffc764",
      "#845ec2",
      "#16c79a",
      "#19456b",
      "#11698e",
      "#f8f1f1"
    ];
    const randomColors = Math.floor(Math.random() * colors.length);
    if (this.state.isLoaded) {
      return (
        <main style={{ backgroundColor: colors[randomColors] }} className="App">
          <div id="quote-box" className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <p id="author" className="card-text">
                {this.state.quotes[randomIndex].author}
              </p>
              <button
                id="text"
                className="btn btn-light"
                onClick={this.genRandom}
              >
                {this.state.quotes[randomIndex].quote}
              </button>
              <button
                id="new-quote"
                onClick={() => {
                  try {
                    this.genRandomQuote();
                    toast("Successfully generate a new quote!", {
                      icon: "👏",
                      style: {
                        borderRadius: "20px",
                        background: "#333",
                        color: "#fff"
                      },
                      duration: 1500
                    });
                  } catch (err) {
                    toast.error(`Failed to generate a quote.error: ${err}`);
                  }
                }}
                className="btn btn-primary"
              >
                Generate Quote
              </button>
              <a
                className="btn btn-dark"
                target="_top"
                rel="noreferrer"
                href={
                  "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                  encodeURIComponent(
                    '"' +
                      this.state.quotes[randomIndex].quote +
                      '" ' +
                      this.state.quotes[randomIndex].author
                  )
                }
                id="tweet-quote"
              >
                Tweet quote
              </a>
              <a
                className="btn btn-dark"
                target="_blank"
                rel="noreferrer"
                id="tweet-quote"
                href={
                  "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                  encodeURIComponent(this.state.quotes[randomIndex].quote) +
                  "&content=" +
                  encodeURIComponent(this.state.quotes[randomIndex].quote) +
                  "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                }
              >
                Post this on tumblr
              </a>
            </div>
          </div>
          <Toaster position="bottom-center" />
        </main>
      );
    } else {
      return (
        <div className="Load-state">
          <div className="loader" />
        </div>
      );
    }
  }
}
