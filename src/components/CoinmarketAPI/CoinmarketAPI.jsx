import React, { Component } from "react";
import { TableRow, CardHeader } from "@material-ui/core";
// import './App.css';

//Material UI Components
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  // paper: {
  //   padding: theme.spacing.unit * 2,
  //   textAlign: "center",
  //   color: 'black'
  // },
  chartDetails: {
    height: "100%"
  },
  detailsCard: {
    backgroundColor: "#1C2C43",
    color: "white",
    height: "100%"
  },
  paper: {
    boxShadow: "none",
    boxSizing: "border-box",
    borderRadius: "0",
    color: 'white',
    backgroundColor: "#ffffff00",
    textAlign: 'center'
  },
  priceDetail: {
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: 'rgb(94, 110, 138)',
    borderRadius: '5px',
    marginBottom: '5px',
    boxShadow: '0px 3px 10px 0px #000'
  },
  fullGrid: {
    padding: '19px'
  }
});

class CoinmarketAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
    };
  }
  componentDidMount() {
    this._fetchDataFromApi();
  }

  _fetchDataFromApi = () => {
    //fetch data from API
    fetch(
      "https://api.coinmarketcap.com/v2/ticker/?convert=USD&limit=100&sort=rank&structure=array"
    )
      .then(res => res.json())
      .then(result => {
        this.setState("Set state"[result]);
        console.log("Original Format", result);
        var coins = Object.values(result.data);
        this.setState({ coins: coins });
      });
  };

  _renderDataFromApi = () => {
    const { classes } = this.props;
    const coins = this.state.coins;
    const result = coins.filter(coin => coin.symbol === this.props.coinCode);
    const render = result.map(coin => {
      return (
        <div className={classes.chartDetails}>
          <Card className={classes.detailsCard}>
            <Grid className={classes.fullGrid} style={{padding: '18px'}} container spacing={24}>
              <Grid className={classes.priceDetail} item xs={6} sm={12}>
                <div style={{textAlign: 'left', padding: '0', color: 'rgb(94, 110, 138)'}} className="title">Current Price</div>
                <Paper className={classes.paper}>$ {coin.quotes.USD.price} USD</Paper>
              </Grid>
              <Grid item xs={6} sm={6}>
                <div style={{textAlign: 'center', padding: '0', color: 'rgb(94, 110, 138)'}} className="title">Volume (24h)</div>
                <Paper className={classes.paper}>$ {coin.quotes.USD.volume_24h.toLocaleString()}</Paper>
              </Grid>
              <Grid item xs={6} sm={6}>
                <div style={{textAlign: 'center', padding: '0', color: 'rgb(94, 110, 138)'}} className="title">Market Cap</div>
                <Paper className={classes.paper}>{coin.quotes.USD.market_cap}</Paper>
              </Grid>
              <Grid className={classes.priceDetail} item xs={6} sm={12}>
                <div style={{textAlign: 'center', padding: '0', color: 'rgb(94, 110, 138)'}} className="title">Max Supply</div>
                <Paper className={classes.paper}>{coin.max_supply}</Paper>
              </Grid>
            </Grid>
            <h1 style={{fontSize: '5vw', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center', opacity: '0.1', fontWeight: '300', padding: '0', margin: '0'}} className="coin-name">{coin.name}</h1>
          </Card>
        </div>
      );
    });
    return render;
  };

  render() {
    const { classes } = this.props;
    return <div style={{ height: "100%" , height: '93.5%'}}>{this._renderDataFromApi()}</div>;
  }
}

CoinmarketAPI.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CoinmarketAPI);
