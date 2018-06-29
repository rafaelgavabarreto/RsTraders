import React, {Component} from 'react';

class Crypto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {"data": {"2": {"name": "", "symbol": "", "rank": ""},
}
    }
    };
  }

  componentDidMount() {
    //PATH to GET coin tickers API
    const url = "https://api.coinmarketcap.com/v2/ticker/?convert=CAD&limit=20";
    //call to fetch cryptocurrency
    fetch(url)
      .then(res => res.json())  
      .then(
        (result) => {
          this.setState({items: result});
          console.log(result);
        }
      )
  }
    render(){
      console.log("Render", this.state.items);
      const coins = this.state.items;
      return(   
      <div>
        <h1> Top 20 cryptocurrency </h1>
        <div>
          <table>
            <tr>
              <td>
          {this.state.items["data"]["2"].name}
</td>
<td>
          {this.state.items["data"]["2"].symbol}
          </td>
          <td>
          {this.state.items["data"]["2"].rank}
          </td>
          </tr>
          </table>
        </div>
        </div>
    )
  }
}

export default Crypto;