import React from 'react';
import ImpacterProfile from './ImpacterProfile';

class HomePage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      impacterId:"",
      isLoggedIn: false
    }
    this.updateImpacterIdValue = this.updateImpacterIdValue.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  updateImpacterIdValue(event) {
    this.setState({
      impacterId: event.target.value
    });
  }  

  logIn() {
    this.setState({
      isLoggedIn:true
    });
  }

  logOut() {
    this.setState({
      isLoggedIn:false,
      impacterId:"" 
    });
  }

  render() {
    return(
      <div key="home">
        {!this.state.isLoggedIn 
        && <form>
            <h1>Welcome to Milkywire!</h1>
            <p>Please enter your impacter id:</p>
            <input value={this.state.impacterId} onChange={this.updateImpacterIdValue}/>
            <button type="button" onClick={this.logIn}>Log In</button>
        </form>
        }
        {this.state.isLoggedIn 
        && <div key="hi_impacter">
             <h2>Hi {this.state.impacterId}!</h2>
             <button type="button" onClick={this.logOut}>Log Out</button>
             <ImpacterProfile impacterId={this.state.impacterId}/>
          </div>
        }
      </div>
    );
  }
}

export default HomePage;
