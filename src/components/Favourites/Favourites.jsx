import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      favCoins: [],
      currentRank: 1,
      favCount: 0
    };
  }
  callFromApi = () => {
    const url =
      "https://api.coinmarketcap.com/v2/ticker/?convert=CAD&limit=500&sort=rank&structure=array";
    //fetch data from API
    fetch(url)
      .then(res => res.json())
      .then(result => {
        const resultObj = result.data;
        const allCoinData = [];
        resultObj.forEach(item => {
          // console.log(item)
          allCoinData.push(item);
        });
        console.log(allCoinData);
        this.setState({ coins: allCoinData });
      });
  };

  _favButtonEvent = e => {
    const buttonText = e.target.innerText.split("/");
    // const favCoin = []
    // favCoin.push(buttonText[0])
    // console.log('1',favCoin)
    // this.setState({favCoin: favCoin})
    const params = {
      coin_id: buttonText[0],
      rank: this.state.currentRank
    };

    fetch("/api/favorites", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(params)
      // body: params
    }).then(response => {
      const newFavCoins = this.state.favCoins;
      newFavCoins.push(params.coin_id);
      this.setState({
        currentRank: this.state.currentRank + 1,
        favCount: this.state.favCount + 1,
        favCoins: newFavCoins
      });
    });
  };
  componentDidMount() {
    this.callFromApi();
  }
  render() {
    console.log(this.state.favCoins);

    return (
      <div>
        <h1>Select your Favourite Crypto's!</h1>
        <h3>You have {this.state.favCount} favorites </h3>
        {this.state.favCoins.map(x => {
          return (
            <p>{x}</p>
          )
        })}

        {this.state.coins.map(x => {
          const buttonStyle = {
            variant: "outlined"
          };
          if (this.state.favCoins.includes(x)) {
            buttonStyle.variant = "contained";
            console.log(buttonStyle)
          }
          return (
            <span>
              <Button
                onClick={this._favButtonEvent}
                variant={buttonStyle.variant}
                color="primary"
              >
                {x.symbol}/{x.name}
              </Button>
            </span>
          );
        })}
      </div>
    );
  }
}
export default Favourites;